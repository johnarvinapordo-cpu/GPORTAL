"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}

function AspectRatio({
  className,
  ratio = 1 / 1,
  ...props
}: AspectRatioProps) {
  const paddingBottom = `${(1 / ratio) * 100}%`;
  
  return (
    <div
      data-slot="aspect-ratio"
      data-padding-bottom={paddingBottom}
      className={cn(className, "overflow-hidden")}
      {...props}
    />
  );
}

export { AspectRatio };
