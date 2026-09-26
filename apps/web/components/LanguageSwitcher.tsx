"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";

const LANGUAGES: Record<string, string> = {
  en: "English",
  es: "Español",
  de: "Deutsch",
  fr: "Français",
};

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className={`relative flex items-center ${className}`}>
      <Globe size={14} className="absolute left-2.5 pointer-events-none text-[#6E6E73]" />
      <select
        aria-label="Change language"
        value={locale}
        onChange={(e) => router.replace(pathname, { locale: e.target.value })}
        className="appearance-none bg-transparent pl-7 pr-2 py-1.5 text-[13px] font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-pointer rounded-full border border-transparent hover:border-[rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/30"
      >
        {Object.entries(LANGUAGES).map(([code, label]) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
