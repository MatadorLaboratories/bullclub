"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletNfts } from "@/hooks/useWalletNfts";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { BullIcon, BullPointsTitle } from "@/components/ui/BullIcon";

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

const AVATAR_STORAGE_KEY = "bc-avatar-mint";

export function Sidebar({ bullPoints }: SidebarProps) {
  const pathname = usePathname();
  const { publicKey, connected } = useWallet();
  const { data: nfts } = useWalletNfts();

  const bulls = nfts?.filter((n) => !n.isTesseract) ?? [];

  // Avatar selection state (persisted to localStorage)
  const [avatarMint, setAvatarMint] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);

  // Load saved avatar mint on mount
  useEffect(() => {
    const saved = localStorage.getItem(AVATAR_STORAGE_KEY);
    if (saved) setAvatarMint(saved);
  }, []);

  // Find the selected avatar bull, fall back to first bull
  const selectedBull = avatarMint
    ? bulls.find((n) => n.mint === avatarMint) ?? bulls[0]
    : bulls[0];

  const avatarUrl = selectedBull?.imageUrl ?? null;

  const handleSelectAvatar = (mint: string, imageUrl?: string) => {
    setAvatarMint(mint);
    localStorage.setItem(AVATAR_STORAGE_KEY, mint);
    setPickerOpen(false);
  };

  // Display name: truncated wallet address or "NOT CONNECTED"
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
    <>
      <aside className="w-[220px] flex-shrink-0 border-r border-white/10 flex flex-col" style={{ background: "rgba(17,17,17,0.6)" }}>
        {/* Avatar */}
        <div className="p-5 border-b border-bc-border">
          <div className="relative w-full aspect-square rounded-sm overflow-hidden bg-bc-card border border-bc-border2 group">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarUrl} alt="Wallet avatar" className="w-full h-full object-cover" />
            ) : (
              <DefaultAvatar walletAddress={walletAddress} />
            )}
            {/* Edit button — always visible, opens bull picker */}
            <button
              onClick={() => setPickerOpen(true)}
              className="absolute top-2 right-2 w-6 h-6 bg-bc-bg/80 border border-bc-border2 rounded-sm flex items-center justify-center hover:border-bc-pink transition-colors"
              title="Change avatar"
            >
              <EditIcon />
            </button>
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
        <nav className="p-4 flex flex-col gap-2 border-b border-bc-border">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative w-full px-3 py-0 text-[8px] tracking-widest uppercase border rounded-sm transition-all flex items-center justify-center font-unison-bold",
                  isActive
                    ? "bg-bc-pink border-bc-pink text-white"
                    : "bg-transparent border-bc-pink text-white hover:bg-bc-pink/10"
                )}
                style={{ height: "35px" }}
              >
                <span>{item.label}</span>
                {item.dot && !isActive && (
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bull Points */}
        <div className="p-4 flex-1 flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-center justify-center pt-1">
            <BullPointsTitle height={11} />
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-2">
            {connected ? (
              <>
                <StatRow label="Current Bull Points" value={bp.current.toLocaleString()} highlight />
                <StatRow label="Total Bull Points Earned" value={bp.total.toLocaleString()} />
                <StatRow
                  label="Bull Points Rank"
                  value={bp.rank > 0 ? `${bp.rank} / ${bp.totalRanked}` : "0 / 0"}
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
            className="w-full text-center py-2 text-[8px] tracking-widest uppercase border border-bc-pink text-bc-pink rounded-sm hover:bg-bc-pink hover:text-white transition-all mt-auto font-unison-bold"
            style={{ height: "27px", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            How to Earn
          </Link>
        </div>
      </aside>

      {/* Bull Picker Modal */}
      {pickerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
          onClick={() => setPickerOpen(false)}
        >
          <div
            className="relative rounded-sm border border-bc-border2 p-4 flex flex-col gap-3"
            style={{ background: "#1a1a1a", width: "380px", maxHeight: "480px" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="font-unison-light-round text-white uppercase tracking-widest" style={{ fontSize: "11px" }}>
                Select Avatar
              </span>
              <button
                onClick={() => setPickerOpen(false)}
                className="text-bc-gray3 hover:text-white transition-colors"
                style={{ fontSize: "16px", lineHeight: 1 }}
              >
                ×
              </button>
            </div>

            {/* Grid */}
            {bulls.length === 0 ? (
              <p className="text-bc-gray3 uppercase tracking-wider text-center font-unison-light-round" style={{ fontSize: "9px" }}>
                {connected ? "No bulls found in wallet" : "Connect your wallet to select an avatar"}
              </p>
            ) : (
              <div
                className="overflow-y-auto grid gap-2"
                style={{ gridTemplateColumns: "repeat(4, 1fr)", maxHeight: "380px" }}
              >
                {bulls.map((bull) => {
                  const isSelected = (avatarMint ? bull.mint === avatarMint : bull === bulls[0]);
                  return (
                    <button
                      key={bull.mint}
                      onClick={() => handleSelectAvatar(bull.mint, bull.imageUrl)}
                      className={cn(
                        "relative rounded-sm overflow-hidden border transition-all",
                        isSelected ? "border-bc-pink" : "border-bc-border2 hover:border-white/40"
                      )}
                      style={{ aspectRatio: "1 / 1" }}
                    >
                      {bull.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={bull.imageUrl} alt={`Bull #${bull.tokenId}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-bc-card flex items-center justify-center">
                          <span className="text-bc-gray3 font-unison-light-round" style={{ fontSize: "7px" }}>#{bull.tokenId}</span>
                        </div>
                      )}
                      {/* Token ID label */}
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-1 py-0.5">
                        <span className="font-unison-light-round text-white/80 block text-center" style={{ fontSize: "7px" }}>
                          #{bull.tokenId}
                        </span>
                      </div>
                      {/* Selected checkmark */}
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-4 h-4 bg-bc-pink rounded-full flex items-center justify-center">
                          <span style={{ fontSize: "8px", color: "white", lineHeight: 1 }}>✓</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </>
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
    <div className="rounded-sm px-2.5 flex flex-col items-center justify-center text-center" style={{ background: "#242424", height: "43px" }}>
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
