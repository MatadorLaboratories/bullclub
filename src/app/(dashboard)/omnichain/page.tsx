import { Suspense } from "react";
import { OmnichainPage } from "@/components/features/OmnichainPage";

export default function Omnichain() {
  return (
    <Suspense>
      <OmnichainPage />
    </Suspense>
  );
}
