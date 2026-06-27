import React from "react";
import { Navigation } from "@/components/common/Navigation";
import { Footer } from "@/components/common/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { CompanyInput } from "@/components/home/CompanyInput";
import { FeaturesSection } from "@/components/home/FeaturesSection";

export default function Home(): JSX.Element {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <HeroSection />
        <CompanyInput />
        <FeaturesSection />
      </main>
      <Footer />
    </>
  );
}
