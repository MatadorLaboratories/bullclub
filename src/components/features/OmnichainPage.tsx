"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CHAINS } from "@/lib/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Step = 1 | 2 | 3;

export function OmnichainPage() {
  const searchParams = useSearchParams();
  const nftId = searchParams.get("nft");
  const [step, setStep] = useState<Step>(1);
  const [selectedChain, setSelectedChain] = useState("solana");
  const [targetChain, setTargetChain] = useState<string | null>(null);

  const currentChain = "SOLANA";

  const handleNext = () => {
    if (step === 1 && !targetChain) {
      toast.error("Please select a destination chain");
      return;
    }
    if (step === 3) {
      toast.success(`Bull ported to ${targetChain?.toUpperCase()}!`);
      return;
    }
    setStep((s) => (s + 1) as Step);
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-5 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-base tracking-widest uppercase">Omnichain Portal</h1>
          <div className="flex gap-2">
            <button
              className="text-[10px] border border-bc-border2 text-white px-3 py-1.5 tracking-widest uppercase hover:border-bc-pink hover:text-bc-pink transition-all"
              onClick={() => toast.info("Switch chain in wallet")}
            >
              Switch Chain
            </button>
            <Link
              href={nftId ? `/collection/${nftId}` : "/collection"}
              className="text-[10px] border border-bc-border2 text-white px-3 py-1.5 tracking-widest uppercase hover:border-bc-pink hover:text-bc-pink transition-all"
            >
              Back
            </Link>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-[10px] text-bc-pink uppercase tracking-widest font-bold">
            Step {step}
          </span>
          <span className="text-[10px] text-white uppercase tracking-widest">
            {step === 1 && "Select Chain to Port to"}
            {step === 2 && "Select Your Bull"}
            {step === 3 && "Confirm Transaction"}
          </span>
        </div>

        {step === 1 && (
          <ChainSelectStep
            targetChain={targetChain}
            setTargetChain={setTargetChain}
            currentChain={currentChain}
          />
        )}
        {step === 2 && <BullSelectStep nftId={nftId} />}
        {step === 3 && (
          <ConfirmStep
            currentChain={currentChain}
            targetChain={targetChain ?? ""}
            nftId={nftId}
          />
        )}

        {/* Nav */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-[9px] text-bc-gray3 uppercase tracking-widest">
            You are connected to {currentChain}
          </p>
          <div className="flex items-center gap-3">
            {/* Step dots */}
            <div className="flex gap-1.5">
              {([1, 2, 3] as Step[]).map((s) => (
                <div
                  key={s}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    s === step ? "bg-white" : s < step ? "bg-bc-pink" : "bg-bc-border2"
                  )}
                />
              ))}
            </div>
            {step > 1 && (
              <button
                onClick={() => setStep((s) => (s - 1) as Step)}
                className="px-4 py-2 text-[10px] tracking-widest uppercase border border-bc-border2 text-white hover:border-white transition-all"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-6 py-2 text-[10px] tracking-widest uppercase border border-bc-pink text-bc-pink hover:bg-bc-pink hover:text-white transition-all"
            >
              {step === 3 ? "Confirm Port" : "Next Step"}
            </button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

function ChainSelectStep({
  targetChain,
  setTargetChain,
  currentChain,
}: {
  targetChain: string | null;
  setTargetChain: (c: string) => void;
  currentChain: string;
}) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {CHAINS.map((chain) => {
        const isCurrent = chain.id.toUpperCase() === currentChain;
        const isSelected = targetChain === chain.id;
        return (
          <button
            key={chain.id}
            onClick={() => !isCurrent && setTargetChain(chain.id)}
            disabled={isCurrent}
            className={cn(
              "relative border rounded-sm p-4 flex flex-col items-center gap-2 transition-all",
              isSelected
                ? "border-bc-pink bg-bc-pink/10"
                : isCurrent
                ? "border-bc-border bg-bc-panel2 opacity-60 cursor-not-allowed"
                : "border-bc-border bg-bc-panel2 hover:border-bc-border2 hover:bg-bc-card"
            )}
          >
            {isCurrent && (
              <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[7px] bg-bc-pink text-white px-1.5 py-0.5 rounded-sm uppercase tracking-wider whitespace-nowrap">
                Current
              </span>
            )}
            <ChainIcon chainId={chain.id} color={chain.color} />
            <span className="text-[9px] text-white uppercase tracking-widest">{chain.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function BullSelectStep({ nftId }: { nftId: string | null }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-[10px] text-bc-gray3 uppercase tracking-wider">
        {nftId ? `Porting Bull Club #${nftId}` : "Select a bull from your collection to port"}
      </p>
      <div className="border border-bc-pink rounded-sm p-4 bg-bc-pink/5">
        <div className="w-[160px] h-[180px] rounded-sm overflow-hidden relative bg-gradient-to-br from-[#6b1aa0] to-[#e040fb]">
          <div className="absolute inset-0 flex items-center justify-center">
            <BullSvg />
          </div>
          <div className="absolute bottom-2 left-2">
            <span className="text-[11px] font-bold text-white">#{nftId ?? "77"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfirmStep({
  currentChain,
  targetChain,
  nftId,
}: {
  currentChain: string;
  targetChain: string;
  nftId: string | null;
}) {
  const targetInfo = CHAINS.find((c) => c.id === targetChain);
  return (
    <div className="flex flex-col gap-3 max-w-md">
      <div className="border border-bc-border2 bg-bc-panel2 rounded-sm p-4 flex flex-col gap-2">
        <p className="text-[9px] text-bc-gray3 uppercase tracking-widest">Porting</p>
        <p className="text-xs text-white uppercase tracking-wide font-bold">
          Bull Club #{nftId ?? "77"}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="border border-bc-border bg-bc-panel2 rounded-sm p-3 flex flex-col gap-1 items-center">
          <p className="text-[8px] text-bc-gray3 uppercase tracking-widest">From</p>
          <p className="text-xs font-bold text-white uppercase">{currentChain}</p>
        </div>
        <div className="border border-bc-pink/40 bg-bc-pink/5 rounded-sm p-3 flex flex-col gap-1 items-center">
          <p className="text-[8px] text-bc-gray3 uppercase tracking-widest">To</p>
          <ChainIcon chainId={targetChain} color={targetInfo?.color ?? "#e8185a"} />
          <p className="text-xs font-bold text-bc-pink uppercase">{targetInfo?.label}</p>
        </div>
      </div>
      <div className="border border-bc-border2 bg-bc-panel2 rounded-sm p-3">
        <p className="text-[9px] text-bc-gray3 uppercase tracking-widest mb-1">Note</p>
        <p className="text-[10px] text-bc-gray4 uppercase tracking-wider leading-relaxed">
          This transaction will require a small gas fee. Your bull will be temporarily locked
          during the bridging process (~2-5 minutes).
        </p>
      </div>
    </div>
  );
}

function ChainIcon({ chainId, color }: { chainId: string; color: string }) {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10"
      style={{ background: `${color}22` }}
    >
      <span className="text-[11px] font-bold uppercase" style={{ color }}>
        {chainId.slice(0, 2).toUpperCase()}
      </span>
    </div>
  );
}

function BullSvg() {
  return (
    <svg width="55%" height="55%" viewBox="0 0 60 55" fill="rgba(255,255,255,0.22)">
      <path d="M8 18 C2 12, 2 4, 8 6 L12 14 C14 8, 18 4, 22 6 L20 16 C24 12, 36 12, 40 16 L38 6 C42 4, 46 8, 48 14 L52 6 C58 4, 58 12, 52 18 L50 22 C54 26, 54 32, 50 36 L48 44 C44 50, 16 50, 12 44 L10 36 C6 32, 6 26, 10 22 Z" />
      <ellipse cx="20" cy="8" rx="4" ry="8" transform="rotate(-15 20 8)" />
      <ellipse cx="40" cy="8" rx="4" ry="8" transform="rotate(15 40 8)" />
    </svg>
  );
}
