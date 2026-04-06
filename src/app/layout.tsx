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
    process.env.NEXT_PUBLIC_BG_VIDEO_URL ??
    "https://res.cloudinary.com/duaecwfpf/video/upload/q_auto/v1775388356/bg_kmh01d.mp4";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="text-white antialiased min-h-screen">
        {/* Dark base layer — sits below video */}
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -20, background: "#111111" }} />

        {/* Global background video — fixed inset padding on all sides at every viewport size */}
        <div
          className="fixed pointer-events-none overflow-hidden"
          style={{ zIndex: -10, inset: "30px", borderRadius: "5px", border: "0.5px solid rgba(255,255,255,0.07)" }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
            className="w-full h-full object-cover pointer-events-none"
            style={{ opacity: 0.55 }}
          >
            <source src={bgVideoUrl} type="video/mp4" />
          </video>
        </div>
        {/* Vignette overlay */}
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: -9, background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 30%, rgba(0,0,0,0.6) 100%)" }}
        />

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
