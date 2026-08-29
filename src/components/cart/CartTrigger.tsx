"use client";

import { useTranslations } from "next-intl";
import { BagIcon } from "@/components/icons";
import { useCart } from "@/lib/cart-context";
import { useOverlayPanel } from "@/lib/overlay-context";
import { CartDrawer } from "./CartDrawer";

export function CartTrigger({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const cart = useCart();
  const { open, show, hide } = useOverlayPanel();

  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-label={t("cart")}
        className={`relative cursor-pointer ${className ?? ""}`}
      >
        <BagIcon className="size-5" />
        {cart.count > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-olive text-[10px] font-medium text-white">
            {cart.count}
          </span>
        )}
      </button>
      <CartDrawer open={open} onClose={hide} />
    </>
  );
}
