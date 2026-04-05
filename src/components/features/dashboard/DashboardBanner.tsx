"use client";

import { useState, useEffect, useCallback } from "react";

const SLIDES = [
  {
    src: "/images/banners/slide-bullclub.png",
    alt: "The Bull Club 2.0",
  },
  {
    src: "/images/banners/slide-toxxxify.png",
    alt: "Toxxxify – Bull Club Event",
  },
  {
    src: "/images/banners/slide-allroads.png",
    alt: "All Roads Lead To The Virtual Bull Club",
  },
];

const INTERVAL = 4000;

export function DashboardBanner() {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-sm border border-bc-border" style={{ height: 214 }}>
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          aria-hidden={i !== current}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${slide.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: i === current ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />
      ))}

      {/* Dot navigation */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              i === current ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Scanline overlay */}
      <div className="absolute inset-0 scanlines z-10 pointer-events-none opacity-30" />
    </div>
  );
}
