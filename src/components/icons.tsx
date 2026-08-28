import type { SVGProps } from "react";

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

export function UserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" strokeLinecap="round" />
    </svg>
  );
}

export function HeartIcon(
  props: SVGProps<SVGSVGElement> & { filled?: boolean },
) {
  const { filled, ...rest } = props;
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.5}
      {...rest}
    >
      <path
        d="M12 20.5s-7.5-4.6-10-9.3C.4 7.6 2 4 5.6 4 8 4 10 5.3 12 8c2-2.7 4-4 6.4-4C22 4 23.6 7.6 22 11.2c-2.5 4.7-10 9.3-10 9.3Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path d="M6 8h12l-1 13H7L6 8Z" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14 22v-8h2.7l.4-3.3H14V8.6c0-1 .3-1.6 1.7-1.6H17V4.1c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.7H8.5V14H10.8v8H14Z" />
    </svg>
  );
}

export function PinterestIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path
        d="M10 18c1-3.5 1.7-6 1.7-8a2.2 2.2 0 0 1 4.3.5c0 1.6-1 4-2.6 4-.8 0-1.3-.6-1.2-1.4.2-1 .6-2 .6-2.7 0-1.6-2.3-1.4-2.3.7 0 .6.1 1.1.2 1.4-.8 3.5-1.2 5.2-1 6.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.5 3c.3 1.8 1.5 3.2 3.5 3.5v2.7c-1.3 0-2.5-.4-3.5-1.1v6.4a5 5 0 1 1-4-4.9v2.8a2.3 2.3 0 1 0 1.6 2.2V3h2.4Z" />
    </svg>
  );
}

export function ReturnIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path
        d="M4 7h11a5 5 0 0 1 0 10H9M4 7l4-4M4 7l4 4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MessageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path
        d="M4 5h16v11H9l-5 4V5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
