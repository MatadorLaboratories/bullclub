"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_COLLECTION, NFT_PALETTES } from "@/lib/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Tab = "bond" | "interchange";

export function BondPage() {
  const [tab, setTab] = useState<Tab>("bond");
  const [bullIdx, setBullIdx] = useState(0);
  const tesseracts = 5;

  const bull = MOCK_COLLECTION[bullIdx % MOCK_COLLECTION.length]!;
  const palette3D = NFT_PALETTES[0]!; // 3D version uses different palette (darker/cooler)

  const handleBond = () => {
    toast.success(`Bull Club #${bull.tokenId} bonded with Tesseract!`);
  };

  const handleInterchange = () => {
    toast.success(`Switching Bull Club #${bull.tokenId} to ${bull.activeDimension === "2D" ? "3D" : "2D"} dimension!`);
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-5 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-base tracking-widest uppercase font-unison-light-round">Bond Tesseract</h1>
          <Link
            href="/collection"
            className="text-[10px] border border-bc-border2 text-white px-3 py-1.5 tracking-widest uppercase hover:border-bc-pink hover:text-bc-pink transition-all font-unison-bold"
          >
            Back
          </Link>
        </div>

        <p className="text-[10px] text-bc-gray3 uppercase tracking-wider leading-relaxed mb-4 max-w-lg">
          Upgrade your bull with a Tesseract and join the 3D realm. Once upgraded you can switch
          between pixel and 3D whenever you like. Note: This action burns a Tesseract.
        </p>

        {/* Tabs */}
        <div className="flex gap-0 mb-4 border border-bc-border2 w-fit rounded-sm overflow-hidden">
          <button
            onClick={() => setTab("bond")}
            className={cn(
              "px-8 py-2 text-[10px] tracking-widest uppercase transition-all font-unison-bold",
              tab === "bond"
                ? "bg-bc-pink text-white"
                : "bg-transparent text-white hover:bg-white/5"
            )}
          >
            Bond
          </button>
          <button
            onClick={() => setTab("interchange")}
            className={cn(
              "px-8 py-2 text-[10px] tracking-widest uppercase transition-all font-unison-bold",
              tab === "interchange"
                ? "bg-bc-pink text-white"
                : "bg-transparent text-white hover:bg-white/5 border-l border-bc-border2"
            )}
          >
            Interchange
          </button>
        </div>

        {tab === "bond" && (
          <BondTab
            bull={bull}
            bullIdx={bullIdx}
            setBullIdx={setBullIdx}
            tesseracts={tesseracts}
            onBond={handleBond}
            palette3D={palette3D}
          />
        )}
        {tab === "interchange" && (
          <InterchangeTab bull={bull} bullIdx={bullIdx} setBullIdx={setBullIdx} onInterchange={handleInterchange} />
        )}
      </div>
    </ScrollArea>
  );
}

