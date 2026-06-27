/**
 * Tavily Search API Service
 * Handles company research and web search
 */

import axios, { AxiosInstance } from "axios";

interface TavilySearchResponse {
  results: Array<{
    title: string;
    url: string;
    content: string;
    score: number;
  }>;
}

class TavilyService {
  private client: AxiosInstance;
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.TAVILY_API_KEY || "";

    if (!this.apiKey) {
      console.warn("TAVILY_API_KEY not set");
    }

    this.client = axios.create({
      baseURL: "https://api.tavily.com/search",
      timeout: 10000,
    });
  }

  /**
   * Search for information about a company
   */
  async searchCompany(companyName: string): Promise<string[]> {
    try {
      if (!this.apiKey) {
        return this.getMockResults(companyName);
      }

      const response = await this.client.post<TavilySearchResponse>("", {
        api_key: this.apiKey,
        query: `${companyName} company information business overview`,
        max_results: 5,
      });

      return response.data.results.map((r) => r.content).filter(Boolean);
    } catch (error) {
      console.error("Tavily search error:", error);
      return this.getMockResults(companyName);
    }
  }

  /**
   * Search for financial information
   */
  async searchFinancials(companyName: string): Promise<string[]> {
    try {
      if (!this.apiKey) {
        return this.getMockFinancialResults(companyName);
      }

      const response = await this.client.post<TavilySearchResponse>("", {
        api_key: this.apiKey,
        query: `${companyName} financial metrics revenue profit earnings revenue growth`,
        max_results: 5,
      });

      return response.data.results.map((r) => r.content).filter(Boolean);
    } catch (error) {
      console.error("Tavily financial search error:", error);
      return this.getMockFinancialResults(companyName);
    }
  }

  /**
   * Search for competitive analysis
   */
  async searchCompetitors(companyName: string, industry: string): Promise<string[]> {
    try {
      if (!this.apiKey) {
        return this.getMockCompetitorResults(companyName);
      }

      const response = await this.client.post<TavilySearchResponse>("", {
        api_key: this.apiKey,
        query: `${companyName} competitors market position ${industry}`,
        max_results: 5,
      });

      return response.data.results.map((r) => r.content).filter(Boolean);
    } catch (error) {
      console.error("Tavily competitor search error:", error);
      return this.getMockCompetitorResults(companyName);
    }
  }

  /**
   * Mock results for development
   */
  private getMockResults(company: string): string[] {
    return [
      `${company} is a leading global technology company known for innovation and market leadership.`,
      `The company operates in multiple markets including consumer electronics, cloud services, and software.`,
      `${company} maintains strong competitive advantages including brand recognition and technological expertise.`,
      `The company invests heavily in research and development to maintain market leadership.`,
      `${company} has a strong track record of revenue growth and market expansion.`,
    ];
  }

  private getMockFinancialResults(company: string): string[] {
    return [
      `${company} reported strong financial performance with double-digit revenue growth.`,
      `Operating margins have remained healthy, demonstrating operational efficiency.`,
      `The company maintains a strong balance sheet with manageable debt levels.`,
      `Cash flow generation supports investments in innovation and shareholder returns.`,
      `Profitability metrics show consistent improvement over recent quarters.`,
    ];
  }

  private getMockCompetitorResults(company: string): string[] {
    return [
      `${company} competes with both established players and emerging startups.`,
      `Key competitive advantages include technology, brand, and distribution networks.`,
      `Market share trends show ${company} maintaining competitive positions.`,
      `The competitive landscape is evolving with new entrants and consolidation.`,
      `${company} differentiates through product quality and customer service.`,
    ];
  }
}

export const tavilyService = new TavilyService();
