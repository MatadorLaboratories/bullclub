import { cn } from "@/lib/utils";

interface MonitorFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function MonitorFrame({ children, className }: MonitorFrameProps) {
  return (
    <div className="relative flex flex-col items-center w-full max-w-[920px] mx-auto">
      {/* Monitor screen — fixed height so inner ScrollAreas work correctly */}
      <div
        className={cn(
          "relative w-full rounded-sm border border-bc-border bg-bc-panel overflow-hidden monitor-border animate-fade-in",
          className
        )}
        style={{ height: "680px" }}
      >
        {children}
      </div>
    </div>
  );
}
