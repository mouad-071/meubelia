"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CloseIcon, SearchIcon } from "@/components/icons";
import { HighlightMatch } from "@/components/search/HighlightMatch";
import { useSearchResults } from "@/components/search/useSearchResults";
import { useOverlayPanel } from "@/lib/overlay-context";

/**
 * Search entry point in the header. The toggle sits in the icon row and the
 * panel is positioned against the (sticky, therefore positioned) <header>,
 * so it opens as a full-width sheet underneath the navigation. The wrapper
 * uses `display: contents` so it doesn't become the panel's positioning
 * context (the header stays that) while still giving the outside-click
 * check a single DOM node to test against.
 */
export function HeaderSearch() {
  const t = useTranslations("search");
  const tNav = useTranslations("nav");
  const panelId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { open, show, hide } = useOverlayPanel();
  const [query, setQuery] = useState("");

  const results = useSearchResults(query);
  const showResults = query.trim() !== "";

  useEffect(() => {
    if (!open) return;

    inputRef.current?.focus();

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        hide();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") hide();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, hide]);

  function close() {
    hide();
    setQuery("");
  }

  return (
    <div ref={containerRef} className="contents">
      <button
        type="button"
        onClick={() => (open ? close() : show())}
        aria-label={open ? t("close") : tNav("search")}
        aria-expanded={open}
        aria-controls={panelId}
        className="cursor-pointer"
      >
        {open ? <CloseIcon className="size-5" /> : <SearchIcon className="size-5" />}
      </button>

      {open ? (
        <>
          <div
            id={panelId}
            className="absolute inset-x-0 top-full max-h-[75dvh] overflow-y-auto border-t border-line bg-white"
          >
            <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 lg:px-10">
              <div className="flex items-center gap-3 border-b border-line pb-3">
                <SearchIcon className="size-5 shrink-0 text-ink/50" />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t("placeholder")}
                  aria-label={tNav("search")}
                  className="min-w-0 flex-1 bg-transparent text-base text-ink placeholder:text-ink/40 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
                />
                <button
                  type="button"
                  onClick={close}
                  aria-label={t("close")}
                  className="shrink-0 cursor-pointer text-ink/60 transition-colors hover:text-ink"
                >
                  <CloseIcon className="size-5" />
                </button>
              </div>

              {showResults ? (
                <div aria-live="polite" className="pt-6 pb-2">
                  {results.isEmpty ? (
                    <p className="py-6 text-sm text-ink/60">
                      {t("noResults", { query: query.trim() })}
                    </p>
                  ) : (
                    <>
                      <div className="grid gap-8 sm:grid-cols-2">
                        <Column
                          heading={t("suggestions")}
                          items={results.suggestions}
                          query={query}
                          onNavigate={close}
                        />
                        <Column
                          heading={t("categories")}
                          items={results.categories}
                          query={query}
                          onNavigate={close}
                        />
                      </div>

                      {results.productHits.length > 0 ? (
                        <section className="mt-8">
                          <h2 className="text-xs tracking-[0.15em] text-ink/60 uppercase">
                            {t("products")}
                          </h2>

                          <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-7">
                            {results.productHits.map((hit) => (
                              <li key={hit.key}>
                                <Link
                                  href={`/products/${hit.slug}`}
                                  onClick={close}
                                  className="block"
                                >
                                  <span className="relative block aspect-square overflow-hidden bg-sand">
                                    <Image
                                      src={hit.image}
                                      alt={hit.name}
                                      fill
                                      sizes="(min-width: 1024px) 120px, 30vw"
                                      className="object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>

                          <Link
                            href="/search"
                            onClick={close}
                            className="mt-5 inline-flex items-center justify-center border border-line px-12 py-3 text-sm text-ink transition-colors hover:border-ink"
                          >
                            {t("viewMore")}
                          </Link>
                        </section>
                      ) : null}
                    </>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

type ColumnProps = {
  heading: string;
  items: string[];
  query: string;
  onNavigate: () => void;
};

function Column({ heading, items, query, onNavigate }: ColumnProps) {
  if (items.length === 0) return null;

  return (
    <section>
      <h2 className="text-xs tracking-[0.15em] text-ink/60 uppercase">
        {heading}
      </h2>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item}>
            <Link
              href="/search"
              onClick={onNavigate}
              className="block text-sm transition-colors hover:text-olive"
            >
              <HighlightMatch text={item} query={query} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
