import { cn } from "@/lib/utils";

interface MonitorFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function MonitorFrame({ children, className }: MonitorFrameProps) {
  return (
    <div className="relative flex flex-col items-center w-full max-w-[1076px] mx-auto">
      {/* Monitor screen — glass panel with backdrop blur matching Figma design */}
      <div
        className={cn(
          "relative w-full rounded-[10px] border border-white/10 overflow-hidden monitor-border animate-fade-in",
          className
        )}
        style={{
          height: "628px",
          backdropFilter: "blur(50px)",
          WebkitBackdropFilter: "blur(50px)",
          background: "rgba(0, 0, 0, 0.8)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
