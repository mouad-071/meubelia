"use client";

import { useState, type ReactNode } from "react";
import { ChevronDownIcon } from "@/components/icons";

export function Accordion({
  heading,
  defaultOpen = false,
  children,
}: {
  heading: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-line">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between py-4 text-left text-sm font-medium tracking-wide text-ink"
      >
        {heading}
        <ChevronDownIcon
          className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="pb-5">{children}</div>}
    </div>
  );
}
