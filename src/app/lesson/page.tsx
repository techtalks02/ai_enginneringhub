"use client";

import React, { useState, useEffect, useMemo, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Clock,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Search,
  Check,
  Target,
  FileCode,
  Copy,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Play,
  RotateCcw,
  Layers,
  GraduationCap,
  Lightbulb,
  CheckCircle,
  Database,
  Terminal,
  ShieldCheck,
  Code2,
  Cpu,
  Zap,
  CheckCheck,
  ListTree,
  Sliders,
  Send,
  ExternalLink,
  Share2,
  Bookmark,
  BookmarkCheck,
  UserCheck
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { MODULES_LIST, ModuleData, Lesson } from "@/components/landing/curriculum";
import {
  getLessonPath,
  resolveLessonFromParams,
  generateDetailedLessonContent,
  DetailedLessonContent
} from "@/lib/lesson-content";
import { cn } from "@/lib/utils";

export default function LessonPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-mono text-xs text-muted-foreground bg-background">
          Loading article workspace...
        </div>
      }
    >
      <LessonWorkspace />
    </Suspense>
  );
}

function LessonWorkspace() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pathParam = searchParams.get("path");
  const moduleParam = searchParams.get("module");
  const lessonParam = searchParams.get("lesson");
  const titleParam = searchParams.get("title");
  const techParam = searchParams.get("tech");
  const typeParam = searchParams.get("type");

  // Resolve current module & lesson from parameters
  const { module: initialModule, lesson: initialLesson } = useMemo(() => {
    return resolveLessonFromParams(pathParam, moduleParam, lessonParam, titleParam, techParam, typeParam);
  }, [pathParam, moduleParam, lessonParam, titleParam, techParam, typeParam]);

  const [activeModuleId, setActiveModuleId] = useState<string>(initialModule.id);
  const [activeLessonId, setActiveLessonId] = useState<string>(initialLesson.id);
  const [activeSection, setActiveSection] = useState<string>("introduction");
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [shareCopied, setShareCopied] = useState<boolean>(false);

  // Mobile & Search Drawers
  const [mobileSyllabusOpen, setMobileSyllabusOpen] = useState<boolean>(false);
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [globalLessonSearch, setGlobalLessonSearch] = useState<string>("");

  // Sync state when URL params change
  useEffect(() => {
    const { module: resMod, lesson: resLes } = resolveLessonFromParams(
      pathParam,
      moduleParam,
      lessonParam,
      titleParam,
      techParam,
      typeParam
    );
    setActiveModuleId(resMod.id);
    setActiveLessonId(resLes.id);
    setMobileSyllabusOpen(false);
    setMobileTocOpen(false);
    setActiveSection("introduction");
  }, [pathParam, moduleParam, lessonParam, titleParam, techParam, typeParam]);

  const currentModuleIndex = useMemo(() => {
    const idx = MODULES_LIST.findIndex((m) => m.id === activeModuleId || m.num === activeModuleId);
    return idx >= 0 ? idx : 0;
  }, [activeModuleId]);

  const currentModule = useMemo(() => {
    return MODULES_LIST[currentModuleIndex] || initialModule;
  }, [currentModuleIndex, initialModule]);

  const currentLesson = useMemo(() => {
    return currentModule.lessons.find((l) => l.id === activeLessonId) || currentModule.lessons[0] || initialLesson;
  }, [currentModule, activeLessonId, initialLesson]);

  const lessonContent = useMemo(() => {
    return generateDetailedLessonContent(currentModule, currentLesson);
  }, [currentModule, currentLesson]);

  // Dynamic Table of Contents built directly from the lesson content
  const tableOfContents = useMemo(() => {
    const items: { id: string; label: string }[] = [
      { id: "introduction", label: "1. Overview & Core Concepts" },
      { id: "architecture", label: "2. Architecture & Data Flow" }
    ];

    if (lessonContent.subtopics && lessonContent.subtopics.length > 0) {
      lessonContent.subtopics.forEach((sub, idx) => {
        items.push({
          id: sub.id || `subtopic-${idx}`,
          label: `${idx + 3}. ${sub.title}`
        });
      });
    }

    items.push(
      { id: "production-code", label: "Production Implementation" },
      { id: "real-world-context", label: "Real-World Context" },
      { id: "production-rules", label: "Production Best Practices" },
      { id: "key-takeaways", label: "Key Takeaways & Summary" }
    );

    return items;
  }, [lessonContent]);

  // ScrollSpy to track active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (let i = tableOfContents.length - 1; i >= 0; i--) {
        const item = tableOfContents[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tableOfContents]);

  const navigateToLesson = (mod: ModuleData, les: Lesson) => {
    const targetPath = getLessonPath(mod, les);
    router.push(`/lesson?path=${encodeURIComponent(targetPath)}&module=${mod.num}&lesson=${les.id}`);
    setMobileSyllabusOpen(false);
  };

  const switchModule = (offset: number) => {
    const newIdx = currentModuleIndex + offset;
    if (newIdx >= 0 && newIdx < MODULES_LIST.length) {
      const targetMod = MODULES_LIST[newIdx];
      if (targetMod.lessons.length > 0) {
        navigateToLesson(targetMod, targetMod.lessons[0]);
      }
    }
  };

  const prevModule = currentModuleIndex > 0 ? MODULES_LIST[currentModuleIndex - 1] : null;
  const nextModule = currentModuleIndex < MODULES_LIST.length - 1 ? MODULES_LIST[currentModuleIndex + 1] : null;

  // Previous & Next lessons inside current or adjacent modules
  const { prevLesson, nextLesson } = useMemo(() => {
    const currentIndex = currentModule.lessons.findIndex((l) => l.id === currentLesson.id);
    let prev: { module: ModuleData; lesson: Lesson } | null = null;
    let next: { module: ModuleData; lesson: Lesson } | null = null;

    if (currentIndex > 0) {
      prev = { module: currentModule, lesson: currentModule.lessons[currentIndex - 1] };
    } else if (prevModule && prevModule.lessons.length > 0) {
      prev = { module: prevModule, lesson: prevModule.lessons[prevModule.lessons.length - 1] };
    }

    if (currentIndex < currentModule.lessons.length - 1) {
      next = { module: currentModule, lesson: currentModule.lessons[currentIndex + 1] };
    } else if (nextModule && nextModule.lessons.length > 0) {
      next = { module: nextModule, lesson: nextModule.lessons[0] };
    }

    return { prevLesson: prev, nextLesson: next };
  }, [currentModule, currentLesson, prevModule, nextModule]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileTocOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const copyCodeText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleShareArticle = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2200);
    }
  };

  // Global search filtering across all 30 modules
  const globalSearchResults = useMemo(() => {
    if (!globalLessonSearch.trim()) return [];
    const q = globalLessonSearch.toLowerCase().trim();
    const results: { module: ModuleData; lesson: Lesson }[] = [];

    for (const mod of MODULES_LIST) {
      for (const les of mod.lessons) {
        if (
          les.title.toLowerCase().includes(q) ||
          (les.tech && les.tech.toLowerCase().includes(q)) ||
          mod.title.toLowerCase().includes(q) ||
          les.id.toLowerCase().includes(q)
        ) {
          results.push({ module: mod, lesson: les });
          if (results.length >= 25) return results;
        }
      }
    }
    return results;
  }, [globalLessonSearch]);

  return (
    <div
      className="min-h-screen bg-background text-foreground font-sans flex flex-col antialiased selection:bg-primary/20 selection:text-primary overflow-x-hidden"
      suppressHydrationWarning
    >
      <Header />

      {/* ── TOP BREADCRUMB & NAVIGATION BAR ── */}
      <div className="border-b border-border/70 bg-card/60 backdrop-blur-md sticky top-0 z-20 px-4 py-2.5 shadow-2xs">
        <div className="max-w-[1680px] mx-auto flex items-center justify-between gap-3 text-xs font-mono">
          {/* Breadcrumb & Module Switcher */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Link href="/courses" className="text-muted-foreground hover:text-foreground shrink-0 hidden sm:inline">
              Curriculum
            </Link>
            <span className="text-muted-foreground/40 hidden sm:inline">/</span>

            {/* Direct 30-Module Dropdown Selector */}
            <div className="relative inline-block shrink-0">
              <select
                value={currentModule.id}
                onChange={(e) => {
                  const target = MODULES_LIST.find((m) => m.id === e.target.value);
                  if (target && target.lessons.length > 0) {
                    navigateToLesson(target, target.lessons[0]);
                  }
                }}
                className="appearance-none bg-primary/10 border border-primary/20 text-primary font-bold text-xs rounded-lg px-2.5 py-1 pr-6 cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {MODULES_LIST.map((m) => (
                  <option key={m.id} value={m.id} className="bg-background text-foreground">
                    Mod {m.num}: {m.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-primary absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <span className="text-muted-foreground/40">/</span>
            <span className="font-semibold text-foreground truncate max-w-[200px] sm:max-w-md">
              {currentLesson.title}
            </span>
          </div>

          {/* Quick Search Button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-border/80 bg-background hover:bg-muted text-muted-foreground hover:text-foreground text-xs cursor-pointer shadow-2xs"
              title="Search all 991 lessons"
            >
              <Search className="w-3.5 h-3.5 text-primary" />
              <span className="hidden sm:inline">Search Curriculum</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── STICKY SECONDARY MOBILE HEADER BAR (< lg) ── */}
      <div className="lg:hidden sticky top-10 z-10 bg-background/95 backdrop-blur-md border-b border-border/80 px-3 py-2 flex items-center justify-between gap-2 shadow-2xs">
        <button
          onClick={() => setMobileSyllabusOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold font-mono cursor-pointer truncate max-w-[55%]"
        >
          <Layers className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Mod {currentModule.num} ({currentModule.lessons.length} Lessons)</span>
          <ChevronDown className="w-3 h-3 shrink-0 opacity-70" />
        </button>

        <button
          onClick={() => setMobileTocOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/60 hover:bg-muted text-foreground text-[11px] font-bold font-mono cursor-pointer shrink-0 border border-border/60"
        >
          <ListTree className="w-3.5 h-3.5 text-primary" />
          <span>On This Page</span>
          <ChevronDown className="w-3 h-3 opacity-70" />
        </button>
      </div>

      {/* ── MAIN WORKSPACE 3-COLUMN LAYOUT ── */}
      <div className="flex-1 w-full max-w-[1680px] mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* ───────────────────────────────────────────────────────────── */}
          {/* ── LEFT SIDEBAR: 30-MODULE SYLLABUS NAVIGATION ────────────── */}
          {/* ───────────────────────────────────────────────────────────── */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-16 max-h-[calc(100vh-5rem)] overflow-y-auto pr-3 select-none border-r border-border/60 dark:border-gray-800/80 space-y-4">
            
            {/* Top Phase Navigation Switchers */}
            <div className="flex items-center justify-between gap-1 text-[11px] font-mono text-muted-foreground border-b border-border/60 dark:border-gray-800 pb-3">
              {prevModule ? (
                <button
                  onClick={() => switchModule(-1)}
                  className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer truncate max-w-[48%]"
                  title={`Go to Module ${prevModule.num}: ${prevModule.title}`}
                >
                  <span>← MOD {prevModule.num}</span>
                </button>
              ) : (
                <span className="opacity-40">← START</span>
              )}

              {nextModule ? (
                <button
                  onClick={() => switchModule(1)}
                  className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer truncate max-w-[48%] text-right justify-end ml-auto"
                  title={`Go to Module ${nextModule.num}: ${nextModule.title}`}
                >
                  <span>MOD {nextModule.num} →</span>
                </button>
              ) : (
                <span className="opacity-40 ml-auto">END →</span>
              )}
            </div>

            {/* Current Module Header */}
            <div className="space-y-1">
              <div className="text-[11px] font-mono font-bold tracking-wider text-primary uppercase flex items-center justify-between">
                <span>MODULE {currentModule.num} · {currentModule.category}</span>
                <span className="text-muted-foreground font-normal">{currentModule.lessons.length} Lessons</span>
              </div>
              <div className="text-xs font-semibold text-foreground font-serif leading-snug">
                {currentModule.title}
              </div>
            </div>

            {/* List of Module Lessons */}
            <div className="space-y-0.5 pt-1">
              {currentModule.lessons.map((les, idx) => {
                const isLessonActive = les.id === currentLesson.id;

                return (
                  <div
                    key={les.id}
                    onClick={() => navigateToLesson(currentModule, les)}
                    className={cn(
                      "group flex items-start gap-2.5 px-3 py-2 rounded-xl text-xs transition-all cursor-pointer",
                      isLessonActive
                        ? "bg-primary/10 text-primary font-bold border-l-2 border-primary shadow-2xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    )}
                  >
                    <span className={cn(
                      "w-5 h-5 mt-0.5 rounded-md flex items-center justify-center font-mono text-[10px] font-bold shrink-0 transition-colors",
                      isLessonActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                    )}>
                      {idx + 1}
                    </span>

                    <span className="leading-tight min-w-0 flex-1">
                      {les.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* ── CENTER WORKSPACE: MEDIUM / GEEKSFORGEEKS ARTICLE READER ── */}
          {/* ───────────────────────────────────────────────────────────── */}
          <main className="lg:col-span-6 space-y-8 sm:space-y-10 min-w-0 pb-20">

            {/* ── ARTICLE MASTHEAD & HEADER ── */}
            <header className="space-y-4 sm:space-y-5 pb-6 border-b border-border/80">
              {/* Category Pills & Metadata */}
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold border border-primary/20">
                  Module {currentModule.num} · Lesson {currentLesson.id}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  {currentLesson.duration || "20 min"} read
                </span>
                <span>·</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{lessonContent.categoryBadge}</span>
              </div>

              {/* Big Serif Article Headline */}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground leading-tight sm:leading-snug break-words">
                {currentLesson.title}
              </h1>

              {/* Author / Editorial Byline Bar */}
              <div className="flex items-center justify-between gap-4 py-3 border-y border-border/60 text-xs font-mono flex-wrap">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-foreground block">AI Engineering Hub Editorial</span>
                    <span className="text-[11px] text-muted-foreground">Comprehensive Technical Deep Dive</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShareArticle}
                    className="p-1.5 rounded-lg border border-border/80 bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                    title="Share Article Link"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{shareCopied ? "Link Copied!" : "Share"}</span>
                  </button>

                  <button
                    onClick={() => setBookmarked(!bookmarked)}
                    className={cn(
                      "p-1.5 rounded-lg border transition-colors cursor-pointer flex items-center gap-1 text-[11px]",
                      bookmarked
                        ? "bg-primary/10 border-primary/30 text-primary"
                        : "border-border/80 bg-background hover:bg-muted text-muted-foreground hover:text-foreground"
                    )}
                    title={bookmarked ? "Bookmarked" : "Bookmark article"}
                  >
                    {bookmarked ? <BookmarkCheck className="w-3.5 h-3.5 text-primary" /> : <Bookmark className="w-3.5 h-3.5" />}
                    <span>{bookmarked ? "Saved" : "Save"}</span>
                  </button>
                </div>
              </div>

              {/* Article Subtitle Lead */}
              <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed italic">
                {lessonContent.subtitle}
              </p>
            </header>

            {/* ── 1. INTRODUCTION & CORE CONCEPTS ── */}
            <section id="introduction" className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  {lessonContent.concept.title || "1 · Overview & Core Concepts"}
                </h2>
              </div>

              <div className="prose prose-neutral dark:prose-invert max-w-none text-sm sm:text-base text-muted-foreground leading-relaxed space-y-4 font-sans">
                {lessonContent.concept.paragraphs.map((p, i) => (
                  <p key={i} className="text-foreground/90 leading-relaxed">{p}</p>
                ))}
              </div>
            </section>

            {/* ── 2. SYSTEM ARCHITECTURE & EXECUTION FLOW ── */}
            <section id="architecture" className="space-y-4 pt-4 border-t border-border/60 dark:border-gray-800">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  {lessonContent.architecture.title || "2 · System Architecture & Data Flow"}
                </h2>
              </div>

              {/* Flow Summary Pill */}
              <div className="p-4 rounded-2xl bg-primary/[0.04] border border-primary/20 space-y-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" /> Pipeline Data Lifecycle
                </span>
                <div className="p-3 rounded-xl bg-background border border-border/70 font-mono text-xs text-foreground leading-relaxed overflow-x-auto shadow-2xs">
                  {lessonContent.architecture.flowSummary}
                </div>
              </div>

              {/* Step by Step Breakdown Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {lessonContent.architecture.flowSteps.map((s) => (
                  <div key={s.step} className="p-4 rounded-2xl bg-white dark:bg-[#161B22] border border-border/80 dark:border-gray-800 shadow-xs space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-mono text-primary font-bold">
                      <span className="px-1.5 py-0.5 rounded bg-primary/10">{s.step}</span>
                      <span className="text-foreground font-sans font-bold text-sm">{s.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>

              {lessonContent.architecture.paragraphs && lessonContent.architecture.paragraphs.length > 0 && (
                <div className="text-sm text-muted-foreground leading-relaxed space-y-2 pt-1">
                  {lessonContent.architecture.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              )}
            </section>

            {/* ── 3. SUBTOPIC DEEP DIVES ── */}
            {lessonContent.subtopics && lessonContent.subtopics.length > 0 && (
              <div className="space-y-8 pt-2">
                {lessonContent.subtopics.map((sub, idx) => (
                  <section
                    key={sub.id || idx}
                    id={sub.id || `subtopic-${idx}`}
                    className="space-y-4 pt-6 border-t border-border/60 dark:border-gray-800"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-primary/10 text-primary font-mono text-xs font-bold shrink-0">
                        0{idx + 3}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground">
                        {sub.title}
                      </h3>
                    </div>

                    <div className="space-y-3 text-sm sm:text-base text-foreground/90 leading-relaxed font-sans">
                      {sub.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>

                    {/* Mathematical Formula Callout */}
                    {sub.mathFormula && (
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                          Mathematical Formulation
                        </span>
                        <div className="font-mono text-xs sm:text-sm text-foreground overflow-x-auto py-1">
                          {sub.mathFormula}
                        </div>
                      </div>
                    )}

                    {/* Code Snippet Box */}
                    {sub.codeSnippet && (
                      <div className="rounded-2xl border border-border/80 dark:border-gray-800 bg-[#161B22] overflow-hidden shadow-xs">
                        <div className="flex items-center justify-between px-3.5 py-2 bg-[#0D1117] border-b border-border/40 text-xs font-mono">
                          <span className="text-primary font-semibold flex items-center gap-1.5">
                            <Code2 className="w-3.5 h-3.5" /> Python
                          </span>
                          <button
                            onClick={() => copyCodeText(sub.id || `sub-${idx}`, sub.codeSnippet!)}
                            className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                          >
                            {copiedCodeId === (sub.id || `sub-${idx}`) ? (
                              <>
                                <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-4 text-xs sm:text-sm font-mono text-slate-100 overflow-x-auto leading-relaxed">
                          <code>{sub.codeSnippet}</code>
                        </pre>
                      </div>
                    )}
                  </section>
                ))}
              </div>
            )}

            {/* ── 4. PRODUCTION CODE IMPLEMENTATION & PATTERNS ── */}
            <section id="production-code" className="space-y-4 pt-6 border-t border-border/60 dark:border-gray-800">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  {lessonContent.code.title || "Production Code Implementation"}
                </h2>
              </div>

              <div className="rounded-2xl border border-border/80 dark:border-gray-800 bg-[#161B22] overflow-hidden shadow-xs">
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#0D1117] border-b border-border/40 text-xs font-mono">
                  <span className="text-slate-300 font-semibold flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-primary" />
                    {lessonContent.code.after.filename || "production_implementation.py"}
                  </span>
                  <button
                    onClick={() => copyCodeText("main-prod-code", lessonContent.code.after.code)}
                    className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors cursor-pointer"
                  >
                    {copiedCodeId === "main-prod-code" ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Implementation</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-slate-100 max-h-[500px]">
                  <pre><code>{lessonContent.code.after.code}</code></pre>
                </div>

                {lessonContent.code.after.improvements && lessonContent.code.after.improvements.length > 0 && (
                  <div className="p-4 bg-[#0D1117]/80 border-t border-border/40 space-y-2">
                    <span className="font-mono text-[11px] font-bold uppercase text-emerald-400 block">
                      Architectural Highlights & Guarantees:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {lessonContent.code.after.improvements.map((imp, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>

            {/* ── 5. REAL-WORLD CONTEXT & INDUSTRY USE CASES ── */}
            <section id="real-world-context" className="space-y-4 pt-6 border-t border-border/60 dark:border-gray-800">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  {lessonContent.whyItMatters.title || "Real-World Context & Industry Applications"}
                </h2>
              </div>

              <div className="prose prose-neutral dark:prose-invert max-w-none text-sm sm:text-base text-muted-foreground leading-relaxed space-y-3 font-sans">
                {lessonContent.whyItMatters.paragraphs.map((p, i) => (
                  <p key={i} className="text-foreground/90">{p}</p>
                ))}
              </div>
            </section>

            {/* ── 6. PRODUCTION BEST PRACTICES & RULES ── */}
            <section id="production-practices" className="space-y-4 pt-6 border-t border-border/60 dark:border-gray-800">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  Production Best Practices & Rules
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {lessonContent.production.rules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl border border-border/80 dark:border-gray-800 bg-white dark:bg-[#161B22] shadow-xs space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                      <h3 className="text-xs sm:text-sm font-mono font-bold text-foreground">{rule.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{rule.description}</p>
                    <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 block pt-1 border-t border-border/40">
                      Impact: {rule.impact}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* ── 7. KEY TAKEAWAYS & SUMMARY ── */}
            <section id="key-takeaways" className="space-y-4 pt-6 border-t border-border/60 dark:border-gray-800">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  Key Takeaways & Summary
                </h2>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-primary/5 via-card to-background border border-primary/20 space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" /> Core Mental Model
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                  {lessonContent.checklist.slice(0, 8).map((item) => (
                    <div key={item.id} className="flex items-start gap-2.5 text-foreground/90">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── BOTTOM PREV / NEXT LESSON NAVIGATION ── */}
            <div className="pt-8 border-t border-border/80 flex items-center justify-between gap-4">
              {prevLesson ? (
                <button
                  onClick={() => navigateToLesson(prevLesson.module, prevLesson.lesson)}
                  className="px-4 py-3 rounded-2xl border border-border/80 hover:border-primary bg-background text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-2 cursor-pointer transition-all shadow-2xs max-w-[48%]"
                >
                  <ChevronLeft className="w-4 h-4 shrink-0 text-primary" />
                  <div className="text-left min-w-0">
                    <span className="text-[10px] text-muted-foreground block">PREVIOUS</span>
                    <span className="truncate block font-semibold text-foreground">{prevLesson.lesson.title}</span>
                  </div>
                </button>
              ) : (
                <div />
              )}

              {nextLesson ? (
                <button
                  onClick={() => navigateToLesson(nextLesson.module, nextLesson.lesson)}
                  className="px-4 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-xs font-mono text-primary-foreground font-bold flex items-center gap-2 cursor-pointer transition-all ml-auto shadow-xs max-w-[48%]"
                >
                  <div className="text-right min-w-0">
                    <span className="text-[10px] text-primary-foreground/80 block">NEXT ARTICLE</span>
                    <span className="truncate block font-bold">{nextLesson.lesson.title}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </button>
              ) : (
                <Button
                  onClick={() => router.push("/courses")}
                  className="text-xs font-mono bg-emerald-600 hover:bg-emerald-700 text-white ml-auto rounded-2xl"
                >
                  Browse Full Curriculum 🎉
                </Button>
              )}
            </div>

          </main>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* ── RIGHT SIDEBAR: DYNAMIC ON THIS PAGE TABLE OF CONTENTS ──── */}
          {/* ───────────────────────────────────────────────────────────── */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-16 max-h-[calc(100vh-5rem)] overflow-y-auto pl-3 select-none border-l border-border/60 dark:border-gray-800/80 space-y-4">
            
            {/* Quick Article Overview Card */}
            <div className="p-3.5 rounded-2xl border border-border/80 dark:border-gray-800 bg-white dark:bg-[#161B22] shadow-xs space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary block">
                Module {currentModule.num} · {currentModule.category}
              </span>
              <div className="text-xs font-serif font-bold text-foreground leading-snug">
                {currentModule.title}
              </div>
              <div className="text-[10px] font-mono text-muted-foreground flex items-center gap-2 pt-1 border-t border-border/40">
                <span>{currentModule.lessons.length} Lessons</span>
                <span>·</span>
                <span>{currentLesson.duration || "20 min"} Read</span>
              </div>
            </div>

            {/* Dynamic Table of Contents Links */}
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground px-2 block mb-2">
                On This Page
              </span>

              {tableOfContents.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer block font-sans truncate",
                    activeSection === item.id
                      ? "text-primary font-bold bg-primary/10 border-l-2 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Quick Links to Other Modules */}
            <div className="pt-3 border-t border-border/60 dark:border-gray-800 space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground px-2 block mb-1">
                Quick Navigation
              </span>
              <Link
                href="/courses"
                className="text-xs text-primary hover:underline px-2 flex items-center gap-1 font-semibold"
              >
                <span>Browse All 30 Modules</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                href="/#roadmap"
                className="text-xs text-muted-foreground hover:text-foreground px-2 flex items-center gap-1"
              >
                <span>Interactive 3D Roadmap</span>
              </Link>
            </div>
          </aside>

        </div>
      </div>

      {/* ── GLOBAL SEARCH MODAL (991 LESSONS) ── */}
      <AnimatePresence>
        {searchModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#161B22] border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 max-h-[80vh]"
            >
              <div className="p-3.5 border-b border-border flex items-center gap-2.5">
                <Search className="w-4 h-4 text-primary shrink-0" />
                <input
                  type="text"
                  placeholder="Search across all 30 modules and 991 lessons..."
                  value={globalLessonSearch}
                  onChange={(e) => setGlobalLessonSearch(e.target.value)}
                  autoFocus
                  className="flex-1 bg-transparent border-none text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button
                  onClick={() => setSearchModalOpen(false)}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-2 overflow-y-auto max-h-[60vh] space-y-1">
                {globalSearchResults.map((res) => (
                  <div
                    key={`${res.module.id}-${res.lesson.id}`}
                    onClick={() => {
                      navigateToLesson(res.module, res.lesson);
                      setSearchModalOpen(false);
                    }}
                    className="p-2.5 rounded-xl hover:bg-primary/10 cursor-pointer flex items-center justify-between gap-3 text-xs transition-all"
                  >
                    <div>
                      <span className="font-mono text-[10px] text-primary font-bold mr-2">
                        MOD {res.module.num}
                      </span>
                      <span className="font-semibold text-foreground">{res.lesson.title}</span>
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground shrink-0">
                      {res.lesson.duration}
                    </span>
                  </div>
                ))}

                {globalLessonSearch && globalSearchResults.length === 0 && (
                  <div className="text-center py-8 text-xs text-muted-foreground font-mono">
                    No lessons match &quot;{globalLessonSearch}&quot;.
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MOBILE SYLLABUS DRAWER ── */}
      <AnimatePresence>
        {mobileSyllabusOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSyllabusOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="relative w-full max-w-lg bg-white dark:bg-[#161B22] border-t sm:border border-border rounded-t-3xl sm:rounded-2xl max-h-[85vh] flex flex-col z-10 overflow-hidden shadow-2xl"
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-primary font-bold uppercase">
                    Module {currentModule.num}
                  </span>
                  <h3 className="font-serif text-base font-bold text-foreground truncate max-w-[280px]">
                    {currentModule.title}
                  </h3>
                </div>
                <button
                  onClick={() => setMobileSyllabusOpen(false)}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3 overflow-y-auto flex-1 space-y-1">
                {currentModule.lessons.map((les, idx) => (
                  <div
                    key={les.id}
                    onClick={() => navigateToLesson(currentModule, les)}
                    className={cn(
                      "p-3 rounded-xl text-xs flex items-center justify-between cursor-pointer",
                      les.id === currentLesson.id
                        ? "bg-primary/10 text-primary font-bold border border-primary/20"
                        : "text-foreground hover:bg-muted/40"
                    )}
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <span className="font-mono text-[10px] text-muted-foreground">{idx + 1}.</span>
                      <span className="truncate">{les.title}</span>
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground shrink-0">{les.duration}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MOBILE TABLE OF CONTENTS DRAWER ── */}
      <AnimatePresence>
        {mobileTocOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileTocOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="relative w-full max-w-lg bg-white dark:bg-[#161B22] border-t border-border rounded-t-3xl max-h-[70vh] flex flex-col z-10 overflow-hidden shadow-2xl p-4 space-y-2"
            >
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="font-serif text-base font-bold text-foreground">Jump to Section</span>
                <button
                  onClick={() => setMobileTocOpen(false)}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto space-y-1 pt-1">
                {tableOfContents.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full text-left p-2.5 rounded-xl text-xs text-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
