"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface PopoverProps {
  children: React.ReactNode;
}

export function Popover({ children }: PopoverProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const triggerRef = React.useRef<HTMLElement>(null);

  const handleTriggerClick = (e: React.MouseEvent) => {
    const trigger = e.currentTarget as HTMLElement;
    const rect = trigger.getBoundingClientRect();
    setPosition({ x: rect.left, y: rect.bottom + 4 });
    setIsOpen(!isOpen);
  };

  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen, handleTriggerClick, triggerRef, position }}>
      {children}
    </PopoverContext.Provider>
  );
}

const PopoverContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  handleTriggerClick: (e: React.MouseEvent) => void;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
  position: { x: number; y: number };
}>({
  isOpen: false,
  setIsOpen: () => {},
  handleTriggerClick: () => {},
  triggerRef: { current: null },
  position: { x: 0, y: 0 },
});

export function usePopover() {
  return React.useContext(PopoverContext);
}

export function PopoverTrigger({ children }: { children: React.ReactNode }) {
  const { handleTriggerClick, triggerRef } = usePopover();
  return (
    <div ref={triggerRef as React.Ref<HTMLDivElement>} onClick={handleTriggerClick}>
      {children}
    </div>
  );
}

export function PopoverContent({ className, children }: { className?: string; children: React.ReactNode }) {
  const { isOpen, setIsOpen, position } = usePopover();
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.left = `${position.x}px`;
      contentRef.current.style.top = `${position.y}px`;
    }
  }, [position]);

  if (!isOpen) return null;

  return (
    <div className="fixed z-50">
      <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
      <div
        ref={contentRef}
        className={cn(
          "absolute z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
