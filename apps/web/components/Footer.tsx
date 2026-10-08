"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AppleLogo } from "@/components/AppleLogo"

export function Footer() {
  const tNav = useTranslations("nav");
  const t = useTranslations("footer");
  const tLinks = useTranslations("footerLinks");

  return (
    <footer className="bg-[#F5F5F7] border-t border-[rgba(0,0,0,0.06)] py-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-[15px] text-[#1D1D1F]">
            <AppleLogo size={17} /> MacDiskCleaner
          </Link>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-[#6E6E73] font-medium">
            <Link href={{ pathname: "/", hash: "features" }} className="hover:text-[#1D1D1F] transition-colors">{tNav("features")}</Link>
            <Link href="/pricing" className="hover:text-[#1D1D1F] transition-colors">{tNav("pricing")}</Link>
            <Link href="/downloads" className="hover:text-[#1D1D1F] transition-colors">{tLinks("download")}</Link>
            <Link href="/free-mac-cleaner" className="hover:text-[#1D1D1F] transition-colors">{tNav("freeMacCleaner")}</Link>
            <Link href="/blog" className="hover:text-[#1D1D1F] transition-colors">{tLinks("guides")}</Link>
            <Link href="/developers" className="hover:text-[#1D1D1F] transition-colors">{tLinks("developers")}</Link>
            <Link href="/clear-system-data-mac" className="hover:text-[#1D1D1F] transition-colors">{tLinks("systemData")}</Link>
            <Link href="/vs/cleanmymac" className="hover:text-[#1D1D1F] transition-colors">{tLinks("vsCleanMyMac")}</Link>
            <Link href="/vs/onyx" className="hover:text-[#1D1D1F] transition-colors">vs. OnyX</Link>
            <Link href="/vs/daisydisk" className="hover:text-[#1D1D1F] transition-colors">vs. DaisyDisk</Link>
            <Link href="/security" className="hover:text-[#1D1D1F] transition-colors">{tLinks("safety")}</Link>
            <Link href="/changelog" className="hover:text-[#1D1D1F] transition-colors">{tLinks("changelog")}</Link>
            <Link href="/contact" className="hover:text-[#1D1D1F] transition-colors">{tLinks("contact")}</Link>
            <Link href="/privacy" className="hover:text-[#1D1D1F] transition-colors">{t("privacy")}</Link>
            <Link href="/terms" className="hover:text-[#1D1D1F] transition-colors">{t("terms")}</Link>
          </nav>
        </div>
        <hr className="divider mb-6" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-[12px] text-[#6E6E73]">
          <p>{t("copyright")}</p>
          <p>{t("tagline")}</p>
        </div>
      </div>
    </footer>
  );
}
