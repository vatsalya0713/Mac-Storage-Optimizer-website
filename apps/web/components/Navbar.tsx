"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Download, Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/#features", label: t("features") },
    { href: "/#howit", label: t("howit") },
    { href: "/#pricing", label: t("pricing") },
    { href: "/blog", label: t("blog") },
    { href: "/#faq", label: t("support") },
  ];

  return (
    <header className="glass-nav fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[1200px] mx-auto h-[52px] px-4 sm:px-6 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group min-w-0 flex-shrink-0">
          <img
            src="/logo.jpg"
            alt="MacDiskCleaner Logo"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-[9px] sm:rounded-[10px] shadow-sm group-hover:scale-105 transition-transform duration-200 object-cover flex-shrink-0"
          />
          <span className="font-bold text-[15px] sm:text-[17px] tracking-tight text-[#1D1D1F] whitespace-nowrap truncate">
            MacDiskCleaner
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-[14px] text-[#6E6E73] font-medium flex-shrink-0">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-[#1D1D1F] transition-colors whitespace-nowrap">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 flex-shrink-0">
          <LanguageSwitcher className="hidden lg:flex" />
          <a
            href="/downloads/MacDiskCleaner.dmg"
            className="btn-primary text-[12px] sm:text-[13px] py-[8px] sm:py-[9px] px-3.5 sm:px-5 whitespace-nowrap"
          >
            <Download size={14} /> <span className="hidden xs:inline">{t("download")}</span>
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="lg:hidden p-2 -mr-2 text-[#1D1D1F] flex-shrink-0"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-[rgba(0,0,0,0.06)] bg-white/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-[15px] font-medium text-[#1D1D1F] border-b border-[rgba(0,0,0,0.04)] last:border-0"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-2.5">
            <LanguageSwitcher />
          </div>
        </nav>
      )}
    </header>
  );
}
