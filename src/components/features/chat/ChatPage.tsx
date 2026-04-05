"use client";

import { useState, useRef, useEffect } from "react";
import { MOCK_CHAT_MESSAGES } from "@/lib/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { NFT_PALETTES } from "@/lib/constants";

type Message = (typeof MOCK_CHAT_MESSAGES)[0] & { isCurrentUser?: boolean };

const MAX_CHARS = 250;

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(MOCK_CHAT_MESSAGES);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
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
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full" style={{ minHeight: 680 }}>
      {/* Header */}
      <div className="px-5 pt-5 pb-3 border-b border-bc-border flex-shrink-0">
        <h1 className="text-base tracking-widest uppercase">Club Chat</h1>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-5 py-3">
        <div className="flex flex-col gap-1.5 animate-fade-in">
          {messages.map((msg) => (
            <MessageRow key={msg.id} msg={msg} />
          ))}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="px-5 pb-4 pt-2 border-t border-bc-border flex-shrink-0">
        <div className="flex items-center gap-2 border border-bc-border2 bg-bc-panel2 rounded-sm px-3 py-2 focus-within:border-bc-pink transition-colors">
          <SmallAvatar />
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

function MessageRow({ msg }: { msg: Message }) {
  const paletteIdx = msg.username.charCodeAt(0) % NFT_PALETTES.length;
  const palette = NFT_PALETTES[paletteIdx]!;

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
      <div
        className="w-8 h-8 rounded-sm flex-shrink-0 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${palette.from}, ${palette.to})` }}
      >
        <span className="text-[9px] font-bold text-white/80">
          {msg.username.charAt(0)}
        </span>
      </div>

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
        <div
          className="flex-shrink-0 w-7 h-7 rounded-sm flex items-center justify-center border border-bc-border2"
          style={{ background: `linear-gradient(135deg, ${palette.from}88, ${palette.to}88)` }}
        >
          <span className="text-[9px] font-bold text-white">{msg.bullsOwned}</span>
        </div>
      )}
    </div>
  );
}

function SmallAvatar() {
  return (
    <div className="w-6 h-6 rounded-sm flex-shrink-0 bg-gradient-to-br from-[#4a148c] to-[#e040fb] flex items-center justify-center">
      <span className="text-[8px] font-bold text-white">F</span>
    </div>
  );
}
