'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { POWER_BI_ROADMAP, PowerBiQuestion } from '@/data/powerBiData';
import RoadmapNav from '@/components/roadmaps/RoadmapNav';
import OrbsBackground from '@/components/roadmaps/OrbsBackground';
import { BarChart3, ChevronDown, Sparkles, ExternalLink, Play, Lightbulb, Code2, ArrowRight } from 'lucide-react';
import Image from 'next/image';

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

      <main className="relative z-10 max-w-4xl mx-auto px-5 py-12">
        {/* Header Section */}
        <header className="mb-12 pb-8 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>MICROSOFT CERTIFIED: POWER BI DATA ANALYST (PL-300) · 6 WEEKS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Power BI &amp; DAX Master Roadmap
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-6">
            A structured 6-week curriculum going from raw data transformation to high-performance enterprise analytics. Complete with curated video masterclasses, architecture best practices, and real scenario-based interview questions.
          </p>

          <div className="flex flex-wrap gap-2.5 mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Databricks &amp; Spark Roadmap</span>
            </Link>
            <Link
              href="/sql-interview-master"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm"
            >
              <span>174+ Company SQL Questions</span>
            </Link>
            <Link
              href="/de-vocabulary"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shadow-sm"
            >
              <span>200 DE Terms</span>
            </Link>
          </div>
        </header>

        {/* Tracks Loop */}
        <div className="space-y-12">
          {POWER_BI_ROADMAP.map((track, trackIdx) => (
            <section key={trackIdx} className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-slate-900 dark:text-slate-100 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span>{track.trackTitle}</span>
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 tracking-normal font-sans">
                    {track.domain}
                  </span>
                </h2>
              </div>

              <div className="space-y-6">
                {track.phases.map((phase, pIdx) => (
                  <article
                    key={pIdx}
                    className="p-6 sm:p-7 rounded-3xl bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border border-white/40 dark:border-slate-800/80 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-600 text-white">
                        {phase.week}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100 mb-2">
                      {phase.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 max-w-2xl">
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
                            className="px-3 py-1 rounded-full text-xs font-mono bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                          >
                            {chip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Curated Video */}
                    <div className="space-y-3 mb-8">
                      {phase.videos.map((vid, vIdx) => (
                        <a
                          key={vIdx}
                          href={vid.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 p-3 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-white/40 dark:border-slate-800/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-amber-500/60 dark:hover:border-amber-400/60 transition-all duration-200"
                        >
                          <div className="relative aspect-video rounded-xl overflow-hidden bg-black shrink-0">
                            <Image
                              src={`https://img.youtube.com/vi/${vid.videoId}/hqdefault.jpg`}
                              alt={vid.title}
                              fill
                              sizes="(max-width: 640px) 100vw, 200px"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              unoptimized
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                              <div className="w-10 h-10 rounded-full bg-slate-950/70 border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
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
                            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
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

                    {/* Interview Questions Section */}
                    <div className="pt-5 border-t border-slate-200/70 dark:border-slate-800/70">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
                          <Code2 className="w-4 h-4 text-amber-500" />
                          <span>Interview-Level Scenario Questions</span>
                        </span>
                        <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                          High Frequency
                        </span>
                      </div>

                      <div className="space-y-3">
                        {phase.questions.map((q) => {
                          const isOpen = !!openQuestions[q.id];
                          return (
                            <div
                              key={q.id}
                              className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 overflow-hidden transition-all shadow-sm"
                            >
                              <button
                                onClick={() => toggleQuestion(q.id)}
                                className="w-full text-left p-4 flex items-center justify-between gap-3 text-sm font-bold text-slate-900 dark:text-slate-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                              >
                                <span>{q.question}</span>
                                <ChevronDown
                                  className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                                    isOpen ? 'rotate-180 text-amber-500' : ''
                                  }`}
                                />
                              </button>

                              {isOpen && (
                                <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/60 space-y-3">
                                  <p className="whitespace-pre-line leading-relaxed">
                                    {q.answer}
                                  </p>

                                  {q.code && (
                                    <pre className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800">
                                      <code>{q.code}</code>
                                    </pre>
                                  )}

                                  {q.tip && (
                                    <div className="p-2.5 rounded-lg bg-amber-500/10 border-l-2 border-amber-500 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                                      <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                      <span>{q.tip}</span>
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
        <footer className="mt-16 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 text-center text-xs text-slate-500 dark:text-slate-400">
          <p>
            Power BI 6-Week Master Roadmap · Built with Next.js 16 (App Router) &amp; Tailwind CSS · Optimized for Vercel deployment.
          </p>
        </footer>
      </main>
    </div>
  );
}
