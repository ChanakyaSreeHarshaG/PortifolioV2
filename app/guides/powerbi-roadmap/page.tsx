'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { POWER_BI_ROADMAP } from '@/data/powerBiData';
import RoadmapNav from '@/components/roadmaps/RoadmapNav';
import OrbsBackground from '@/components/roadmaps/OrbsBackground';
import { BarChart3, ChevronDown, Sparkles, ExternalLink, Play, Lightbulb, Code2, ArrowLeft, Database, BookOpen } from 'lucide-react';

export default function PowerBiRoadmapPage() {
  const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>({
    'pq-q1': true, // open first question by default
  });

  const toggleQuestion = (id: string) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative selection:bg-amber-500 selection:text-white transition-colors duration-200">
      <OrbsBackground />
      <RoadmapNav />

      <main className="relative z-10 roadmap-container py-10 sm:py-14">
        {/* Header Section */}
        <header className="mb-10 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-700/80 text-amber-800 dark:text-amber-300 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-sm">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>MICROSOFT CERTIFIED: POWER BI DATA ANALYST (PL-300) · 6 WEEKS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Power BI &amp; DAX Master Roadmap
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-6">
            A structured 6-week curriculum going from raw data transformation to high-performance enterprise analytics. Complete with curated video masterclasses, architecture best practices, and real scenario-based interview questions.
          </p>

          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/guides/databricks-spark-roadmap"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Databricks &amp; Spark Roadmap</span>
            </Link>
            <Link
              href="/guides/sql-interview-master"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all shadow-sm"
            >
              <Database className="w-3.5 h-3.5 text-teal-500" />
              <span>174+ Company SQL Questions</span>
            </Link>
            <Link
              href="/guides/de-vocabulary"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
              <span>200 DE Vocabulary Terms</span>
            </Link>
          </div>
        </header>

        {/* Tracks Loop */}
        <div className="space-y-12">
          {POWER_BI_ROADMAP.map((track, trackIdx) => (
            <section key={trackIdx} className="space-y-6">
              <div className="pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span>{track.trackTitle}</span>
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 font-mono">
                    {track.domain}
                  </span>
                </h2>
              </div>

              <div className="space-y-6">
                {track.phases.map((phase, pIdx) => (
                  <article
                    key={pIdx}
                    className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-600 text-white shadow-sm">
                        {phase.week}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                      {phase.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 max-w-2xl">
                      {phase.description}
                    </p>

                    <div className="mb-6">
                      <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                        Key topics to focus on
                      </p>
                      <ul className="flex flex-wrap gap-2">
                        {phase.chips.map((chip, cIdx) => (
                          <li
                            key={cIdx}
                            className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                          >
                            {chip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Curated Video Card */}
                    <div className="space-y-3 mb-8">
                      {phase.videos.map((vid, vIdx) => (
                        <a
                          key={vIdx}
                          href={vid.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 hover:border-amber-500/60 transition-all duration-200 shadow-sm"
                        >
                          <div className="relative w-full sm:w-[200px] h-[115px] rounded-lg overflow-hidden bg-slate-900 shrink-0">
                            <img
                              src={`https://img.youtube.com/vi/${vid.videoId}/hqdefault.jpg`}
                              alt={vid.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                              <div className="w-10 h-10 rounded-full bg-slate-950/80 border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col justify-center gap-1.5 pr-2 py-0.5">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                                {vid.num}
                              </span>
                              <span className="font-mono text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                {vid.channel}
                              </span>
                            </div>
                            <h4 className="text-[15px] font-bold text-slate-900 dark:text-slate-100 leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                              {vid.title}
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                              {vid.description}
                            </p>
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 mt-1">
                              <span>Watch on YouTube</span>
                              <ExternalLink className="w-3 h-3" />
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>

                    {/* Interview Questions Accordion */}
                    <div className="pt-5 border-t border-slate-200 dark:border-slate-800">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
                          <Code2 className="w-4 h-4 text-amber-500" />
                          <span>Interview-Level Scenario Questions</span>
                        </span>
                        <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60">
                          High Frequency
                        </span>
                      </div>

                      <div className="space-y-3">
                        {phase.questions.map((q) => {
                          const isOpen = !!openQuestions[q.id];
                          return (
                            <div
                              key={q.id}
                              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 overflow-hidden transition-all shadow-sm"
                            >
                              <button
                                onClick={() => toggleQuestion(q.id)}
                                className="w-full text-left p-4 flex items-center justify-between gap-3 text-sm font-bold text-slate-900 dark:text-slate-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
                              >
                                <span className="leading-snug">{q.question}</span>
                                <ChevronDown
                                  className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                                    isOpen ? 'rotate-180 text-amber-500' : ''
                                  }`}
                                />
                              </button>

                              {isOpen && (
                                <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-700/60 space-y-3 bg-white/70 dark:bg-slate-900/60">
                                  <p className="whitespace-pre-line leading-relaxed">
                                    {q.answer}
                                  </p>

                                  {q.code && (
                                    <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                                      <div className="bg-slate-200 dark:bg-slate-800 px-3 py-1 text-[11px] font-mono font-semibold text-slate-600 dark:text-slate-400">
                                        DAX / M Code Example
                                      </div>
                                      <pre className="p-3 bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
                                        <code>{q.code}</code>
                                      </pre>
                                    </div>
                                  )}

                                  {q.tip && (
                                    <div className="p-3 rounded-lg bg-amber-500/10 border-l-4 border-amber-500 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                                      <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                      <span className="leading-relaxed font-medium">{q.tip}</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
          <p>
            Power BI 6-Week Master Roadmap · Built with Next.js 16 (App Router) &amp; Tailwind CSS · Optimized for Vercel deployment.
          </p>
        </footer>
      </main>
    </div>
  );
}
