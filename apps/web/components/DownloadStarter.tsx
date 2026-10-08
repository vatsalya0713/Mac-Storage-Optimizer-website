"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, Settings, Terminal } from "lucide-react";

// Every "Download" button on the site lands on /downloads?start=1 (in the
// visitor's language). This starts the .dmg download immediately (the file
// is served with Content-Disposition: attachment, so the page stays put) and
// shows exactly how to open it — without that guidance, macOS's first-launch
// dialog ("Apple could not verify…") looks like the app is broken.
export function DownloadStarter() {
  const t = useTranslations("downloadStarter");
  const [started, setStarted] = useState(false);
  const fired = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("start") !== "1" || fired.current) return;
    // A ref, not effect cleanup, guards against a second run: React may run
    // effects twice (Strict Mode), and cancelling the timer in cleanup would
    // drop the download entirely because ?start=1 is already gone by then.
    fired.current = true;
    setStarted(true);
    // Drop ?start=1 so a refresh doesn't download a second copy.
    window.history.replaceState(null, "", window.location.pathname);
    setTimeout(() => {
      window.location.href = "/api/download?src=dmg";
    }, 400);
  }, []);

  if (!started) return null;

  const rich = {
    b: (chunks: React.ReactNode) => <strong>{chunks}</strong>,
    i: (chunks: React.ReactNode) => <em>{chunks}</em>,
    warn: (chunks: React.ReactNode) => <span className="text-[#C2410C] font-semibold">{chunks}</span>,
  };

  return (
    <section className="pt-28 px-6">
      <div className="max-w-[760px] mx-auto rounded-3xl border-2 border-[#34C759]/30 bg-[#F2FBF4] p-7 sm:p-9">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle2 size={22} className="text-[#34C759] flex-shrink-0" />
          <h2 className="text-[22px] font-bold text-[#1D1D1F]">{t("started")}</h2>
        </div>
        <p className="text-[14px] text-[#6E6E73] mb-6">
          {t.rich("notStarted", {
            link: (chunks) => (
              <a href="/api/download?src=dmg" className="text-[#007AFF] font-semibold">
                {chunks}
              </a>
            ),
          })}
        </p>

        <p className="text-[15px] font-bold text-[#1D1D1F] mb-3">{t("firstTime")}</p>
        <ol className="space-y-3 text-[14px] text-[#1D1D1F] list-decimal pl-5 mb-6">
          <li>{t.rich("step1", rich)}</li>
          <li>{t.rich("step2", rich)}</li>
          <li>
            {t.rich("step3", rich)}
            <a
              href="x-apple.systempreferences:com.apple.preference.security"
              className="ml-2 inline-flex items-center gap-1 text-[#007AFF] font-semibold"
            >
              <Settings size={13} /> {t("openSettings")}
            </a>
          </li>
          <li>{t("step4")}</li>
        </ol>

        <div className="rounded-2xl bg-white border border-[rgba(0,0,0,0.06)] p-5">
          <p className="flex items-center gap-2 text-[14px] font-bold text-[#1D1D1F] mb-2">
            <Terminal size={15} /> {t("zeroTitle")}
          </p>
          <p className="text-[13px] text-[#6E6E73] mb-3">{t("zeroText")}</p>
          <code className="block bg-[#F5F5F7] rounded-xl px-4 py-3 text-[13px] text-[#1D1D1F] break-all select-all">
            curl -fsSL https://www.macdiskcleaner.com/install.sh | bash
          </code>
        </div>
      </div>
    </section>
  );
}
