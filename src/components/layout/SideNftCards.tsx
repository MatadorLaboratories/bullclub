import { NFT_PALETTES } from "@/lib/constants";

const LEFT_CARDS = [0, 4, 8, 2, 6, 10];
const RIGHT_CARDS = [1, 5, 9, 3, 7, 11];

const CARD_NUMBERS = [
  "#1713", "#8862", "#8666", "#7500", "#7249", "#7275",
  "#8929", "#3121", "#3328", "#2472", "#8000", "#1000",
];

interface SideNftCardsProps {
  side: "left" | "right";
}

export function SideNftCards({ side }: SideNftCardsProps) {
  const indices = side === "left" ? LEFT_CARDS : RIGHT_CARDS;

  return (
    <div
      className={`hidden xl:flex flex-col gap-1.5 fixed top-0 h-screen justify-center z-10 pointer-events-none ${
        side === "left" ? "left-0 pl-1" : "right-0 pr-1"
      }`}
    >
      {indices.map((paletteIdx, i) => {
        const palette = NFT_PALETTES[paletteIdx % NFT_PALETTES.length]!;
        const cardNum = CARD_NUMBERS[(paletteIdx + i) % CARD_NUMBERS.length] ?? "#1000";
        return (
          <div
            key={i}
            className="w-[105px] h-[120px] rounded-sm border border-white/10 overflow-hidden relative flex-shrink-0"
            style={{
              background: `linear-gradient(145deg, ${palette.from}, ${palette.to})`,
              opacity: 0.85,
            }}
          >
            {/* Bull silhouette placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <BullSilhouette color="rgba(255,255,255,0.2)" />
            </div>
            {/* Number tag */}
            <span className="absolute bottom-1 left-1.5 text-[8px] text-white/60 font-mono tracking-wide">
              {cardNum}
            </span>
            {/* Shine */}
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent" />
          </div>
        );
      })}
    </div>
  );
}

function BullSilhouette({ color }: { color: string }) {
  return (
    <svg
      width="60"
      height="55"
      viewBox="0 0 60 55"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Simple bull head silhouette */}
      <path d="M8 18 C2 12, 2 4, 8 6 L12 14 C14 8, 18 4, 22 6 L20 16 C24 12, 36 12, 40 16 L38 6 C42 4, 46 8, 48 14 L52 6 C58 4, 58 12, 52 18 L50 22 C54 26, 54 32, 50 36 L48 44 C44 50, 16 50, 12 44 L10 36 C6 32, 6 26, 10 22 Z" />
      {/* Horns */}
      <ellipse cx="20" cy="8" rx="4" ry="8" transform="rotate(-15 20 8)" />
      <ellipse cx="40" cy="8" rx="4" ry="8" transform="rotate(15 40 8)" />
      {/* Eyes */}
      <circle cx="23" cy="28" r="3" fill="rgba(255,255,255,0.4)" />
      <circle cx="37" cy="28" r="3" fill="rgba(255,255,255,0.4)" />
      <circle cx="24" cy="28" r="1.5" fill="rgba(0,0,0,0.6)" />
      <circle cx="38" cy="28" r="1.5" fill="rgba(0,0,0,0.6)" />
      {/* Nose */}
      <ellipse cx="30" cy="38" rx="7" ry="5" fill="rgba(0,0,0,0.2)" />
      <circle cx="27" cy="38" r="2" fill="rgba(0,0,0,0.4)" />
      <circle cx="33" cy="38" r="2" fill="rgba(0,0,0,0.4)" />
    </svg>
  );
}
