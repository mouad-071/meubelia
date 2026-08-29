import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Step = "cart" | "info" | "payment";

const ORDER: Step[] = ["cart", "info", "payment"];
const HREF: Record<Step, string> = {
  cart: "/cart",
  info: "/checkout",
  payment: "/checkout/payment",
};

export function CheckoutSteps({ current }: { current: Step }) {
  const t = useTranslations("checkout");
  const labels: Record<Step, string> = {
    cart: t("stepCart"),
    info: t("stepInfo"),
    payment: t("stepPayment"),
  };

  const currentIndex = ORDER.indexOf(current);

  return (
    <nav className="flex items-center gap-2 text-sm">
      {ORDER.map((step, index) => {
        const isCurrent = step === current;
        const isPast = index < currentIndex;

        return (
          <span key={step} className="flex items-center gap-2">
            {index > 0 && <span className="text-ink/30">/</span>}
            {isPast ? (
              <Link href={HREF[step]} className="text-ink/50 hover:text-ink">
                {labels[step]}
              </Link>
            ) : (
              <span className={isCurrent ? "font-medium text-ink" : "text-ink/30"}>
                {labels[step]}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
