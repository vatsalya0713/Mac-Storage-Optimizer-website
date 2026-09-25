"use client";
import { useState } from "react";
import { Check, Loader2, Mail } from "lucide-react";

const CATEGORIES = [
  { value: "general", label: "General question" },
  { value: "support", label: "Support / technical issue" },
  { value: "bug", label: "Report a bug" },
  { value: "suggestion", label: "Feature suggestion" },
];

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", category: "general", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ name: "", email: "", category: "general", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-white pt-32 pb-32 px-6">
      <div className="max-w-[560px] mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-[#EBF4FF] flex items-center justify-center mb-6">
            <Mail size={24} className="text-[#007AFF]" />
          </div>
          <h1 className="text-[38px] md:text-[46px] font-extrabold tracking-[-0.03em] text-[#1D1D1F] mb-3">
            Get in touch
          </h1>
          <p className="text-[17px] text-[#6E6E73] leading-relaxed mb-10">
            Questions, bug reports, or feature ideas — we read everything and reply within 1-2 business days.
          </p>

          {status === "sent" ? (
            <div className="bento-card p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-[#EDFAF0] flex items-center justify-center mx-auto mb-4">
                <Check size={22} className="text-[#34C759]" strokeWidth={2.5} />
              </div>
              <p className="text-[18px] font-bold text-[#1D1D1F] mb-1">Message sent</p>
              <p className="text-[14px] text-[#6E6E73]">Thanks — we'll get back to you soon.</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-[14px] font-semibold text-[#007AFF]"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[#6E6E73] mb-1.5">Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[rgba(0,0,0,0.1)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/30 focus:border-[#007AFF]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[#6E6E73] mb-1.5">Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[rgba(0,0,0,0.1)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/30 focus:border-[#007AFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#6E6E73] mb-1.5">Topic</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[rgba(0,0,0,0.1)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/30 focus:border-[#007AFF] bg-white"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#6E6E73] mb-1.5">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[rgba(0,0,0,0.1)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/30 focus:border-[#007AFF] resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-[13px] text-[#FF3B30]">Something went wrong — please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary text-[15px] py-3 px-7 w-full sm:w-auto justify-center"
              >
                {status === "sending" && <Loader2 size={16} className="animate-spin" />}
                Send message
              </button>
            </form>
          )}
      </div>
    </main>
  );
}
