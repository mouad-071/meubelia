"use client";

import { usePathname } from "@/i18n/navigation";
import { SiteHeader } from "./SiteHeader";
import { CheckoutHeader } from "./CheckoutHeader";

const CHECKOUT_PATHS = ["/cart", "/checkout"];

/** Picks the full site header everywhere except cart/checkout, which get a distraction-free header instead. */
export function AppHeader() {
  const pathname = usePathname();
  const isCheckout = CHECKOUT_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  return isCheckout ? <CheckoutHeader /> : <SiteHeader />;
}
