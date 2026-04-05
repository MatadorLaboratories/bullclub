import { NextRequest, NextResponse } from "next/server";
import { fetchWalletBulls } from "@/lib/solana/das";

export const runtime = "nodejs";
export const maxDuration = 30; // Netlify functions can time out on free tier

export async function GET(request: NextRequest) {
  const wallet = request.nextUrl.searchParams.get("wallet");

  if (!wallet) {
    return NextResponse.json({ error: "Missing wallet parameter" }, { status: 400 });
  }

  // Basic base58 format check (26–44 alphanumeric chars)
  if (!/^[1-9A-HJ-NP-Za-km-z]{26,44}$/.test(wallet)) {
    return NextResponse.json({ error: "Invalid wallet address" }, { status: 400 });
  }

  // Surface key config errors clearly
  const heliusKey = process.env.HELIUS_API_KEY;
  if (!heliusKey || heliusKey === "your_helius_api_key" || heliusKey.length < 10) {
    return NextResponse.json(
      { error: "HELIUS_API_KEY is not configured on this server" },
      { status: 503 }
    );
  }

  const debug = request.nextUrl.searchParams.get("debug") === "1";

  try {
    const nfts = await fetchWalletBulls(wallet, debug);
    return NextResponse.json({ nfts, count: nfts.length }, { status: 200 });
  } catch (err: any) {
    console.error("[/api/nfts]", err?.message);
    return NextResponse.json(
      { error: err?.message ?? "Failed to fetch NFTs" },
      { status: 502 }
    );
  }
}
