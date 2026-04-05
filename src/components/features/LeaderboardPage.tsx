import Link from "next/link";
import { MOCK_LEADERBOARD } from "@/lib/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { BullIcon } from "@/components/ui/BullIcon";

const STATS = {
  bullsOwned: 12,
  reppingOnX: true,
  daily: 700,
  current: 29750,
  total: 49710,
  rank: 139,
  totalRanked: 4102,
};

export function LeaderboardPage() {
  const currentUser = MOCK_LEADERBOARD.find((e) => e.isCurrentUser);

  return (
    <div className="flex h-full">
      <ScrollArea className="flex-1">
        <div className="p-5 animate-fade-in">
          {/* Title */}
          <div className="flex items-center gap-3 mb-4">
            <BullIcon />
            <h1 className="text-base tracking-widest uppercase">Bull Points Leaderboard</h1>
          </div>

          {/* Table */}
          <div className="border border-bc-border rounded-sm overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-3 bg-bc-panel2 px-4 py-2 border-b border-bc-border">
              <span className="text-[9px] text-bc-gray3 uppercase tracking-widest">Rank</span>
              <span className="text-[9px] text-bc-gray3 uppercase tracking-widest">Wallet</span>
              <div className="flex justify-end">
                <BullIcon />
              </div>
            </div>

            {/* Current user pinned */}
            {currentUser && (
              <div className="grid grid-cols-3 px-4 py-2.5 bg-bc-pink/10 border-b border-bc-pink/30">
                <span className="text-xs font-bold text-bc-pink">{currentUser.rank}</span>
                <span className="text-xs text-white tracking-wide">{currentUser.wallet}</span>
                <span className="text-xs font-bold text-white text-right">
                  {currentUser.points.toLocaleString()}
                </span>
              </div>
            )}

            {/* Rows */}
            {MOCK_LEADERBOARD.filter((e) => !e.isCurrentUser).map((entry) => (
              <div
                key={entry.rank}
                className={cn(
                  "grid grid-cols-3 px-4 py-2.5 border-b border-bc-border hover:bg-bc-panel2 transition-colors",
                  "last:border-b-0"
                )}
              >
                <span className="text-xs text-white">{entry.rank}</span>
                <span className="text-xs text-bc-gray4 tracking-wide">{entry.wallet}</span>
                <span className="text-xs text-white text-right">
                  {entry.points.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Right stats */}
      <div className="w-[180px] flex-shrink-0 border-l border-bc-border p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <BullIcon />
          <span className="text-[10px] text-bc-pink uppercase tracking-wider font-bold">
            Bull Points
          </span>
        </div>
        <StatItem label="# Bulls Owned" value={String(STATS.bullsOwned)} />
        <StatItem label="Repping Bull on X" value="YES" valueColor="text-bc-green" />
        <StatItem label="Daily Points" value={STATS.daily.toLocaleString()} valueColor="text-bc-pink" />
        <StatItem label="Current Bull Points" value={STATS.current.toLocaleString()} />
        <StatItem label="Total Bull Points Earned" value={STATS.total.toLocaleString()} />
        <StatItem label="Bull Points Rank" value={`${STATS.rank} / ${STATS.totalRanked}`} valueColor="text-bc-pink" />
        <Link
          href="/bull-points"
          className="w-full text-center py-2 text-[10px] tracking-widest uppercase border border-bc-border2 text-white hover:border-bc-pink hover:text-bc-pink transition-all mt-auto"
        >
          How to Earn
        </Link>
      </div>
    </div>
  );
}

function StatItem({ label, value, valueColor = "text-white" }: { label: string; value: string; valueColor?: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[8px] text-bc-gray3 uppercase tracking-wider">{label}</span>
      <span className={`text-sm font-bold ${valueColor}`}>{value}</span>
    </div>
  );
}

