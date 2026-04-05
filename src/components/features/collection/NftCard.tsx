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

  // Use provided image URL, fallback to local copy
  const imgSrc = imageUrl || (!isTesseract ? `/images/bulls/${tokenId}.jpg` : null);

  const card = (
    <div
      className={cn(
        // Portrait ratio matching Figma (144×167px)
        "relative rounded-[3px] border border-bc-border2 overflow-hidden nft-card-hover cursor-pointer group bg-bc-card",
        // aspect-[144/167] = portrait
        "w-full",
        className
      )}
      style={{ aspectRatio: "144 / 167" }}
      onClick={onClick}
    >
      {/* ── Top label zone ── */}
      <div className="absolute top-0 left-0 right-0 z-30 px-1.5 pt-1.5 flex items-start justify-between"
        style={{ height: "30px" }}>
        {/* Left: collection prefix + token ID */}
        <div className="flex flex-col leading-none">
          <span className="font-unison-light-round text-bc-gray3 uppercase"
            style={{ fontSize: "6px", lineHeight: "1.2" }}>
            {isTesseract ? "TESSERACT" : "BULL CLUB"}
          </span>
          <span className="font-unison-light-round text-white"
            style={{ fontSize: "10px", lineHeight: "1.2", marginTop: "1px" }}>
            #{tokenId}
          </span>
        </div>

        {/* Right: badges */}
        <div className="flex gap-0.5">
          {tesseractBonded && (
            <div className="w-[18px] h-[18px] bg-bc-card border border-bc-border2 rounded-sm flex items-center justify-center overflow-hidden">
              <TesseractBadge />
            </div>
          )}
          {quantity !== undefined && (
            <div className="h-[18px] bg-bc-pink/90 text-white rounded-sm px-1 flex items-center">
              <span className="font-unison-bold text-white" style={{ fontSize: "7px" }}>{quantity}</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Image area ── */}
      <div className="absolute left-1 right-1 bottom-1 rounded-sm overflow-hidden" style={{ top: "28px" }}>
        {/* Gradient background fallback */}
        <div
          className="absolute inset-0"
          style={{
            background: isTesseract
              ? "linear-gradient(145deg, #0d1b4b, #1a237e, #0d47a1)"
              : `linear-gradient(145deg, ${palette.from}, ${palette.to})`,
          }}
        />

        {/* NFT image */}
        {imgSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imgSrc}
            alt={`${isTesseract ? "Tesseract" : "Bull"} #${tokenId}`}
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

        {/* Subtle shine */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/30 pointer-events-none z-20" />
      </div>

      {/* ── Hover overlay ── */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity z-40 flex items-center justify-center"
        style={{ backdropFilter: "blur(5px)", background: "rgba(0,0,0,0.5)" }}
      >
        <span className="font-unison-light-round text-white text-[15px]">View</span>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{card}</Link>;
  }

  return card;
}

function TesseractBadge() {
  return (
    <svg width="10" height="10" viewBox="0 0 60 60" fill="none">
      <polygon points="30,4 54,18 54,42 30,56 6,42 6,18" stroke="rgba(100,180,255,0.8)" strokeWidth="3" fill="rgba(41,121,255,0.2)" />
      <circle cx="30" cy="30" r="5" fill="rgba(100,180,255,0.9)" />
    </svg>
  );
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
