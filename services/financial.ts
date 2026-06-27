/**
 * Financial Data Service
 * Provides mock financial metrics for companies
 */

import { FinancialMetrics, CompanyProfile } from "@/types";

class FinancialService {
  /**
   * Generate mock financial metrics for a company
   */
  getFinancialMetrics(company: string): FinancialMetrics {
    // Generate consistent but company-specific metrics using hash
    const seed = this.hashCode(company);
    const random = (min: number, max: number): number => {
      const x = Math.sin(seed) * 10000;
      return min + ((x - Math.floor(x)) * (max - min));
    };

    return {
      revenue: random(1000, 500000) * 1000000, // $1B to $500B
      revenueGrowth: random(5, 25), // 5% to 25%
      netIncome: random(100, 50000) * 1000000, // $100M to $50B
      grossMargin: random(30, 80), // 30% to 80%
      operatingMargin: random(10, 40), // 10% to 40%
      netMargin: random(5, 25), // 5% to 25%
      peRatio: random(10, 50), // 10x to 50x
      pbRatio: random(1, 15), // 1x to 15x
      debtToEquity: random(0.1, 2.0),
      currentRatio: random(1.0, 3.0),
      quickRatio: random(0.8, 2.5),
      freeCashFlow: random(100, 50000) * 1000000,
      operatingCashFlow: random(200, 75000) * 1000000,
      eps: random(1, 50),
      roa: random(2, 20), // 2% to 20%
      roe: random(5, 30), // 5% to 30%
    };
  }

  /**
   * Get mock company profile
   */
  getCompanyProfile(company: string): CompanyProfile {
    const industries = [
      "Technology",
      "Healthcare",
      "Finance",
      "Consumer",
      "Industrial",
    ];
    const sectors = [
      "Software",
      "Hardware",
      "Pharma",
      "Banking",
      "Retail",
      "Manufacturing",
    ];

    const seed = Math.abs(this.hashCode(company));

    return {
      name: company,
      ticker: this.generateTicker(company),
      sector: industries[seed % industries.length],
      industry: sectors[seed % sectors.length],
      marketCap: (seed % 1000 + 1) * 1000000000, // $1B to $1T
      website: `https://www.${company.toLowerCase().replace(/\s+/g, "")}.com`,
      description: `${company} is a leading global company in the ${sectors[seed % sectors.length]} industry, known for innovation and market leadership.`,
      founded: 1990 + (seed % 34),
      employees: 1000 + (seed % 300000),
    };
  }

  /**
   * Generate a realistic ticker symbol
   */
  private generateTicker(company: string): string {
    const letters = company.replace(/[^a-zA-Z]/g, "").toUpperCase();
    return letters.substring(0, 4).padEnd(4, "X");
  }

  /**
   * Simple hash function for consistent randomization
   */
  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }
}

export const financialService = new FinancialService();
