import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-between items-center px-5 pointer-events-none">
      {/* Bull icon bottom-left */}
      <Link href="/" className="pointer-events-auto opacity-70 hover:opacity-100 transition-opacity">
        <Image src="/images/bull-icon.svg" alt="Bull Club" width={35} height={41} />
      </Link>

      {/* Social icons bottom-right */}
      <div className="flex gap-2 pointer-events-auto">
        <SocialBtn href="https://twitter.com/TheBullClubNFT" label="X / Twitter">
          <XIcon />
        </SocialBtn>
        <SocialBtn href="https://discord.gg/thebullclub" label="Discord">
          <DiscordIcon />
        </SocialBtn>
        <SocialBtn href="https://magiceden.io" label="Magic Eden">
          <MagicEdenIcon />
        </SocialBtn>
      </div>
    </div>
  );
}

function SocialBtn({
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
      className="w-9 h-9 bg-bc-card border border-bc-border2 rounded-sm flex items-center justify-center hover:border-bc-pink transition-colors"
    >
      {children}
    </a>
  );
}

function BullIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 10 C1 7, 1 2, 4 3 L7 8 C8 4, 11 2, 13 3 L12 9 C14 7, 18 7, 20 9 L19 3 C21 2, 24 4, 25 8 L28 3 C31 2, 31 7, 28 10 L27 12 C29 14, 29 18, 27 20 L26 24 C24 28, 8 28, 6 24 L5 20 C3 18, 3 14, 5 12 Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function MagicEdenIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="2" fill="transparent" />
      <text x="2" y="18" fill="white" fontSize="14" fontWeight="bold" fontFamily="monospace">ME</text>
    </svg>
  );
}
