"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Download, Menu, X, ChevronDown, Sparkles, PlayCircle, Tag, FileText, Scale, Newspaper, HelpCircle, Mail } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";

type MenuItem = {
  href: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

function MegaDropdown({
  label,
  items,
  isOpen,
  onToggle,
  onClose,
}: {
  label: string;
  items: MenuItem[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 hover:text-[#1D1D1F] transition-colors whitespace-nowrap"
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-[340px] rounded-[16px] border border-[rgba(0,0,0,0.06)] bg-white/95 backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] p-2 z-50">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex items-start gap-3 rounded-[12px] p-3 hover:bg-[#F5F5F7] transition-colors group"
            >
              <span className="flex-shrink-0 w-9 h-9 rounded-[10px] bg-[#007AFF]/10 flex items-center justify-center text-[#007AFF] group-hover:bg-[#007AFF]/15 transition-colors">
                <item.icon size={17} />
              </span>
              <span className="min-w-0">
                <span className="block text-[13.5px] font-semibold text-[#1D1D1F]">{item.label}</span>
                <span className="block text-[12px] text-[#6E6E73] leading-snug mt-0.5">{item.description}</span>
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

const DESCRIPTIONS: Record<string, Record<string, string>> = {
  en: {
    features: "Junk, duplicates, large files, and more",
    howit: "Scan, review, and clean in three steps",
    pricing: "Free tier plus a one-time Pro purchase",
    freeMacCleaner: "Exactly what's included, no trial tricks",
    compare: "Feature-by-feature vs. CleanMyMac & OnyX",
    blog: "Guides on freeing up Mac storage",
    support: "Answers to common questions",
    contact: "Bug reports, support, and feedback",
  },
  es: {
    features: "Basura, duplicados, archivos grandes y más",
    howit: "Escanea, revisa y limpia en tres pasos",
    pricing: "Plan gratuito y compra única Pro",
    freeMacCleaner: "Qué incluye exactamente, sin trampas de prueba",
    compare: "Comparativa detallada con CleanMyMac y OnyX",
    blog: "Guías para liberar espacio en tu Mac",
    support: "Respuestas a preguntas frecuentes",
    contact: "Errores, soporte y sugerencias",
  },
  de: {
    features: "Junk, Duplikate, große Dateien und mehr",
    howit: "Scannen, prüfen und säubern in drei Schritten",
    pricing: "Kostenlose Version plus einmaliger Pro-Kauf",
    freeMacCleaner: "Was genau enthalten ist, ohne Testfallen",
    compare: "Detaillierter Vergleich mit CleanMyMac & OnyX",
    blog: "Anleitungen zum Freigeben von Mac-Speicher",
    support: "Antworten auf häufige Fragen",
    contact: "Fehlermeldungen, Support und Feedback",
  },
  fr: {
    features: "Fichiers indésirables, doublons, gros fichiers...",
    howit: "Analysez, vérifiez et nettoyez en trois étapes",
    pricing: "Offre gratuite et achat Pro unique",
    freeMacCleaner: "Ce qui est inclus exactement, sans piège d'essai",
    compare: "Comparatif détaillé avec CleanMyMac et OnyX",
    blog: "Guides pour libérer de l'espace sur Mac",
    support: "Réponses aux questions fréquentes",
    contact: "Bugs, assistance et suggestions",
  },
};

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const d = DESCRIPTIONS[locale] || DESCRIPTIONS.en;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<"product" | "resources" | null>(null);

  const productItems: MenuItem[] = [
    { href: "/#features", label: t("features"), description: d.features, icon: Sparkles },
    { href: "/#howit", label: t("howit"), description: d.howit, icon: PlayCircle },
    { href: "/#pricing", label: t("pricing"), description: d.pricing, icon: Tag },
    { href: "/free-mac-cleaner", label: t("freeMacCleaner"), description: d.freeMacCleaner, icon: FileText },
    { href: "/vs/cleanmymac", label: t("compare"), description: d.compare, icon: Scale },
  ];

  const resourceItems: MenuItem[] = [
    { href: "/blog", label: t("blog"), description: d.blog, icon: Newspaper },
    { href: "/#faq", label: t("support"), description: d.support, icon: HelpCircle },
    { href: "/contact", label: t("contact"), description: d.contact, icon: Mail },
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
          <MegaDropdown
            label={t("product")}
            items={productItems}
            isOpen={desktopMenu === "product"}
            onToggle={() => setDesktopMenu((m) => (m === "product" ? null : "product"))}
            onClose={() => setDesktopMenu(null)}
          />
          <MegaDropdown
            label={t("resources")}
            items={resourceItems}
            isOpen={desktopMenu === "resources"}
            onToggle={() => setDesktopMenu((m) => (m === "resources" ? null : "resources"))}
            onClose={() => setDesktopMenu(null)}
          />
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
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="lg:hidden p-2 -mr-2 text-[#1D1D1F] flex-shrink-0"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden border-t border-[rgba(0,0,0,0.06)] bg-white/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-1 max-h-[calc(100vh-52px)] overflow-y-auto">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[#86868B] pt-1 pb-1">{t("product")}</p>
          {productItems.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="py-2.5 text-[15px] font-medium text-[#1D1D1F] border-b border-[rgba(0,0,0,0.04)]"
            >
              {l.label}
            </a>
          ))}
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[#86868B] pt-3 pb-1">{t("resources")}</p>
          {resourceItems.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={`py-2.5 text-[15px] font-medium text-[#1D1D1F] ${i < resourceItems.length - 1 ? "border-b border-[rgba(0,0,0,0.04)]" : ""}`}
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
