import { matchIndex } from "@/lib/search";

type Props = {
  text: string;
  query: string;
};

/** Renders `text` with the part matching `query` emphasised, as in the design. */
export function HighlightMatch({ text, query }: Props) {
  const start = matchIndex(text, query);
  const chars = Array.from(text);
  const length = Array.from(query.trim()).length;

  if (start < 0) {
    return <span className="text-ink/60">{text}</span>;
  }

  return (
    <>
      <span className="text-ink/60">{chars.slice(0, start).join("")}</span>
      <span className="font-medium text-ink">
        {chars.slice(start, start + length).join("")}
      </span>
      <span className="text-ink/60">{chars.slice(start + length).join("")}</span>
    </>
  );
}
