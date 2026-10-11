import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { DATABRICKS_ROADMAP } from '@/data/roadmapData';
import VideoCard from '@/components/roadmaps/VideoCard';
import RoadmapNav from '@/components/roadmaps/RoadmapNav';
import OrbsBackground from '@/components/roadmaps/OrbsBackground';
import { Sparkles, ArrowRight, BarChart3, Database, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Spark & Databricks Roadmap | 7-Week Associate Data Engineer Path',
  description: 'A structured 7-week roadmap for the Databricks Data Engineer Associate exam with curated free videos, key topics, and real architecture.',
};

export default function DatabricksRoadmapPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative selection:bg-blue-500 selection:text-white transition-colors duration-200">
      <OrbsBackground />
      <RoadmapNav />

      <main className="relative z-10 roadmap-container py-10 sm:py-14">
        {/* Header Section */}
        <header className="mb-10 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 border border-blue-300 dark:border-blue-700/80 text-blue-800 dark:text-blue-300 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DATABRICKS DATA ENGINEER ASSOCIATE · 7 WEEKS</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Spark &amp; Databricks Roadmap
          </h1>
          
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-6">
            Seven weeks that go from the basics to running pipelines for real. Each week has one topic list and one or two videos. Watch, build something small, move on. Finish with the exam recap.
          </p>

          <div className="flex flex-wrap gap-2.5 mb-8">
            <Link
              href="/guides/powerbi-roadmap"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 transition-all shadow-sm"
            >
              <BarChart3 className="w-3.5 h-3.5 text-amber-500" />
              <span>Explore: 6-Week Power BI Roadmap</span>
            </Link>
            <Link
              href="/guides/sql-interview-master"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all shadow-sm"
            >
              <Database className="w-3.5 h-3.5 text-teal-500" />
              <span>Practice: 174+ Company SQL Questions</span>
            </Link>
            <Link
              href="/guides/de-vocabulary"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
              <span>Reference: 200 Core DE Terms</span>
            </Link>
          </div>
        </header>

        {/* Tracks Loop */}
        <div className="space-y-12">
          {DATABRICKS_ROADMAP.map((track, trackIdx) => (
            <section key={trackIdx} className="space-y-6">
              <div className="pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span>{track.title}</span>
                  {track.domain && (
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                      {track.domain}
                    </span>
                  )}
                </h2>
              </div>

              <div className="space-y-6">
                {track.phases.map((phase, pIdx) => (
                  <article
                    key={pIdx}
                    className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-600 text-white shadow-sm">
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

                    {/* Videos for this week */}
                    <div className="space-y-3">
                      {phase.videos.map((vid, vIdx) => (
                        <VideoCard key={vIdx} video={vid} />
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Supplementary Guides Section */}
        <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-2xl font-bold mb-2">Explore Related Guides</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Handcrafted resources for data engineers, analysts, and cloud practitioners.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/guides/databricks-vs-snowflake"
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all shadow-sm group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/80 flex items-center justify-center text-blue-600 mb-3">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Databricks vs Snowflake
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Detailed architecture &amp; trade-off comparison.
              </p>
            </Link>

            <Link
              href="/guides/sql-patterns"
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all shadow-sm group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/80 flex items-center justify-center text-blue-600 mb-3">
                <Database className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                8 Core SQL Patterns
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Window functions, CTEs, and recursive hierarchy queries.
              </p>
            </Link>

            <Link
              href="/guides/learn-python"
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all shadow-sm group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/80 flex items-center justify-center text-blue-600 mb-3">
                <BookOpen className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Python for DE
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Top free GitHub repos &amp; courses.
              </p>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
          <p>
            Databricks &amp; Apache Spark Associate Data Engineer Learning Guide · Curated &amp; Maintained for Technical Excellence.
          </p>
        </footer>
      </main>
    </div>
  );
}
