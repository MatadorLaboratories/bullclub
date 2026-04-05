"use client";

import Link from "next/link";
import Image from "next/image";
import { useWalletNfts } from "@/hooks/useWalletNfts";
import { useWallet } from "@solana/wallet-adapter-react";
import { NFT_PALETTES } from "@/lib/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function NftDetailPage({ tokenId }: { tokenId: string }) {
  const { connected } = useWallet();
  const { data: nfts, isLoading } = useWalletNfts();
  const isTesseract = tokenId === "tesseract";

  const nft = nfts?.find((n) => n.tokenId === tokenId);
  const paletteIdx = nft?.paletteIdx ?? (parseInt(tokenId, 10) || 0) % 15;
  const palette = NFT_PALETTES[paletteIdx % NFT_PALETTES.length]!;

  const traits = nft?.attributes?.filter(
    (a) => typeof a.value === "string" && a.value !== "" && a.value !== "None"
  ) ?? [];

  const chainName = (nft?.currentChain ?? "solana").toUpperCase();
  const genesisChain = (nft?.genesisChain ?? "solana").toUpperCase();

  return (
    <ScrollArea className="h-full">
      <div className="p-5 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-base tracking-widest uppercase">Your Collection</h1>
          <Link
            href="/collection"
            className="text-[10px] border border-bc-border2 text-white px-3 py-1.5 tracking-widest uppercase hover:border-bc-pink hover:text-bc-pink transition-all"
          >
            Back
          </Link>
        </div>

        {/* Loading */}
        {connected && isLoading && (
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="w-[200px] h-[220px] rounded-sm border border-bc-border bg-bc-card animate-pulse flex-shrink-0" />
              <div className="flex-1 grid grid-cols-2 gap-1.5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-12 rounded-sm border border-bc-border bg-bc-card animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Not found / not connected */}
        {!isLoading && !nft && !isTesseract && (
          <div className="flex flex-col items-center justify-center py-20 gap-2">
            <p className="text-bc-gray3 text-xs tracking-widest uppercase">
              {connected ? `Bull #${tokenId} not found in your wallet` : "Connect your wallet to view NFT details"}
            </p>
          </div>
        )}

        {/* Content: real NFT or tesseract */}
        {(nft || isTesseract) && !isLoading && (
          <div className="flex gap-4">
            {/* NFT Image */}
            <div className="flex-shrink-0 flex flex-col gap-2">
              <div
                className="w-[200px] h-[220px] rounded-sm border border-bc-border overflow-hidden relative"
                style={{
                  background: isTesseract
                    ? "linear-gradient(145deg, #0d1b4b, #1a237e)"
                    : `linear-gradient(145deg, ${palette.from}, ${palette.to})`,
                }}
              >
                {/* Real NFT image */}
                {nft?.imageUrl && (
                  <Image
                    src={nft.imageUrl}
                    alt={`Bull #${tokenId}`}
                    fill
                    className="object-cover"
                    sizes="200px"
                    unoptimized={nft.imageUrl.startsWith("http")}
                  />
                )}

                {/* Local fallback image */}
                {!nft?.imageUrl && !isTesseract && (
                  <Image
                    src={`/images/bulls/${tokenId}.jpg`}
                    alt={`Bull #${tokenId}`}
                    fill
                    className="object-cover"
                    sizes="200px"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}

                {/* Tesseract art */}
                {isTesseract && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <TesseractSvg />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-b from-white/8 via-transparent to-black/20 pointer-events-none" />
                <div className="absolute top-2 left-2">
                  <span className="text-[8px] text-white/60 bg-black/40 px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                    {isTesseract ? "TESSERACT" : "BULL CLUB"}
                  </span>
                </div>
                <div className="absolute bottom-2 left-2">
                  <span className="text-[11px] font-bold text-white">
                    #{isTesseract ? "TESSERACT" : tokenId}
                  </span>
                </div>
              </div>

              {/* External links */}
              {nft && (
                <div>
                  <p className="text-[8px] text-bc-gray3 uppercase tracking-wider mb-1.5">View on Market</p>
                  <div className="flex gap-2">
                    <MarketBtn
                      href={`https://magiceden.io/item-details/${nft.mint}`}
                      label="Magic Eden"
                    >
                      <span className="text-[10px] font-bold">ME</span>
                    </MarketBtn>
                    <MarketBtn
                      href={`https://www.tensor.trade/item/${nft.mint}`}
                      label="Tensor"
                    >
                      <TensorArrow />
                    </MarketBtn>
                    <MarketBtn
                      href={`https://solscan.io/token/${nft.mint}`}
                      label="Solscan"
                    >
                      <span className="text-[8px] font-bold text-bc-gray3">SCAN</span>
                    </MarketBtn>
                  </div>
                </div>
              )}
            </div>

            {/* Right panel */}
            <div className="flex-1 flex flex-col gap-3 min-w-0">
              {/* Traits grid — real data from DAS */}
              {traits.length > 0 ? (
                <div className="grid grid-cols-2 gap-1.5">
                  {traits.map((trait) => (
                    <div key={String(trait.trait_type)} className="border border-bc-border bg-bc-panel2 rounded-sm p-2">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[8px] text-bc-gray3 uppercase tracking-wider truncate pr-1">
                          {trait.trait_type}
                        </span>
                      </div>
                      <span className="text-[9px] text-white uppercase tracking-wide truncate block">
                        {String(trait.value)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                /* No real traits yet — show placeholder cells */
                <div className="grid grid-cols-2 gap-1.5">
                  {["Background", "Body", "Eyes", "Headgear", "Horns", "Outfit", "Nose", "Nose Piece"].map((key) => (
                    <div key={key} className="border border-bc-border bg-bc-panel2 rounded-sm p-2 opacity-40">
                      <span className="text-[8px] text-bc-gray3 uppercase tracking-wider block mb-0.5">{key}</span>
                      <span className="text-[9px] text-white/40 uppercase tracking-wide">—</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Chain info */}
              {nft && (
                <div className="grid grid-cols-2 gap-1.5">
                  <ChainCell label="Current Chain" value={chainName} />
                  <ChainCell label="Genesis Chain" value={genesisChain} />
                  <ChainCell
                    label="Tesseract Bonded"
                    value={nft.tesseractBonded ? "YES" : "NO"}
                    valueColor={nft.tesseractBonded ? "text-bc-green" : "text-bc-gray3"}
                  />
                  <ChainCell
                    label="Active Dimension"
                    value={nft.activeDimension}
                    valueColor="text-white"
                  />
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-2 mt-1">
                <Link
                  href={`/omnichain?nft=${tokenId}`}
                  className="flex-1 text-center py-2 text-[10px] tracking-widest uppercase border border-bc-border2 text-white hover:border-bc-pink hover:text-bc-pink transition-all"
                >
                  Switch Chain
                </Link>
                <Link
                  href={`/bond?nft=${tokenId}`}
                  className="flex-1 text-center py-2 text-[10px] tracking-widest uppercase border border-bc-pink text-bc-pink hover:bg-bc-pink hover:text-white transition-all"
                >
                  Interchange
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}

function ChainCell({
  label,
  value,
  valueColor = "text-white",
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div className="border border-bc-border bg-bc-panel2 rounded-sm p-2">
      <span className="text-[8px] text-bc-gray3 uppercase tracking-wider block mb-0.5">{label}</span>
      <span className={cn("text-[10px] font-bold uppercase tracking-wide", valueColor)}>{value}</span>
    </div>
  );
}

function MarketBtn({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 border border-bc-border2 flex items-center justify-center hover:border-bc-pink transition-all text-white rounded-sm"
    >
      {children}
    </a>
  );
}

function TesseractSvg() {
  return (
    <svg width="55%" height="55%" viewBox="0 0 60 60" fill="none">
      <polygon points="30,4 54,18 54,42 30,56 6,42 6,18" stroke="rgba(100,180,255,0.8)" strokeWidth="1.5" fill="rgba(41,121,255,0.1)" />
      <polygon points="30,16 44,24 44,36 30,44 16,36 16,24" stroke="rgba(100,180,255,0.6)" strokeWidth="1" fill="rgba(41,121,255,0.15)" />
      <line x1="30" y1="4" x2="30" y2="16" stroke="rgba(100,180,255,0.5)" strokeWidth="1" />
      <line x1="54" y1="18" x2="44" y2="24" stroke="rgba(100,180,255,0.5)" strokeWidth="1" />
      <line x1="54" y1="42" x2="44" y2="36" stroke="rgba(100,180,255,0.5)" strokeWidth="1" />
      <line x1="30" y1="56" x2="30" y2="44" stroke="rgba(100,180,255,0.5)" strokeWidth="1" />
      <line x1="6" y1="42" x2="16" y2="36" stroke="rgba(100,180,255,0.5)" strokeWidth="1" />
      <line x1="6" y1="18" x2="16" y2="24" stroke="rgba(100,180,255,0.5)" strokeWidth="1" />
      <circle cx="30" cy="30" r="5" fill="rgba(100,180,255,0.9)" />
      <circle cx="30" cy="30" r="10" fill="rgba(100,180,255,0.15)" />
    </svg>
  );
}

function TensorArrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
      <polyline points="12 4 20 12 12 20" />
      <line x1="4" y1="12" x2="20" y2="12" />
    </svg>
  );
}
