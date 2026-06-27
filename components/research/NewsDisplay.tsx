/**
 * News Display Component
 */

"use client";

import React from "react";
import { NewsItem } from "@/types";
import { ExternalLink, Calendar, Globe } from "lucide-react";
import { formatDate } from "@/utils/helpers";

interface NewsDisplayProps {
  news: NewsItem[];
  isLoading?: boolean;
}

const getSentimentBg = (sentiment?: string): string => {
  const bg: Record<string, string> = {
    positive: "bg-green-500/10 text-green-700 dark:text-green-400",
    neutral: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
    negative: "bg-red-500/10 text-red-700 dark:text-red-400",
  };
  return bg[sentiment?.toLowerCase() || "neutral"];
};

export function NewsDisplay({ news, isLoading }: NewsDisplayProps): JSX.Element {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-card rounded-lg border border-border p-4 animate-pulse">
            <div className="h-5 bg-muted rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-muted rounded w-full mb-2"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!news || news.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No recent news available</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Latest News</h3>

      <div className="space-y-4">
        {news.slice(0, 10).map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-card rounded-lg border border-border p-4 hover:border-primary/50 hover:bg-card/80 transition-all group"
          >
            <div className="flex justify-between items-start gap-4 mb-3">
              <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                {item.title}
              </h4>
              <ExternalLink size={18} className="text-muted-foreground flex-shrink-0 mt-1" />
            </div>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {item.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Globe size={14} />
                {item.source}
              </span>

              <span className="flex items-center gap-1 text-muted-foreground">
                <Calendar size={14} />
                {formatDate(item.publishedAt)}
              </span>

              {item.sentiment && (
                <span
                  className={`px-2 py-1 rounded capitalize font-medium ${getSentimentBg(item.sentiment)}`}
                >
                  {item.sentiment}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
