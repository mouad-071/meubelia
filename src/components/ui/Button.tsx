import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  loadingLabel?: string;
};

/** Primary storefront action, matching the "add to cart" treatment. */
export function Button({
  loading = false,
  loadingLabel,
  disabled,
  className = "",
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`cursor-pointer bg-olive py-3.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-olive-dark disabled:cursor-not-allowed disabled:bg-olive/50 ${className}`}
    >
      {loading && loadingLabel ? loadingLabel : children}
    </button>
  );
}
