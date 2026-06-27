"use client";

import React from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem enableColorScheme>
      {children}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1f2937",
            color: "#f3f4f6",
          },
        }}
      />
    </ThemeProvider>
  );
}
