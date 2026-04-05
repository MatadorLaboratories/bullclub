import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  uuid,
  varchar,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ─────────────────────────────────────────────
// Enums
// ─────────────────────────────────────────────
export const raffleStatusEnum = pgEnum("raffle_status", [
  "active",
  "completed",
  "cancelled",
]);
export const raffleResultEnum = pgEnum("raffle_result", ["win", "loss", "pending"]);
export const airdropStatusEnum = pgEnum("airdrop_status", [
  "upcoming",
  "active",
  "completed",
]);
export const eligibilityEnum = pgEnum("eligibility", [
  "eligible",
  "ineligible",
  "claimed",
]);
export const chainEnum = pgEnum("chain", [
  "solana",
  "ethereum",
  "polygon",
  "bnb",
  "avalanche",
  "optimism",
  "arbitrum",
  "aptos",
  "terra",
]);

// ─────────────────────────────────────────────
// Users / Profiles
// ─────────────────────────────────────────────
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  supabaseUserId: uuid("supabase_user_id").unique().notNull(),
  username: varchar("username", { length: 50 }).unique(),
  email: varchar("email", { length: 255 }),
  avatarUrl: text("avatar_url"),
  twitterHandle: varchar("twitter_handle", { length: 100 }),
  discordHandle: varchar("discord_handle", { length: 100 }),
  primaryWallet: varchar("primary_wallet", { length: 100 }),
  notifyNewsletter: boolean("notify_newsletter").default(false),
  notifyRaffles: boolean("notify_raffles").default(true),
  anonymousInChat: boolean("anonymous_in_chat").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const wallets = pgTable("wallets", {
  id: uuid("id").primaryKey().defaultRandom(),
  profileId: uuid("profile_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
  address: varchar("address", { length: 100 }).notNull(),
  chain: chainEnum("chain").default("solana").notNull(),
  isPrimary: boolean("is_primary").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─────────────────────────────────────────────
// NFT Collection
// ─────────────────────────────────────────────
export const nfts = pgTable("nfts", {
  id: uuid("id").primaryKey().defaultRandom(),
  tokenId: varchar("token_id", { length: 50 }).unique().notNull(),
  name: varchar("name", { length: 100 }),
  imageUrl: text("image_url"),
  currentChain: chainEnum("current_chain").default("solana"),
  genesisChain: chainEnum("genesis_chain").default("solana"),
  tesseractBonded: boolean("tesseract_bonded").default(false),
  activeDimension: varchar("active_dimension", { length: 10 }).default("2D"),
  traits: jsonb("traits").$type<Record<string, { value: string; rarity: number }>>(),
  ownerProfileId: uuid("owner_profile_id").references(() => profiles.id),
  mintAddress: varchar("mint_address", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─────────────────────────────────────────────
// Bull Points
// ─────────────────────────────────────────────
export const bullPoints = pgTable("bull_points", {
  id: uuid("id").primaryKey().defaultRandom(),
  profileId: uuid("profile_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .unique()
    .notNull(),
  currentPoints: integer("current_points").default(0).notNull(),
  totalEarned: integer("total_earned").default(0).notNull(),
  dailyPoints: integer("daily_points").default(0),
  rank: integer("rank"),
  reppingOnX: boolean("repping_on_x").default(false),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const pointsTransactions = pgTable("points_transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  profileId: uuid("profile_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
  amount: integer("amount").notNull(),
  reason: text("reason"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─────────────────────────────────────────────
// Raffles
// ─────────────────────────────────────────────
export const raffles = pgTable("raffles", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  prizeImageUrl: text("prize_image_url"),
  prizeNftId: uuid("prize_nft_id"),
  pointCost: integer("point_cost").default(1).notNull(),
  maxPointsPerWallet: integer("max_points_per_wallet"),
  totalEntries: integer("total_entries").default(0).notNull(),
  winners: integer("winners").default(1).notNull(),
  status: raffleStatusEnum("status").default("active").notNull(),
  endsAt: timestamp("ends_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const raffleEntries = pgTable("raffle_entries", {
  id: uuid("id").primaryKey().defaultRandom(),
  raffleId: uuid("raffle_id")
    .references(() => raffles.id, { onDelete: "cascade" })
    .notNull(),
  profileId: uuid("profile_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
  pointsAllocated: integer("points_allocated").default(0).notNull(),
  result: raffleResultEnum("result").default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─────────────────────────────────────────────
// Airdrops
// ─────────────────────────────────────────────
export const airdrops = pgTable("airdrops", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  tier: integer("tier").default(1),
  chain: chainEnum("chain").default("solana"),
  status: airdropStatusEnum("status").default("upcoming").notNull(),
  minimumBulls: integer("minimum_bulls").default(1),
  claimsAt: timestamp("claims_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const airdropClaims = pgTable("airdrop_claims", {
  id: uuid("id").primaryKey().defaultRandom(),
  airdropId: uuid("airdrop_id")
    .references(() => airdrops.id, { onDelete: "cascade" })
    .notNull(),
  profileId: uuid("profile_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
  eligibility: eligibilityEnum("eligibility").default("ineligible"),
  claimedAt: timestamp("claimed_at"),
  txSignature: varchar("tx_signature", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─────────────────────────────────────────────
// Chat
// ─────────────────────────────────────────────
export const chatMessages = pgTable("chat_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  profileId: uuid("profile_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─────────────────────────────────────────────
// Swap Pool
// ─────────────────────────────────────────────
export const swapPool = pgTable("swap_pool", {
  id: uuid("id").primaryKey().defaultRandom(),
  nftId: uuid("nft_id")
    .references(() => nfts.id)
    .notNull(),
  pointCost: integer("point_cost").default(2500).notNull(),
  available: boolean("available").default(true),
  addedAt: timestamp("added_at").defaultNow().notNull(),
});

// ─────────────────────────────────────────────
// Relations
// ─────────────────────────────────────────────
export const profilesRelations = relations(profiles, ({ many, one }) => ({
  wallets: many(wallets),
  nfts: many(nfts),
  bullPoints: one(bullPoints),
  raffleEntries: many(raffleEntries),
  airdropClaims: many(airdropClaims),
  chatMessages: many(chatMessages),
  pointsTransactions: many(pointsTransactions),
}));

export const bullPointsRelations = relations(bullPoints, ({ one }) => ({
  profile: one(profiles, {
    fields: [bullPoints.profileId],
    references: [profiles.id],
  }),
}));

export const nftsRelations = relations(nfts, ({ one }) => ({
  owner: one(profiles, {
    fields: [nfts.ownerProfileId],
    references: [profiles.id],
  }),
}));

export const rafflesRelations = relations(raffles, ({ many }) => ({
  entries: many(raffleEntries),
}));

export const raffleEntriesRelations = relations(raffleEntries, ({ one }) => ({
  raffle: one(raffles, {
    fields: [raffleEntries.raffleId],
    references: [raffles.id],
  }),
  profile: one(profiles, {
    fields: [raffleEntries.profileId],
    references: [profiles.id],
  }),
}));

export const airdropsRelations = relations(airdrops, ({ many }) => ({
  claims: many(airdropClaims),
}));

// ─────────────────────────────────────────────
// Types inferred from schema
// ─────────────────────────────────────────────
export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
export type Wallet = typeof wallets.$inferSelect;
export type NFT = typeof nfts.$inferSelect;
export type BullPoints = typeof bullPoints.$inferSelect;
export type Raffle = typeof raffles.$inferSelect;
export type RaffleEntry = typeof raffleEntries.$inferSelect;
export type Airdrop = typeof airdrops.$inferSelect;
export type AirdropClaim = typeof airdropClaims.$inferSelect;
export type ChatMessage = typeof chatMessages.$inferSelect;
