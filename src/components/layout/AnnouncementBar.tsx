"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { CloseIcon } from "@/components/icons";

const ROTATE_MS = 5000;
const FADE_MS = 300;
const STORAGE_KEY = "meubelia_announcement_closed";

export function AnnouncementBar() {
  const t = useTranslations("announcement");
  const messages = t.raw("messages") as string[];

  const [closed, setClosed] = useState(false);
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Synced from sessionStorage after mount: the server can't know this,
    // so this corrects the initial "open" render rather than causing a
    // hydration mismatch.
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (sessionStorage.getItem(STORAGE_KEY) === "1") setClosed(true);
    } catch {
      // sessionStorage unavailable (private browsing, etc.) — bar just stays visible
    }
  }, []);

  useEffect(() => {
    if (messages.length < 2 || closed) return;
    const interval = setInterval(() => setFading(true), ROTATE_MS);
    return () => clearInterval(interval);
  }, [messages.length, closed]);

  useEffect(() => {
    if (!fading) return;
    const timeout = setTimeout(() => {
      setIndex((i) => (i + 1) % messages.length);
      setFading(false);
    }, FADE_MS);
    return () => clearTimeout(timeout);
  }, [fading, messages.length]);

  function handleClose() {
    setClosed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore — closing still works for this render, just won't persist
    }
  }

  return (
    <div
      className={`grid bg-olive text-white transition-[grid-template-rows] duration-300 ease-out ${
        closed ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
      }`}
    >
      <div className="overflow-hidden">
        <div className="relative flex items-center justify-center px-10 py-2.5 text-center text-xs font-medium tracking-[0.12em] uppercase">
          <span
            className={`transition-opacity duration-300 ${
              fading ? "opacity-0" : "opacity-100"
            }`}
          >
            {messages[index]}
          </span>
          <button
            type="button"
            onClick={handleClose}
            aria-label={t("close")}
            className="absolute right-4 cursor-pointer text-white/80 transition-colors hover:text-white"
          >
            <CloseIcon className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
