import { NextRequest, NextResponse } from "next/server";
import { fetchWalletBulls } from "@/lib/solana/das";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const wallet = request.nextUrl.searchParams.get("wallet");

  if (!wallet) {
    return NextResponse.json({ error: "Missing wallet parameter" }, { status: 400 });
  }

  // Basic base58 format check (26–44 alphanumeric chars)
  if (!/^[1-9A-HJ-NP-Za-km-z]{26,44}$/.test(wallet)) {
    return NextResponse.json({ error: "Invalid wallet address" }, { status: 400 });
  }

  try {
    const nfts = await fetchWalletBulls(wallet);
    return NextResponse.json({ nfts }, { status: 200 });
  } catch (err: any) {
    console.error("[/api/nfts]", err?.message);
    return NextResponse.json(
      { error: err?.message ?? "Failed to fetch NFTs" },
      { status: 502 }
    );
  }
}
