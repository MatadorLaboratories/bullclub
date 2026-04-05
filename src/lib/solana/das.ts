// Bull Club collection address (base58)
// Derived from hex: 8b5d295ba093760e4205352e954b635e9371f3fb09d76114a7c409284214cc75
export const BULL_COLLECTION_ADDRESS = "AP24dPG4avaGzopWSnPx56ib8B2wYWFFw6FR5FTzBWRJ";

export interface BullNft {
  tokenId: string;
  mint: string;
  name: string;
  imageUrl: string;
  attributes: Array<{ trait_type: string; value: string | number }>;
  isTesseract: boolean;
  tesseractBonded: boolean;
  activeDimension: "2D" | "3D";
  currentChain: string;
  genesisChain: string;
  paletteIdx: number;
}

// Called server-side from the API route
export async function fetchWalletBulls(walletAddress: string, debug = false): Promise<BullNft[]> {
  const heliusKey = process.env.HELIUS_API_KEY;

  // Reject obvious placeholder values
  const isRealKey =
    heliusKey &&
    heliusKey !== "your_helius_api_key" &&
    heliusKey.length > 10;

  if (!isRealKey) {
    throw new Error(
      "HELIUS_API_KEY is not configured. Get a free key at https://helius.dev and add it to .env.local"
    );
  }

  const rpcUrl = `https://mainnet.helius-rpc.com/?api-key=${heliusKey}`;

  const res = await fetch(rpcUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "bull-club-nfts",
      method: "getAssetsByOwner",
      params: {
        ownerAddress: walletAddress,
        page: 1,
        limit: 1000,
        displayOptions: { showFungible: false, showNativeBalance: false },
      },
    }),
  });

  if (!res.ok) throw new Error(`RPC request failed: ${res.status}`);

  const data = await res.json();
  if (data.error) throw new Error(data.error.message ?? "RPC error");

  const items: any[] = data.result?.items ?? [];

  // Debug mode: return a summary of all NFTs and their collection addresses
  if (debug) {
    const summary = items.map((item) => ({
      name: item.content?.metadata?.name ?? "unknown",
      mint: item.id,
      collections: item.grouping?.filter((g: any) => g.group_key === "collection").map((g: any) => g.group_value) ?? [],
    }));
    // Return as an error so it surfaces in the API response
    throw new Error("DEBUG: " + JSON.stringify(summary.slice(0, 20)));
  }

  // Filter to Bull Club collection
  const bulls = items.filter((item) =>
    item.grouping?.some(
      (g: any) => g.group_key === "collection" && g.group_value === BULL_COLLECTION_ADDRESS
    )
  );

  return bulls.map((item, idx) => {
    const name: string = item.content?.metadata?.name ?? "";
    const tokenIdMatch = name.match(/#(\d+)/);
    const tokenId = tokenIdMatch?.[1] ?? String(idx + 1);

    // Prefer Helius CDN URI (fast), fall back to original, then local copy
    const imageUrl: string =
      item.content?.files?.[0]?.cdn_uri ??
      item.content?.files?.[0]?.uri ??
      item.content?.links?.image ??
      `/images/bulls/${tokenId}.jpg`;

    const attributes: BullNft["attributes"] = item.content?.metadata?.attributes ?? [];

    const getAttribute = (key: string, fallback = "") =>
      String(attributes.find((a) => a.trait_type === key)?.value ?? fallback);

    const isTesseract = name.toLowerCase().includes("tesseract");
    const tesseractBonded =
      getAttribute("Tesseract", "None").toLowerCase() !== "none" &&
      getAttribute("Tesseract", "None") !== "";

    const activeDimension = (getAttribute("Dimension", "2D") === "3D" ? "3D" : "2D") as "2D" | "3D";

    return {
      tokenId,
      mint: item.id,
      name,
      imageUrl,
      attributes,
      isTesseract,
      tesseractBonded,
      activeDimension,
      currentChain: "solana",
      genesisChain: "solana",
      paletteIdx: (parseInt(tokenId, 10) || idx) % 15,
    };
  });
}
