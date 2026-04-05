"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_AIRDROPS, NFT_PALETTES } from "@/lib/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function AirdropDetailPage({ airdropId }: { airdropId: string }) {
  const airdrop = MOCK_AIRDROPS.find((a) => a.id === airdropId) ?? MOCK_AIRDROPS[0]!;
  const palette = NFT_PALETTES[airdrop.paletteIdx % NFT_PALETTES.length]!;
  const [claimed, setClaimed] = useState(airdrop.eligibility === "claimed");

  const isEligible = airdrop.eligibility === "eligible";

  const handleClaim = () => {
    if (!isEligible) return;
    toast.success("Airdrop claimed!");
    setClaimed(true);
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-5 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-base tracking-widest uppercase">Airdrops</h1>
          <Link
            href="/airdrops"
            className="text-[10px] border border-bc-border2 text-white px-3 py-1.5 tracking-widest uppercase hover:border-bc-pink hover:text-bc-pink transition-all"
          >
            Back
          </Link>
        </div>

        <div className="flex gap-4">
          {/* Left – Airdrop image */}
          <div className="flex-shrink-0 flex flex-col gap-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-white uppercase tracking-widest font-bold">
                {airdrop.title}
              </span>
              <span className="text-[9px] text-bc-gray3 uppercase tracking-wider ml-3">
                Tier {airdrop.tier}
              </span>
            </div>
            <div
              className="w-[260px] h-[280px] rounded-sm border border-bc-border overflow-hidden relative"
              style={{
                background: `linear-gradient(145deg, ${palette.from}, ${palette.to})`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <TesseractSvg />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-white/8 via-transparent to-black/20 pointer-events-none" />
            </div>
          </div>

          {/* Right – Claim panel */}
          <div className="flex-1 flex flex-col gap-3">
            <div className="border border-bc-border2 bg-bc-panel2 rounded-sm p-3">
              <div className="flex items-center gap-2 mb-3">
                <CheckIcon />
                <span className="text-xs font-bold text-white uppercase tracking-widest">
                  Claim Airdrop
                </span>
              </div>
              <div className="border border-bc-border rounded-sm p-2 mb-3">
                <p className="text-[8px] text-bc-pink uppercase tracking-widest mb-1">
                  Airdrop Contents
                </p>
                <p className="text-[11px] text-white uppercase tracking-wide font-bold">
                  1x {airdrop.title}
                </p>
              </div>
            </div>

            {/* Chain + eligibility */}
            <div className="grid grid-cols-2 gap-2">
              <div className="border border-bc-border bg-bc-panel2 rounded-sm p-3 flex flex-col items-center gap-1.5">
                <p className="text-[8px] text-bc-gray3 uppercase tracking-widest">Airdrop Chain</p>
                <SolanaIcon />
                <p className="text-[10px] text-white uppercase tracking-wider font-bold">
                  {airdrop.chain.toUpperCase()}
                </p>
              </div>
              <div className="border border-bc-border bg-bc-panel2 rounded-sm p-3 flex flex-col items-center gap-1.5">
                <p className="text-[8px] text-bc-gray3 uppercase tracking-widest">Eligibility</p>
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center",
                    isEligible ? "bg-bc-green/20" : "bg-orange-500/20"
                  )}
                >
                  {isEligible ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff9800" strokeWidth="2.5">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  )}
                </div>
                <p
                  className={cn(
                    "text-[10px] uppercase tracking-wider font-bold",
                    isEligible ? "text-bc-green" : "text-orange-400"
                  )}
                >
                  {claimed ? "Claimed" : isEligible ? "Eligible" : "Ineligible"}
                </p>
              </div>
            </div>

            {/* Claim button */}
            <button
              onClick={handleClaim}
              disabled={!isEligible || claimed}
              className={cn(
                "w-full py-2.5 text-[10px] tracking-widest uppercase border transition-all",
                isEligible && !claimed
                  ? "border-bc-pink text-bc-pink hover:bg-bc-pink hover:text-white"
                  : "border-bc-border2 text-bc-gray2 cursor-not-allowed"
              )}
            >
              {claimed ? "Claimed ✓" : isEligible ? "Claim" : "Ineligible"}
            </button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

function TesseractSvg() {
  return (
    <svg width="55%" height="55%" viewBox="0 0 60 60" fill="none">
      <polygon points="30,4 54,18 54,42 30,56 6,42 6,18" stroke="rgba(100,180,255,0.8)" strokeWidth="1.5" fill="rgba(41,121,255,0.1)" />
      <polygon points="30,16 44,24 44,36 30,44 16,36 16,24" stroke="rgba(100,180,255,0.6)" strokeWidth="1" fill="rgba(41,121,255,0.15)" />
      <line x1="30" y1="4" x2="30" y2="16" stroke="rgba(100,180,255,0.5)" strokeWidth="1" />
      <line x1="54" y1="18" x2="44" y2="24" stroke="rgba(100,180,255,0.5)" strokeWidth="1" />
      <line x1="54" y1="42" x2="44" y2="36" stroke="rgba(100,180,255,0.5)" strokeWidth="1" />
      <line x1="30" y1="56" x2="30" y2="44" stroke="rgba(100,180,255,0.5)" strokeWidth="1" />
      <line x1="6" y1="42" x2="16" y2="36" stroke="rgba(100,180,255,0.5)" strokeWidth="1" />
      <line x1="6" y1="18" x2="16" y2="24" stroke="rgba(100,180,255,0.5)" strokeWidth="1" />
      <circle cx="30" cy="30" r="5" fill="rgba(100,180,255,0.9)" />
      <circle cx="30" cy="30" r="10" fill="rgba(100,180,255,0.15)" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <div className="w-5 h-5 rounded-full bg-bc-green/20 border border-bc-green/40 flex items-center justify-center">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="3">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
}

function SolanaIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#9945ff" opacity="0.3" />
      <path d="M6 15h12M6 12h12M6 9h12" stroke="#9945ff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
