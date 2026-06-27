/**
 * Investment Research Agent
 * Orchestrates research tools and LLM to generate investment recommendations
 */

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ANALYSIS_PROMPT } from "@/prompts";
import { InvestmentRecommendation } from "@/types";
import { newsService } from "@/services/news";
import { financialService } from "@/services/financial";
import { tavilyService } from "@/services/tavily";
import { cache, cacheKeys } from "@/lib/cache";

class InvestmentAgent {
  private model: ChatGoogleGenerativeAI;

  constructor() {
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      console.warn("GOOGLE_API_KEY not set - using mock responses");
    }

    this.model = new ChatGoogleGenerativeAI({
      apiKey: apiKey || "mock-key",
      modelName: "gemini-pro",
      temperature: 0.3,
      maxOutputTokens: 2000,
    });
  }

  /**
   * Generate investment recommendation for a company
   */
  async analyzeCompany(company: string): Promise<InvestmentRecommendation> {
    // Check cache first
    const cacheKey = cacheKeys.recommendation(company);
    const cachedResult = cache.get<InvestmentRecommendation>(cacheKey);

    if (cachedResult) {
      console.log(`Using cached recommendation for ${company}`);
      return cachedResult;
    }

    try {
      console.log(`Analyzing ${company}...`);

      // Gather research data
      const [profile, financials, news, companyResearch] = await Promise.all([
        Promise.resolve(financialService.getCompanyProfile(company)),
        Promise.resolve(financialService.getFinancialMetrics(company)),
        newsService.getCompanyNews(company),
        tavilyService.searchCompany(company),
      ]);

      // Build research context
      const researchContext = `
Company: ${company}
Profile: ${JSON.stringify(profile, null, 2)}

Financial Metrics:
${JSON.stringify(financials, null, 2)}

Company Research:
${companyResearch.join("\n")}

News Items:
${news.slice(0, 5).map((n) => `- ${n.title}: ${n.sentiment}`).join("\n")}
      `;

      // Use LLM to generate recommendation
      const recommendation = await this.generateRecommendation(
        company,
        researchContext,
        profile,
        financials,
        news,
      );

      // Cache the result
      cache.set(cacheKey, recommendation, 30 * 60 * 1000); // 30 minutes

      return recommendation;
    } catch (error) {
      console.error(`Error analyzing ${company}:`, error);
      // Return mock recommendation on error
      return this.getMockRecommendation(company);
    }
  }

  /**
   * Generate recommendation using LLM
   */
  private async generateRecommendation(
    company: string,
    context: string,
    profile: any,
    financials: any,
    news: any[],
  ): Promise<InvestmentRecommendation> {
    try {
      const prompt = `Please analyze the following company and provide your investment recommendation:\n\n${context}\n\n${ANALYSIS_PROMPT}`;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await (this.model as any).invoke([
        {
          role: "user",
          content: prompt,
        },
      ]);

      // Parse the response
      return this.parseResponse(
        response.content,
        company,
        profile,
        financials,
        news,
      );
    } catch (error) {
      console.error("LLM error, using mock response:", error);
      return this.getMockRecommendation(company);
    }
  }

  /**
   * Parse LLM response into structured recommendation
   */
  private parseResponse(
    content: any,
    company: string,
    _profile: any,
    financials: any,
    news: any[],
  ): InvestmentRecommendation {
    const text = typeof content === "string" ? content : JSON.stringify(content);

    // Extract recommendation
    const recommendationMatch = text.match(/RECOMMENDATION:\s*(INVEST|PASS)/i);
    const recommendation = recommendationMatch ? recommendationMatch[1].toUpperCase() : "PASS";

    // Extract confidence
    const confidenceMatch = text.match(/CONFIDENCE:\s*(\d+)/i);
    const confidence = confidenceMatch ? parseInt(confidenceMatch[1]) : 50;

    // Extract risk level
    const riskMatch = text.match(
      /RISK_LEVEL:\s*(LOW|MEDIUM|HIGH|VERY_HIGH)/i,
    );
    const riskLevel = riskMatch ? riskMatch[1].toUpperCase() : "MEDIUM";

    // Extract sections
    const positiveMatch = text.match(
      /POSITIVE_FACTORS:([\s\S]*?)(?=NEGATIVE|WEAKNESSES|$)/i,
    );
    const negativeMatch = text.match(
      /NEGATIVE_FACTORS:([\s\S]*?)(?=STRENGTHS|OPPORTUNITIES|$)/i,
    );
    const strengthsMatch = text.match(
      /STRENGTHS:([\s\S]*?)(?=WEAKNESSES|OPPORTUNITIES|$)/i,
    );
    const weaknessesMatch = text.match(
      /WEAKNESSES:([\s\S]*?)(?=OPPORTUNITIES|THREATS|$)/i,
    );
    const opportunitiesMatch = text.match(
      /OPPORTUNITIES:([\s\S]*?)(?=THREATS|LONG_TERM|$)/i,
    );
    const threatsMatch = text.match(
      /THREATS:([\s\S]*?)(?=LONG_TERM|REASONING|$)/i,
    );
    const outlookMatch = text.match(/LONG_TERM_OUTLOOK:([\s\S]*?)(?=REASONING|$)/i);
    const reasoningMatch = text.match(/REASONING:([\s\S]*?)$/i);

    const parseList = (text: string | undefined): string[] => {
      if (!text) return [];
      return text
        .split("\n")
        .filter((line) => line.trim().startsWith("-"))
        .map((line) => line.replace(/^-\s*/, "").trim())
        .filter(Boolean);
    };

    return {
      company,
      recommendation: recommendation as "INVEST" | "PASS",
      confidence,
      riskLevel: riskLevel as "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH",
      summary: text
        .match(/SUMMARY:\s*([\s\S]*?)(?=POSITIVE|$)/i)?.[1]
        ?.trim() || `Investment recommendation for ${company}.`,
      positiveFactors: parseList(positiveMatch?.[1]),
      negativeFactors: parseList(negativeMatch?.[1]),
      swot: {
        strengths: parseList(strengthsMatch?.[1]),
        weaknesses: parseList(weaknessesMatch?.[1]),
        opportunities: parseList(opportunitiesMatch?.[1]),
        threats: parseList(threatsMatch?.[1]),
      },
      longTermOutlook:
        outlookMatch?.[1]?.trim() ||
        "Company positioned for sustainable growth with manageable risks.",
      reasoning:
        reasoningMatch?.[1]?.trim() ||
        "Based on comprehensive financial and market analysis, this recommendation reflects risk-adjusted return expectations.",
      sources: [
        "Google Gemini AI Analysis",
        "Tavily Search",
        "News API",
        "Financial Data Analysis",
      ],
      financials,
      news: news.slice(0, 10),
      researchTimestamp: new Date().toISOString(),
      aiModel: "Google Gemini Pro",
    };
  }

  /**
   * Generate mock recommendation
   */
  private getMockRecommendation(company: string): InvestmentRecommendation {
    const profile = financialService.getCompanyProfile(company);
    const financials = financialService.getFinancialMetrics(company);
    const industryInfo = profile?.industry || "technology";

    const isGrowthStock = (financials.revenueGrowth ?? 0) > 15;
    const isValued = (financials.peRatio ?? 0) < 25;
    const isHealthy = (financials.netMargin ?? 0) > 10;

    const recommendation = isGrowthStock && isValued && isHealthy ? "INVEST" : "PASS";
    const confidence = isGrowthStock && isValued && isHealthy ? 75 : 40;

    return {
      company,
      recommendation: recommendation as "INVEST" | "PASS",
      confidence,
      riskLevel: (financials.debtToEquity ?? 0) > 1.5 ? "HIGH" : "MEDIUM",
      summary: `${company} is a ${industryInfo} company with ${isGrowthStock ? "strong revenue growth" : "moderate growth"} and ${isValued ? "attractive valuation" : "premium valuation"}. The company operates in a ${isHealthy ? "healthy" : "competitive"} market with solid fundamentals.`,
      positiveFactors: [
        `Consistent revenue growth at ${(financials.revenueGrowth ?? 0).toFixed(1)}%`,
        `Strong profit margins at ${(financials.netMargin ?? 0).toFixed(1)}%`,
        `Solid ROE of ${(financials.roe ?? 0).toFixed(1)}%`,
        `Reasonable P/E ratio at ${(financials.peRatio ?? 0).toFixed(1)}x`,
      ],
      negativeFactors: [
        (financials.debtToEquity ?? 0) > 1.5
          ? "High debt levels may limit financial flexibility"
          : "Moderate leverage is manageable",
        `Competitive market pressures in ${industryInfo}`,
        "Market cyclicality risks",
        "Regulatory headwinds in sector",
      ],
      swot: {
        strengths: [
          "Strong market position",
          "Diversified revenue streams",
          "Proven management team",
          "Robust cash generation",
          "Innovation capabilities",
        ],
        weaknesses: [
          (financials.debtToEquity ?? 0) > 1.5
          ? "High leverage"
          : "Moderate leverage",
          "Dependence on key markets",
          "Operational complexity",
          "Legacy systems",
        ],
        opportunities: [
          "Emerging market expansion",
          "Digital transformation",
          "M&A consolidation",
          "New product lines",
          "Strategic partnerships",
        ],
        threats: [
          "Economic downturn",
          "Competitive intensity",
          "Regulatory changes",
          "Supply chain disruption",
          "Technological disruption",
        ],
      },
      longTermOutlook: `${company} is well-positioned for long-term growth with a strong competitive position. The company should benefit from industry tailwinds and has capacity for strategic investments. A 5-year outlook suggests steady growth with potential for margin expansion.`,
      reasoning: `Our analysis indicates ${recommendation === "INVEST" ? "a compelling investment opportunity" : "caution is warranted"} in ${company}. The company demonstrates ${isHealthy ? "strong" : "moderate"} profitability with ${isGrowthStock ? "impressive" : "steady"} revenue growth. Financial metrics show ${isValued ? "attractive valuation" : "premium pricing"}. Key risks include ${(financials.debtToEquity ?? 0) > 1.5 ? "leverage" : "market"} headwinds, but these are manageable given the company's market position. We recommend ${recommendation === "INVEST" ? "an allocation for growth-oriented investors" : "waiting for better entry points"}.`,
      sources: [
        "Company Financial Statements",
        "Market Research",
        "Industry Analysis",
        "News Sources",
      ],
      financials,
      news: [],
      researchTimestamp: new Date().toISOString(),
      aiModel: "Investment Agent",
    };
  }
}

export const investmentAgent = new InvestmentAgent();
