"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_COLLECTION, NFT_PALETTES } from "@/lib/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { BullIcon } from "@/components/ui/BullIcon";

const POOL_BULLS = [
  { tokenId: "9202", paletteIdx: 2 },
  { tokenId: "3450", paletteIdx: 5 },
  { tokenId: "7819", paletteIdx: 7 },
];

export function SwapPage() {
  const [myIdx, setMyIdx] = useState(0);
  const [poolIdx, setPoolIdx] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  const myBull = MOCK_COLLECTION[myIdx % MOCK_COLLECTION.length]!;
  const poolBull = POOL_BULLS[poolIdx % POOL_BULLS.length]!;
  const myPalette = NFT_PALETTES[myBull.paletteIdx % NFT_PALETTES.length]!;
  const poolPalette = NFT_PALETTES[poolBull.paletteIdx % NFT_PALETTES.length]!;
  const SWAP_PRICE = 2500;
  const currentPoints = 29750;

  const handleSwap = () => {
    if (currentPoints < SWAP_PRICE) {
      toast.error("Not enough Bull Points");
      return;
    }
    toast.success(`Swapped Bull Club #${myBull.tokenId} for #${poolBull.tokenId}!`);
    setConfirmed(true);
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-5 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-base tracking-widest uppercase">Swap A Bull</h1>
          <Link
            href="/collection"
            className="text-[10px] border border-bc-border2 text-white px-3 py-1.5 tracking-widest uppercase hover:border-bc-pink hover:text-bc-pink transition-all"
          >
            Back
          </Link>
        </div>

        <p className="text-[10px] text-bc-gray3 uppercase tracking-wider leading-relaxed mb-4 max-w-lg">
          Want to swap your bull for a better looking or rarer bull? Swap your bull from the pool
          of bulls. This pool will be added to frequently.
        </p>

        {/* Stats bar */}
        <div className="flex gap-4 mb-5">
          <div className="border border-bc-border2 bg-bc-panel2 rounded-sm px-4 py-2 flex items-center gap-2">
            <span className="text-[9px] text-bc-gray3 uppercase tracking-wider">Pool Size</span>
            <span className="text-sm font-bold text-bc-pink">{POOL_BULLS.length + 53}</span>
          </div>
          <div className="border border-bc-border2 bg-bc-panel2 rounded-sm px-4 py-2 flex items-center gap-2">
            <span className="text-[9px] text-bc-gray3 uppercase tracking-wider">Swap Price</span>
            <BullIcon />
            <span className="text-sm font-bold text-white">{SWAP_PRICE.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Your bull */}
          <BullSwapCard
            tokenId={myBull.tokenId}
            palette={myPalette}
            label="BULL CLUB"
            subtitle="Your Bull"
            onPrev={() => setMyIdx(Math.max(0, myIdx - 1))}
            onNext={() => setMyIdx(myIdx + 1)}
          />

          {/* Swap arrow + button */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-14 h-14 rounded-full border-2 border-bc-pink/40 bg-bc-pink/10 flex items-center justify-center"
              style={{ boxShadow: "0 0 15px rgba(232,24,90,0.2)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e8185a" strokeWidth="2">
                <path d="M7 16V4m0 0L3 8m4-4l4 4" />
                <path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </div>
            <button
              onClick={handleSwap}
              disabled={confirmed}
              className="px-5 py-2 text-[10px] tracking-widest uppercase border border-bc-pink text-bc-pink hover:bg-bc-pink hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {confirmed ? "Swapped ✓" : "Swap"}
            </button>
          </div>

          {/* Pool bull */}
          <BullSwapCard
            tokenId={poolBull.tokenId}
            palette={poolPalette}
            label="BULL CLUB"
            subtitle="Pool Bull"
            onPrev={() => setPoolIdx(Math.max(0, poolIdx - 1))}
            onNext={() => setPoolIdx(poolIdx + 1)}
          />
        </div>

        {/* View pool */}
        <div className="flex justify-center mt-5">
          <Link
            href="/swap/pool"
            className="px-6 py-2 text-[10px] tracking-widest uppercase border border-bc-border2 text-white hover:border-bc-pink hover:text-bc-pink transition-all"
          >
            View Bull Swap Pool
          </Link>
        </div>
      </div>
    </ScrollArea>
  );
}

function BullSwapCard({
  tokenId,
  palette,
  label,
  subtitle,
  onPrev,
  onNext,
}: {
  tokenId: string;
  palette: { from: string; to: string; label: string };
  label: string;
  subtitle: string;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col gap-2 flex-1 max-w-[200px]">
      <div className="flex items-center justify-between">
        <span className="text-[8px] text-bc-gray3 uppercase tracking-wider">{label}</span>
        <span className="text-[9px] text-white tracking-wide">#{tokenId}</span>
      </div>
      <div
        className="w-full rounded-sm border border-bc-border overflow-hidden relative"
        style={{
          height: 200,
          background: `linear-gradient(145deg, ${palette.from}, ${palette.to})`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <BullSvg />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/8 via-transparent to-black/25 pointer-events-none" />
        <div className="absolute top-2 left-2">
          <span className="text-[7px] text-white/60 bg-black/50 px-1 py-0.5 rounded-sm uppercase">{subtitle}</span>
        </div>
      </div>
      <div className="flex gap-1.5">
        <button
          onClick={onPrev}
          className="flex-1 py-1 text-[9px] tracking-widest uppercase border border-bc-border2 text-bc-gray4 hover:border-bc-pink hover:text-bc-pink transition-all"
        >
          Prev
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-1 text-[9px] tracking-widest uppercase border border-bc-border2 text-bc-gray4 hover:border-bc-pink hover:text-bc-pink transition-all"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function BullSvg() {
  return (
    <svg width="55%" height="55%" viewBox="0 0 60 55" fill="rgba(255,255,255,0.22)">
      <path d="M8 18 C2 12, 2 4, 8 6 L12 14 C14 8, 18 4, 22 6 L20 16 C24 12, 36 12, 40 16 L38 6 C42 4, 46 8, 48 14 L52 6 C58 4, 58 12, 52 18 L50 22 C54 26, 54 32, 50 36 L48 44 C44 50, 16 50, 12 44 L10 36 C6 32, 6 26, 10 22 Z" />
      <ellipse cx="20" cy="8" rx="4" ry="8" transform="rotate(-15 20 8)" />
      <ellipse cx="40" cy="8" rx="4" ry="8" transform="rotate(15 40 8)" />
    </svg>
  );
}

