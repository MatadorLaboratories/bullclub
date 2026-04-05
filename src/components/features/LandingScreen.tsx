"use client";

import { useRouter } from "next/navigation";
import { BullClubLogo } from "@/components/ui/BullClubLogo";
import { SiteFooter } from "@/components/layout/SiteFooter";

export function LandingScreen() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Scan lines */}
      <div className="absolute inset-0 scanlines z-10 pointer-events-none opacity-50" />

      {/* Center content */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-6">
          <BullClubLogo className="w-56 drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]" />
          <button
            onClick={() => router.push("/connect")}
            className="px-16 py-3.5 border border-white/70 bg-black/40 text-white text-sm tracking-[0.25em] uppercase hover:bg-white/10 hover:border-white transition-all active:scale-95 font-unison-bold backdrop-blur-sm"
          >
            Enter Club
          </button>
        </div>
      </div>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
