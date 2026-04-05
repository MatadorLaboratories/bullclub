"use client";

import { useQuery } from "@tanstack/react-query";
import { useWallet } from "@solana/wallet-adapter-react";
import type { BullNft } from "@/lib/solana/das";

async function fetchNfts(wallet: string): Promise<BullNft[]> {
  const res = await fetch(`/api/nfts?wallet=${encodeURIComponent(wallet)}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Failed to fetch NFTs");
  return data.nfts as BullNft[];
}

export function useWalletNfts() {
  const { publicKey, connected } = useWallet();
  const walletAddress = publicKey?.toBase58();

  return useQuery<BullNft[], Error>({
    queryKey: ["wallet-nfts", walletAddress],
    queryFn: () => fetchNfts(walletAddress!),
    enabled: connected && !!walletAddress,
    staleTime: 5 * 60 * 1000,   // 5 min
    gcTime: 10 * 60 * 1000,     // 10 min
    retry: 2,
  });
}
