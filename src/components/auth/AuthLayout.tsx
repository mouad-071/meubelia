import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

/**
 * Split frame for the auth pages: editorial image on the left from `lg` up,
 * form on the right. On small screens the form takes the full width.
 */
export function AuthLayout({ title, children }: Props) {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-16">
      <div className="relative hidden overflow-hidden lg:block">
        <Image
          src="/images/collection/canapes.jpg"
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 0px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-center">
        <div className="mx-auto w-full max-w-sm">
          <h1 className="text-center font-serif text-3xl font-semibold text-ink sm:text-4xl">
            {title}
          </h1>
          <div className="mt-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
