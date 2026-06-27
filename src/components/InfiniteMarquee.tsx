"use client";
import { cn } from "@/lib/utils";

export default function InfiniteMarquee({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)]",
        className
      )}
    >
      <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row">
        {children}
      </div>
      <div
        aria-hidden="true"
        className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row"
      >
        {children}
      </div>
    </div>
  );
}
