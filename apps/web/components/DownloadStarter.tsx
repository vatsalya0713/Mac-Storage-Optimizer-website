"use client";
import { useEffect, useState } from "react";
import { CheckCircle2, Settings, Terminal } from "lucide-react";

// Every "Download" button on the site lands on /downloads?start=1. This starts
// the .dmg download immediately (the file is served with
// Content-Disposition: attachment, so the page stays put) and shows exactly
// how to open it — without that guidance, macOS's first-launch dialog
// ("Apple could not verify…") looks like the app is broken.
export function DownloadStarter() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("start") !== "1") return;
    setStarted(true);
    const timer = setTimeout(() => {
      window.location.href = "/api/download?src=dmg";
    }, 400);
    // Drop ?start=1 so a refresh doesn't download a second copy.
    window.history.replaceState(null, "", window.location.pathname);
    return () => clearTimeout(timer);
  }, []);

  if (!started) return null;

  return (
    <section className="pt-28 px-6">
      <div className="max-w-[760px] mx-auto rounded-3xl border-2 border-[#34C759]/30 bg-[#F2FBF4] p-7 sm:p-9">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle2 size={22} className="text-[#34C759] flex-shrink-0" />
          <h2 className="text-[22px] font-bold text-[#1D1D1F]">Your download has started</h2>
        </div>
        <p className="text-[14px] text-[#6E6E73] mb-6">
          Didn&apos;t start?{" "}
          <a href="/api/download?src=dmg" className="text-[#007AFF] font-semibold">Click here to download</a>.
        </p>

        <p className="text-[15px] font-bold text-[#1D1D1F] mb-3">Opening it the first time (takes 20 seconds, only once):</p>
        <ol className="space-y-3 text-[14px] text-[#1D1D1F] list-decimal pl-5 mb-6">
          <li>Open the downloaded <strong>MacDiskCleaner.dmg</strong> and drag <strong>MacDiskCleaner</strong> into the <strong>Applications</strong> folder.</li>
          <li>Open MacDiskCleaner from Applications. macOS shows <em>&quot;Apple could not verify…&quot;</em> — click <strong>Done</strong>. <span className="text-[#C2410C] font-semibold">Never click &quot;Move to Bin&quot;.</span></li>
          <li>
            Open <strong>System Settings → Privacy &amp; Security</strong>, scroll down to <em>&quot;MacDiskCleaner was blocked&quot;</em>, click <strong>Open Anyway</strong> and confirm with your password.
            <a
              href="x-apple.systempreferences:com.apple.preference.security"
              className="ml-2 inline-flex items-center gap-1 text-[#007AFF] font-semibold"
            >
              <Settings size={13} /> Open Privacy &amp; Security
            </a>
          </li>
          <li>Done — from now on it opens normally, and updates install themselves with no warning.</li>
        </ol>

        <div className="rounded-2xl bg-white border border-[rgba(0,0,0,0.06)] p-5">
          <p className="flex items-center gap-2 text-[14px] font-bold text-[#1D1D1F] mb-2">
            <Terminal size={15} /> Want zero warnings instead?
          </p>
          <p className="text-[13px] text-[#6E6E73] mb-3">Paste this in Terminal — it installs and opens the app with no security prompt at all:</p>
          <code className="block bg-[#F5F5F7] rounded-xl px-4 py-3 text-[13px] text-[#1D1D1F] break-all select-all">
            curl -fsSL https://www.macdiskcleaner.com/install.sh | bash
          </code>
        </div>
      </div>
    </section>
  );
}
