"use client";

import Link from "next/link";
import { NFT_PALETTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface NftCardProps {
  tokenId: string;
  paletteIdx: number;
  tesseractBonded?: boolean;
  isTesseract?: boolean;
  imageUrl?: string;
  quantity?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function NftCard({
  tokenId,
  paletteIdx,
  tesseractBonded = false,
  isTesseract = false,
  imageUrl,
  quantity,
  size = "md",
  className,
  onClick,
  href,
}: NftCardProps) {
  const palette = NFT_PALETTES[paletteIdx % NFT_PALETTES.length]!;

  const sizeClasses = {
    sm: "w-full aspect-square",
    md: "w-full aspect-square",
    lg: "w-full aspect-[3/4]",
  };

  // Use provided image URL, fallback to local copy
  const imgSrc = imageUrl || (!isTesseract ? `/images/bulls/${tokenId}.jpg` : null);

  const card = (
    <div
      className={cn(
        "relative rounded-sm border border-bc-border overflow-hidden nft-card-hover cursor-pointer group",
        sizeClasses[size],
        className
      )}
      onClick={onClick}
    >
      {/* Gradient background — always present as base */}
      <div
        className="absolute inset-0"
        style={{
          background: isTesseract
            ? "linear-gradient(145deg, #0d1b4b, #1a237e, #0d47a1)"
            : `linear-gradient(145deg, ${palette.from}, ${palette.to})`,
        }}
      />

      {/* NFT image — plain img tag to avoid next/image domain restrictions */}
      {imgSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imgSrc}
          alt={`Bull #${tokenId}`}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      )}

      {/* Tesseract art */}
      {isTesseract && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <TesseractArt />
        </div>
      )}

      {/* Shine layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/40 pointer-events-none z-20" />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-1.5 pt-1 z-30">
        <span className="text-[7px] text-white/80 uppercase tracking-wide bg-black/50 px-1 py-0.5 rounded-sm">
          {isTesseract ? "TESSERACT" : "BULL CLUB"}
        </span>
        <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-4 h-4 bg-black/50 rounded-sm flex items-center justify-center">
            <span className="text-[7px] text-white">↗</span>
          </div>
        </div>
      </div>

      {/* Bottom: token ID */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-1.5 pb-1 z-30">
        <span className="text-[9px] font-unison-bold-round text-white drop-shadow">
          #{tokenId}
        </span>
        {quantity !== undefined && (
          <span className="text-[9px] bg-bc-pink/90 text-white px-1 rounded-sm">
            {quantity}
          </span>
        )}
        {tesseractBonded && (
          <span className="text-[7px] bg-blue-600/80 text-white px-1 rounded-sm">
            BONDED
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{card}</Link>;
  }

  return card;
}

function TesseractArt() {
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
      <circle cx="30" cy="30" r="4" fill="rgba(100,180,255,0.9)" />
      <circle cx="30" cy="30" r="8" fill="rgba(100,180,255,0.2)" />
    </svg>
  );
}
