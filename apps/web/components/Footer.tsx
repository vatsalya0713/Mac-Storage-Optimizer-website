"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Apple } from "lucide-react";

export function Footer() {
  const tNav = useTranslations("nav");
  const t = useTranslations("footer");

  return (
    <footer className="bg-[#F5F5F7] border-t border-[rgba(0,0,0,0.06)] py-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-[15px] text-[#1D1D1F]">
            <Apple size={17} /> MacDiskCleaner
          </Link>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-[#6E6E73] font-medium">
            <a href="/#features" className="hover:text-[#1D1D1F] transition-colors">{tNav("features")}</a>
            <a href="/#howit" className="hover:text-[#1D1D1F] transition-colors">{tNav("howit")}</a>
            <a href="/#pricing" className="hover:text-[#1D1D1F] transition-colors">{tNav("pricing")}</a>
            <Link href="/blog" className="hover:text-[#1D1D1F] transition-colors">{tNav("blog")}</Link>
            <Link href="/vs/cleanmymac" className="hover:text-[#1D1D1F] transition-colors">vs. CleanMyMac</Link>
            <Link href="/contact" className="hover:text-[#1D1D1F] transition-colors">Contact</Link>
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
