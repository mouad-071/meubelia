"use client";

import type { ReactNode } from "react";
import { useOverlayBlurred } from "@/lib/overlay-context";

/**
 * Blurs its children while any popup (mega menu, drawers) is open, leaving
 * the header crisp. `inert` makes the blurred content unclickable and
 * untabbable while it's inactive, not just visually dimmed.
 */
export function BlurTarget({ children }: { children: ReactNode }) {
  const blurred = useOverlayBlurred();

  return (
    <div
      inert={blurred}
      className={`flex flex-1 flex-col transition-[filter] duration-300 ${
        blurred ? "blur-sm" : ""
      }`}
    >
      {children}
    </div>
  );
}
