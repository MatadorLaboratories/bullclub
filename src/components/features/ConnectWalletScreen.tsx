"use client";

import { useRouter } from "next/navigation";
import { BullClubLogo } from "@/components/ui/BullClubLogo";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useEffect } from "react";
import { NFT_PALETTES } from "@/lib/constants";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { toast } from "sonner";

const BG_CARDS = [0, 4, 8, 2, 6, 10, 1, 5, 9, 3, 7, 11];

export function ConnectWalletScreen() {
  const router = useRouter();
  const { connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();

  // Once wallet connects, verify ownership and redirect
  useEffect(() => {
    if (connected && publicKey) {
      toast.success("Wallet connected!");
      // In production: check NFT ownership via RPC
      // For demo: redirect to dashboard
      setTimeout(() => router.push("/dashboard"), 800);
    }
  }, [connected, publicKey, router]);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Scan lines */}
      <div className="absolute inset-0 scanlines z-10 pointer-events-none opacity-60" />

      {/* Blurred bg cards */}
      <div className="absolute inset-0 grid grid-cols-6 gap-0.5 p-0.5 opacity-30">
        {BG_CARDS.map((paletteIdx, i) => {
          const palette = NFT_PALETTES[paletteIdx % NFT_PALETTES.length]!;
          return (
            <div
              key={i}
              className="blur-sm"
              style={{ background: `linear-gradient(145deg, ${palette.from}, ${palette.to})` }}
            />
          );
        })}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-20 bg-black/70" />

      {/* Modal panel */}
      <div className="absolute inset-0 z-30 flex items-center justify-center">
        <div className="w-[480px] bg-bc-panel/95 border border-bc-border2 rounded-sm flex flex-col items-center gap-8 py-16 px-12 animate-fade-in">
          <BullClubLogo className="w-40" />

          <div className="flex flex-col items-center gap-4 w-full">
            <button
              onClick={() => setVisible(true)}
              className="w-full py-3.5 border border-white/60 bg-transparent text-white text-sm tracking-[0.2em] uppercase hover:bg-white/8 hover:border-white transition-all active:scale-95 font-unison-bold"
            >
              Connect Wallet
            </button>
            <p className="text-[10px] text-bc-gray3 tracking-widest uppercase text-center">
              Connect your wallet to enter the club
            </p>
          </div>

          <button
            onClick={() => router.push("/")}
            className="text-[10px] text-bc-gray2 hover:text-white tracking-widest uppercase transition-colors"
          >
            ← Back
          </button>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
