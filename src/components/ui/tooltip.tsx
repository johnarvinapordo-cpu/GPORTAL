"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  children: React.ReactNode;
}

export function TooltipProvider({ children }: TooltipProps) {
  return <div>{children}</div>;
}

export function Tooltip({ children }: TooltipProps) {
  return <div className="relative inline-block">{children}</div>;
}

interface TooltipTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export function TooltipTrigger({ children }: TooltipTriggerProps) {
  return <div>{children}</div>;
}

interface TooltipContentProps {
  className?: string;
  children: React.ReactNode;
}

export function TooltipContent({ className, children }: TooltipContentProps) {
  return (
    <div
      className={cn(
        "absolute z-50 rounded-md border bg-popover px-3 py-1.5 text-popover-foreground text-sm shadow-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
