import type { PointsEarningMethod } from "@/types";

export const BULL_POINTS_METHODS: PointsEarningMethod[] = [
  { icon: "bull", label: "HODL BULLS (PER BULL)", amount: 50, period: "day" },
  { icon: "x", label: "REP BULL AS DP ON X", amount: 100, period: "day" },
  { icon: "x", label: "RETWEET @THEBULLCLUBNFT TWEETS", amount: 100, period: "once" },
  { icon: "x", label: "COMMENT @THEBULLCLUBNFT TWEETS", amount: 100, period: "once" },
  { icon: "x", label: "LIKE @THEBULLCLUBNFT TWEETS", amount: 50, period: "once" },
  {
    icon: "x",
    label: "JOIN RAIDS + POST YOUR BULLS IN TWEET RAIDS",
    amount: 100,
    period: "once",
  },
  { icon: "discord", label: "LEVEL UP IN DISCORD (PER LEVEL)", amount: 250, period: "once" },
  {
    icon: "magiceden",
    label: "PAY CREATOR ROYALTIES WHEN BUYING BULL",
    amount: 1000,
    period: "once",
  },
];

export const CHAINS = [
  { id: "solana", label: "SOLANA", color: "#9945ff" },
  { id: "ethereum", label: "ETHEREUM", color: "#627eea" },
  { id: "polygon", label: "POLYGON", color: "#8247e5" },
  { id: "bnb", label: "BNB CHAIN", color: "#f3ba2f" },
  { id: "avalanche", label: "AVALANCHE", color: "#e84142" },
  { id: "optimism", label: "OPTIMISM", color: "#ff0420" },
  { id: "arbitrum", label: "ARBITRUM", color: "#2d374b" },
  { id: "aptos", label: "APTOS", color: "#00c6c6" },
] as const;

// Mock NFT gradient palettes for display
export const NFT_PALETTES = [
  { from: "#6b1aa0", to: "#e040fb", label: "BULL CLUB" }, // purple
  { from: "#0d47a1", to: "#42a5f5", label: "BULL CLUB" }, // blue
  { from: "#004d40", to: "#26a69a", label: "BULL CLUB" }, // teal
  { from: "#e65100", to: "#ff8f00", label: "BULL CLUB" }, // orange
  { from: "#880e4f", to: "#e91e63", label: "BULL CLUB" }, // pink
  { from: "#1a237e", to: "#5c6bc0", label: "BULL CLUB" }, // indigo
  { from: "#827717", to: "#ffca28", label: "BULL CLUB" }, // yellow
  { from: "#006064", to: "#26c6da", label: "BULL CLUB" }, // cyan
  { from: "#4a148c", to: "#7b1fa2", label: "BULL CLUB" }, // deep purple
  { from: "#b71c1c", to: "#ef5350", label: "BULL CLUB" }, // red
  { from: "#1b5e20", to: "#43a047", label: "BULL CLUB" }, // green
  { from: "#37474f", to: "#78909c", label: "BULL CLUB" }, // blue gray
  { from: "#bf360c", to: "#ff5722", label: "BULL CLUB" }, // deep orange
  { from: "#311b92", to: "#9575cd", label: "BULL CLUB" }, // purple2
  { from: "#006064", to: "#00897b", label: "BULL CLUB" }, // teal2
] as const;

export const MOCK_CHAT_MESSAGES = [
  {
    id: "1",
    username: "WAGMI",
    content: "Anyone got a tesseract they want to OTC trade?",
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
    bullsOwned: 3,
  },
  {
    id: "2",
    username: "STEVEN12",
    content: "Bought another bull!!!",
    createdAt: new Date(Date.now() - 1000 * 60 * 4),
    bullsOwned: 7,
  },
  {
    id: "3",
    username: "FIZZY",
    content: "so based gmi",
    createdAt: new Date(Date.now() - 1000 * 60 * 3),
    bullsOwned: 12,
    isCurrentUser: true,
  },
  {
    id: "4",
    username: "TZM",
    content: "gm bulls!",
    createdAt: new Date(Date.now() - 1000 * 60 * 2),
    bullsOwned: 4,
  },
  {
    id: "5",
    username: "BABYBULL",
    content: "wow $btc is at $100k holy shit",
    createdAt: new Date(Date.now() - 1000 * 60),
    bullsOwned: 1,
  },
  {
    id: "6",
    username: "BULL 2102",
    content: "gm bulls!",
    createdAt: new Date(),
    bullsOwned: 2,
  },
];

