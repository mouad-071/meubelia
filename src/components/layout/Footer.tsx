import { useTranslations } from "next-intl";
import {
  InstagramIcon,
  FacebookIcon,
  PinterestIcon,
  TikTokIcon,
  MessageIcon,
} from "@/components/icons";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  const t = useTranslations("footer");
  const aboutLinks = t.raw("aboutLinks") as string[];
  const helpLinks = t.raw("helpLinks") as string[];
  const joinLinks = t.raw("joinLinks") as string[];

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <h2 className="font-serif text-xl font-medium">
            {t("newsletterHeading")}
          </h2>
          <div className="mt-5">
            <NewsletterForm />
          </div>

          <div className="mt-8 flex items-center gap-4">
            <InstagramIcon className="size-4" aria-label="Instagram" />
            <FacebookIcon className="size-4" aria-label="Facebook" />
            <PinterestIcon className="size-4" aria-label="Pinterest" />
            <TikTokIcon className="size-4" aria-label="TikTok" />
          </div>

          <p className="mt-8 text-xs text-white/50">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>

        <FooterColumn heading={t("aboutHeading")} links={aboutLinks} />
        <FooterColumn heading={t("helpHeading")} links={helpLinks} />
        <FooterColumn heading={t("joinHeading")} links={joinLinks} />
      </div>

      <button
        type="button"
        aria-label={t("chat")}
        className="fixed right-6 bottom-6 z-40 flex size-11 items-center justify-center rounded-md bg-olive text-white shadow-lg transition-colors hover:bg-olive-dark cursor-pointer"
      >
        <MessageIcon className="size-5" />
      </button>
    </footer>
  );
}

function FooterColumn({ heading, links }: { heading: string; links: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{heading}</h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li
            key={link}
            className="cursor-default text-sm text-white/70 transition-colors hover:text-white"
          >
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
}
