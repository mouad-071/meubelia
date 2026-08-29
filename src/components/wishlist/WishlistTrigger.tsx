"use client";

import { useTranslations } from "next-intl";
import { HeartIcon } from "@/components/icons";
import { useWishlist } from "@/lib/wishlist-context";
import { useOverlayPanel } from "@/lib/overlay-context";
import { WishlistDrawer } from "./WishlistDrawer";

export function WishlistTrigger({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const wishlist = useWishlist();
  const { open, show, hide } = useOverlayPanel();

  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-label={t("wishlist")}
        className={`relative cursor-pointer ${className ?? ""}`}
      >
        <HeartIcon className="size-5" />
        {wishlist.count > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-olive text-[10px] font-medium text-white">
            {wishlist.count}
          </span>
        )}
      </button>
      <WishlistDrawer open={open} onClose={hide} />
    </>
  );
}