export const MOCK_COLLECTION = [
  { tokenId: "77", paletteIdx: 0, tesseractBonded: true, activeDimension: "3D" as const, currentChain: "polygon" as const, genesisChain: "terra" as const },
  { tokenId: "1234", paletteIdx: 1, tesseractBonded: false, activeDimension: "2D" as const, currentChain: "solana" as const, genesisChain: "solana" as const },
  { tokenId: "4123", paletteIdx: 2, tesseractBonded: false, activeDimension: "2D" as const, currentChain: "solana" as const, genesisChain: "solana" as const },
  { tokenId: "7567", paletteIdx: 4, tesseractBonded: true, activeDimension: "3D" as const, currentChain: "ethereum" as const, genesisChain: "solana" as const },
  { tokenId: "9878", paletteIdx: 3, tesseractBonded: false, activeDimension: "2D" as const, currentChain: "solana" as const, genesisChain: "solana" as const },
  { tokenId: "2345", paletteIdx: 5, tesseractBonded: false, activeDimension: "2D" as const, currentChain: "solana" as const, genesisChain: "solana" as const },
  { tokenId: "6264", paletteIdx: 6, tesseractBonded: false, activeDimension: "2D" as const, currentChain: "solana" as const, genesisChain: "solana" as const },
  { tokenId: "5623", paletteIdx: 7, tesseractBonded: true, activeDimension: "2D" as const, currentChain: "polygon" as const, genesisChain: "solana" as const },
  { tokenId: "7334", paletteIdx: 8, tesseractBonded: false, activeDimension: "2D" as const, currentChain: "solana" as const, genesisChain: "solana" as const },
  { tokenId: "5422", paletteIdx: 9, tesseractBonded: false, activeDimension: "2D" as const, currentChain: "solana" as const, genesisChain: "solana" as const },
  { tokenId: "5912", paletteIdx: 10, tesseractBonded: false, activeDimension: "2D" as const, currentChain: "solana" as const, genesisChain: "solana" as const },
  { tokenId: "4111", paletteIdx: 11, tesseractBonded: false, activeDimension: "2D" as const, currentChain: "solana" as const, genesisChain: "solana" as const },
];

export const MOCK_RAFFLES = [
  {
    id: "r1",
    title: "Bull Club #6733",
    prizeImageUrl: null,
    paletteIdx: 0,
    pointCost: 1,
    myEntries: 1750,
    totalEntries: 122345,
    winners: 1,
    status: "active" as const,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
  },
  {
    id: "r2",
    title: "Tesseract",
    prizeImageUrl: null,
    paletteIdx: 13,
    pointCost: 1,
    myEntries: 0,
    totalEntries: 45000,
    winners: 1,
    status: "active" as const,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
  },
  {
    id: "r3",
    title: "Bull Club #6733",
    prizeImageUrl: null,
    paletteIdx: 2,
    pointCost: 1,
    myEntries: 11350,
    totalEntries: 200000,
    winners: 1,
    status: "active" as const,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 180),
  },
  {
    id: "r4",
    title: "Bull Club Coffee",
    prizeImageUrl: null,
    paletteIdx: 4,
    pointCost: 1,
    myEntries: 500,
    totalEntries: 8000,
    winners: 10,
    status: "active" as const,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 110),
  },
  // Past
  {
    id: "r5",
    title: "YGRT #5791",
    prizeImageUrl: null,
    paletteIdx: 6,
    pointCost: 1,
    myEntries: 200,
    totalEntries: 30000,
    winners: 1,
    status: "completed" as const,
    endsAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    myResult: "loss" as const,
  },
  {
    id: "r6",
    title: "Tesseract",
    prizeImageUrl: null,
    paletteIdx: 13,
    pointCost: 1,
    myEntries: 500,
    totalEntries: 20000,
    winners: 1,
    status: "completed" as const,
    endsAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    myResult: "loss" as const,
  },
  {
    id: "r7",
    title: "PPF #8164",
    prizeImageUrl: null,
    paletteIdx: 3,
    pointCost: 1,
    myEntries: 100,
    totalEntries: 15000,
    winners: 1,
    status: "completed" as const,
    endsAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    myResult: "loss" as const,
  },
  {
    id: "r8",
    title: "Bull Club #8134",
    prizeImageUrl: null,
    paletteIdx: 8,
    pointCost: 1,
    myEntries: 300,
    totalEntries: 50000,
    winners: 1,
    status: "completed" as const,
    endsAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
    myResult: "win" as const,
  },
];

export const MOCK_AIRDROPS: Array<{
  id: string;
  title: string;
  tier: number;
  chain: string;
  status: "upcoming" | "active" | "completed";
  eligibility: "eligible" | "ineligible" | "claimed";
  minimumBulls: number;
  claimsAt: null | string;
  paletteIdx: number;
}> = [
  {
    id: "a1",
    title: "Toxic Tesseract",
    tier: 1,
    chain: "solana",
    status: "upcoming",
    eligibility: "eligible",
    minimumBulls: 1,
    claimsAt: null,
    paletteIdx: 10,
  },
  {
    id: "a2",
    title: "Toxxic Tesseract",
    tier: 2,
    chain: "solana",
    status: "upcoming",
    eligibility: "ineligible",
    minimumBulls: 3,
    claimsAt: null,
    paletteIdx: 4,
  },
  {
    id: "a3",
    title: "Toxxxic Tesseract",
    tier: 3,
    chain: "solana",
    status: "upcoming",
    eligibility: "ineligible",
    minimumBulls: 5,
    claimsAt: null,
    paletteIdx: 3,
  },
];

export const MOCK_LEADERBOARD = [
  { rank: 139, wallet: "SKVOS...122103", points: 49710, isCurrentUser: true },
  { rank: 1, wallet: "SBNIS...12GAS2", points: 2950 },
  { rank: 2, wallet: "SJ1BE...A12SN", points: 2950 },
  { rank: 3, wallet: "SKVOS...12385I", points: 2950 },
  { rank: 4, wallet: "SK2NF...1238NM", points: 2950 },
  { rank: 5, wallet: "SY84L...ASCD6S5", points: 2950 },
  { rank: 6, wallet: "SBNIS...12GAS2", points: 2950 },
  { rank: 7, wallet: "SJ1BE...A12SN", points: 2950 },
  { rank: 8, wallet: "SKVOS...12385I", points: 2950 },
  { rank: 9, wallet: "SK2NF...1238NM", points: 2950 },
  { rank: 10, wallet: "SY84L...ASCD6S5", points: 2950 },
];
