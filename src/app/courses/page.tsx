"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  Layers,
  Search,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  Download,
  Filter,
  Flame,
  Terminal,
  Play,
  Cpu,
  ShieldCheck,
  Zap,
  ExternalLink
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { MODULES_LIST, ModuleData } from "@/components/landing/curriculum";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "All",
  "Foundations",
  "ML",
  "Deep Learning",
  "Computer Vision",
  "NLP",
  "Transformers",
  "Generative AI",
  "LLM Engineering",
  "LLM Fine-Tuning",
  "RAG",
  "Advanced RAG",
  "AI Agents",
  "Agentic RAG",
  "MCP & Tool Use",
  "Multi-Agent Orchestration",
  "AI Evaluation",
  "AI Guardrails & Safety",
  "Production AI Systems",
  "LLMOps & AI Infrastructure",
  "AI Engineering Capstone"
];

const FREE_HANDBOOKS = [
  {
    title: "Python for AI Foundations Handbook",
    desc: "Complete reference for NumPy arrays, async/await event loops, and Pydantic validation.",
    pages: "120 Pages",
    badge: "Free Digital PDF",
    link: "https://drive.google.com/drive/folders/1k_kXP8YVL6mHxOB_FZpSqlucnhAL_CG2",
    moduleRedirect: "01"
  },
  {
    title: "RAG & Vector Search Architecture Guide",
    desc: "Production guide to semantic chunking, HNSW vector search, and Cross-Encoder reranking.",
    pages: "145 Pages",
    badge: "Free Digital PDF",
    link: "https://drive.google.com/drive/folders/1k_kXP8YVL6mHxOB_FZpSqlucnhAL_CG2",
    moduleRedirect: "12"
  },
  {
    title: "Autonomous Agents & MCP Handbook",
    desc: "LangGraph state machines, ReAct loops, Model Context Protocol schemas, and supervisor teams.",
    pages: "180 Pages",
    badge: "Free Digital PDF",
    link: "https://drive.google.com/drive/folders/1k_kXP8YVL6mHxOB_FZpSqlucnhAL_CG2",
    moduleRedirect: "14"
  },
  {
    title: "LLMOps & vLLM Deployment Guide",
    desc: "High-throughput serving with PagedAttention, TensorRT-LLM, Ray Serve, and GPU profiling.",
    pages: "110 Pages",
    badge: "Free Digital PDF",
    link: "https://drive.google.com/drive/folders/1k_kXP8YVL6mHxOB_FZpSqlucnhAL_CG2",
    moduleRedirect: "28"
  }
];

