"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface OverlayContextValue {
  blurred: boolean;
  setActive: (id: string, active: boolean) => void;
  activeId: string | null;
  requestOpen: (id: string) => void;
  requestClose: (id: string) => void;
}

const OverlayContext = createContext<OverlayContextValue | null>(null);

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [activeIds, setActiveIds] = useState<Set<string>>(() => new Set());
  const [activeId, setActiveId] = useState<string | null>(null);

  const setActive = useCallback((id: string, active: boolean) => {
    setActiveIds((prev) => {
      if (active === prev.has(id)) return prev;
      const next = new Set(prev);
      if (active) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  }, []);

  const requestOpen = useCallback((id: string) => setActiveId(id), []);
  const requestClose = useCallback((id: string) => {
    setActiveId((prev) => (prev === id ? null : prev));
  }, []);

  const blurred = activeIds.size > 0;

  // Keyed on the derived boolean (not `activeIds` itself), so the context
  // identity — and therefore every consumer's effect below — only changes
  // when blur actually toggles, not on every individual registration.
  const value = useMemo(
    () => ({ blurred, setActive, activeId, requestOpen, requestClose }),
    [blurred, setActive, activeId, requestOpen, requestClose],
  );

  return (
    <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>
  );
}

/** Blurs the page content while any registered popup (mega menu, drawers, mobile menu) is open. */
export function useOverlayBlurred() {
  const ctx = useContext(OverlayContext);
  if (!ctx) {
    throw new Error("useOverlayBlurred must be used within OverlayProvider");
  }
  return ctx.blurred;
}

/**
 * Drives one popup's open state (mega menu, mobile menu, search, cart/wishlist
 * drawer). Only one such panel can be open at a time — calling `show` on one
 * closes whichever other panel was open — and it's registered as a blur
 * trigger for as long as it's open.
 */
export function useOverlayPanel() {
  const ctx = useContext(OverlayContext);
  if (!ctx) {
    throw new Error("useOverlayPanel must be used within OverlayProvider");
  }
  const id = useId();
  const open = ctx.activeId === id;

  useEffect(() => {
    ctx.setActive(id, open);
    return () => ctx.setActive(id, false);
  }, [open, ctx, id]);

  const show = useCallback(() => ctx.requestOpen(id), [ctx, id]);
  const hide = useCallback(() => ctx.requestClose(id), [ctx, id]);
  const toggle = useCallback(
    () => (open ? ctx.requestClose(id) : ctx.requestOpen(id)),
    [ctx, id, open],
  );

  return { open, show, hide, toggle };
}
