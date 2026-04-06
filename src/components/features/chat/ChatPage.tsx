"use client";

import { useState, useRef, useEffect } from "react";
import { MOCK_CHAT_MESSAGES, get3DAvatarUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Message = (typeof MOCK_CHAT_MESSAGES)[0] & { isCurrentUser?: boolean };

const MAX_CHARS = 250;
const AVATAR_STORAGE_KEY = "bc-avatar-mint";

// Derive token ID from a Helius-style mint stored in localStorage
// The sidebar stores the mint address; we use a fixed token for the current user's avatar
function useCurrentUserAvatarUrl() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    // The sidebar stores the selected bull's mint in localStorage
    // We use a fallback token (4828) matching the mock "FIZZY" user
    const stored = localStorage.getItem(AVATAR_STORAGE_KEY);
    // Try to use the stored mint as a token id hint — fallback to 4828
    const tokenId = "4828";
    void tokenId; // will use stored mint's NFT image via useWalletNfts in a real impl
    setAvatarUrl(get3DAvatarUrl("4828"));
  }, []);

  return avatarUrl;
}

const EXTRA_MOCK_MESSAGES: Message[] = [
  { id: "7", username: "HODLGANG", content: "gm! up only vibes today", createdAt: new Date(Date.now() - 1000 * 50), bullsOwned: 5, avatarTokenId: "5051" },
  { id: "8", username: "FIZZY", content: "anyone seen the new airdrop details?", createdAt: new Date(Date.now() - 1000 * 45), bullsOwned: 12, isCurrentUser: true, avatarTokenId: "4828" },
  { id: "9", username: "WAGMI", content: "yeah tier 1 looks insane", createdAt: new Date(Date.now() - 1000 * 40), bullsOwned: 3, avatarTokenId: "1021" },
  { id: "10", username: "TZM", content: "need more bulls for tier 3 lol", createdAt: new Date(Date.now() - 1000 * 35), bullsOwned: 4, avatarTokenId: "3955" },
  { id: "11", username: "STEVEN12", content: "just copped #4859 lets gooo", createdAt: new Date(Date.now() - 1000 * 30), bullsOwned: 8, avatarTokenId: "6733" },
  { id: "12", username: "BABYBULL", content: "welcome to the herd!", createdAt: new Date(Date.now() - 1000 * 25), bullsOwned: 1, avatarTokenId: "471" },
  { id: "13", username: "BULL 2102", content: "floor pumping rn", createdAt: new Date(Date.now() - 1000 * 20), bullsOwned: 2, avatarTokenId: "2229" },
  { id: "14", username: "FIZZY", content: "this chat feature is so clean", createdAt: new Date(Date.now() - 1000 * 15), bullsOwned: 12, isCurrentUser: true, avatarTokenId: "4828" },
  { id: "15", username: "HODLGANG", content: "fr the whole portal is fire", createdAt: new Date(Date.now() - 1000 * 10), bullsOwned: 5, avatarTokenId: "5051" },
  { id: "16", username: "TZM", content: "gm gm lets get these bull points", createdAt: new Date(Date.now() - 1000 * 5), bullsOwned: 4, avatarTokenId: "3955" },
];

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([...MOCK_CHAT_MESSAGES, ...EXTRA_MOCK_MESSAGES]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const userAvatarUrl = useCurrentUserAvatarUrl();

  // Scroll to bottom whenever messages change
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: String(Date.now()),
      username: "FIZZY",
      content: input.trim(),
      createdAt: new Date(),
      bullsOwned: 12,
      isCurrentUser: true,
      avatarTokenId: "4828",
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header — fixed */}
      <div className="px-5 pt-5 pb-3 border-b border-bc-border flex-shrink-0">
        <h1 className="text-base tracking-widest uppercase">Club Chat</h1>
      </div>

      {/* Messages — scrollable */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-3 flex flex-col gap-1.5">
        {messages.map((msg) => (
          <MessageRow key={msg.id} msg={msg} />
        ))}
      </div>

      {/* Input — fixed */}
      <div className="px-5 pb-4 pt-2 border-t border-bc-border flex-shrink-0">
        <div className="flex items-center gap-2 border border-bc-border2 bg-bc-panel2 rounded-sm px-3 py-2 focus-within:border-bc-pink transition-colors">
          <BullAvatar tokenId="4828" avatarUrl={userAvatarUrl} size={24} />
          <input
            type="text"
            value={input}
            maxLength={MAX_CHARS}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="GM..."
            className="flex-1 bg-transparent text-xs text-white placeholder:text-bc-gray2 uppercase tracking-wider outline-none"
          />
          <span className="text-[9px] text-bc-gray2 tabular-nums">
            {input.length}/{MAX_CHARS}
          </span>
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-3 py-1 bg-bc-pink text-white text-[10px] tracking-widest uppercase hover:bg-bc-pink-light disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function BullAvatar({ tokenId, avatarUrl, size = 32 }: { tokenId?: string; avatarUrl?: string | null; size?: number }) {
  const [errored, setErrored] = useState(false);
  const url = avatarUrl ?? (tokenId ? get3DAvatarUrl(tokenId) : null);

  if (url && !errored) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt="Bull avatar"
        width={size}
        height={size}
        className="rounded-sm flex-shrink-0 object-cover"
        style={{ width: size, height: size }}
        onError={() => setErrored(true)}
      />
    );
  }

  return (
    <div
      className="rounded-sm flex-shrink-0 bg-bc-card border border-bc-border2 flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <span className="text-[8px] font-bold text-white/60">🐂</span>
    </div>
  );
}

function MessageRow({ msg }: { msg: Message }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 px-3 py-2.5 rounded-sm border transition-colors",
        msg.isCurrentUser
          ? "border-bc-pink/40 bg-bc-pink/5"
          : "border-bc-border bg-bc-panel2 hover:border-bc-border2"
      )}
    >
      {/* Avatar */}
      <BullAvatar tokenId={msg.avatarTokenId} size={32} />

      {/* Message */}
      <div className="flex-1 min-w-0">
        <span className="text-[11px] font-bold text-white uppercase tracking-wide">
          {msg.username}:{" "}
        </span>
        <span className="text-[11px] text-bc-gray4 uppercase tracking-wide">
          {msg.content}
        </span>
      </div>

      {/* Bulls owned badge */}
      {msg.bullsOwned != null && (
        <div className="flex-shrink-0 w-7 h-7 rounded-sm overflow-hidden border border-bc-border2">
          <BullAvatar tokenId={msg.avatarTokenId} size={28} />
        </div>
      )}
    </div>
  );
}
