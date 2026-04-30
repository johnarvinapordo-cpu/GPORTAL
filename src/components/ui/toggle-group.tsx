"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

function ToggleGroup({ className, variant = "default", size = "default", ...props }: ToggleGroupProps) {
  return (
    <div
      className={cn(
        "inline-flex rounded-md",
        variant === "outline" && "shadow-xs",
        className,
      )}
      {...props}
    />
  );
}

interface ToggleGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

function ToggleGroupItem({ className, value, ...props }: ToggleGroupItemProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
        "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
        className,
      )}
      {...props}
    />
  );
}

export { ToggleGroup, ToggleGroupItem };
