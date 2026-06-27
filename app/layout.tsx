import type { Metadata } from "next";
import { Providers } from "./providers";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Investment Research Agent",
  description:
    "AI-powered investment research and analysis platform. Get intelligent investment recommendations powered by LangChain and Google Gemini.",
  keywords: ["investment", "research", "AI", "analysis", "recommendation"],
  authors: [{ name: "Investment Research Team" }],
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
