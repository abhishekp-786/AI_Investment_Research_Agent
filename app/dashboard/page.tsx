"use client";

import React, { Suspense } from "react";
import { DashboardContent } from "@/components/research/DashboardContent";

export default function Dashboard(): JSX.Element {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <DashboardContent />
    </Suspense>
  );
}
