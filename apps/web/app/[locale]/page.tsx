"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Trash2, Copy, HardDrive, Shield, Zap, Star,
  ChevronRight, Download, Apple, Check,
  Search, Globe, Lock, BarChart2, Clock, ArrowRight
} from "lucide-react";

const FEATURE_ICONS = [
  { icon: Trash2, color: "#FF3B30", bg: "#FFF1F0" },
  { icon: Copy, color: "#007AFF", bg: "#EBF4FF" },
  { icon: HardDrive, color: "#34C759", bg: "#EDFAF0" },
  { icon: Shield, color: "#5856D6", bg: "#F0EFFF" },
  { icon: Zap, color: "#FF9500", bg: "#FFF5E6" },
  { icon: Search, color: "#30B0C7", bg: "#EDF9FB" },
];

const LIFESTYLE_ICONS = [Apple, Zap, Lock, Clock];

const HOWIT_ICONS = [Download, Search, Zap];

const SCREENSHOT_META = [
  { emoji: "🏠", color: "#007AFF", bg: "#EBF4FF", image: "/real-app-dashboard.png" },
  { emoji: "📋", color: "#FF9500", bg: "#FFF5E6", image: "/real-app-duplicates-new.png" },
  { emoji: "📦", color: "#AF52DE", bg: "#F5EEFF", image: "/real-app-largefiles-new.png" },
  { emoji: "🕰️", color: "#8E8E93", bg: "#F2F2F7", image: "/real-app-oldfiles-new.png" },
  { emoji: "⚡", color: "#FF3B30", bg: "#FFF1F0", image: "/real-app-cleanup-new.png" },
  { emoji: "🗑️", color: "#34C759", bg: "#EDFAF0", image: "/real-app-uninstaller-new.png" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as any } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

function Hero() {
  const t = useTranslations("hero");
  const rows = t.raw("scanRows") as [string, string][];
  const trust = t.raw("trust") as string[];
  return (
    <section className="relative min-h-screen pt-24 pb-20 bg-white flex flex-col items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(0,122,255,0.07)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-2 bg-[#F0F6FF] text-[#007AFF] text-[13px] font-semibold rounded-full px-4 py-1.5 border border-[#C8DEFF]">
            <Apple size={13} /> {t("badge")}
          </span>
        </motion.div>

        <motion.div
          initial="hidden" animate="visible" variants={stagger}
          className="text-center mb-8 max-w-[820px] mx-auto"
        >
          <motion.h1 variants={fadeUp} className="text-[62px] md:text-[76px] font-extrabold tracking-[-0.04em] leading-[1.02] text-[#1D1D1F] mb-5">
            {t("titleLine1")}<br />
            <span className="text-[#007AFF]">{t("titleAccent")}</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-[20px] text-[#6E6E73] font-medium leading-relaxed max-w-[560px] mx-auto">
            {t("subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14"
        >
          <a href="/downloads/MacDiskCleaner.dmg" className="btn-primary text-[16px] py-[14px] px-8">
            <Download size={16} /> {t("ctaPrimary")}
          </a>
          <a href="#howit" className="btn-ghost text-[16px] py-[14px] px-6">
            {t("ctaSecondary")} <ChevronRight size={16} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-6 text-[13px] text-[#6E6E73] mb-14 flex-wrap"
        >
          {trust.map((tItem) => (
            <span key={tItem} className="flex items-center gap-1.5">
              <Check size={13} className="text-[#34C759]" strokeWidth={2.5} /> {tItem}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative mx-auto max-w-[900px] rounded-[24px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.14),0_8px_24px_rgba(0,0,0,0.08)]"
        >
          <img
            src="/hero-macbook.jpg"
            alt="MacDiskCleaner running on a MacBook Pro"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative top-[-6%] left-[4%] w-[44%] bg-white/95 backdrop-blur-sm rounded-[14px] shadow-[0_8px_40px_rgba(0,0,0,0.18)] p-4 border border-black/5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                <span className="text-[10px] text-[#6E6E73] ml-2 font-medium">MacDiskCleaner</span>
              </div>
              <div className="text-[11px] text-[#6E6E73] mb-2 font-medium">{t("scanLabel")}</div>
              <div className="text-[24px] font-bold text-[#007AFF] tracking-tight mb-1">{t("scanValue")}</div>
              <div className="text-[10px] text-[#6E6E73] mb-3">{t("scanSub")}</div>
              <div className="space-y-1.5">
                {rows.map(([l, v]) => (
                  <div key={l} className="flex justify-between items-center text-[10px]">
                    <span className="text-[#1D1D1F] font-medium">{l}</span>
                    <span className="text-[#007AFF] font-semibold">{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 bg-[#007AFF] text-white text-[10px] font-semibold rounded-full py-1.5 text-center">
                {t("scanCta")}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatsBar() {
  const t = useTranslations("stats");
  const items = t.raw("items") as { num: string; label: string }[];
  return (
    <section className="bg-[#F5F5F7] border-y border-[rgba(0,0,0,0.06)]">
      <div className="max-w-[1200px] mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="text-center"
          >
            <p className="stat-number text-[#1D1D1F] mb-1">{s.num}</p>
            <p className="text-[14px] text-[#6E6E73] font-medium">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const t = useTranslations("features");
  const items = t.raw("items") as { title: string; desc: string }[];
  return (
    <section id="features" className="py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
          <motion.span variants={fadeUp} className="section-label">{t("label")}</motion.span>
          <motion.h2 variants={fadeUp} className="text-[44px] md:text-[52px] font-extrabold tracking-[-0.03em] text-[#1D1D1F]">
            {t("title")}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[18px] text-[#6E6E73] mt-4 max-w-[520px] mx-auto">
            {t("subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {items.map((f, i) => {
            const meta = FEATURE_ICONS[i];
            return (
              <motion.div key={f.title} variants={fadeUp} className="bento-card p-7">
                <div className="icon-wrap mb-5" style={{ background: meta.bg }}>
                  <meta.icon size={24} color={meta.color} strokeWidth={1.8} />
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function LifestyleSection() {
  const t = useTranslations("lifestyle");
  const points = t.raw("points") as string[];
  return (
    <section className="py-32 bg-[#F5F5F7]">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2"
        >
          <span className="section-label">{t("label")}</span>
          <h2 className="text-[40px] md:text-[48px] font-extrabold tracking-[-0.03em] text-[#1D1D1F] leading-tight mb-5">
            {t("title")}<br />{t("titleAccent")}
          </h2>
          <p className="text-[17px] text-[#6E6E73] leading-relaxed mb-6">
            {t("body")}
          </p>
          <ul className="space-y-3">
            {points.map((text, i) => {
              const Icon = LIFESTYLE_ICONS[i];
              return (
                <li key={text} className="flex items-center gap-3 text-[15px] text-[#1D1D1F] font-medium">
                  <div className="w-8 h-8 rounded-full bg-white border border-[rgba(0,0,0,0.08)] flex items-center justify-center shadow-sm">
                    <Icon size={14} className="text-[#007AFF]" />
                  </div>
                  {text}
                </li>
              );
            })}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2"
        >
          <div className="rounded-[24px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.1)]">
            <img src="/lifestyle-desk.jpg" alt="MacBook Pro on a desk" className="w-full h-auto object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const t = useTranslations("howit");
  const steps = t.raw("steps") as { num: string; title: string; desc: string }[];
  return (
    <section id="howit" className="py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
          <motion.span variants={fadeUp} className="section-label">{t("label")}</motion.span>
          <motion.h2 variants={fadeUp} className="text-[44px] md:text-[52px] font-extrabold tracking-[-0.03em] text-[#1D1D1F]">
            {t("title")}
          </motion.h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => {
            const Icon = HOWIT_ICONS[i];
            return (
              <motion.div key={s.num} variants={fadeUp} className="bento-card p-8 flex flex-col">
                <span className="text-[48px] font-black text-[#F0F0F3] tracking-tight mb-4 leading-none">{s.num}</span>
                <div className="icon-wrap bg-[#EBF4FF] mb-4">
                  <Icon size={22} color="#007AFF" strokeWidth={1.8} />
                </div>
                <h3 className="feature-title mb-2">{s.title}</h3>
                <p className="feature-desc">{s.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function Pricing() {
  const t = useTranslations("pricing");
  const freeFeatures = t.raw("free.features") as string[];
  const proFeatures = t.raw("pro.features") as string[];
  return (
    <section id="pricing" className="py-32 bg-[#F5F5F7]">
      <div className="max-w-[900px] mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
          <motion.span variants={fadeUp} className="section-label">{t("label")}</motion.span>
          <motion.h2 variants={fadeUp} className="text-[44px] md:text-[52px] font-extrabold tracking-[-0.03em] text-[#1D1D1F]">
            {t("title")}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[18px] text-[#6E6E73] mt-4">{t("subtitle")}</motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div variants={fadeUp} className="bento-card p-8">
            <p className="text-[14px] font-semibold text-[#6E6E73] mb-2">{t("free.name")}</p>
            <p className="text-[52px] font-black tracking-tight text-[#1D1D1F] mb-1">{t("free.price")}</p>
            <p className="text-[14px] text-[#6E6E73] mb-6">{t("free.sub")}</p>
            <hr className="divider mb-6" />
            <ul className="space-y-3 mb-8">
              {freeFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3 text-[15px] text-[#1D1D1F]">
                  <Check size={15} className="text-[#34C759]" strokeWidth={2.5} /> {f}
                </li>
              ))}
            </ul>
            <a href="/downloads/MacDiskCleaner.dmg" className="block text-center py-3 rounded-full border-2 border-[#007AFF] text-[#007AFF] font-semibold text-[15px] hover:bg-[#EBF4FF] transition-colors">
              {t("free.cta")}
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="relative rounded-[20px] p-8 bg-[#007AFF] text-white shadow-[0_24px_60px_rgba(0,122,255,0.35)]">
            <div className="absolute top-6 right-6 bg-white/20 text-white text-[11px] font-bold px-3 py-1 rounded-full">{t("pro.badge")}</div>
            <p className="text-[14px] font-semibold text-white/70 mb-2">{t("pro.name")}</p>
            <p className="text-[52px] font-black tracking-tight text-white mb-1">{t("pro.price")}</p>
            <p className="text-[14px] text-white/70 mb-6">{t("pro.sub")}</p>
            <hr className="border-white/20 mb-6" />
            <ul className="space-y-3 mb-8">
              {proFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3 text-[15px] text-white">
                  <Check size={15} className="text-white" strokeWidth={2.5} /> {f}
                </li>
              ))}
            </ul>
            <form action="/api/checkout" method="POST">
              <button type="submit" className="block w-full text-center py-3 rounded-full bg-white text-[#007AFF] font-bold text-[15px] hover:bg-blue-50 transition-colors cursor-pointer">
                {t("pro.cta")}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FAQ() {
  const t = useTranslations("faq");
  const items = t.raw("items") as { q: string; a: string }[];
  return (
    <section id="faq" className="py-32 bg-white">
      <div className="max-w-[760px] mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
          <motion.span variants={fadeUp} className="section-label">{t("label")}</motion.span>
          <motion.h2 variants={fadeUp} className="text-[44px] md:text-[52px] font-extrabold tracking-[-0.03em] text-[#1D1D1F]">
            {t("title")}
          </motion.h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-3">
          {items.map((f) => (
            <motion.details key={f.q} variants={fadeUp} className="group bento-card px-6 py-1 cursor-pointer list-none open:bg-white">
              <summary className="flex justify-between items-center gap-4 text-[16px] sm:text-[17px] font-semibold text-[#1D1D1F] select-none list-none py-4">
                {f.q}
                <ChevronRight size={18} className="text-[#6E6E73] flex-shrink-0 transition-transform duration-300 group-open:rotate-90" />
              </summary>
              <p className="pb-5 text-[15px] text-[#6E6E73] leading-relaxed">{f.a}</p>
            </motion.details>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 bento-card p-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div>
            <p className="text-[16px] font-bold text-[#1D1D1F] mb-1">Still have a question?</p>
            <p className="text-[14px] text-[#6E6E73]">We read every message and reply within 1-2 business days.</p>
          </div>
          <Link href="/contact" className="btn-primary text-[14px] py-2.5 px-6 flex-shrink-0">
            Contact us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function AppScreenshots() {
  const [activeTab, setActiveTab] = useState(0);
  const t = useTranslations("screenshots");
  const tabs = t.raw("tabs") as { id: string; label: string; title: string; desc: string }[];
  const active = tabs[activeTab];
  const activeMeta = SCREENSHOT_META[activeTab];

  return (
    <section id="screenshots" className="py-32 bg-[#F5F5F7] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.span variants={fadeUp} className="section-label">
            {t("label")}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-[44px] md:text-[52px] font-extrabold tracking-[-0.03em] text-[#1D1D1F]"
          >
            {t("titleStart")}{" "}
            <span className="text-[#007AFF]">{t("titleAccent")}</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-[18px] text-[#6E6E73] mt-4 max-w-[560px] mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {tabs.map((tab, i) => {
            const meta = SCREENSHOT_META[i];
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(i)}
                id={`screenshot-tab-${tab.id}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-semibold cursor-pointer border-2 transition-all duration-300 select-none"
                style={
                  activeTab === i
                    ? {
                        background: meta.color,
                        borderColor: meta.color,
                        color: "white",
                        boxShadow: `0 8px 24px ${meta.color}40`,
                        transform: "scale(1.05)",
                      }
                    : {
                        background: "white",
                        borderColor: "transparent",
                        color: "#6E6E73",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      }
                }
              >
                <span>{meta.emoji}</span>
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        <motion.div
          key={`info-${activeTab}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold mb-4"
            style={{ background: activeMeta.bg, color: activeMeta.color }}
          >
            <span>{activeMeta.emoji}</span>
            {active.label}
          </div>
          <h3 className="text-[28px] md:text-[34px] font-extrabold tracking-tight text-[#1D1D1F] mb-3">
            {active.title}
          </h3>
          <p className="text-[17px] text-[#6E6E73] max-w-[580px] mx-auto leading-relaxed">
            {active.desc}
          </p>
        </motion.div>

        <motion.div
          key={`screenshot-${activeTab}`}
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto"
          style={{ maxWidth: "960px" }}
        >
          <div
            className="absolute -inset-6 -z-10 blur-[60px] opacity-20 rounded-[40px] transition-all duration-500"
            style={{ background: activeMeta.color }}
          />

          <div
            className="rounded-[20px] overflow-hidden"
            style={{
              boxShadow: "0 40px 100px rgba(0,0,0,0.18), 0 8px 32px rgba(0,0,0,0.1)",
              border: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{
                background: "linear-gradient(180deg, #3d3d3d 0%, #2d2d2d 100%)",
                borderBottom: "1px solid rgba(0,0,0,0.3)",
              }}
            >
              <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-sm" />
              <span
                className="ml-3 text-[12px] font-medium"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                MacDiskCleaner — {active.label}
              </span>
            </div>

            <img
              src={activeMeta.image}
              alt={`MacDiskCleaner ${active.label} screen`}
              className="w-full h-auto block"
              style={{
                display: "block",
                background: "#1a1a1f",
              }}
            />
          </div>
        </motion.div>

        <div className="flex justify-center gap-2 mt-8">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: activeTab === i ? "24px" : "8px",
                height: "8px",
                background: activeTab === i ? activeMeta.color : "#D1D1D6",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-[52px]">
        <Hero />
        <StatsBar />
        <Features />
        <LifestyleSection />
        <HowItWorks />
        <AppScreenshots />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