export default function CoursesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState<"modules" | "handbooks">("modules");

  const totalLessonsCount = useMemo(() => {
    return MODULES_LIST.reduce((acc, m) => acc + m.lessons.length, 0);
  }, []);

  const filteredModules = useMemo(() => {
    return MODULES_LIST.filter((m) => {
      const matchesCat =
        selectedCategory === "All" ||
        m.category.toLowerCase() === selectedCategory.toLowerCase() ||
        m.title.toLowerCase().includes(selectedCategory.toLowerCase());

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCat;

      const matchesSearch =
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.youWillBuild.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.num.includes(q) ||
        m.lessons.some((l) => l.title.toLowerCase().includes(q));

      return matchesCat && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Banner */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-primary/20 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              Complete 30-Module Roadmap
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Production AI Engineering <span className="text-primary italic">Curriculum</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
              From first principles in Python and Linear Algebra to LLMs from scratch, FlashAttention, Hybrid RAG, Autonomous Agents via MCP, and High-Throughput vLLM Cloud Deployments.
            </p>

            {/* Quick stats pills */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-2 shadow-xs">
                <Layers className="w-3.5 h-3.5 text-primary" />
                <span className="font-bold text-foreground">{MODULES_LIST.length} Modules</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-2 shadow-xs">
                <BookOpen className="w-3.5 h-3.5 text-primary" />
                <span className="font-bold text-foreground">{totalLessonsCount} Lessons</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-2 shadow-xs">
                <Cpu className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-bold text-foreground">100% Real-Time Data & Code</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <button
              onClick={() => setActiveTab("modules")}
              className={cn(
                "px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer border",
                activeTab === "modules"
                  ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                  : "bg-card/70 text-muted-foreground border-border/60 hover:text-foreground hover:bg-card"
              )}
            >
              All 30 Modules ({MODULES_LIST.length})
            </button>
            <button
              onClick={() => setActiveTab("handbooks")}
              className={cn(
                "px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer border",
                activeTab === "handbooks"
                  ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                  : "bg-card/70 text-muted-foreground border-border/60 hover:text-foreground hover:bg-card"
              )}
            >
              Free Study Handbooks
            </button>
          </div>

          {activeTab === "modules" && (
            <>
              {/* Search & Category Filter */}
              <div className="space-y-4 mb-8">
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by module title, technology (e.g. PyTorch, vLLM, LangGraph, LoRA, MCP)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm bg-card/80 backdrop-blur-md border border-border/70 text-foreground placeholder:text-muted-foreground/60 shadow-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
                  />
                </div>

                {/* Category Pills */}
                <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 no-scrollbar px-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        "shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer border select-none",
                        selectedCategory === cat
                          ? "bg-primary text-white border-primary shadow-xs"
                          : "bg-card/70 text-muted-foreground border-border/60 hover:text-foreground hover:bg-card"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Module Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {filteredModules.map((mod) => (
                  <div
                    key={mod.id}
                    className="group rounded-3xl border border-border/60 bg-card/70 backdrop-blur-md p-5 sm:p-6 flex flex-col justify-between hover:shadow-xl hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
                  >
                    <div>
                      {/* Module Number & Category */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-xs font-extrabold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-lg">
                          MODULE {mod.num}
                        </span>
                        <span className="text-[11px] font-mono text-muted-foreground bg-muted/60 px-2.5 py-0.5 rounded-md">
                          {mod.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
                        {mod.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                        {mod.description}
                      </p>

                      {/* What you'll build snippet */}
                      <div className="rounded-xl border border-primary/15 bg-primary/[0.03] p-2.5 mb-4">
                        <p className="text-[11px] text-foreground/90 leading-tight">
                          <strong className="text-primary uppercase tracking-wider text-[10px] block mb-0.5">
                            You&apos;ll Build:
                          </strong>
                          {mod.youWillBuild}
                        </p>
                      </div>
                    </div>

                    {/* Footer Info & Action */}
                    <div className="pt-3 border-t border-border/40 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                        <span className="flex items-center gap-1 font-semibold text-foreground">
                          <Clock className="w-3.5 h-3.5 text-primary" /> {mod.totalDuration}
                        </span>
                        <span>·</span>
                        <span>{mod.lessons.length} lessons</span>
                      </div>

                      <Link
                        href={`/lesson?module=${mod.num}&lesson=${mod.lessons[0]?.id || `${mod.num}-1`}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold transition-all shadow-xs"
                      >
                        <span>Start</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {filteredModules.length === 0 && (
                <div className="text-center py-16 rounded-3xl border border-dashed border-border/80 bg-card/40 p-8">
                  <BookOpen className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                  <h3 className="font-serif text-lg font-bold text-foreground">No matching modules found</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                    Try clearing your search or resetting category filters.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All");
                    }}
                    className="mt-4 rounded-xl text-xs"
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </>
          )}

          {activeTab === "handbooks" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {FREE_HANDBOOKS.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-border/60 bg-card/70 backdrop-blur-md p-6 sm:p-7 flex flex-col justify-between hover:shadow-xl hover:border-primary/40 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                        {item.badge}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">{item.pages}</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm">
                        <Download className="w-3.5 h-3.5" />
                        Download PDF
                      </Button>
                    </a>

                    <Link href={`/lesson?module=${item.moduleRedirect}`}>
                      <Button variant="outline" className="rounded-xl py-2.5 text-xs font-semibold cursor-pointer border-border">
                        Interactive Lesson
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
