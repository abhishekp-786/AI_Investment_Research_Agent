/**
 * In-memory cache implementation for research data
 */

import { CacheEntry } from "@/types";

class Cache {
  private store: Map<string, CacheEntry<unknown>> = new Map();
  private defaultTTL: number = 30 * 60 * 1000; // 30 minutes default

  /**
   * Set a value in the cache
   */
  set<T>(key: string, data: T, ttl?: number): void {
    const expiresAt = Date.now() + (ttl || this.defaultTTL);
    this.store.set(key, {
      data,
      timestamp: Date.now(),
      expiresAt,
    });
  }

  /**
   * Get a value from the cache
   */
  get<T>(key: string): T | null {
    const entry = this.store.get(key);

    if (!entry) {
      return null;
    }

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Check if a key exists and is not expired
   */
  has(key: string): boolean {
    const entry = this.store.get(key);
    if (!entry) {
      return false;
    }

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Delete a key from the cache
   */
  delete(key: string): boolean {
    return this.store.delete(key);
  }

  /**
   * Clear all entries from the cache
   */
  clear(): void {
    this.store.clear();
  }

  /**
   * Get all keys in the cache
   */
  keys(): string[] {
    const validKeys: string[] = [];

    this.store.forEach((entry, key) => {
      if (Date.now() <= entry.expiresAt) {
        validKeys.push(key);
      } else {
        this.store.delete(key);
      }
    });

    return validKeys;
  }

  /**
   * Get cache size
   */
  size(): number {
    return this.store.size;
  }

  /**
   * Get cache stats
   */
  getStats(): { size: number; keys: number; oldestEntry?: number } {
    let oldestEntry: number | undefined;

    this.store.forEach((entry) => {
      if (!oldestEntry || entry.timestamp < oldestEntry) {
        oldestEntry = entry.timestamp;
      }
    });

    return {
      size: this.store.size,
      keys: this.keys().length,
      oldestEntry,
    };
  }
}

// Export singleton instance
export const cache = new Cache();

/**
 * Cache key generators
 */
export const cacheKeys = {
  research: (company: string) => `research:${company.toLowerCase()}`,
  recommendation: (company: string) => `recommendation:${company.toLowerCase()}`,
  news: (company: string) => `news:${company.toLowerCase()}`,
  financials: (company: string) => `financials:${company.toLowerCase()}`,
};
