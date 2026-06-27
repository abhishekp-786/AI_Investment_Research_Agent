/**
 * Custom hook for URL search params
 */

"use client";

import { useSearchParams } from "next/navigation";

export function useQueryParams(): Record<string, string> {
  const searchParams = useSearchParams();
  const params: Record<string, string> = {};

  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
}

export function getQueryParam(key: string): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(key);
}
