import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "arweave.net",
      },
      {
        protocol: "https",
        hostname: "**.arweave.net",
      },
      {
        protocol: "https",
        hostname: "nftstorage.link",
      },
      // Helius CDN — NFT images served via DAS API
      {
        protocol: "https",
        hostname: "cdn.helius-rpc.com",
      },
      {
        protocol: "https",
        hostname: "**.helius-rpc.com",
      },
      // IPFS gateways commonly used by Solana NFTs
      {
        protocol: "https",
        hostname: "ipfs.io",
      },
      {
        protocol: "https",
        hostname: "**.ipfs.dweb.link",
      },
      {
        protocol: "https",
        hostname: "cloudflare-ipfs.com",
      },
    ],
  },
  // Silence Turbopack warning — webpack config not needed for Solana adapters in Next 16
  turbopack: {},
};

export default nextConfig;
