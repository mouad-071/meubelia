"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AnnouncementBar } from "./AnnouncementBar";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MainNav } from "./MainNav";
import { MobileMenu } from "./MobileMenu";
import { UserIcon } from "@/components/icons";
import { CartTrigger } from "@/components/cart/CartTrigger";
import { WishlistTrigger } from "@/components/wishlist/WishlistTrigger";
import { HeaderSearch } from "@/components/search/HeaderSearch";

export function SiteHeader() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50 bg-white">
      <AnnouncementBar />

      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5 lg:px-10">
        <div className="flex flex-1 items-center">
          <MobileMenu />
          <div className="hidden lg:block">
            <LocaleSwitcher />
          </div>
        </div>

        <Link href="/" className="flex flex-col items-center text-center">
          <span className="font-serif text-2xl font-semibold tracking-wide text-ink sm:text-3xl">
            Meubelia
          </span>
          <span className="mt-0.5 hidden text-[10px] tracking-[0.25em] text-ink/50 uppercase sm:block">
            {t("tagline")}
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-4 text-ink sm:gap-5">
          <HeaderSearch />
          <Link
            href="/login"
            aria-label={t("account")}
            className="hidden cursor-pointer lg:inline-flex"
          >
            <UserIcon className="size-5" />
          </Link>
          <WishlistTrigger className="hidden lg:inline-flex" />
          <CartTrigger />
        </div>
      </div>

      <MainNav />
    </header>
  );
}
