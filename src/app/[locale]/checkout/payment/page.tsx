"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { CheckCircleIcon, AlertCircleIcon, InfoIcon, MastercardIcon } from "@/components/icons";
import { useCart } from "@/lib/cart-context";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { OrderSummary } from "@/components/checkout/OrderSummary";

/** Stripe's own real test-decline card number — reused here so the demo failure path is memorable and unambiguous. */
const DECLINE_CARD = "4000000000000002";

type Result = "idle" | "success" | "failed";

export default function CheckoutPaymentPage() {
  const t = useTranslations("checkout");
  const router = useRouter();
  const cart = useCart();
  const [result, setResult] = useState<Result>("idle");

  useEffect(() => {
    if (cart.ready && cart.count === 0 && result === "idle") {
      router.replace("/cart");
    }
  }, [cart.ready, cart.count, result, router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cardNumber = String(
      new FormData(event.currentTarget).get("cardNumber") ?? "",
    ).replace(/\s+/g, "");

    if (cardNumber === DECLINE_CARD) {
      setResult("failed");
    } else {
      setResult("success");
      cart.clear();
    }
  }

  if (result === "success") return <PaymentSuccess />;
  if (result === "failed") return <PaymentFailed onRetry={() => setResult("idle")} />;

  if (!cart.ready || cart.count === 0) return null;

  return (
    <div className="px-6 py-10 sm:px-10">
      <div className="mb-8">
        <CheckoutSteps current="payment" />
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px]">
        <form onSubmit={handleSubmit} className="max-w-xl">
          <h2 className="text-lg font-medium text-ink">{t("billingHeading")}</h2>

          <label className="mt-4 flex items-center gap-2 text-sm text-ink/70">
            <input type="checkbox" defaultChecked className="size-3.5 accent-olive" />
            {t("billingSameAsDefault")}
          </label>
          <label className="mt-2 flex items-center gap-2 text-sm text-ink/70">
            <input type="checkbox" className="size-3.5 accent-olive" />
            {t("addAltAddress")}
          </label>

          <Field label={t("name")} name="name" required />
          <Field label={t("email")} name="email" type="email" required />
          <Field label={t("country")} name="country" required />
          <Field label={t("address")} name="address" required />
          <Field label={t("apartment")} name="address2" />
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Field label={t("city")} name="city" required />
            <Field label={t("postalCode")} name="postalCode" required />
          </div>
          <Field label={t("phone")} name="phone" type="tel" required />

          <h2 className="mt-10 text-lg font-medium text-ink">{t("paymentHeading")}</h2>
          <p className="mt-1 text-sm text-ink/60">{t("paymentMethod")}</p>

          <div className="mt-3 flex items-center gap-2">
            <span className="relative h-7 w-11 overflow-hidden rounded-sm border border-line bg-white">
              <Image src="/images/payment/amex.jpg" alt="American Express" fill className="object-contain p-0.5" />
            </span>
            <span className="relative h-7 w-11 overflow-hidden rounded-sm border border-line bg-white">
              <Image src="/images/payment/visa.webp" alt="Visa" fill className="object-contain p-0.5" />
            </span>
            <span className="flex h-7 w-11 items-center justify-center rounded-sm border border-line bg-white">
              <MastercardIcon className="h-4 w-6" />
            </span>
            <span className="relative h-7 w-11 overflow-hidden rounded-sm border border-line bg-white">
              <Image src="/images/payment/paypal.png" alt="PayPal" fill className="object-contain p-0.5" />
            </span>
          </div>

          <Field
            label={t("cardNumber")}
            name="cardNumber"
            required
            inputMode="numeric"
            autoComplete="cc-number"
          />
          <div className="mt-3 grid grid-cols-3 gap-3">
            <Field label={t("month")} name="expiryMonth" required inputMode="numeric" />
            <Field label={t("year")} name="expiryYear" required inputMode="numeric" />
            <Field
              label={t("securityCode")}
              name="cvc"
              required
              inputMode="numeric"
              autoComplete="cc-csc"
            />
          </div>
          <p className="mt-1 flex items-center gap-1 text-xs text-ink/40">
            <InfoIcon className="size-3.5" />
            {t("whatIsThis")}
          </p>

          <button
            type="submit"
            className="mt-6 w-full cursor-pointer bg-olive py-3.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-olive-dark"
          >
            {t("payAndPlaceOrder")}
          </button>

          <p className="mt-4 text-xs leading-relaxed text-ink/50">
            {t("legalNotice")}
          </p>
          <p className="mt-2 border-t border-line pt-3 text-xs leading-relaxed text-ink/40">
            {t("demoNotice")}
          </p>
        </form>

        <div className="lg:pt-[52px]">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}

function PaymentSuccess() {
  const t = useTranslations("checkout");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <CheckCircleIcon className="size-12 text-olive" />
      <h1 className="font-serif text-2xl font-medium text-ink">
        {t("successHeading")}
      </h1>
      <p className="max-w-md text-sm text-ink/70">{t("successText")}</p>
      <p className="text-sm text-ink/70">{t("successReceipt")}</p>
      <p className="mt-2 text-xs text-ink/50">{t("contactUs")}</p>
      <Link
        href="/"
        className="mt-4 bg-olive px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-olive-dark"
      >
        {t("backToHome")}
      </Link>
    </div>
  );
}

function PaymentFailed({ onRetry }: { onRetry: () => void }) {
  const t = useTranslations("checkout");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <AlertCircleIcon className="size-12 text-red-600" />
      <h1 className="font-serif text-2xl font-medium text-ink">
        {t("failedHeading")}
      </h1>
      <p className="max-w-md text-sm text-ink/70">{t("failedText")}</p>
      <p className="max-w-md text-sm text-ink/70">{t("failedHint")}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 cursor-pointer bg-olive px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-olive-dark"
      >
        {t("payNow")}
      </button>
      <Link href="/cart" className="text-sm text-ink/60 hover:text-ink">
        ← {t("backToCart")}
      </Link>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  inputMode,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  inputMode?: "text" | "numeric" | "tel" | "email";
  autoComplete?: string;
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
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={label}
        className="w-full border border-line px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none"
      />
    </div>
  );
}
