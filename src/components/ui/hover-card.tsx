"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface HoverCardProps {
  children: React.ReactNode;
}

export function HoverCard({ children }: HoverCardProps) {
  return <div className="relative inline-block">{children}</div>;
}

export function HoverCardTrigger({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

interface HoverCardContentProps {
  className?: string;
  children: React.ReactNode;
}

export function HoverCardContent({ className, children }: HoverCardContentProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {isOpen && (
        <div
          className={cn(
            "absolute z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
            className,
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
