"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

function Separator({ 
  className, 
  orientation = "horizontal", 
  decorative = true,
  ...props 
}: SeparatorProps) {
  return (
    <div
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...(!decorative && { role: 'separator' })}
      data-orientation={orientation}
      {...props}
    />
  );
}

export { Separator };
