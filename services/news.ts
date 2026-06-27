/**
 * News API Service
 * Handles fetching latest news about companies
 */

import axios, { AxiosInstance } from "axios";
import { NewsItem } from "@/types";

interface NewsAPIResponse {
  articles: Array<{
    title: string;
    description: string;
    url: string;
    source: {
      name: string;
    };
    publishedAt: string;
    urlToImage?: string;
  }>;
  totalResults: number;
}

class NewsService {
  private client: AxiosInstance;
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.NEWS_API_KEY || "";

    if (!this.apiKey) {
      console.warn("NEWS_API_KEY not set");
    }

    this.client = axios.create({
      baseURL: "https://newsapi.org/v2",
      timeout: 10000,
    });
  }

  /**
   * Get latest news about a company
   */
  async getCompanyNews(companyName: string): Promise<NewsItem[]> {
    try {
      if (!this.apiKey) {
        return this.getMockNews(companyName);
      }

      const response = await this.client.get<NewsAPIResponse>("/everything", {
        params: {
          q: companyName,
          sortBy: "publishedAt",
          language: "en",
          pageSize: 10,
          apiKey: this.apiKey,
        },
      });

      return response.data.articles.map((article) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        source: article.source.name,
        publishedAt: article.publishedAt,
        sentiment: this.analyzeSentiment(article.title + " " + (article.description || "")),
      }));
    } catch (error) {
      console.error("News API error:", error);
      return this.getMockNews(companyName);
    }
  }

  /**
   * Analyze sentiment of news
   */
  private analyzeSentiment(text: string): "positive" | "negative" | "neutral" {
    const positiveTriggers = [
      "growth",
      "surge",
      "innovation",
      "acquisition",
      "partnership",
      "record",
      "gain",
      "rally",
      "beat",
      "outperform",
      "strong",
      "bullish",
    ];
    const negativeTriggers = [
      "decline",
      "drop",
      "loss",
      "crash",
      "bankruptcy",
      "layoffs",
      "scandal",
      "investigation",
      "weak",
      "bearish",
      "miss",
      "underperform",
    ];

    const lowerText = text.toLowerCase();

    let positiveScore = 0;
    let negativeScore = 0;

    positiveTriggers.forEach((trigger) => {
      if (lowerText.includes(trigger)) positiveScore++;
    });

    negativeTriggers.forEach((trigger) => {
      if (lowerText.includes(trigger)) negativeScore++;
    });

    if (positiveScore > negativeScore) return "positive";
    if (negativeScore > positiveScore) return "negative";
    return "neutral";
  }

  /**
   * Mock news for development
   */
  private getMockNews(company: string): NewsItem[] {
    const mockNews: NewsItem[] = [
      {
        title: `${company} Reports Strong Q3 Earnings, Beats Analyst Expectations`,
        description: `${company} announced quarterly results showing impressive growth in all business segments.`,
        url: "https://example.com/news1",
        source: "Financial Times",
        publishedAt: new Date().toISOString(),
        sentiment: "positive",
      },
      {
        title: `${company} Announces Strategic Investment in AI Research`,
        description: `The company commits $1B to artificial intelligence and machine learning initiatives.`,
        url: "https://example.com/news2",
        source: "TechCrunch",
        publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        sentiment: "positive",
      },
      {
        title: `${company} Expands Global Operations with New Regional Headquarters`,
        description: `Strategic expansion aims to strengthen market presence in key growth regions.`,
        url: "https://example.com/news3",
        source: "Business Wire",
        publishedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        sentiment: "positive",
      },
      {
        title: `Industry Analysts Maintain Positive Outlook for ${company}`,
        description: `Multiple firms issue bullish recommendations following company guidance.`,
        url: "https://example.com/news4",
        source: "Reuters",
        publishedAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
        sentiment: "positive",
      },
      {
        title: `${company} Launches New Product Line to Address Market Demands`,
        description: `Innovation initiative expected to drive revenue growth in coming quarters.`,
        url: "https://example.com/news5",
        source: "Wall Street Journal",
        publishedAt: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
        sentiment: "positive",
      },
    ];

    return mockNews;
  }
}

export const newsService = new NewsService();
