"use client";

import { useState, useEffect } from "react";

export function useCountdown(target: Date): string {
  const [label, setLabel] = useState("");

  useEffect(() => {
    function calc() {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return "Ended";
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      if (d > 0) return `${d}D ${h}H ${m}M`;
      if (h > 0) return `${h}H ${m}M`;
      return `${m}M`;
    }
    setLabel(calc());
    const id = setInterval(() => setLabel(calc()), 60000);
    return () => clearInterval(id);
  }, [target]);

  return label;
}
