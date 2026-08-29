"use client";

import { useEffect, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { useCart } from "@/lib/cart-context";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { OrderSummary } from "@/components/checkout/OrderSummary";

export default function CheckoutInfoPage() {
  const t = useTranslations("checkout");
  const router = useRouter();
  const cart = useCart();

  useEffect(() => {
    if (cart.ready && cart.count === 0) router.replace("/cart");
  }, [cart.ready, cart.count, router]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    router.push("/checkout/payment");
  }

  if (!cart.ready || cart.count === 0) return null;

  return (
    <div className="px-6 py-10 sm:px-10">
      <div className="mb-8">
        <CheckoutSteps current="info" />
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px]">
        <form onSubmit={handleSubmit} className="max-w-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-ink">{t("contactHeading")}</h2>
            <p className="text-sm text-ink/50">
              {t("haveAccount")}{" "}
              <span className="cursor-default text-ink/70 underline underline-offset-2">
                {t("logIn")}
              </span>
            </p>
          </div>

          <Field label={t("email")} name="email" type="email" required />

          <label className="mt-3 flex items-center gap-2 text-sm text-ink/70">
            <input type="checkbox" className="size-3.5 accent-olive" />
            {t("emailOffers")}
          </label>

          <h2 className="mt-10 text-lg font-medium text-ink">
            {t("shippingHeading")}
          </h2>

          <Field label={t("country")} name="country" required />
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Field label={t("firstName")} name="firstName" required />
            <Field label={t("lastName")} name="lastName" required />
          </div>
          <Field label={t("company")} name="company" />
          <Field label={t("address")} name="address" required />
          <Field label={t("apartment")} name="apartment" />
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Field label={t("postalCode")} name="postalCode" required />
            <Field label={t("city")} name="city" required />
          </div>
          <Field label={t("phone")} name="phone" type="tel" required />

          <label className="mt-3 flex items-center gap-2 text-sm text-ink/70">
            <input type="checkbox" className="size-3.5 accent-olive" />
            {t("saveInfo")}
          </label>

          <div className="mt-8 flex items-center justify-between">
            <Link href="/cart" className="text-sm text-ink/60 hover:text-ink">
              ← {t("returnToCart")}
            </Link>
            <button
              type="submit"
              className="cursor-pointer bg-olive px-8 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-olive-dark"
            >
              {t("continueToPayment")}
            </button>
          </div>
        </form>

        <div className="lg:pt-[52px]">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="mt-3">
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={label}
        className="w-full border border-line px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none"
      />
    </div>
  );
}
