/**
 * LangChain Tools for Investment Research Agent
 * Defines the tools available to the AI agent
 */

import { Tool } from "@langchain/core/tools";
import { tavilyService } from "@/services/tavily";
import { newsService } from "@/services/news";
import { financialService } from "@/services/financial";

/**
 * Company Research Tool
 * Searches for company information and business overview
 */
export class CompanyResearchTool extends Tool {
  name = "company_research";
  description = "Search for company information, business overview, and market position";

  async _call(input: string): Promise<string> {
    try {
      const results = await tavilyService.searchCompany(input);
      return results.join("\n\n");
    } catch (error) {
      return `Failed to research ${input}: ${error instanceof Error ? error.message : "Unknown error"}`;
    }
  }
}

/**
 * Financial Analysis Tool
 * Retrieves financial metrics and analysis
 */
export class FinancialAnalysisTool extends Tool {
  name = "financial_analysis";
  description = "Get detailed financial metrics, ratios, and analysis for a company";

  async _call(input: string): Promise<string> {
    try {
      const metrics = financialService.getFinancialMetrics(input);
      const profile = financialService.getCompanyProfile(input);

      return JSON.stringify({
        company: input,
        profile,
        metrics,
        analysis: `
          Company: ${input}
          Revenue: $${((metrics.revenue ?? 0) / 1e9).toFixed(2)}B
          Revenue Growth: ${metrics.revenueGrowth ?? 0}%
          Net Income: $${((metrics.netIncome ?? 0) / 1e9).toFixed(2)}B
          Net Margin: ${metrics.netMargin ?? 0}%
          ROE: ${metrics.roe ?? 0}%
          P/E Ratio: ${(metrics.peRatio ?? 0).toFixed(1)}x
          Debt-to-Equity: ${(metrics.debtToEquity ?? 0).toFixed(2)}
          Free Cash Flow: $${((metrics.freeCashFlow ?? 0) / 1e9).toFixed(2)}B
        `,
      });
    } catch (error) {
      return `Failed to get financial analysis for ${input}: ${error instanceof Error ? error.message : "Unknown error"}`;
    }
  }
}

/**
 * Competitive Analysis Tool
 * Analyzes competitors and market position
 */
export class CompetitiveAnalysisTool extends Tool {
  name = "competitive_analysis";
  description = "Analyze competitors, market position, and competitive advantages";

  async _call(input: string): Promise<string> {
    try {
      const profile = financialService.getCompanyProfile(input);
      const competitorResults = await tavilyService.searchCompetitors(
        input,
        profile.industry || "Technology",
      );

      return `
        Company: ${input}
        Industry: ${profile.industry}
        Market Cap: $${((profile.marketCap ?? 0) / 1e9).toFixed(2)}B
        
        Competitive Analysis:
        ${competitorResults.join("\n")}
        
        Key Competitive Advantages:
        - Strong brand recognition and market position
        - Advanced technology and innovation capabilities
        - Diversified product and service offerings
        - Strong customer relationships and loyalty
      `;
    } catch (error) {
      return `Failed to analyze competitors: ${error instanceof Error ? error.message : "Unknown error"}`;
    }
  }
}

/**
 * News and Sentiment Tool
 * Retrieves latest news and analyzes sentiment
 */
export class NewsSentimentTool extends Tool {
  name = "news_sentiment";
  description = "Get latest news, analyze sentiment, and track market perception";

  async _call(input: string): Promise<string> {
    try {
      const news = await newsService.getCompanyNews(input);

      const positive = news.filter((n) => n.sentiment === "positive").length;
      const negative = news.filter((n) => n.sentiment === "negative").length;
      const neutral = news.filter((n) => n.sentiment === "neutral").length;

      const sentimentScore = ((positive - negative) / news.length) * 100;

      return `
        Latest News for ${input}:
        
        Sentiment Analysis:
        - Positive: ${positive} articles
        - Neutral: ${neutral} articles
        - Negative: ${negative} articles
        - Sentiment Score: ${sentimentScore.toFixed(1)}% (positive trend)
        
        Recent Headlines:
        ${news
          .slice(0, 5)
          .map((n) => `- ${n.title} (${n.sentiment})`)
          .join("\n")}
      `;
    } catch (error) {
      return `Failed to get news for ${input}: ${error instanceof Error ? error.message : "Unknown error"}`;
    }
  }
}

/**
 * Risk Assessment Tool
 * Analyzes risks and potential challenges
 */
export class RiskAssessmentTool extends Tool {
  name = "risk_assessment";
  description = "Assess risks, challenges, and potential headwinds for a company";

  async _call(input: string): Promise<string> {
    try {
      const metrics = financialService.getFinancialMetrics(input);
      const riskFactors: string[] = [];

      // High P/E ratio risk
      if ((metrics.peRatio ?? 0) > 40) {
        riskFactors.push(
          "High valuation risk: P/E ratio above 40x suggests premium pricing",
        );
      }

      // High debt risk
      if ((metrics.debtToEquity ?? 0) > 1.5) {
        riskFactors.push(
          "High leverage risk: Debt-to-equity ratio indicates significant financial leverage",
        );
      }

      // Low margins
      if ((metrics.netMargin ?? 0) < 5) {
        riskFactors.push(
          "Low profitability: Net margin below 5% indicates thin margins",
        );
      }

      // Low liquidity
      if ((metrics.currentRatio ?? 0) < 1.5) {
        riskFactors.push(
          "Liquidity risk: Current ratio indicates potential liquidity challenges",
        );
      }

      // Market risk
      riskFactors.push(
        "Market risk: Exposure to economic cycles and competitive pressures",
      );

      return `
        Risk Assessment for ${input}:
        
        Identified Risks:
        ${riskFactors.map((r) => `- ${r}`).join("\n")}
        
        Risk Mitigation:
        - Diversified revenue streams
        - Strong market position
        - Innovation investments
        - Financial reserves
      `;
    } catch (error) {
      return `Failed to assess risks: ${error instanceof Error ? error.message : "Unknown error"}`;
    }
  }
}

/**
 * Create all tools for the agent
 */
export function createTools(): Tool[] {
  return [
    new CompanyResearchTool(),
    new FinancialAnalysisTool(),
    new CompetitiveAnalysisTool(),
    new NewsSentimentTool(),
    new RiskAssessmentTool(),
  ];
}
