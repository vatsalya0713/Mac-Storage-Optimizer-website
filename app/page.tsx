"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Trash2, Copy, HardDrive, Shield, Zap, Star,
  ChevronRight, Download, Apple, Check,
  Search, Globe, Lock, BarChart2, Clock, ArrowRight
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as any } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

// ─── NAVBAR ────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <header className="glass-nav fixed top-0 left-0 right-0 z-50 h-[52px]">
      <div className="max-w-[1200px] mx-auto h-full px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <img
            src="/logo.jpg"
            alt="MacDiskCleaner Logo"
            className="w-9 h-9 rounded-[10px] shadow-sm group-hover:scale-105 transition-transform duration-200 object-cover"
          />
          <span className="font-bold text-[17px] tracking-tight text-[#1D1D1F]">MacDiskCleaner</span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-[14px] text-[#6E6E73] font-medium">
          <a href="#features" className="hover:text-[#1D1D1F] transition-colors">Features</a>
          <a href="#howit" className="hover:text-[#1D1D1F] transition-colors">How It Works</a>
          <a href="#pricing" className="hover:text-[#1D1D1F] transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-[#1D1D1F] transition-colors">Support</a>
        </nav>
        <a href="#pricing" className="btn-primary text-[13px] py-[9px] px-5">
          <Download size={14} /> Download Free
        </a>
      </div>
    </header>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen pt-24 pb-20 bg-white flex flex-col items-center overflow-hidden">
      {/* Soft background radial */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(0,122,255,0.07)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-2 bg-[#F0F6FF] text-[#007AFF] text-[13px] font-semibold rounded-full px-4 py-1.5 border border-[#C8DEFF]">
            <Apple size={13} /> macOS Sequoia Ready · Apple Silicon Native
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial="hidden" animate="visible" variants={stagger}
          className="text-center mb-8 max-w-[820px] mx-auto"
        >
          <motion.h1 variants={fadeUp} className="text-[62px] md:text-[76px] font-extrabold tracking-[-0.04em] leading-[1.02] text-[#1D1D1F] mb-5">
            The Mac cleaner<br />
            <span className="text-[#007AFF]">built for Mac.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-[20px] text-[#6E6E73] font-medium leading-relaxed max-w-[560px] mx-auto">
            Free up gigabytes of storage, remove hidden junk, find duplicates, and keep your Mac running like the day you unboxed it.
          </motion.p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14"
        >
          <a href="#pricing" className="btn-primary text-[16px] py-[14px] px-8">
            <Download size={16} /> Download Free
          </a>
          <a href="#howit" className="btn-ghost text-[16px] py-[14px] px-6">
            See how it works <ChevronRight size={16} />
          </a>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-6 text-[13px] text-[#6E6E73] mb-14 flex-wrap"
        >
          {["No subscription", "One-time purchase", "100% safe & secure", "30-day refund"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <Check size={13} className="text-[#34C759]" strokeWidth={2.5} /> {t}
            </span>
          ))}
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative mx-auto max-w-[900px] rounded-[24px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.14),0_8px_24px_rgba(0,0,0,0.08)]"
        >
          <img
            src="/hero-macbook.jpg"
            alt="MacDiskCleaner on MacBook Pro"
            className="w-full h-auto object-cover"
          />
          {/* App UI overlay on screen area */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative top-[-6%] left-[4%] w-[44%] bg-white/95 backdrop-blur-sm rounded-[14px] shadow-[0_8px_40px_rgba(0,0,0,0.18)] p-4 border border-black/5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                <span className="text-[10px] text-[#6E6E73] ml-2 font-medium">MacDiskCleaner</span>
              </div>
              <div className="text-[11px] text-[#6E6E73] mb-2 font-medium">Scan complete</div>
              <div className="text-[24px] font-bold text-[#007AFF] tracking-tight mb-1">23.4 GB</div>
              <div className="text-[10px] text-[#6E6E73] mb-3">recoverable space found</div>
              <div className="space-y-1.5">
                {[["Junk Files","2.1 GB"],["Duplicates","1.3 GB"],["Logs","0.8 GB"]].map(([l,v]) => (
                  <div key={l} className="flex justify-between items-center text-[10px]">
                    <span className="text-[#1D1D1F] font-medium">{l}</span>
                    <span className="text-[#007AFF] font-semibold">{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 bg-[#007AFF] text-white text-[10px] font-semibold rounded-full py-1.5 text-center">
                Clean Now
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── STATS BAR ───────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { num: "1M+", label: "Downloads" },
    { num: "4.9★", label: "Average Rating" },
    { num: "50 GB+", label: "Average Space Freed" },
    { num: "24/7", label: "Customer Support" },
  ];
  return (
    <section className="bg-[#F5F5F7] border-y border-[rgba(0,0,0,0.06)]">
      <div className="max-w-[1200px] mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
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

// ─── FEATURES BENTO ──────────────────────────────────────────────────────────
function Features() {
  const features = [
    { icon: Trash2, color: "#FF3B30", bg: "#FFF1F0", title: "Junk File Cleaner", desc: "Eliminate caches, logs, and system junk automatically. Recover gigabytes in seconds without lifting a finger." },
    { icon: Copy, color: "#007AFF", bg: "#EBF4FF", title: "Duplicate Finder", desc: "Smart hash-based detection finds exact and near-duplicate files across your entire Mac with zero false positives." },
    { icon: HardDrive, color: "#34C759", bg: "#EDFAF0", title: "Storage Analyzer", desc: "Visualize exactly what's eating your disk space with a beautiful, interactive breakdown by folder and file type." },
    { icon: Shield, color: "#5856D6", bg: "#F0EFFF", title: "Privacy Protector", desc: "Securely wipe browser history, cookies, and application traces. Your privacy, completely in your control." },
    { icon: Zap, color: "#FF9500", bg: "#FFF5E6", title: "Performance Boost", desc: "Clean startup agents, heavy apps, and background processes that slow down your Mac over time." },
    { icon: Search, color: "#30B0C7", bg: "#EDF9FB", title: "Large File Scanner", desc: "Instantly find and remove old downloads, archives, and forgotten files that have been hogging space for years." },
  ];

  return (
    <section id="features" className="py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
          <motion.span variants={fadeUp} className="section-label">Features</motion.span>
          <motion.h2 variants={fadeUp} className="text-[44px] md:text-[52px] font-extrabold tracking-[-0.03em] text-[#1D1D1F]">
            Every tool your Mac needs.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[18px] text-[#6E6E73] mt-4 max-w-[520px] mx-auto">
            A complete toolkit crafted for macOS, designed with the same care Apple puts into their hardware.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={fadeUp} className="bento-card p-7">
              <div className="icon-wrap mb-5" style={{ background: f.bg }}>
                <f.icon size={24} color={f.color} strokeWidth={1.8} />
              </div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── LIFESTYLE SECTION ────────────────────────────────────────────────────────
function LifestyleSection() {
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
          <span className="section-label">Seamless Experience</span>
          <h2 className="text-[40px] md:text-[48px] font-extrabold tracking-[-0.03em] text-[#1D1D1F] leading-tight mb-5">
            Designed to feel native.<br />Because it is.
          </h2>
          <p className="text-[17px] text-[#6E6E73] leading-relaxed mb-6">
            MacDiskCleaner is built from the ground up for macOS. It uses native APIs, respects your system's security model, and integrates seamlessly with Spotlight, Apple Silicon, and beyond.
          </p>
          <ul className="space-y-3">
            {[
              { icon: Apple, text: "Native macOS design language" },
              { icon: Zap, text: "Optimized for Apple Silicon & Intel" },
              { icon: Lock, text: "Sandboxed & privacy-first architecture" },
              { icon: Clock, text: "Scheduled scans run silently in background" },
            ].map((item) => (
              <li key={item.text} className="flex items-center gap-3 text-[15px] text-[#1D1D1F] font-medium">
                <div className="w-8 h-8 rounded-full bg-white border border-[rgba(0,0,0,0.08)] flex items-center justify-center shadow-sm">
                  <item.icon size={14} className="text-[#007AFF]" />
                </div>
                {item.text}
              </li>
            ))}
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
            <img src="/lifestyle-desk.jpg" alt="MacBook Pro on desk" className="w-full h-auto object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { num: "01", icon: Download, title: "Download & Install", desc: "A lightweight, 12MB download. Drag to Applications and you're up and running in seconds." },
    { num: "02", icon: Search, title: "Run a Smart Scan", desc: "One click launches a deep, intelligent scan of your entire Mac — junk, duplicates, large files, and more." },
    { num: "03", icon: Zap, title: "Clean with Confidence", desc: "Review what was found, select what to remove, and reclaim your space safely. No surprises, ever." },
  ];
  return (
    <section id="howit" className="py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
          <motion.span variants={fadeUp} className="section-label">How It Works</motion.span>
          <motion.h2 variants={fadeUp} className="text-[44px] md:text-[52px] font-extrabold tracking-[-0.03em] text-[#1D1D1F]">
            Three steps. Real results.
          </motion.h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <motion.div key={s.num} variants={fadeUp} className="bento-card p-8 flex flex-col">
              <span className="text-[48px] font-black text-[#F0F0F3] tracking-tight mb-4 leading-none">{s.num}</span>
              <div className="icon-wrap bg-[#EBF4FF] mb-4">
                <s.icon size={22} color="#007AFF" strokeWidth={1.8} />
              </div>
              <h3 className="feature-title mb-2">{s.title}</h3>
              <p className="feature-desc">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── PRICING ────────────────────────────────────────────────────────────────
function Pricing() {
  return (
    <section id="pricing" className="py-32 bg-[#F5F5F7]">
      <div className="max-w-[900px] mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
          <motion.span variants={fadeUp} className="section-label">Pricing</motion.span>
          <motion.h2 variants={fadeUp} className="text-[44px] md:text-[52px] font-extrabold tracking-[-0.03em] text-[#1D1D1F]">
            Simple. Honest. One price.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[18px] text-[#6E6E73] mt-4">No subscriptions. No hidden fees. Own it forever.</motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Free */}
          <motion.div variants={fadeUp} className="bento-card p-8">
            <p className="text-[14px] font-semibold text-[#6E6E73] mb-2">Free</p>
            <p className="text-[52px] font-black tracking-tight text-[#1D1D1F] mb-1">$0</p>
            <p className="text-[14px] text-[#6E6E73] mb-6">Forever free, always.</p>
            <hr className="divider mb-6" />
            <ul className="space-y-3 mb-8">
              {["Basic junk clean (up to 2 GB)","Duplicate file scanner","Large file finder","Monthly scan limit"].map(f => (
                <li key={f} className="flex items-center gap-3 text-[15px] text-[#1D1D1F]">
                  <Check size={15} className="text-[#34C759]" strokeWidth={2.5} /> {f}
                </li>
              ))}
            </ul>
            <a href="#" className="block text-center py-3 rounded-full border-2 border-[#007AFF] text-[#007AFF] font-semibold text-[15px] hover:bg-[#EBF4FF] transition-colors">
              Download Free
            </a>
          </motion.div>

          {/* Pro */}
          <motion.div variants={fadeUp} className="relative rounded-[20px] p-8 bg-[#007AFF] text-white shadow-[0_24px_60px_rgba(0,122,255,0.35)]">
            <div className="absolute top-6 right-6 bg-white/20 text-white text-[11px] font-bold px-3 py-1 rounded-full">BEST VALUE</div>
            <p className="text-[14px] font-semibold text-white/70 mb-2">Pro</p>
            <p className="text-[52px] font-black tracking-tight text-white mb-1">$12.99</p>
            <p className="text-[14px] text-white/70 mb-6">One-time. No subscription ever.</p>
            <hr className="border-white/20 mb-6" />
            <ul className="space-y-3 mb-8">
              {[
                "Unlimited junk cleaning",
                "Smart duplicate detection",
                "Privacy cleaner",
                "Startup manager",
                "Auto-scheduled scans",
                "Lifetime updates",
                "Priority support"
              ].map(f => (
                <li key={f} className="flex items-center gap-3 text-[15px] text-white">
                  <Check size={15} className="text-white" strokeWidth={2.5} /> {f}
                </li>
              ))}
            </ul>
            <a href="#" className="block text-center py-3 rounded-full bg-white text-[#007AFF] font-bold text-[15px] hover:bg-blue-50 transition-colors">
              Get Pro — $12.99
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FAQ ────────────────────────────────────────────────────────────────────
function FAQ() {
  const faqs = [
    { q: "Is it safe to use?", a: "Absolutely. MacDiskCleaner only deletes files you explicitly approve. All files are moved to Trash before permanent removal, so nothing is ever unrecoverable." },
    { q: "Will it work on my Mac?", a: "Yes! MacDiskCleaner supports macOS 12 Monterey and later, on both Apple Silicon (M1, M2, M3, M4) and Intel Macs." },
    { q: "Is the free version really free?", a: "Yes, the free version is completely free with no trial periods or hidden limits on core features. Upgrade to Pro for the full suite of tools." },
    { q: "How is this different from CleanMyMac?", a: "MacDiskCleaner is a one-time purchase with no subscription, is significantly lighter on system resources, and focuses on doing the essentials exceptionally well." },
    { q: "Can I get a refund?", a: "Of course. We offer a full 30-day no-questions-asked refund on all Pro purchases." },
  ];

  return (
    <section id="faq" className="py-32 bg-white">
      <div className="max-w-[720px] mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
          <motion.span variants={fadeUp} className="section-label">FAQ</motion.span>
          <motion.h2 variants={fadeUp} className="text-[44px] md:text-[52px] font-extrabold tracking-[-0.03em] text-[#1D1D1F]">
            Common questions.
          </motion.h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="divide-y divide-[rgba(0,0,0,0.06)]">
          {faqs.map((f) => (
            <motion.details key={f.q} variants={fadeUp} className="group py-5 cursor-pointer list-none">
              <summary className="flex justify-between items-center text-[17px] font-semibold text-[#1D1D1F] select-none list-none">
                {f.q}
                <ChevronRight size={18} className="text-[#6E6E73] transition-transform duration-300 group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-[15px] text-[#6E6E73] leading-relaxed">{f.a}</p>
            </motion.details>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#F5F5F7] border-t border-[rgba(0,0,0,0.06)] py-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          <a href="#" className="flex items-center gap-2 font-bold text-[15px] text-[#1D1D1F]">
            <Apple size={17} /> MacDiskCleaner
          </a>
          <nav className="flex flex-wrap justify-center gap-6 text-[13px] text-[#6E6E73] font-medium">
            <a href="#features" className="hover:text-[#1D1D1F] transition-colors">Features</a>
            <a href="#howit" className="hover:text-[#1D1D1F] transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-[#1D1D1F] transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-[#1D1D1F] transition-colors">Support</a>
            <a href="#" className="hover:text-[#1D1D1F] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#1D1D1F] transition-colors">Terms</a>
          </nav>
        </div>
        <hr className="divider mb-6" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-[12px] text-[#6E6E73]">
          <p>© 2024 MacDiskCleaner. All rights reserved.</p>
          <p>Made with <span className="text-[#FF2D78]">♥</span> for Mac users worldwide.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
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
// ─── APP SCREENSHOTS ─────────────────────────────────────────────────────────
function AppScreenshots() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      emoji: "🏠",
      color: "#007AFF",
      bg: "#EBF4FF",
      image: "/real-app-dashboard.png",
      title: "Smart Dashboard",
      desc: "Complete overview of your Mac storage health — disk usage ring, recoverable space counter, and personalized cleanup recommendations all in one place.",
    },
    {
      id: "duplicates",
      label: "Duplicates",
      emoji: "📋",
      color: "#FF9500",
      bg: "#FFF5E6",
      image: "/real-app-duplicates-new.png",
      title: "Duplicate Finder",
      desc: "Find and remove exact duplicate files across your entire Mac. Smart grouping lets you keep originals and delete copies.",
    },
    {
      id: "largefiles",
      label: "Large Files",
      emoji: "📦",
      color: "#AF52DE",
      bg: "#F5EEFF",
      image: "/real-app-largefiles-new.png",
      title: "Large File Scanner",
      desc: "Instantly locate huge files that have been silently hogging your storage. Sort by size and reclaim space fast.",
    },
    {
      id: "oldfiles",
      label: "Old Files",
      emoji: "🕰️",
      color: "#8E8E93",
      bg: "#F2F2F7",
      image: "/real-app-oldfiles-new.png",
      title: "Old Files Cleanup",
      desc: "Identify files you have not opened in months or years. Safely archive or delete them to free up gigabytes of wasted space.",
    },
    {
      id: "cleanup",
      label: "Smart Cleanup",
      emoji: "⚡",
      color: "#FF3B30",
      bg: "#FFF1F0",
      image: "/real-app-cleanup-new.png",
      title: "One-Click Cleanup",
      desc: "Remove junk in one click. Cache, dev cache, temp files, logs, downloads and duplicates all identified and cleaned safely in one powerful sweep.",
    },
    {
      id: "uninstaller",
      label: "Uninstaller",
      emoji: "🗑️",
      color: "#34C759",
      bg: "#EDFAF0",
      image: "/real-app-uninstaller-new.png",
      title: "App Uninstaller",
      desc: "Completely remove applications along with their hidden leftover data and preferences to free up maximum space.",
    },
  ];

  const active = tabs[activeTab];

  return (
    <section id="screenshots" className="py-32 bg-[#F5F5F7] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.span variants={fadeUp} className="section-label">
            App Preview
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-[44px] md:text-[52px] font-extrabold tracking-[-0.03em] text-[#1D1D1F]"
          >
            See every screen.{" "}
            <span className="text-[#007AFF]">Love every detail.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-[18px] text-[#6E6E73] mt-4 max-w-[560px] mx-auto"
          >
            Explore the real MacDiskCleaner interface — designed to be beautiful,
            intuitive, and powerfully effective.
          </motion.p>
        </motion.div>

        {/* Tab navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(i)}
              id={`screenshot-tab-${tab.id}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-semibold cursor-pointer border-2 transition-all duration-300 select-none"
              style={
                activeTab === i
                  ? {
                      background: tab.color,
                      borderColor: tab.color,
                      color: "white",
                      boxShadow: `0 8px 24px ${tab.color}40`,
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
              <span>{tab.emoji}</span>
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Info card */}
        <motion.div
          key={`info-${activeTab}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold mb-4"
            style={{ background: active.bg, color: active.color }}
          >
            <span>{active.emoji}</span>
            {active.label} View
          </div>
          <h3 className="text-[28px] md:text-[34px] font-extrabold tracking-tight text-[#1D1D1F] mb-3">
            {active.title}
          </h3>
          <p className="text-[17px] text-[#6E6E73] max-w-[580px] mx-auto leading-relaxed">
            {active.desc}
          </p>
        </motion.div>

        {/* Screenshot frame */}
        <motion.div
          key={`screenshot-${activeTab}`}
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto"
          style={{ maxWidth: "960px" }}
        >
          {/* Glow */}
          <div
            className="absolute -inset-6 -z-10 blur-[60px] opacity-20 rounded-[40px] transition-all duration-500"
            style={{ background: active.color }}
          />

          {/* macOS window chrome */}
          <div
            className="rounded-[20px] overflow-hidden"
            style={{
              boxShadow: "0 40px 100px rgba(0,0,0,0.18), 0 8px 32px rgba(0,0,0,0.1)",
              border: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            {/* Title bar */}
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

            {/* Screenshot */}
            <img
              src={active.image}
              alt={`MacDiskCleaner ${active.label} screen`}
              className="w-full h-auto block"
              style={{
                display: "block",
                background: "#1a1a1f",
              }}
            />
          </div>
        </motion.div>

        {/* Bottom dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: activeTab === i ? "24px" : "8px",
                height: "8px",
                background: activeTab === i ? active.color : "#D1D1D6",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


