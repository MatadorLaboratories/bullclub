"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletNfts } from "@/hooks/useWalletNfts";
import { cn } from "@/lib/utils";

interface SidebarProps {
  bullPoints?: {
    current: number;
    total: number;
    rank: number;
    totalRanked: number;
  };
}

const NAV_ITEMS = [
  { href: "/dashboard", label: "BULL CLUB" },
  { href: "/chat", label: "CLUB CHAT", dot: true },
  { href: "/account", label: "MANAGE ACCOUNT" },
];

export function Sidebar({ bullPoints }: SidebarProps) {
  const pathname = usePathname();
  const { publicKey, connected } = useWallet();
  const { data: nfts } = useWalletNfts();

  // Use first NFT image as avatar, or a gradient based on wallet address
  const firstBull = nfts?.find((n) => !n.isTesseract);
  const avatarUrl = firstBull?.imageUrl ?? null;

  // Display name: truncated wallet address or "CONNECT WALLET"
  const walletAddress = publicKey?.toBase58();
  const displayName = walletAddress
    ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
    : "NOT CONNECTED";

  const bp = bullPoints ?? {
    current: 0,
    total: 0,
    rank: 0,
    totalRanked: 0,
  };

  return (
    <aside className="w-[220px] flex-shrink-0 border-r border-white/10 flex flex-col" style={{ background: "rgba(17,17,17,0.6)" }}>
      {/* Avatar */}
      <div className="p-4 border-b border-bc-border">
        <div className="relative w-full aspect-square rounded-sm overflow-hidden bg-bc-card border border-bc-border2 group">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt="Wallet avatar" className="w-full h-full object-cover" />
          ) : (
            <DefaultAvatar walletAddress={walletAddress} />
          )}
          <Link
            href="/account"
            className="absolute top-2 right-2 w-6 h-6 bg-bc-bg/80 border border-bc-border2 rounded-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-bc-pink"
          >
            <EditIcon />
          </Link>
          {/* Wallet address badge */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1.5">
            <span className="text-[8px] text-white/70 font-mono tracking-wider block truncate">
              {displayName}
            </span>
            {!connected && (
              <Link href="/connect" className="text-[7px] text-bc-pink tracking-wider uppercase block mt-0.5 hover:text-white transition-colors">
                Connect Wallet →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-3 flex flex-col gap-1.5 border-b border-bc-border">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "w-full px-3 py-2 text-xs tracking-widest uppercase border rounded-sm transition-all flex items-center justify-between",
                isActive
                  ? "bg-bc-pink border-bc-pink text-white"
                  : "bg-transparent border-white/15 text-white hover:border-white/40 hover:bg-white/5"
              )}
            >
              <span>{item.label}</span>
              {item.dot && !isActive && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bull Points */}
      <div className="p-3 flex-1 flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center gap-2 pt-1">
          <BullPointsIcon />
          <span className="text-bc-pink text-xs font-unison-bold tracking-widest uppercase">
            Bull Points
          </span>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-2">
          {connected ? (
            <>
              <StatRow label="Current Bull Points" value={bp.current > 0 ? bp.current.toLocaleString() : "—"} highlight />
              <StatRow label="Total Bull Points Earned" value={bp.total > 0 ? bp.total.toLocaleString() : "—"} />
              <StatRow
                label="Bull Points Rank"
                value={bp.rank > 0 ? `${bp.rank} / ${bp.totalRanked}` : "—"}
                highlight
              />
            </>
          ) : (
            <p className="text-[9px] text-bc-gray3 uppercase tracking-wider leading-relaxed">
              Connect your wallet to see your Bull Points
            </p>
          )}
        </div>

        {/* How to Earn */}
        <Link
          href="/bull-points"
          className="w-full text-center py-2 text-xs tracking-widest uppercase border border-bc-pink text-bc-pink rounded-sm hover:bg-bc-pink hover:text-white transition-all mt-auto font-unison-bold"
        >
          How to Earn
        </Link>
      </div>
    </aside>
  );
}

function StatRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-sm px-2.5 flex flex-col justify-center" style={{ background: "#242424", height: "43px" }}>
      <span className="font-unison-light-round text-bc-gray3 uppercase tracking-wider block" style={{ fontSize: "7px" }}>
        {label}
      </span>
      <span
        className={cn(
          "font-unison-bold-round tracking-wide mt-0.5",
          highlight ? "text-bc-pink" : "text-white"
        )}
        style={{ fontSize: "14px" }}
      >
        {value}
      </span>
    </div>
  );
}

function BullPointsIcon() {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="#e8185a" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 5.5 C0 3.5, 0 1, 1.5 1.5 L3 4.5 C3.5 2, 5 0.5, 6.5 1.5 L6 5 C7 3.5, 9 3.5, 10 5 L9.5 1.5 C11 0.5, 12.5 2, 13 4.5 L14.5 1.5 C16 1, 16 3.5, 14.5 5.5 L14 6.5 C15 7.5, 15 9.5, 14 10.5 L13.5 12.5 C12.5 14, 3.5 14, 2.5 12.5 L2 10.5 C1 9.5, 1 7.5, 2 6.5 Z" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

// Gradient palettes for avatar when no NFT image is available
const AVATAR_GRADIENTS = [
  ["#4a148c", "#e040fb"], // purple
  ["#0d47a1", "#42a5f5"], // blue
  ["#004d40", "#26a69a"], // teal
  ["#e65100", "#ff8f00"], // orange
  ["#880e4f", "#e91e63"], // pink
  ["#1a237e", "#5c6bc0"], // indigo
  ["#006064", "#26c6da"], // cyan
  ["#b71c1c", "#ef5350"], // red
];

function DefaultAvatar({ walletAddress }: { walletAddress?: string }) {
  // Pick a deterministic gradient from wallet address
  const idx = walletAddress
    ? walletAddress.charCodeAt(0) % AVATAR_GRADIENTS.length
    : 0;
  const [from, to] = AVATAR_GRADIENTS[idx]!;

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <svg width="55%" height="55%" viewBox="0 0 60 55" fill="rgba(255,255,255,0.25)" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 18 C2 12, 2 4, 8 6 L12 14 C14 8, 18 4, 22 6 L20 16 C24 12, 36 12, 40 16 L38 6 C42 4, 46 8, 48 14 L52 6 C58 4, 58 12, 52 18 L50 22 C54 26, 54 32, 50 36 L48 44 C44 50, 16 50, 12 44 L10 36 C6 32, 6 26, 10 22 Z" />
        <ellipse cx="20" cy="8" rx="4" ry="8" transform="rotate(-15 20 8)" />
        <ellipse cx="40" cy="8" rx="4" ry="8" transform="rotate(15 40 8)" />
      </svg>
    </div>
  );
}
