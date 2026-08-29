/**
 * Matching helpers for the header search.
 *
 * Everything runs against the catalogue already shipped to the browser, so
 * results appear as the customer types. When a real search endpoint exists,
 * only the data source has to change - the matching contract stays the same.
 */

/**
 * Folds a string character by character: lowercase and without diacritics,
 * so "Étagères" matches "etage". Folding per character keeps a 1:1 index
 * mapping with the original, which is what the highlighter relies on.
 */
function foldChars(value: string): string[] {
  return Array.from(value).map((char) =>
    char
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase(),
  );
}

export function fold(value: string): string {
  return foldChars(value).join("");
}

/**
 * Index of the query inside the text, preferring a match at the start of the
 * text or of any word. Returns -1 when there is no match, and is expressed in
 * `Array.from` character positions.
 */
export function matchIndex(text: string, query: string): number {
  const trimmed = query.trim();
  if (trimmed === "") return -1;

  const chars = foldChars(text);
  const needle = fold(trimmed);

  // Folding is 1:1 per character for the Latin script; bail out if that ever
  // stops holding rather than highlighting the wrong slice.
  if (chars.length !== Array.from(text).length) return -1;

  const haystack = chars.join("");
  if (haystack.startsWith(needle)) return 0;

  for (let index = 0; index < chars.length; index += 1) {
    const isWordStart = index > 0 && /[\s'’-]/.test(chars[index - 1]);
    if (isWordStart && haystack.startsWith(needle, index)) return index;
  }

  return -1;
}

/** True when the query appears anywhere in the text. */
export function contains(text: string, query: string): boolean {
  const trimmed = query.trim();
  if (trimmed === "") return false;

  return fold(text).includes(fold(trimmed));
}

/** True when the query matches the start of the text or of one of its words. */
export function matchesWordStart(text: string, query: string): boolean {
  return matchIndex(text, query) >= 0;
}

/** Case-insensitive, accent-insensitive de-duplication preserving order. */
export function uniqueByFold(values: string[]): string[] {
  const seen = new Set<string>();

  return values.filter((value) => {
    const key = fold(value.trim());
    if (key === "" || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
