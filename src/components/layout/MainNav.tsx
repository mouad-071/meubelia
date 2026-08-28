"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDownIcon } from "@/components/icons";
import { MegaMenu } from "./MegaMenu";

export function MainNav() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const links = [
    { label: t("new") },
    { label: t("garden") },
    { label: t("sale") },
    { label: t("design") },
    { label: t("service") },
  ];

  return (
    <div ref={navRef} className="relative hidden border-t border-line lg:block">
      <nav className="flex items-center justify-center gap-8 px-10 py-4">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex shrink-0 items-center gap-1 text-sm tracking-wide text-ink transition-colors hover:text-olive"
        >
          {t("furniture")}
          <ChevronDownIcon
            className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
        {links.map((link) => (
          <span
            key={link.label}
            className="shrink-0 cursor-default text-sm tracking-wide text-ink transition-colors hover:text-olive"
          >
            {link.label}
          </span>
        ))}
      </nav>

      <div
        aria-hidden={!open}
        className={`absolute inset-x-0 top-full z-40 origin-top border-t border-line bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] transition-[opacity,transform] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
          open
            ? "pointer-events-auto translate-y-0 scale-y-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-y-95 opacity-0"
        }`}
      >
        <MegaMenu />
      </div>
    </div>
  );
}
