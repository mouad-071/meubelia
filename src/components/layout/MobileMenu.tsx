"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { Link, usePathname } from "@/i18n/navigation";
import {
  MenuIcon,
  CloseIcon,
  ChevronDownIcon,
  UserIcon,
  HeartIcon,
} from "@/components/icons";

type Section = "furniture" | "garden" | null;

const PANEL_TRANSITION =
  "transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

export function MobileMenu() {
  const t = useTranslations("nav");
  const tMenu = useTranslations("megaMenu");
  const locale = useLocale();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<Section>(null);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const furnitureItems = tMenu.raw("furnitureItems") as string[];
  const gardenItems = tMenu.raw("gardenItems") as string[];
  const flatLinks = [t("new"), t("sale"), t("design"), t("service")];

  let rowIndex = 0;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("furniture")}
        aria-expanded={open}
        className="cursor-pointer lg:hidden"
      >
        <MenuIcon className="size-6" />
      </button>

      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        className={`fixed inset-0 z-[70] flex w-full flex-col bg-white shadow-2xl lg:hidden ${PANEL_TRANSITION} ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-5">
          <span className="font-serif text-xl font-semibold text-ink">
            Meubelia
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t("closeMenu")}
            className="cursor-pointer"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          <AnimatedRow open={open} index={rowIndex++}>
            <AccordionRow
              label={t("furniture")}
              expanded={section === "furniture"}
              onToggle={() =>
                setSection((s) => (s === "furniture" ? null : "furniture"))
              }
              items={furnitureItems}
            />
          </AnimatedRow>
          <AnimatedRow open={open} index={rowIndex++}>
            <AccordionRow
              label={t("garden")}
              expanded={section === "garden"}
              onToggle={() =>
                setSection((s) => (s === "garden" ? null : "garden"))
              }
              items={gardenItems}
            />
          </AnimatedRow>

          {flatLinks.map((label) => (
            <AnimatedRow key={label} open={open} index={rowIndex++}>
              <div className="border-t border-line py-4 text-base tracking-wide text-ink">
                {label}
              </div>
            </AnimatedRow>
          ))}

          <div className="border-t border-line" />

          <AnimatedRow open={open} index={rowIndex++}>
            <div className="flex flex-col py-2">
              <IconRow icon={<UserIcon className="size-4" />} label={t("account")} />
              <IconRow icon={<HeartIcon className="size-4" />} label={t("wishlist")} />
            </div>
          </AnimatedRow>
        </div>

        <AnimatedRow open={open} index={rowIndex++}>
          <div className="border-t border-line px-5 py-5">
            <span className="mb-3 block text-xs tracking-wide text-ink/50 uppercase">
              {t("language")}
            </span>
            <div className="flex items-center gap-3 text-sm font-medium uppercase">
              {routing.locales.map((loc, i) => (
                <span key={loc} className="flex items-center gap-3">
                  {i > 0 && <span className="text-ink/30">/</span>}
                  <Link
                    href={pathname}
                    locale={loc}
                    onClick={() => setOpen(false)}
                    className={
                      loc === locale ? "text-ink" : "text-ink/50 hover:text-ink"
                    }
                  >
                    {loc}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </AnimatedRow>
      </div>
    </>
  );
}

function AnimatedRow({
  open,
  index,
  children,
}: {
  open: boolean;
  index: number;
  children: ReactNode;
}) {
  return (
    <div
      className={`transition-all duration-300 ease-out ${
        open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
      style={{ transitionDelay: open ? `${100 + index * 40}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

function AccordionRow({
  label,
  expanded,
  onToggle,
  items,
}: {
  label: string;
  expanded: boolean;
  onToggle: () => void;
  items: string[];
}) {
  return (
    <div className="border-t border-line">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full cursor-pointer items-center justify-between py-4 text-left text-base tracking-wide text-ink"
      >
        {label}
        <ChevronDownIcon
          className={`size-4 transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      {expanded && (
        <ul className="space-y-3 pb-4 pl-1">
          {items.map((item) => (
            <li key={item} className="text-sm text-ink/70">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function IconRow({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 py-2.5 text-sm text-ink">
      {icon}
      {label}
    </div>
  );
}
