"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Check, Copy, Download, Loader2 } from "lucide-react";

export default function SuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const t = useTranslations("success");
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");

  const [key, setKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (!paymentId || key) return;
    if (attempts > 15) return; // ~30s of polling, then fall back to "check your email"

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/license/by-payment?payment_id=${encodeURIComponent(paymentId)}`);
        if (res.ok) {
          const data = await res.json();
          setKey(data.key);
        } else {
          setAttempts((n) => n + 1);
        }
      } catch {
        setAttempts((n) => n + 1);
      }
    }, attempts === 0 ? 500 : 2000);

    return () => clearTimeout(timer);
  }, [paymentId, key, attempts]);

  const copyKey = () => {
    if (!key) return;
    navigator.clipboard.writeText(key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const timedOut = attempts > 15 && !key;

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6 py-20">
      <div className="max-w-[480px] w-full text-center">
        <div className="w-16 h-16 rounded-full bg-[#EDFAF0] flex items-center justify-center mx-auto mb-6">
          <Check size={28} className="text-[#34C759]" strokeWidth={2.5} />
        </div>
        <h1 className="text-[32px] font-extrabold tracking-tight text-[#1D1D1F] mb-2">{t("title")}</h1>
        <p className="text-[16px] text-[#6E6E73] mb-8">{t("subtitle")}</p>

        <div className="bento-card p-6 mb-8 text-left">
          <p className="text-[13px] font-semibold text-[#6E6E73] mb-2">{t("keyLabel")}</p>
          {key ? (
            <div className="flex items-center justify-between gap-3 bg-[#F5F5F7] rounded-xl px-4 py-3">
              <code className="text-[16px] font-mono font-semibold text-[#007AFF]">{key}</code>
              <button onClick={copyKey} className="text-[#6E6E73] hover:text-[#1D1D1F] transition-colors flex items-center gap-1 text-[13px] font-medium">
                {copied ? <Check size={16} className="text-[#34C759]" /> : <Copy size={16} />}
                {copied ? t("copied") : t("copy")}
              </button>
            </div>
          ) : timedOut ? (
            <p className="text-[14px] text-[#6E6E73]">{t("supportNote")}</p>
          ) : (
            <div className="flex items-center gap-2 text-[#6E6E73] text-[14px] py-2">
              <Loader2 size={16} className="animate-spin" /> …
            </div>
          )}

          <hr className="divider my-5" />

          <p className="text-[13px] font-semibold text-[#6E6E73] mb-3">{t("instructionsTitle")}</p>
          <ol className="space-y-2 text-[14px] text-[#1D1D1F]">
            <li>1. {t("step1")}</li>
            <li>2. {t("step2")}</li>
            <li>3. {t("step3")}</li>
          </ol>
        </div>

        <a href="/downloads/MacDiskCleaner.dmg" className="btn-primary text-[15px] py-3 px-7 inline-flex">
          <Download size={16} /> {t("downloadCta")}
        </a>

        <p className="text-[12px] text-[#9A9A9E] mt-8">{t("supportNote")}</p>
      </div>
    </main>
  );
}
