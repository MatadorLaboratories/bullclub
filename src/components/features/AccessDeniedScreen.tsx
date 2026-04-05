"use client";

import Link from "next/link";
import { BullClubLogo } from "@/components/ui/BullClubLogo";
import { NFT_PALETTES } from "@/lib/constants";
import { SiteFooter } from "@/components/layout/SiteFooter";

const BG_CARDS = [0, 4, 8, 2, 6, 1, 5, 9, 3, 7, 11, 12];

export function AccessDeniedScreen() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 scanlines z-10 pointer-events-none opacity-60" />

      {/* Blurred bg */}
      <div className="absolute inset-0 grid grid-cols-6 gap-0.5 p-0.5 opacity-25">
        {BG_CARDS.map((paletteIdx, i) => {
          const palette = NFT_PALETTES[paletteIdx % NFT_PALETTES.length]!;
          return (
            <div
              key={i}
              className="blur-sm"
              style={{ background: `linear-gradient(145deg, ${palette.from}, ${palette.to})` }}
            />
          );
        })}
      </div>
      <div className="absolute inset-0 z-20 bg-black/75" />

      {/* Panel */}
      <div className="absolute inset-0 z-30 flex items-center justify-center">
        <div className="w-[480px] bg-bc-panel/95 border border-bc-border2 rounded-sm flex flex-col items-center gap-8 py-16 px-12 animate-fade-in">
          <BullClubLogo className="w-40" />

          <div className="flex flex-col items-center gap-3 w-full">
            <p className="text-sm tracking-[0.2em] uppercase text-white border border-white/30 w-full text-center py-3">
              Access Denied
            </p>
            <p className="text-[10px] text-bc-gray3 tracking-widest uppercase text-center">
              You don&apos;t own a bull – purchase one to enter
            </p>

            {/* Marketplace links */}
            <div className="flex gap-3 mt-4">
              <a
                href="https://magiceden.io"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-bc-pink border border-bc-pink text-white text-xs tracking-widest uppercase hover:bg-bc-pink/80 transition-all flex items-center gap-2 font-unison-bold"
              >
                <MEIcon /> ME
              </a>
              <a
                href="https://tensor.trade"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-bc-card border border-bc-border2 text-white text-xs tracking-widest uppercase hover:border-white/40 transition-all flex items-center gap-2 font-unison-bold"
              >
                <TensorIcon /> Tensor
              </a>
            </div>
          </div>

          <Link
            href="/"
            className="text-[10px] text-bc-gray2 hover:text-white tracking-widest uppercase transition-colors"
          >
            ← Back
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

function MEIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
      <text x="0" y="17" fontSize="13" fontWeight="bold" fontFamily="monospace">M</text>
    </svg>
  );
}

function TensorIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
      <polyline points="12 4 20 12 12 20" />
      <polyline points="4 4 12 12 4 20" />
    </svg>
  );
}
