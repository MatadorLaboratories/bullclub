"use client";

import Link from "next/link";
import { MOCK_RAFFLES, NFT_PALETTES } from "@/lib/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useCountdown } from "@/hooks/useCountdown";

export function RafflesListPage() {
  const active = MOCK_RAFFLES.filter((r) => r.status === "active");
  const past = MOCK_RAFFLES.filter((r) => r.status !== "active");

  return (
    <ScrollArea className="h-full">
      <div className="p-5 animate-fade-in">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-base tracking-widest uppercase font-unison-light-round">Raffles</h1>
          <Link
            href="/dashboard"
            className="text-[10px] border border-bc-border2 text-white px-3 py-1.5 tracking-widest uppercase hover:border-bc-pink hover:text-bc-pink transition-all font-unison-bold"
          >
            Back
          </Link>
        </div>

        {/* Active */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] tracking-widest uppercase text-white font-unison-light-round">Active</span>
            <span className="text-[9px] text-bc-gray3 tracking-wider uppercase font-unison-light-round">
              {active.length} Raffles
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {active.map((r) => (
              <RaffleCard key={r.id} raffle={r} />
            ))}
          </div>
        </div>

        {/* Past */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] tracking-widest uppercase text-white font-unison-light-round">Past</span>
            <span className="text-[9px] text-bc-gray3 tracking-wider uppercase font-unison-light-round">
              {past.length} Raffles
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {past.map((r) => (
              <RaffleCard key={r.id} raffle={r} past />
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

function RaffleCard({
  raffle,
  past = false,
}: {
  raffle: (typeof MOCK_RAFFLES)[0];
  past?: boolean;
}) {
  const palette = NFT_PALETTES[raffle.paletteIdx % NFT_PALETTES.length]!;
  const countdown = useCountdown(new Date(raffle.endsAt));

  const resultColor =
    raffle.myResult === "win"
      ? "text-bc-green"
      : raffle.myResult === "loss"
      ? "text-red-400"
      : "text-bc-gray3";

  return (
    <div className="flex flex-col border border-bc-border rounded-sm overflow-hidden hover:border-bc-border2 transition-all">
      {/* Image area */}
      <div
        className="relative h-[100px]"
        style={{ background: `linear-gradient(145deg, ${palette.from}, ${palette.to})` }}
      >
        {/* Bull art */}
        <div className="absolute inset-0 flex items-center justify-center">
          <BullMini />
        </div>

        {/* Status badges */}
        {past && raffle.myResult && (
          <span
            className={cn(
              "absolute top-1.5 left-1.5 text-[8px] uppercase tracking-widest px-1.5 py-0.5 font-bold",
              raffle.myResult === "win"
                ? "bg-bc-green/20 text-bc-green border border-bc-green/40"
                : "bg-red-500/20 text-red-400 border border-red-500/40"
            )}
          >
            {raffle.myResult}
          </span>
        )}
        {past && (
          <span className="absolute top-1.5 right-1.5 text-[8px] uppercase tracking-widest bg-bc-panel/80 text-bc-gray3 px-1.5 py-0.5 border border-bc-border">
            Finished
          </span>
        )}

        {/* Entry count for active */}
        {!past && raffle.myEntries != null && raffle.myEntries > 0 && (
          <span className="absolute top-1.5 left-1.5 text-[8px] bg-bc-pink/80 text-white px-1.5 py-0.5 rounded-sm">
            ✦ {raffle.myEntries.toLocaleString()}
          </span>
        )}

        {/* Countdown for active */}
        {!past && (
          <span className="absolute top-1.5 right-1.5 text-[8px] text-white/70 bg-black/50 px-1.5 py-0.5">
            {countdown}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-2 py-1.5 bg-bc-panel2">
        <span className="text-[9px] text-white truncate">{raffle.title}</span>
        <Link
          href={`/raffles/${raffle.id}`}
          className="text-[8px] border border-bc-border2 text-white px-2 py-0.5 tracking-widest uppercase hover:border-bc-pink hover:text-bc-pink transition-all flex-shrink-0 font-unison-bold"
        >
          View
        </Link>
      </div>
    </div>
  );
}

function BullMini() {
  return (
    <svg width="45%" height="45%" viewBox="0 0 60 55" fill="rgba(255,255,255,0.2)">
      <path d="M8 18 C2 12, 2 4, 8 6 L12 14 C14 8, 18 4, 22 6 L20 16 C24 12, 36 12, 40 16 L38 6 C42 4, 46 8, 48 14 L52 6 C58 4, 58 12, 52 18 L50 22 C54 26, 54 32, 50 36 L48 44 C44 50, 16 50, 12 44 L10 36 C6 32, 6 26, 10 22 Z" />
      <ellipse cx="20" cy="8" rx="4" ry="8" transform="rotate(-15 20 8)" />
      <ellipse cx="40" cy="8" rx="4" ry="8" transform="rotate(15 40 8)" />
    </svg>
  );
}
