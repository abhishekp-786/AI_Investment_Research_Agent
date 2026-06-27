/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["langchain", "@langchain/core", "@langchain/community"],
  },
  headers: async () => {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=60, stale-while-revalidate=120",
          },
        ],
      },
    ];
  },
  rewrites: async () => {
    return [];
  },
  env: {
    NEXT_PUBLIC_APP_NAME: "Investment Research Agent",
    NEXT_PUBLIC_APP_VERSION: "1.0.0",
  },
};

module.exports = nextConfig;
