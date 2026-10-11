import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import RoadmapNav from '@/components/roadmaps/RoadmapNav';
import OrbsBackground from '@/components/roadmaps/OrbsBackground';
import { ArrowLeft, ExternalLink, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: '8 SQL Patterns | Interview Cheat Sheet',
  description: 'The 8 core SQL query patterns that cover most data analyst and data engineer interview questions.',
};

const PATTERNS = [
  {
    num: "01",
    name: "Running Totals",
    desc: "Cumulative sum as you move through ordered rows — each row's total includes everything before it.",
    code: "SUM(x) OVER (ORDER BY d)",
    gotcha: "Ties in ORDER BY get summed together in one step unless you force ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW."
  },
  {
    num: "02",
    name: "Deduplication",
    desc: "Keep exactly one row per key, drop the rest — rank duplicates, then filter to rank 1.",
    code: "ROW_NUMBER() OVER (PARTITION BY k ORDER BY tiebreak)",
    gotcha: "No stable tiebreaker means the survivor is arbitrary — add the primary key as a final sort column."
  },
  {
    num: "03",
    name: "Gaps & Islands",
    desc: "Find streaks of consecutive values, or the missing values between them, in an ordered sequence.",
    code: "d - ROW_NUMBER() OVER (ORDER BY d) AS grp",
    gotcha: "Only works on genuinely sequential data — truncate timestamps to the grain you care about first."
  },
  {
    num: "04",
    name: "Join Patterns",
    desc: "The join type is the business question: what to do when a match is missing.",
    code: "LEFT JOIN b ON a.k = b.k WHERE b.k IS NULL",
    gotcha: "Filtering a LEFT JOIN in WHERE silently turns it into an INNER JOIN — filter the right table in ON instead."
  },
  {
    num: "05",
    name: "Aggregations",
    desc: "Collapse many rows into one summary row per group — the backbone of most dashboard metrics.",
    code: "GROUP BY g HAVING SUM(x) > n",
    gotcha: "WHERE filters rows before grouping; HAVING filters after. You cannot put an aggregate in WHERE."
  },
  {
    num: "06",
    name: "Subqueries",
    desc: "A query nested inside another — correlated ones re-run per outer row, non-correlated run once.",
    code: "WHERE salary > (SELECT AVG(salary) WHERE dept = e.dept)",
    gotcha: "NOT IN silently returns zero rows if the subquery list contains a NULL — prefer NOT EXISTS."
  },
  {
    num: "07",
    name: "CTE",
    desc: "Name each intermediate step so a complex query reads top-to-bottom instead of inside-out.",
    code: "WITH step1 AS (...), step2 AS (...) SELECT ...",
    gotcha: "A CTE isn't automatically materialized — referencing it twice may recompute it, engine-dependent."
  },
  {
    num: "08",
    name: "Ranking / Top-N",
    desc: "Top N rows per group — something a plain GROUP BY cannot return directly.",
    code: "RANK() OVER (PARTITION BY g ORDER BY x DESC)",
    gotcha: "Cannot filter the rank alias in the same SELECT that defines it — wrap it in a CTE or derived table."
  }
];

export default function SqlPatternsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative selection:bg-blue-500 selection:text-white transition-colors duration-200">
      <OrbsBackground />
      <RoadmapNav />

      <main className="relative z-10 max-w-4xl mx-auto px-5 py-12">
        <header className="mb-10 pb-8 border-b border-slate-200/80 dark:border-slate-800/80">
          <Link
            href="/guides/sql-interview-master"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to 174+ Company SQL Archive</span>
          </Link>

          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 uppercase tracking-wider mb-3">
            SQL Interview Prep
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            8 SQL Patterns
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-6">
            SQL is the highest-ROI skill in a Data Analyst or Data Engineer interview. Almost every question you will get is one of these 8 patterns wearing a different business story.
          </p>

          <Link
            href="/guides/sql-interview-master"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm shadow hover:bg-blue-700 transition-all"
          >
            <span>Practice with 174 Real Company Questions</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PATTERNS.map((p) => (
            <div
              key={p.num}
              className="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-white/40 dark:border-slate-800 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {p.num}
                  </span>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                    {p.name}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                  {p.desc}
                </p>

                <pre className="p-2.5 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto mb-3">
                  <code>{p.code}</code>
                </pre>
              </div>

              <div className="text-xs text-slate-700 dark:text-slate-300 p-2.5 rounded-lg bg-amber-500/10 border-l-2 border-amber-500">
                <strong>Gotcha:</strong> {p.gotcha}
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-16 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 text-center text-xs text-slate-500 dark:text-slate-400">
          <p>8 SQL Patterns Cheat Sheet · Next.js 16 (App Router) &amp; Tailwind CSS</p>
        </footer>
      </main>
    </div>
  );
}
