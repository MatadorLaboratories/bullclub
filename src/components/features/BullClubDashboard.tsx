"use client";

import Link from "next/link";
import { NftCard } from "@/components/features/collection/NftCard";
import { DashboardBanner } from "@/components/features/dashboard/DashboardBanner";
import { useWalletNfts } from "@/hooks/useWalletNfts";
import { useWallet } from "@solana/wallet-adapter-react";
import { MOCK_RAFFLES, MOCK_AIRDROPS, NFT_PALETTES } from "@/lib/constants";
import { ScrollArea } from "@/components/ui/scroll-area";

export function BullClubDashboard() {
  const { connected } = useWallet();
  const { data: nfts, isLoading } = useWalletNfts();

  const activeRaffles = MOCK_RAFFLES.filter((r) => r.status === "active");
  const bulls = nfts?.filter((n) => !n.isTesseract) ?? [];
  const previewCollection = bulls.slice(0, 5);

  return (
    <ScrollArea className="h-full">
      <div className="p-4 flex flex-col gap-3 animate-fade-in">

        {/* Banner carousel */}
        <DashboardBanner />

        {/* ── YOUR COLLECTION ── */}
        <section>
          {/* Section header bar */}
          <div className="flex items-center justify-between px-3 mb-2 rounded-sm"
            style={{ background: "#1b1b1b", height: "40px" }}>
            <span className="font-unison-light-round text-white uppercase tracking-widest" style={{ fontSize: "12px" }}>
              Your Collection
            </span>
            <div className="flex items-center gap-2.5">
              <span className="font-unison-light-round text-bc-gray3 uppercase tracking-wider" style={{ fontSize: "12px" }}>
                {isLoading ? "..." : `${bulls.length} Bulls`}
              </span>
              <Link
                href="/collection"
                className="border border-bc-pink text-white px-3 py-1 tracking-widest uppercase hover:bg-bc-pink transition-all font-unison-bold"
                style={{ fontSize: "7px" }}
              >
                See All
              </Link>
            </div>
          </div>

          {/* Loading skeleton */}
          {connected && isLoading && (
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="rounded-sm border border-bc-border bg-bc-card animate-pulse" style={{ aspectRatio: "144/167" }} />
              ))}
            </div>
          )}

          {/* Real NFTs */}
          {(!connected || (!isLoading && bulls.length > 0)) && (
            <div className="grid grid-cols-5 gap-2">
              {previewCollection.map((nft) => (
                <NftCard
                  key={nft.mint}
                  tokenId={nft.tokenId}
                  paletteIdx={nft.paletteIdx}
                  tesseractBonded={nft.tesseractBonded}
                  imageUrl={nft.imageUrl}
                  href={`/collection/${nft.tokenId}`}
                />
              ))}
              {!connected && (
                <div className="rounded-sm border border-bc-border2 border-dashed flex items-center justify-center" style={{ aspectRatio: "144/167" }}>
                  <span className="text-bc-gray3 uppercase tracking-wider text-center leading-tight px-1 font-unison-light-round" style={{ fontSize: "8px" }}>Connect wallet</span>
                </div>
              )}
            </div>
          )}

          {bulls.length > 5 && (
            <Link
              href="/collection"
              className="block text-center text-bc-gray3 tracking-widest uppercase mt-2 hover:text-bc-pink transition-colors font-unison-light-round"
              style={{ fontSize: "10px" }}
            >
              + {bulls.length - 5} More
            </Link>
          )}
        </section>

        {/* ── RAFFLES & AIRDROPS ── */}
        <div className="grid grid-cols-2 gap-3">

          {/* Raffles */}
          <div>
            {/* Section header bar */}
            <div className="flex items-center justify-between px-3 mb-2 rounded-sm"
              style={{ background: "#1b1b1b", height: "40px" }}>
              <div className="flex items-center gap-2">
                <RaffleIcon />
                <span className="font-unison-light-round text-white uppercase tracking-widest" style={{ fontSize: "12px" }}>
                  Raffles
                </span>
                <span className="font-unison-light-round text-bc-gray3 uppercase tracking-wider" style={{ fontSize: "12px" }}>
                  {activeRaffles.length} Active
                </span>
              </div>
              <Link
                href="/raffles"
                className="border border-bc-pink text-white px-3 py-1 tracking-widest uppercase hover:bg-bc-pink transition-all font-unison-bold"
                style={{ fontSize: "7px" }}
              >
                See All
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {activeRaffles.slice(0, 2).map((raffle) => (
                <RafflePreviewCard key={raffle.id} raffle={raffle} />
              ))}
            </div>
          </div>

          {/* Airdrops */}
          <div>
            {/* Section header bar */}
            <div className="flex items-center justify-between px-3 mb-2 rounded-sm"
              style={{ background: "#1b1b1b", height: "40px" }}>
              <div className="flex items-center gap-2">
                <AirdropIcon />
                <span className="font-unison-light-round text-white uppercase tracking-widest" style={{ fontSize: "12px" }}>
                  Airdrops
                </span>
              </div>
              <Link
                href="/airdrops"
                className="border border-bc-pink text-white px-3 py-1 tracking-widest uppercase hover:bg-bc-pink transition-all font-unison-bold"
                style={{ fontSize: "7px" }}
              >
                See All
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {MOCK_AIRDROPS.slice(0, 3).map((airdrop) => (
                <AirdropPreviewCard key={airdrop.id} airdrop={airdrop} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </ScrollArea>
  );
}

function RafflePreviewCard({ raffle }: { raffle: (typeof MOCK_RAFFLES)[0] }) {
  const palette = NFT_PALETTES[raffle.paletteIdx % NFT_PALETTES.length]!;
  return (
    <Link
      href={`/raffles/${raffle.id}`}
      className="relative rounded-sm overflow-hidden border border-bc-border hover:border-bc-pink transition-all group"
      style={{ aspectRatio: "1 / 1" }}
    >
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(145deg, ${palette.from}, ${palette.to})` }}
      />
      <div className="absolute inset-0 flex flex-col justify-between p-1.5">
        <span className="text-white/70 uppercase tracking-wide font-unison-bold" style={{ fontSize: "8px" }}>
          {raffle.title}
        </span>
        <span className="text-white bg-bc-pink px-1 py-0.5 rounded-sm self-start tracking-wider uppercase group-hover:bg-white group-hover:text-bc-panel transition-colors font-unison-bold" style={{ fontSize: "8px" }}>
          View
        </span>
      </div>
    </Link>
  );
}

function AirdropPreviewCard({ airdrop }: { airdrop: (typeof MOCK_AIRDROPS)[0] }) {
  const palette = NFT_PALETTES[airdrop.paletteIdx % NFT_PALETTES.length]!;
  const eligColor =
    airdrop.eligibility === "eligible"
      ? "text-bc-green"
      : airdrop.eligibility === "claimed"
      ? "text-bc-gray3"
      : "text-bc-orange";

  return (
    <Link
      href={`/airdrops/${airdrop.id}`}
      className="relative rounded-sm overflow-hidden border border-bc-border hover:border-bc-pink transition-all"
      style={{ aspectRatio: "1 / 1" }}
    >
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(145deg, ${palette.from}, ${palette.to})` }}
      />
      <div className="absolute inset-0 flex flex-col justify-between p-1.5">
        <span className={`uppercase tracking-wide font-unison-bold ${eligColor}`} style={{ fontSize: "7px" }}>
          {airdrop.eligibility}
        </span>
        <span className="text-white/70 uppercase tracking-wide leading-tight font-unison-bold" style={{ fontSize: "8px" }}>
          {airdrop.title}
        </span>
      </div>
    </Link>
  );
}

function RaffleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#e8185a">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="5" fill="rgba(0,0,0,0.4)" />
    </svg>
  );
}

function AirdropIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#e8185a" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}
