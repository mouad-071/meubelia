"use client";

import { useTranslations } from "next-intl";
import { AppleIcon, FacebookIcon, GoogleIcon } from "@/components/icons";
import { startSocialAuth, SOCIAL_PROVIDERS } from "@/lib/auth";

const styles = {
  apple: "bg-black text-white",
  google: "border border-line bg-white",
  facebook: "bg-[#1877F2] text-white",
} as const;

const marks = {
  apple: <AppleIcon className="size-5" />,
  google: <GoogleIcon className="size-5" />,
  facebook: <FacebookIcon className="size-6" />,
} as const;

/** Apple, Google and Facebook sign-in, shared by both auth pages. */
export function SocialAuthButtons() {
  const t = useTranslations("auth");

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-ink/50">{t("or")}</p>

      <div className="flex items-center gap-4">
        {SOCIAL_PROVIDERS.map((provider) => (
          <button
            key={provider}
            type="button"
            onClick={() => startSocialAuth(provider)}
            aria-label={t(`social.${provider}`)}
            className={`flex size-9 cursor-pointer items-center justify-center rounded-full transition-transform hover:-translate-y-0.5 ${styles[provider]}`}
          >
            {marks[provider]}
          </button>
        ))}
      </div>
    </div>
  );
}
