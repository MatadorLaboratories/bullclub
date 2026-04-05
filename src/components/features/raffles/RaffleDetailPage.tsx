"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_RAFFLES, NFT_PALETTES } from "@/lib/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCountdown } from "@/hooks/useCountdown";
import { toast } from "sonner";

export function RaffleDetailPage({ raffleId }: { raffleId: string }) {
  const raffle = MOCK_RAFFLES.find((r) => r.id === raffleId) ?? MOCK_RAFFLES[0]!;
  const palette = NFT_PALETTES[raffle.paletteIdx % NFT_PALETTES.length]!;
  const [points, setPoints] = useState(raffle.myEntries ?? 100);
  const [submitted, setSubmitted] = useState(false);
  const countdown = useCountdown(new Date(raffle.endsAt));
  const currentPoints = 29750;
  const winProb =
    raffle.totalEntries > 0
      ? ((((raffle.myEntries ?? 0) + points) / (raffle.totalEntries + points)) * 100).toFixed(3)
      : "0.000";

  const handleEnter = () => {
    if (points <= 0) return;
    toast.success(`Entered ${points.toLocaleString()} points!`);
    setSubmitted(true);
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-5 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-base tracking-widest uppercase">Raffles</h1>
          <Link
            href="/raffles"
            className="text-[10px] border border-bc-border2 text-white px-3 py-1.5 tracking-widest uppercase hover:border-bc-pink hover:text-bc-pink transition-all"
          >
            Back
          </Link>
        </div>

        <div className="flex gap-4">
          {/* NFT preview */}
          <div
            className="w-[220px] flex-shrink-0 rounded-sm border border-bc-border overflow-hidden relative"
            style={{
              height: 280,
              background: `linear-gradient(145deg, ${palette.from}, ${palette.to})`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <BullSvg />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/8 via-transparent to-black/30 pointer-events-none" />
            <div className="absolute top-3 left-3">
              <span className="text-xs font-bold text-white">{raffle.title}</span>
            </div>
            <div className="absolute top-3 right-3">
              <span className="text-xs font-bold text-white/70">
                #{raffle.id.slice(-4).toUpperCase()}
              </span>
            </div>
          </div>

          {/* Entry panel */}
          <div className="flex-1 flex flex-col gap-3">
            {/* Prize */}
            <div className="border border-bc-border2 bg-bc-panel2 rounded-sm p-3">
              <p className="text-[8px] text-bc-pink uppercase tracking-widest mb-1">Raffle Prize</p>
              <p className="text-xs text-white uppercase tracking-wide font-bold">
                {raffle.title}
              </p>
            </div>

            {/* Points input */}
            <div className="border border-bc-border2 bg-bc-panel2 rounded-sm p-3">
              <p className="text-[9px] text-bc-gray3 uppercase tracking-widest mb-2">
                How many points would you like to allocate?
                <br />
                <span className="text-[8px]">
                  1 POINT = 1 ENTRY · MAX {currentPoints.toLocaleString()} PTS PER WALLET
                </span>
              </p>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1.5 flex-1 border border-bc-border2 bg-bc-card px-2 py-1.5 rounded-sm">
                  <TicketIcon />
                  <input
                    type="number"
                    value={points}
                    min={1}
                    max={currentPoints}
                    onChange={(e) => setPoints(Math.min(currentPoints, Math.max(1, Number(e.target.value))))}
                    className="flex-1 bg-transparent text-xs text-white uppercase tracking-wide outline-none w-0"
                  />
                </div>
                <button
                  onClick={handleEnter}
                  disabled={submitted || raffle.status !== "active"}
                  className="px-5 py-1.5 text-[10px] tracking-widest uppercase border border-bc-border2 text-white hover:border-bc-pink hover:text-bc-pink disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {submitted ? "Entered ✓" : "Enter"}
                </button>
              </div>
              <input
                type="range"
                min={1}
                max={currentPoints}
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2">
              <StatBox label="Your Entries" value={(raffle.myEntries ?? 0).toLocaleString()} highlight />
              <StatBox label="Total Entries" value={raffle.totalEntries.toLocaleString()} />
              <StatBox label="Winners" value={String(raffle.winners)} />
              <StatBox label="Win Probability" value={`${winProb}%`} />
            </div>

            {/* Countdown */}
            {raffle.status === "active" && (
              <div className="border border-bc-border2 bg-bc-panel2 rounded-sm p-3">
                <p className="text-[8px] text-bc-gray3 uppercase tracking-widest mb-2">
                  Time Remaining
                </p>
                <p className="text-xl font-bold text-bc-pink tracking-widest animate-countdown">
                  {countdown}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

function StatBox({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="border border-bc-border bg-bc-panel2 rounded-sm p-2">
      <p className="text-[8px] text-bc-gray3 uppercase tracking-widest mb-0.5">{label}</p>
      <p className={`text-sm font-bold ${highlight ? "text-bc-pink" : "text-white"}`}>{value}</p>
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

function TicketIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#e8185a">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" fill="rgba(0,0,0,0.4)" />
    </svg>
  );
}
