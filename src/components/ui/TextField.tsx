import type { InputHTMLAttributes, ReactNode } from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className"> & {
  id: string;
  /** Kept for assistive technology; the visible cue is the placeholder. */
  label: string;
  error?: string;
  /** Rendered inside the field, e.g. the password visibility toggle. */
  trailing?: ReactNode;
};

export function TextField({ id, label, error, trailing, ...props }: Props) {
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>

      <div className="relative">
        <input
          {...props}
          id={id}
          placeholder={props.placeholder ?? label}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : props["aria-describedby"]}
          className={`w-full rounded-sm border bg-white px-4 py-3 pr-10 text-sm text-ink transition-colors placeholder:text-ink/40 focus:border-olive focus:outline-none ${
            error ? "border-red-700" : "border-line"
          }`}
        />
        {trailing ? (
          <span className="absolute inset-y-0 right-2 flex items-center">
            {trailing}
          </span>
        ) : null}
      </div>

      {error ? (
        <p id={errorId} className="text-xs text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
