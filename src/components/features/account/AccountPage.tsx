"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

export function AccountPage() {
  const [username, setUsername] = useState("FIZZY");
  const [email, setEmail] = useState("HELLO@BULL.CLUB");
  const [twitter, setTwitter] = useState("@FIZZYTBC");
  const [discord, setDiscord] = useState("FIZZYTBC");
  const [newsletter, setNewsletter] = useState(false);
  const [notifyRaffles, setNotifyRaffles] = useState(false);
  const [anonymous, setAnonymous] = useState(false);

  const { disconnect } = useWallet();
  const router = useRouter();

  const wallets = [
    { address: "GKVOS...122103", chain: "SOL" },
    { address: "0X113...AKN12", chain: "ETH" },
  ];

  const handleSave = () => {
    toast.success("Account updated");
  };

  const handleSignOut = async () => {
    try {
      await disconnect();
    } catch {
      // wallet may already be disconnected
    }
    router.push("/");
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-5 animate-fade-in">
        <h1 className="text-base tracking-widest uppercase mb-5">Manage Account</h1>

        <div className="flex gap-5">
          {/* Left column */}
          <div className="flex-1 flex flex-col gap-5">
            {/* Basic Info */}
            <Section title="Basic Info">
              <Field
                icon="👤"
                value={username}
                onChange={setUsername}
                placeholder="USERNAME"
              />
              <Field
                icon="✉"
                value={email}
                onChange={setEmail}
                placeholder="EMAIL"
              />
            </Section>

            {/* Social Accounts */}
            <Section title="Social Accounts">
              <SocialField icon="𝕏" value={twitter} onChange={setTwitter} />
              <SocialField icon="💬" value={discord} onChange={setDiscord} />
            </Section>

            {/* Notifications */}
            <Section title="Notifications">
              <ToggleRow
                label="Monthly Newsletter"
                checked={newsletter}
                onCheckedChange={setNewsletter}
              />
              <ToggleRow
                label="Raffles"
                checked={notifyRaffles}
                onCheckedChange={setNotifyRaffles}
              />
            </Section>

            {/* Settings */}
            <Section title="Settings">
              <ToggleRow
                label="Remain Anonymous in Chat"
                checked={anonymous}
                onCheckedChange={setAnonymous}
              />
            </Section>
          </div>

          {/* Right column – Wallets */}
          <div className="w-[220px] flex-shrink-0 flex flex-col gap-3">
            <h2 className="text-[10px] tracking-widest uppercase text-white">
              Connected Wallets
            </h2>
            {wallets.map((w) => (
              <div
                key={w.address}
                className="flex items-center justify-between border border-bc-border2 bg-bc-panel2 px-3 py-2 rounded-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-bc-gray3 uppercase">{w.chain}</span>
                  <span className="text-[10px] text-white tracking-wide">{w.address}</span>
                </div>
                <button className="text-bc-gray2 hover:text-red-400 transition-colors text-xs">
                  ✕
                </button>
              </div>
            ))}
            <button className="flex items-center justify-between border border-dashed border-bc-border2 px-3 py-2 rounded-sm text-bc-gray2 hover:border-bc-pink hover:text-bc-pink transition-all">
              <span className="text-[10px] uppercase tracking-wide">Add Wallet</span>
              <span className="text-sm">+</span>
            </button>
          </div>
        </div>

        {/* Sign out */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="px-6 py-2 text-[10px] tracking-widest uppercase border border-bc-pink text-bc-pink hover:bg-bc-pink hover:text-white transition-all mr-3"
          >
            Save
          </button>
          <button
            onClick={handleSignOut}
            className="px-6 py-2 text-[10px] tracking-widest uppercase border border-bc-border2 text-white hover:border-red-500 hover:text-red-400 transition-all"
          >
            Sign Out
          </button>
        </div>
      </div>
    </ScrollArea>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-[10px] tracking-widest uppercase text-white">{title}</h2>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );
}

function Field({
  icon,
  value,
  onChange,
  placeholder,
}: {
  icon: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="flex items-center gap-2 border border-bc-border2 bg-bc-panel2 px-3 py-2 rounded-sm focus-within:border-bc-pink transition-colors">
      <span className="text-[11px]">{icon}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-[11px] text-white uppercase tracking-wider outline-none placeholder:text-bc-gray2"
      />
      <button className="text-bc-gray3 hover:text-bc-pink transition-colors">
        <PencilIcon />
      </button>
    </div>
  );
}

function SocialField({
  icon,
  value,
  onChange,
}: {
  icon: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 border border-bc-border2 bg-bc-panel2 px-3 py-2 rounded-sm focus-within:border-bc-pink transition-colors">
      <span className="text-[11px]">{icon}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent text-[11px] text-white uppercase tracking-wider outline-none"
      />
      <button className="text-bc-gray3 hover:text-red-400 transition-colors text-xs">✕</button>
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] text-bc-gray4 uppercase tracking-wider">{label}</span>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="data-[state=checked]:bg-bc-pink scale-75"
      />
    </div>
  );
}

function PencilIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
