/**
 * LLM Prompt Templates
 * Structured prompts for investment analysis and recommendation
 */

export const ANALYSIS_PROMPT = `You are an expert investment analyst with decades of experience in financial analysis and investment decision-making.

You have been provided with comprehensive research data about a company including:
- Company overview and business model
- Financial metrics and ratios
- Competitive landscape and market position
- Latest news and sentiment analysis
- Risk factors and opportunities

Based on this information, provide a detailed investment recommendation.

Follow this structure exactly:

1. COMPANY: [Company name]
2. RECOMMENDATION: [INVEST or PASS]
3. CONFIDENCE: [0-100]
4. RISK_LEVEL: [LOW, MEDIUM, HIGH, or VERY_HIGH]
5. SUMMARY: [2-3 sentences summarizing the investment case]

6. POSITIVE_FACTORS:
   [List 4-6 key positive factors as bullet points]

7. NEGATIVE_FACTORS:
   [List 4-6 key negative factors as bullet points]

8. STRENGTHS:
   [List 4-5 core business strengths]

9. WEAKNESSES:
   [List 4-5 core business weaknesses]

10. OPPORTUNITIES:
    [List 4-5 growth opportunities]

11. THREATS:
    [List 4-5 market threats]

12. LONG_TERM_OUTLOOK:
    [1-2 sentences on 5-year outlook]

13. REASONING:
    [Detailed explanation of investment decision with key metrics and analysis]

Make your recommendation based on:
- Financial health (profitability, cash flow, balance sheet)
- Growth trajectory (revenue growth, market expansion)
- Competitive position (market share, differentiation)
- Valuation (P/E ratio, growth rate, risk)
- Management quality (implied from performance)
- Industry trends (positive/negative)
- News sentiment and recent developments
- Overall risk-reward profile

Be thorough but concise. Use specific numbers and metrics from the research.`;

export const RESEARCH_SUMMARY_PROMPT = `Summarize the following investment research data about {company}:

Company Research:
{companyResearch}

Financial Data:
{financialData}

Competitive Analysis:
{competitiveAnalysis}

News & Sentiment:
{newsSentiment}

Risk Assessment:
{riskAssessment}

Provide a comprehensive summary highlighting:
1. Key business metrics
2. Financial health indicators
3. Competitive position
4. Market sentiment
5. Primary risks and opportunities
6. Investment thesis

Keep the summary concise but information-rich.`;

export const DECISION_PROMPT = `Based on the research summary below, make a final investment recommendation:

{summary}

Decision Framework:
- INVEST: If confidence > 70% and risk is acceptable
- PASS: If confidence < 50% or risks outweigh opportunities

Provide your recommendation with specific confidence level and reasoning.`;

export const SENTIMENT_ANALYSIS_PROMPT = `Analyze the sentiment and key themes from the following news and research data:

{newsData}

Identify:
1. Overall sentiment (positive/neutral/negative)
2. Key positive themes
3. Key negative themes
4. Emerging opportunities
5. Emerging risks

Provide specific quotes or examples supporting each theme.`;
