import Link from "next/link";
import { BullClubLogo } from "@/components/ui/BullClubLogo";

export function SiteHeader() {
  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <Link href="/dashboard" className="pointer-events-auto">
        <BullClubLogo className="w-24" />
      </Link>
    </div>
  );
}
