import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MonitorFrame } from "@/components/layout/MonitorFrame";
import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen scanlines relative flex flex-col items-center justify-center py-24 px-4">
      {/* Scan lines overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 scanlines opacity-60" />

      {/* Header logo */}
      <SiteHeader />


      {/* Main monitor */}
      <MonitorFrame>
        <div className="flex h-full">
          <Sidebar />
          <main className="flex-1 overflow-hidden">{children}</main>
        </div>
      </MonitorFrame>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
