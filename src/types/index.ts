// ─────────────────────────────────────────────
// App Types
// ─────────────────────────────────────────────

export type Chain =
  | "solana"
  | "ethereum"
  | "polygon"
  | "bnb"
  | "avalanche"
  | "optimism"
  | "arbitrum"
  | "aptos"
  | "terra";

export type Dimension = "2D" | "3D";

export interface NFTTrait {
  value: string;
  rarity: number;
}

export interface NFTTraits {
  background?: NFTTrait;
  body?: NFTTrait;
  eyes?: NFTTrait;
  headgear?: NFTTrait;
  horns?: NFTTrait;
  outfit?: NFTTrait;
  nose?: NFTTrait;
  "nose piece"?: NFTTrait;
  [key: string]: NFTTrait | undefined;
}

export interface NFT {
  id: string;
  tokenId: string;
  name: string;
  imageUrl?: string | null;
  currentChain: Chain;
  genesisChain: Chain;
  tesseractBonded: boolean;
  activeDimension: Dimension;
  traits?: NFTTraits | null;
  mintAddress?: string | null;
}

export interface UserProfile {
  id: string;
  username?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
  twitterHandle?: string | null;
  discordHandle?: string | null;
  primaryWallet?: string | null;
  notifyNewsletter: boolean;
  notifyRaffles: boolean;
  anonymousInChat: boolean;
  wallets: ConnectedWallet[];
  bullPoints?: BullPointsData | null;
  collection?: NFT[];
}

export interface ConnectedWallet {
  id: string;
  address: string;
  chain: Chain;
  isPrimary: boolean;
}

export interface BullPointsData {
  currentPoints: number;
  totalEarned: number;
  dailyPoints: number;
  rank: number;
  totalRanked: number;
  bullsOwned: number;
  reppingOnX: boolean;
}

export interface Raffle {
  id: string;
  title: string;
  description?: string | null;
  prizeImageUrl?: string | null;
  pointCost: number;
  maxPointsPerWallet?: number | null;
  totalEntries: number;
  winners: number;
  status: "active" | "completed" | "cancelled";
  endsAt: Date | string;
  myEntries?: number;
  myResult?: "win" | "loss" | "pending" | null;
}

export interface Airdrop {
  id: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  tier: number;
  chain: Chain;
  status: "upcoming" | "active" | "completed";
  minimumBulls: number;
  claimsAt?: Date | string | null;
  eligibility?: "eligible" | "ineligible" | "claimed" | null;
}

export interface ChatMessage {
  id: string;
  username: string;
  avatarUrl?: string | null;
  content: string;
  createdAt: Date | string;
  bullsOwned?: number;
}

export interface LeaderboardEntry {
  rank: number;
  wallet: string;
  points: number;
  isCurrentUser?: boolean;
}

export interface PointsEarningMethod {
  icon: string;
  label: string;
  amount: number;
  period: "day" | "once" | "per";
}

// NFT color palette for UI (generated, not real images)
export type NftColorKey =
  | "purple"
  | "blue"
  | "teal"
  | "orange"
  | "pink"
  | "indigo"
  | "yellow"
  | "cyan"
  | "deepPurple"
  | "red"
  | "green"
  | "gray";
