"use client";

import Link from "next/link";
import { NftCard } from "./NftCard";
import { useWalletNfts } from "@/hooks/useWalletNfts";
import { useWallet } from "@solana/wallet-adapter-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CollectionPage() {
  const { connected } = useWallet();
  const { data: nfts, isLoading, isError, error } = useWalletNfts();

  const bulls = nfts?.filter((n) => !n.isTesseract) ?? [];
  const tesseracts = nfts?.filter((n) => n.isTesseract) ?? [];

  return (
    <ScrollArea className="h-full">
      <div className="p-5 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-base tracking-widest uppercase text-white">
            Your Collection
            {nfts && (
              <span className="ml-2 text-[10px] text-bc-gray3">
                ({bulls.length} bulls{tesseracts.length > 0 ? ` · ${tesseracts.length} tesseracts` : ""})
              </span>
            )}
          </h1>
          <Link
            href="/dashboard"
            className="text-[10px] border border-bc-border2 text-white px-3 py-1.5 tracking-widest uppercase hover:border-bc-pink hover:text-bc-pink transition-all"
          >
            Back
          </Link>
        </div>

        {/* Not connected */}
        {!connected && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="text-bc-gray3 text-xs tracking-widest uppercase">Connect your wallet to view your collection</p>
            <Link href="/connect" className="text-[10px] border border-bc-pink text-bc-pink px-4 py-2 tracking-widest uppercase hover:bg-bc-pink hover:text-white transition-all">
              Connect Wallet
            </Link>
          </div>
        )}

        {/* Loading */}
        {connected && isLoading && (
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-sm border border-bc-border bg-bc-card animate-pulse" />
            ))}
          </div>
        )}

        {/* Error */}
        {connected && isError && (
          <div className="flex flex-col items-center justify-center py-20 gap-2">
            <p className="text-bc-pink text-xs tracking-widest uppercase">Failed to load collection</p>
            <p className="text-bc-gray3 text-[10px]">{error?.message}</p>
            <p className="text-bc-gray3 text-[10px] tracking-wider uppercase mt-1">
              Add <code className="text-white">HELIUS_API_KEY</code> to .env.local for NFT fetching
            </p>
          </div>
        )}

        {/* Empty */}
        {connected && !isLoading && !isError && nfts?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-2">
            <p className="text-bc-gray3 text-xs tracking-widest uppercase">No Bull Club NFTs found in this wallet</p>
          </div>
        )}

        {/* Grid */}
        {connected && !isLoading && bulls.length > 0 && (
          <>
            <div className="grid grid-cols-5 gap-2">
              {bulls.map((nft) => (
                <NftCard
                  key={nft.mint}
                  tokenId={nft.tokenId}
                  paletteIdx={nft.paletteIdx}
                  tesseractBonded={nft.tesseractBonded}
                  imageUrl={nft.imageUrl}
                  href={`/collection/${nft.tokenId}`}
                />
              ))}
              {tesseracts.map((nft) => (
                <NftCard
                  key={nft.mint}
                  tokenId="TESSERACT"
                  paletteIdx={13}
                  isTesseract
                  quantity={tesseracts.length}
                  href="/collection/tesseract"
                />
              ))}
            </div>
          </>
        )}
      </div>
    </ScrollArea>
  );
}