function BondTab({
  bull,
  bullIdx,
  setBullIdx,
  tesseracts,
  onBond,
  palette3D,
}: {
  bull: (typeof MOCK_COLLECTION)[0];
  bullIdx: number;
  setBullIdx: (i: number) => void;
  tesseracts: number;
  onBond: () => void;
  palette3D: (typeof NFT_PALETTES)[0];
}) {
  const palette = NFT_PALETTES[bull.paletteIdx % NFT_PALETTES.length]!;

  return (
    <div className="flex gap-4 items-start">
      {/* Your pixel bull */}
      <NftPreviewCard
        tokenId={bull.tokenId}
        palette={palette}
        label="BULL CLUB"
        onPrev={() => setBullIdx(Math.max(0, bullIdx - 1))}
        onNext={() => setBullIdx(bullIdx + 1)}
      />

      {/* Tesseract center */}
      <div className="flex-1 flex flex-col items-center gap-3 pt-2">
        <p className="text-[9px] text-bc-gray3 uppercase tracking-widest">
          You have {tesseracts} Tesseracts left
        </p>
        <div
          className="w-[100px] h-[100px] rounded-sm border border-bc-border flex items-center justify-center relative"
          style={{ background: "linear-gradient(145deg, #0d1b4b, #1a237e)" }}
        >
          <TesseractGlow />
          <div className="absolute inset-0 rounded-sm"
            style={{ boxShadow: "0 0 20px rgba(41,121,255,0.4), inset 0 0 20px rgba(41,121,255,0.1)" }} />
        </div>
        <button
          onClick={onBond}
          className="flex items-center gap-1 text-[10px] tracking-widest uppercase text-bc-gray4 hover:text-bc-pink transition-colors border border-bc-border2 px-4 py-1.5 hover:border-bc-pink font-unison-bold"
        >
          Upgrade Bull →
        </button>
        {/* Buy more */}
        <div className="flex flex-col items-center gap-1 mt-2">
          <p className="text-[8px] text-bc-gray3 uppercase tracking-wider">Buy More Tesseracts</p>
          <div className="flex gap-2">
            <a
              href="https://magiceden.io"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 border border-bc-border2 flex items-center justify-center hover:border-bc-pink transition-all text-xs text-white font-bold"
            >
              ME
            </a>
            <a
              href="https://tensor.trade"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 border border-bc-border2 flex items-center justify-center hover:border-bc-pink transition-all"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <polyline points="12 4 20 12 12 20" />
                <polyline points="4 4 12 12 4 20" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* 3D version preview */}
      <div className="flex flex-col gap-2">
        <div
          className="w-[160px] h-[180px] rounded-sm border border-bc-border overflow-hidden relative"
          style={{ background: "linear-gradient(145deg, #1a1a2e, #16213e, #0f3460)" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <BullSvg3D />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/30 pointer-events-none" />
          <div className="absolute top-2 left-2">
            <span className="text-[8px] text-white/60 bg-black/50 px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
              BULL CLUB
            </span>
          </div>
          <div className="absolute bottom-2 left-2">
            <span className="text-[11px] font-unison-bold-round text-white">#{bull.tokenId}</span>
          </div>
        </div>
        <span className="text-[9px] text-bc-gray3 text-center uppercase tracking-wide">
          Bull Club #{bull.tokenId}
        </span>
        <button
          onClick={onBond}
          className="w-full py-2 text-[10px] tracking-widest uppercase border border-bc-border2 text-white hover:border-bc-pink hover:text-bc-pink transition-all font-unison-bold"
        >
          Bond and Switch
        </button>
      </div>
    </div>
  );
}

function InterchangeTab({
  bull,
  bullIdx,
  setBullIdx,
  onInterchange,
}: {
  bull: (typeof MOCK_COLLECTION)[0];
  bullIdx: number;
  setBullIdx: (i: number) => void;
  onInterchange: () => void;
}) {
  const palette = NFT_PALETTES[bull.paletteIdx % NFT_PALETTES.length]!;
  const is3D = bull.activeDimension === "3D";

  return (
    <div className="flex gap-4 items-center justify-center">
      <NftPreviewCard
        tokenId={bull.tokenId}
        palette={palette}
        label={`${is3D ? "3D" : "PIXEL"} VERSION`}
        onPrev={() => setBullIdx(Math.max(0, bullIdx - 1))}
        onNext={() => setBullIdx(bullIdx + 1)}
      />
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full border border-bc-pink/40 bg-bc-pink/10 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e8185a" strokeWidth="2">
            <path d="M7 16V4m0 0L3 8m4-4l4 4" />
            <path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </div>
        <p className="text-[9px] text-bc-gray3 uppercase tracking-wider text-center max-w-[100px]">
          Switch to {is3D ? "Pixel" : "3D"} version
        </p>
        <button
          onClick={onInterchange}
          className="px-5 py-2 text-[10px] tracking-widest uppercase border border-bc-pink text-bc-pink hover:bg-bc-pink hover:text-white transition-all font-unison-bold"
        >
          Switch
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <div
          className="w-[160px] h-[180px] rounded-sm border border-bc-border overflow-hidden relative"
          style={{
            background: is3D
              ? `linear-gradient(145deg, ${palette.from}, ${palette.to})`
              : "linear-gradient(145deg, #1a1a2e, #16213e, #0f3460)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {is3D ? <BullSvg /> : <BullSvg3D />}
          </div>
          <div className="absolute bottom-2 left-2">
            <span className="text-[11px] font-unison-bold-round text-white">#{bull.tokenId}</span>
          </div>
        </div>
        <span className="text-[9px] text-bc-gray3 text-center uppercase tracking-wide">
          {is3D ? "Pixel" : "3D"} Version
        </span>
      </div>
    </div>
  );
}

function NftPreviewCard({
  tokenId,
  palette,
  label,
  onPrev,
  onNext,
}: {
  tokenId: string;
  palette: { from: string; to: string; label: string };
  label: string;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="w-[160px] h-[180px] rounded-sm border border-bc-border overflow-hidden relative"
        style={{ background: `linear-gradient(145deg, ${palette.from}, ${palette.to})` }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <BullSvg />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/8 via-transparent to-black/25 pointer-events-none" />
        <div className="absolute top-2 left-2">
          <span className="text-[8px] text-white/60 bg-black/50 px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
            {label}
          </span>
        </div>
        <div className="absolute bottom-2 left-2">
          <span className="text-[11px] font-unison-bold-round text-white">#{tokenId}</span>
        </div>
      </div>
      <span className="text-[9px] text-bc-gray3 text-center uppercase tracking-wide">
        Bull Club #{tokenId}
      </span>
      <div className="flex gap-1.5">
        <button
          onClick={onPrev}
          className="flex-1 py-1 text-[9px] tracking-widest uppercase border border-bc-border2 text-bc-gray4 hover:border-bc-pink hover:text-bc-pink transition-all font-unison-bold"
        >
          Prev
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-1 text-[9px] tracking-widest uppercase border border-bc-border2 text-bc-gray4 hover:border-bc-pink hover:text-bc-pink transition-all font-unison-bold"
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

function BullSvg3D() {
  return (
    <svg width="55%" height="55%" viewBox="0 0 60 55" fill="rgba(100,200,255,0.3)">
      <path d="M8 18 C2 12, 2 4, 8 6 L12 14 C14 8, 18 4, 22 6 L20 16 C24 12, 36 12, 40 16 L38 6 C42 4, 46 8, 48 14 L52 6 C58 4, 58 12, 52 18 L50 22 C54 26, 54 32, 50 36 L48 44 C44 50, 16 50, 12 44 L10 36 C6 32, 6 26, 10 22 Z" />
      <ellipse cx="20" cy="8" rx="4" ry="8" transform="rotate(-15 20 8)" />
      <ellipse cx="40" cy="8" rx="4" ry="8" transform="rotate(15 40 8)" />
    </svg>
  );
}

function TesseractGlow() {
  return (
    <svg width="60%" height="60%" viewBox="0 0 60 60" fill="none">
      <polygon points="30,4 54,18 54,42 30,56 6,42 6,18" stroke="rgba(100,180,255,0.9)" strokeWidth="1.5" fill="rgba(41,121,255,0.12)" />
      <polygon points="30,16 44,24 44,36 30,44 16,36 16,24" stroke="rgba(100,180,255,0.7)" strokeWidth="1" fill="rgba(41,121,255,0.18)" />
      <circle cx="30" cy="30" r="5" fill="rgba(100,180,255,1)" />
      <circle cx="30" cy="30" r="10" fill="rgba(100,180,255,0.2)" />
    </svg>
  );
}
