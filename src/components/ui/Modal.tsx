"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { CloseIcon } from "@/components/icons";

type Props = {
  open: boolean;
  onClose: () => void;
  /** Announced as the dialog's accessible name. */
  labelledBy: string;
  children: ReactNode;
};

/**
 * Uses the native <dialog> element, so focus trapping, the backdrop and
 * dismissal with Escape come from the platform rather than custom code.
 */
export function Modal({ open, onClose, labelledBy, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const t = useTranslations("common");

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onCancel={onClose}
      onClick={(event) => {
        // The dialog box itself fills the element, so a click landing on the
        // <dialog> node is a click on the backdrop.
        if (event.target === ref.current) onClose();
      }}
      className="m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto bg-white p-0 text-ink backdrop:bg-black/40"
    >
      <div className="relative px-6 pt-14 pb-10 text-center sm:px-14 sm:pt-12 sm:pb-12">
        <button
          type="button"
          onClick={onClose}
          aria-label={t("close")}
          className="absolute top-4 left-4 cursor-pointer p-1 text-ink/60 transition-colors hover:text-ink"
        >
          <CloseIcon className="size-5" />
        </button>
        {children}
      </div>
    </dialog>
  );
}
