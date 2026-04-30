"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DropdownMenuProps {
  children: React.ReactNode;
}

export function DropdownMenu({ children }: DropdownMenuProps) {
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
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen, handleTriggerClick, triggerRef, position }}>
      {children}
    </DropdownMenuContext.Provider>
  );
}

const DropdownMenuContext = React.createContext<{
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

export function useDropdownMenu() {
  return React.useContext(DropdownMenuContext);
}

export function DropdownMenuTrigger({ children }: { children: React.ReactNode }) {
  const { handleTriggerClick, triggerRef } = useDropdownMenu();
  return (
    <div ref={triggerRef as React.Ref<HTMLDivElement>} onClick={handleTriggerClick}>
      {children}
    </div>
  );
}

export function DropdownMenuContent({ className, children }: { className?: string; children: React.ReactNode }) {
  const { isOpen, setIsOpen, position } = useDropdownMenu();
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
          "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function DropdownMenuItem({ className, children, onSelect }: { className?: string; children: React.ReactNode; onSelect?: () => void }) {
  const { setIsOpen } = useDropdownMenu();
  return (
    <div
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
        className,
      )}
      onClick={() => {
        onSelect?.();
        setIsOpen(false);
      }}
    >
      {children}
    </div>
  );
}

export function DropdownMenuLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-2 py-1.5 text-sm font-semibold", className)} {...props} />
  );
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div className={cn("-mx-1 my-1 h-px bg-muted", className)} />;
}

export function DropdownMenuGroup({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
