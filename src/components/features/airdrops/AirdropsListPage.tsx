import Link from "next/link";
import { MOCK_AIRDROPS, NFT_PALETTES } from "@/lib/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function AirdropsListPage() {
  const upcoming = MOCK_AIRDROPS.filter((a) => a.status === "upcoming" || a.status === "active");
  const past = MOCK_AIRDROPS.filter((a) => a.status === "completed");

  return (
    <ScrollArea className="h-full">
      <div className="p-5 animate-fade-in">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-base tracking-widest uppercase">Airdrops</h1>
          <Link
            href="/dashboard"
            className="text-[10px] border border-bc-border2 text-white px-3 py-1.5 tracking-widest uppercase hover:border-bc-pink hover:text-bc-pink transition-all"
          >
            Back
          </Link>
        </div>

        {/* Upcoming */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] tracking-widest uppercase text-white">Upcoming</span>
            <span className="text-[9px] text-bc-gray3 tracking-wider uppercase">
              {upcoming.length} Airdrops
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {upcoming.map((a) => (
              <AirdropCard key={a.id} airdrop={a} />
            ))}
          </div>
        </div>

        {/* Past */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] tracking-widest uppercase text-white">Past</span>
            <span className="text-[9px] text-bc-gray3 tracking-wider uppercase">
              {past.length > 0 ? `${past.length} Airdrops` : "None"}
            </span>
          </div>
          {past.length === 0 && (
            <p className="text-[10px] text-bc-gray2 uppercase tracking-wider">No past airdrops yet.</p>
          )}
          <div className="grid grid-cols-3 gap-2">
            {past.map((a) => (
              <AirdropCard key={a.id} airdrop={a} />
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

function AirdropCard({ airdrop }: { airdrop: (typeof MOCK_AIRDROPS)[0] }) {
  const palette = NFT_PALETTES[airdrop.paletteIdx % NFT_PALETTES.length]!;
  const eligColor =
    airdrop.eligibility === "eligible"
      ? "bg-bc-green/20 text-bc-green border-bc-green/40"
      : airdrop.eligibility === "claimed"
      ? "bg-bc-gray/20 text-bc-gray3 border-bc-gray/40"
      : "bg-orange-500/20 text-orange-400 border-orange-500/40";

  return (
    <div className="flex flex-col border border-bc-border rounded-sm overflow-hidden hover:border-bc-border2 transition-all">
      {/* Image */}
      <div
        className="relative h-[120px]"
        style={{ background: `linear-gradient(145deg, ${palette.from}, ${palette.to})` }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <TesseractSvg />
        </div>
        {/* Eligibility */}
        <span
          className={cn(
            "absolute top-1.5 left-1.5 text-[8px] uppercase tracking-widest px-1.5 py-0.5 border font-bold",
            eligColor
          )}
        >
          {airdrop.eligibility ?? "ineligible"}
        </span>
        {/* Coming soon */}
        <span className="absolute top-1.5 right-1.5 text-[7px] text-white/60 bg-black/50 px-1.5 py-0.5 uppercase tracking-wider">
          {airdrop.status === "upcoming" ? "Coming Soon" : "Active"}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-2 py-1.5 bg-bc-panel2">
        <span className="text-[9px] text-white truncate">{airdrop.title}</span>
        <Link
          href={`/airdrops/${airdrop.id}`}
          className="text-[8px] border border-bc-border2 text-white px-2 py-0.5 tracking-widest uppercase hover:border-bc-pink hover:text-bc-pink transition-all flex-shrink-0"
        >
          View
        </Link>
      </div>
    </div>
  );
}

function TesseractSvg() {
  return (
    <svg width="50%" height="50%" viewBox="0 0 60 60" fill="none">
      <polygon points="30,4 54,18 54,42 30,56 6,42 6,18" stroke="rgba(100,180,255,0.7)" strokeWidth="1.5" fill="rgba(41,121,255,0.08)" />
      <polygon points="30,16 44,24 44,36 30,44 16,36 16,24" stroke="rgba(100,180,255,0.5)" strokeWidth="1" fill="rgba(41,121,255,0.12)" />
      <circle cx="30" cy="30" r="4" fill="rgba(100,180,255,0.9)" />
    </svg>
  );
}
