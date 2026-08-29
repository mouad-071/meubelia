import type { ReactNode } from "react";

/** Announces a submission failure that is not tied to a single field. */
export function FormAlert({ children }: { children: ReactNode }) {
  return (
    <p
      role="alert"
      className="border border-red-700/25 bg-red-700/5 px-4 py-3 text-sm text-red-700"
    >
      {children}
    </p>
  );
}
