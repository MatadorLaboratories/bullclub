import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BULL_POINTS_METHODS } from "@/lib/constants";

const STATS = {
  bullsOwned: 12,
  reppingOnX: true,
  daily: 700,
  current: 29750,
  total: 49710,
  rank: 139,
  totalRanked: 4102,
};

export function BullPointsPage() {
  return (
    <div className="flex h-full">
      {/* Main content */}
      <ScrollArea className="flex-1">
        <div className="p-5 animate-fade-in">
          {/* Title */}
          <div className="flex items-center gap-3 mb-4">
            <BullIcon />
            <h1 className="text-base tracking-widest uppercase font-unison-bold">Bull Points</h1>
          </div>

          {/* Description */}
          <div className="border border-bc-border2 bg-bc-panel2 rounded-sm p-4 mb-4">
            <p className="text-[10px] text-white uppercase tracking-wider leading-relaxed mb-2">
              Bull Points is the heart and soul of the Bull Club reward system.
            </p>
            <p className="text-[10px] text-bc-gray3 uppercase tracking-wider leading-relaxed">
              Earn bull points by holding bulls, engaging with the communities in order to spend
              around our growing ecosystem. Use on weekly, monthly and spot NFT and token raffles,
              and earn eligibility for future airdrops.
            </p>
          </div>

          {/* Ways to earn */}
          <h2 className="text-[10px] tracking-widest uppercase text-white mb-3 font-unison-light-round">
            Ways to Earn Points
          </h2>
          <div className="flex flex-col gap-1">
            {BULL_POINTS_METHODS.map((method, i) => (
              <div
                key={i}
                className="flex items-center justify-between border border-bc-border bg-bc-panel2 px-3 py-2 rounded-sm hover:border-bc-border2 transition-colors"
              >
                <span className="text-[10px] text-bc-gray4 uppercase tracking-wide">
                  {method.label}
                </span>
                <span className="text-[10px] font-bold text-bc-pink bg-bc-pink/10 px-2 py-0.5 rounded-sm whitespace-nowrap">
                  {method.amount.toLocaleString()}
                  {method.period === "day" ? "/DAY" : ""}
                </span>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Right stats panel */}
      <div className="w-[180px] flex-shrink-0 border-l border-bc-border p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <BullIcon />
          <span className="text-[10px] text-bc-pink uppercase tracking-wider font-unison-bold">
            Bull Points
          </span>
        </div>

        <StatItem label="# Bulls Owned" value={String(STATS.bullsOwned)} />
        <StatItem
          label="Repping Bull on X"
          value={STATS.reppingOnX ? "YES" : "NO"}
          valueColor="text-bc-green"
        />
        <StatItem
          label="Daily Points"
          value={STATS.daily.toLocaleString()}
          valueColor="text-bc-pink"
        />
        <StatItem label="Current Bull Points" value={STATS.current.toLocaleString()} />
        <StatItem label="Total Bull Points Earned" value={STATS.total.toLocaleString()} />
        <StatItem
          label="Bull Points Rank"
          value={`${STATS.rank} / ${STATS.totalRanked}`}
          valueColor="text-bc-pink"
        />

        <Link
          href="/leaderboard"
          className="w-full text-center py-2 text-[10px] tracking-widest uppercase border border-bc-border2 text-white hover:border-bc-pink hover:text-bc-pink transition-all mt-auto font-unison-bold"
        >
          Leaderboard
        </Link>
      </div>
    </div>
  );
}

function StatItem({
  label,
  value,
  valueColor = "text-white",
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[8px] text-bc-gray3 uppercase tracking-wider font-unison-light-round">{label}</span>
      <span className={`text-sm font-unison-bold-round tracking-wide ${valueColor}`}>{value}</span>
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
