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

          <a
            href="https://www.instagram.com/techwithprateek"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.35 3.9 3.87 2.35 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16Zm0-2.16C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.35 2.63 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.63 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.63-6.78-6.98-6.98C15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z"/></svg>
            <div className="text-left leading-snug">
              <span className="font-bold block">Follow @techwithprateek</span>
              <span className="text-xs text-blue-100 font-normal">Original creator of Databricks roadmap</span>
            </div>
          </a>
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
            Curated from <a href="https://techwithprateek.com/guides/databricks-spark-roadmap/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">techwithprateek.com</a>.
          </p>
        </footer>
      </main>
    </div>
  );
}
