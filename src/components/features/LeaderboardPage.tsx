import Link from "next/link";
import { MOCK_LEADERBOARD } from "@/lib/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

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

function BullIcon() {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="#e8185a">
      <path d="M1.5 5.5 C0 3.5, 0 1, 1.5 1.5 L3 4.5 C3.5 2, 5 0.5, 6.5 1.5 L6 5 C7 3.5, 9 3.5, 10 5 L9.5 1.5 C11 0.5, 12.5 2, 13 4.5 L14.5 1.5 C16 1, 16 3.5, 14.5 5.5 L14 6.5 C15 7.5, 15 9.5, 14 10.5 L13.5 12.5 C12.5 14, 3.5 14, 2.5 12.5 L2 10.5 C1 9.5, 1 7.5, 2 6.5 Z" />
    </svg>
  );
}
