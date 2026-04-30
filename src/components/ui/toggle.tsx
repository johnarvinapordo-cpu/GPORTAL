"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

function Toggle({ className, pressed, onPressedChange, variant = "default", size = "default", ...props }: ToggleProps) {
  const [isPressed, setIsPressed] = React.useState(pressed ?? false);

  React.useEffect(() => {
    if (pressed !== undefined) {
      setIsPressed(pressed);
    }
  }, [pressed]);

  const handleClick = () => {
    const newValue = !isPressed;
    setIsPressed(newValue);
    onPressedChange?.(newValue);
  };

  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
        variant === "default" && "bg-transparent",
        variant === "outline" && "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        size === "default" && "h-9 px-2 min-w-9",
        size === "sm" && "h-8 px-1.5 min-w-8",
        size === "lg" && "h-10 px-2.5 min-w-10",
        isPressed && "bg-accent text-accent-foreground",
        className,
      )}
      data-state={isPressed ? 'on' : 'off'}
      onClick={handleClick}
      {...props}
    />
  );
}

export { Toggle };
