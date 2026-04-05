import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { WalletProvider } from "@/providers/WalletProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "The Bull Club 2.0",
  description:
    "The official Bull Club 2.0 member portal. Connect your wallet to access exclusive features, raffles, airdrops, and more.",
  openGraph: {
    title: "The Bull Club 2.0",
    description: "Access the Bull Club member portal.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bgVideoUrl =
    process.env.NEXT_PUBLIC_BG_VIDEO_URL ?? "/videos/bg.mp4";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-bc-bg text-white antialiased min-h-screen">
        {/* Global background video — sits behind every page */}
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="fixed inset-0 w-full h-full object-cover -z-10 pointer-events-none"
          style={{ opacity: 0.3 }}
        >
          <source src={bgVideoUrl} type="video/mp4" />
        </video>

        <WalletProvider>
          <QueryProvider>
            {children}
            <Toaster
              theme="dark"
              toastOptions={{
                style: {
                  background: "#141414",
                  border: "1px solid #2e2e2e",
                  color: "white",
                  fontFamily: "Generica, monospace",
                  fontSize: "12px",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                },
              }}
            />
          </QueryProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
