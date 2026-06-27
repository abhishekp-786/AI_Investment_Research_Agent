/**
 * Company Input Section
 */

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface CompanyInputProps {
  onSearch?: (company: string) => void;
}

export function CompanyInput({ onSearch }: CompanyInputProps): JSX.Element {
  const router = useRouter();
  const [company, setCompany] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!company.trim()) {
      toast.error("Please enter a company name");
      return;
    }

    setIsLoading(true);

    try {
      if (onSearch) {
        onSearch(company);
      } else {
        // Redirect to dashboard with company query
        router.push(`/dashboard?company=${encodeURIComponent(company)}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to search company");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-card/50 border-y border-border">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Research Any Company</h2>
            <p className="text-muted-foreground">
              Enter a company name to get instant investment analysis and recommendations
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative flex items-center">
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g., Apple, Tesla, Microsoft..."
                className="w-full px-6 py-4 pl-14 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isLoading}
              />

              <Search className="absolute left-4 w-5 h-5 text-muted-foreground pointer-events-none" />

              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-2 px-6 py-2 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span className="hidden sm:inline">Analyzing...</span>
                  </>
                ) : (
                  <span className="hidden sm:inline">Search</span>
                )}
              </button>
            </div>
          </form>

          {/* Example Companies */}
          <div className="mt-8">
            <p className="text-sm text-muted-foreground mb-4">Popular companies:</p>
            <div className="flex flex-wrap gap-3">
              {["Apple", "Tesla", "Microsoft", "Google", "Amazon"].map((comp) => (
                <button
                  key={comp}
                  onClick={() => setCompany(comp)}
                  className="px-4 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all text-sm font-medium"
                >
                  {comp}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
