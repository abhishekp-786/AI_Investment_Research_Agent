/**
 * Hero Section Component
 */

"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection(): JSX.Element {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-primary/10 to-background">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6 animate-slide-in">
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-medium">AI-Powered Investment Analysis</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-slide-in">
            Investment Intelligence{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Powered by AI
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed animate-slide-in">
            Get intelligent investment recommendations in seconds. Our AI analyzes company data,
            market trends, and financial metrics to help you make informed decisions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all inline-flex items-center gap-2 justify-center group"
            >
              Start Research
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#features"
              className="px-8 py-4 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all"
            >
              Learn More
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 pt-16 border-t border-border">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1000+</div>
              <p className="text-muted-foreground">Companies Analyzed</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <p className="text-muted-foreground">Accuracy Rate</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">&lt;30s</div>
              <p className="text-muted-foreground">Analysis Time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
