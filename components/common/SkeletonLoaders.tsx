/**
 * Loading Skeleton Components
 */

"use client";

import React from "react";

export function SkeletonCard(): JSX.Element {
  return (
    <div className="bg-card rounded-lg border border-border p-4 animate-pulse">
      <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
      <div className="h-3 bg-muted rounded w-full mb-3"></div>
      <div className="h-3 bg-muted rounded w-5/6"></div>
    </div>
  );
}

export function SkeletonMetric(): JSX.Element {
  return (
    <div className="bg-card rounded-lg border border-border p-4 animate-pulse">
      <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
      <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-muted rounded w-2/3"></div>
    </div>
  );
}

export function SkeletonRecommendation(): JSX.Element {
  return (
    <div className="bg-card rounded-lg border border-border p-6 animate-pulse">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-muted rounded w-1/4"></div>
        </div>
        <div className="w-20 h-20 bg-muted rounded-full"></div>
      </div>

      <div className="space-y-4">
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
        <div className="h-4 bg-muted rounded w-4/5"></div>
      </div>
    </div>
  );
}

export function SkeletonGrid(): JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonMetric key={i} />
      ))}
    </div>
  );
}
