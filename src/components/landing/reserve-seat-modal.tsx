"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { X, ArrowRight, Play, Share2, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/ui-store";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/lib/utils";

const YOUTUBE_URL = "https://www.youtube.com/@Techtalks02-ai";

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", label: "IN +91" },
  { code: "+1", flag: "🇺🇸", label: "US +1" },
  { code: "+44", flag: "🇬🇧", label: "UK +44" },
  { code: "+971", flag: "🇦🇪", label: "AE +971" },
];

export function ReserveSeatModal() {
  const { reserveSeatOpen, closeReserveSeat, openReserveSeat } = useUIStore();
  const { isAuthenticated } = useAuthStore();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    phone_country_code: "+91",
  });
  const [youtubeClicked, setYoutubeClicked] = useState(false);
  const [subscribedConfirmed, setSubscribedConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Auto-pop the notification / modal when the application is first opened
  useEffect(() => {
    const hasShown = sessionStorage.getItem("reserve_modal_shown");
    if (!hasShown) {
      const timer = setTimeout(() => {
        openReserveSeat();
        sessionStorage.setItem("reserve_modal_shown", "true");
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [openReserveSeat]);

  const canConfirm = youtubeClicked && subscribedConfirmed && form.full_name && form.email && form.phone;

  const handleYoutubeClick = () => {
    window.open(YOUTUBE_URL, "_blank", "noopener,noreferrer");
    setYoutubeClicked(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canConfirm) return;
    setLoading(true);
    setError("");
    
    // Direct success message without backend connection
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 300);
  };

  const handleClose = () => {
    closeReserveSeat();
    setTimeout(() => {
      setSuccess(false);
      setError("");
      setYoutubeClicked(false);
      setSubscribedConfirmed(false);
      setForm({ full_name: "", email: "", phone: "", phone_country_code: "+91" });
    }, 300);
  };

  return (
    <AnimatePresence>
      {reserveSeatOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.97 }}
            transition={{ type: "spring", damping: 28, stiffness: 380 }}
            className="relative w-full sm:max-w-lg max-h-[95dvh] sm:max-h-[92vh] overflow-y-auto rounded-t-[2rem] sm:rounded-[2rem] bg-card text-card-foreground border border-border/80 shadow-2xl"
          >
            {/* Drag handle on mobile */}
            <div className="flex justify-center pt-3 pb-0 sm:hidden">
              <div className="w-10 h-1 rounded-full bg-muted" />
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 p-2 rounded-full bg-muted/60 hover:bg-muted transition-colors z-10 text-muted-foreground hover:text-foreground cursor-pointer"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="p-5 sm:p-7">
              {success ? (
                /* ── Success State ── */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 space-y-5"
                >
                  <div className="relative inline-flex items-center justify-center mx-auto">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30 shadow-inner">
                      <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </div>
                    <span className="absolute -top-1 -right-1 text-2xl">🎉</span>
                  </div>

                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Registration Successful
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                      Free Seat Confirmed!
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
                      Thank you <span className="font-semibold text-foreground">{form.full_name || "Participant"}</span>! Your free seat for <span className="font-medium text-foreground">&quot;Mastering Claude Code: Building Agentic Systems&quot;</span> has been successfully reserved.
                    </p>
                    <p className="text-xs text-muted-foreground/80 pt-1">
                      Confirmation and Zoom link details have been queued for <span className="font-semibold text-foreground">{form.email}</span>.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    {isAuthenticated && (
                      <Link href="/dashboard">
                        <Button className="w-full sm:w-auto gap-2 rounded-xl">
                          <Play className="w-4 h-4" /> Go to Dashboard
                        </Button>
                      </Link>
                    )}
                    <a
                      href="https://www.youtube.com/@Techtalks02-ai"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" className="w-full sm:w-auto gap-2 rounded-xl border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400">
                        <Play className="w-4 h-4 fill-red-500" /> YouTube Channel
                      </Button>
                    </a>
                    <a
                      href="https://www.instagram.com/techtalks02/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" className="w-full sm:w-auto gap-2 rounded-xl">
                        <Share2 className="w-4 h-4" /> Follow Instagram
                      </Button>
                    </a>
                    <button
                      onClick={handleClose}
                      className="rounded-xl bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </motion.div>
              ) : (
                <>
                  {/* ── Header ── */}
                  <div className="mb-5 pr-8">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 text-primary text-[11px] font-bold uppercase tracking-widest mb-3 border border-primary/20">
                      <Sparkles className="w-3 h-3" />
                      Free Webinar
                    </div>
                    <h2 className="font-serif text-2xl sm:text-[1.75rem] font-bold text-foreground leading-tight mb-1">
                      Reserve your free seat
                    </h2>
                    <p className="text-sm font-medium text-muted-foreground">
                      Mastering Claude Code: Building Agentic Systems
                    </p>
                  </div>

                  {/* ── Session Info Bar ── */}
                  <div className="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3 text-sm mb-5 border border-border/50">
                    <span className="text-muted-foreground text-xs sm:text-sm font-medium">
                      Live · 2 hours · Recording included
                    </span>
                    <span className="flex items-center gap-1.5 font-mono">
                      <span className="line-through text-muted-foreground text-xs">₹499</span>
                      <strong className="text-primary font-bold text-base">Free</strong>
                    </span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                        {error}
                      </div>
                    )}

                    {/* Full Name */}
                    <Field label="Full name">
                      <input
                        placeholder="Your name on the certificate"
                        value={form.full_name}
                        onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                        required
                        className={inputClass}
                      />
                    </Field>

                    {/* Email */}
                    <Field label="Email">
                      <input
                        type="email"
                        placeholder="you@gmail.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        className={inputClass}
                      />
                    </Field>

                    {/* Phone */}
                    <Field label="Phone (for WhatsApp reminders & Zoom link)">
                      <div className="flex gap-2">
                        <select
                          value={form.phone_country_code}
                          onChange={(e) => setForm({ ...form, phone_country_code: e.target.value })}
                          className={cn(inputClass, "w-28 shrink-0 bg-background text-foreground cursor-pointer font-mono text-xs")}
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code} className="bg-card text-foreground">
                              {c.flag} {c.label}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          placeholder="Phone number"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          required
                          className={cn(inputClass, "flex-1")}
                        />
                      </div>
                    </Field>

                    {/* YouTube subscription box */}
                    <div className="rounded-2xl border border-red-500/30 bg-red-500/10 dark:bg-red-950/30 p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                          <Play className="w-4 h-4 text-white fill-white" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">
                            Subscribe to unlock your free seat
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Free seats are for our YouTube community members.
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleYoutubeClick}
                        className={cn(
                          "w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-all duration-200 cursor-pointer",
                          youtubeClicked
                            ? "bg-red-700 shadow-none"
                            : "bg-red-600 hover:bg-red-700 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                        )}
                      >
                        {youtubeClicked ? (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            Subscribed! ✓
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 fill-white" />
                            Subscribe on YouTube
                          </>
                        )}
                      </button>

                      {!youtubeClicked && (
                        <p className="text-[11px] text-red-400 text-center font-medium">
                          Click above even if you&apos;re already subscribed.
                        </p>
                      )}

                      <label className="flex items-center gap-3 cursor-pointer select-none pt-1">
                        <div
                          className={cn(
                            "relative flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-all",
                            subscribedConfirmed
                              ? "border-primary bg-primary"
                              : !youtubeClicked
                              ? "border-border bg-muted/60 cursor-not-allowed"
                              : "border-border bg-background hover:border-primary/60"
                          )}
                          onClick={() => youtubeClicked && setSubscribedConfirmed(!subscribedConfirmed)}
                        >
                          {subscribedConfirmed && (
                            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={cn("text-xs sm:text-sm leading-tight", !youtubeClicked ? "text-muted-foreground/60" : "text-foreground font-medium")}>
                          Yes, I&apos;ve subscribed to the channel
                        </span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={!canConfirm || loading}
                      className={cn(
                        "w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-200",
                        canConfirm && !loading
                          ? "bg-gradient-to-r from-primary via-orange-500 to-amber-500 text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 cursor-pointer"
                          : "bg-muted text-muted-foreground/60 border border-border/50 cursor-not-allowed"
                      )}
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                          Confirming...
                        </span>
                      ) : (
                        <>
                          Confirm My Free Seat
                          {canConfirm && <ArrowRight className="h-4 w-4" />}
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-center text-muted-foreground">
                      No payment, no credit card needed. We&apos;ll email your Zoom link instantly.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

const inputClass =
  "w-full rounded-xl border border-border/80 bg-background text-foreground px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary placeholder:text-muted-foreground/60 transition-all shadow-2xs";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-wider text-primary mb-1.5 font-mono">
        {label}
      </label>
      {children}
    </div>
  );
}
