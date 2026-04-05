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
      <div className="p-5 flex flex-col gap-5 animate-fade-in">
        {/* Banner carousel */}
        <DashboardBanner />

        {/* Your Collection */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs tracking-widest uppercase text-white font-unison-light-round">
              Your Collection
            </span>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-bc-gray3 tracking-wider uppercase font-unison-light-round">
                {isLoading ? "..." : `${bulls.length} Bulls`}
              </span>
              <Link
                href="/collection"
                className="text-[10px] border border-bc-border2 text-white px-3 py-1 tracking-widest uppercase hover:border-bc-pink hover:text-bc-pink transition-all font-unison-bold"
              >
                See All
              </Link>
            </div>
          </div>

          {/* Loading skeleton */}
          {connected && isLoading && (
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-sm border border-bc-border bg-bc-card animate-pulse" />
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
                <div className="aspect-square rounded-sm border border-bc-border2 border-dashed flex items-center justify-center">
                  <span className="text-[8px] text-bc-gray3 uppercase tracking-wider text-center leading-tight px-1">Connect wallet</span>
                </div>
              )}
            </div>
          )}

          {bulls.length > 5 && (
            <Link
              href="/collection"
              className="block text-center text-[10px] text-bc-gray3 tracking-widest uppercase mt-2 hover:text-bc-pink transition-colors"
            >
              + {bulls.length - 5} More
            </Link>
          )}
        </section>

        {/* Raffles & Airdrops row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Raffles */}
          <div className="border border-bc-border rounded-sm p-3 bg-bc-panel2">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <RaffleIcon />
                <span className="text-xs tracking-widest uppercase text-white font-unison-light-round">Raffles</span>
                <span className="text-[9px] bg-bc-pink/20 text-bc-pink px-1.5 py-0.5 rounded-sm tracking-wider font-unison-light-round">
                  {activeRaffles.length} Active
                </span>
              </div>
              <Link
                href="/raffles"
                className="text-[10px] border border-bc-border2 text-white px-3 py-1 tracking-widest uppercase hover:border-bc-pink hover:text-bc-pink transition-all font-unison-bold"
              >
                See All
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {activeRaffles.slice(0, 2).map((raffle) => (
                <RafflePreviewCard key={raffle.id} raffle={raffle} />
              ))}
            </div>
          </div>

          {/* Airdrops */}
          <div className="border border-bc-border rounded-sm p-3 bg-bc-panel2">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AirdropIcon />
                <span className="text-xs tracking-widest uppercase text-white font-unison-light-round">Airdrops</span>
              </div>
              <Link
                href="/airdrops"
                className="text-[10px] border border-bc-border2 text-white px-3 py-1 tracking-widest uppercase hover:border-bc-pink hover:text-bc-pink transition-all font-unison-bold"
              >
                See All
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
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
      style={{ height: 80 }}
    >
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(145deg, ${palette.from}, ${palette.to})` }}
      />
      <div className="absolute inset-0 flex flex-col justify-between p-1.5">
        <span className="text-[8px] text-white/70 uppercase tracking-wide">
          {raffle.title}
        </span>
        <span className="text-[8px] text-white bg-bc-pink px-1 py-0.5 rounded-sm self-start tracking-wider uppercase group-hover:bg-white group-hover:text-bc-panel transition-colors font-unison-bold">
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
      style={{ height: 80 }}
    >
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(145deg, ${palette.from}, ${palette.to})` }}
      />
      <div className="absolute inset-0 flex flex-col justify-between p-1.5">
        <span className={`text-[7px] uppercase tracking-wide font-bold ${eligColor}`}>
          {airdrop.eligibility}
        </span>
        <span className="text-[8px] text-white/70 uppercase tracking-wide leading-tight">
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
