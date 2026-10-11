'use client';

import React, { useState, useMemo } from 'react';
import RoadmapNav from '@/components/roadmaps/RoadmapNav';
import OrbsBackground from '@/components/roadmaps/OrbsBackground';
import { COMPANY_QUESTIONS, SOLVED_QUESTIONS } from '@/data/sqlInterviewData';
import { Search, Building2, Code, Lightbulb, Zap } from 'lucide-react';

export default function SqlInterviewMasterPage() {
  const [activeTab, setActiveTab] = useState<'companies' | 'solved' | 'patterns'>('companies');
  const [selectedCompany, setSelectedCompany] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const companiesList = [
    'all',
    'Capgemini',
    'Deloitte',
    'Infosys',
    'Cognizant',
    'NTT DATA',
    'Grid Dynamics'
  ];

  // Filtered Company Questions
  const filteredCompanyQuestions = useMemo(() => {
    return COMPANY_QUESTIONS.filter((item) => {
      const matchesCompany = selectedCompany === 'all' || item.company.toLowerCase() === selectedCompany.toLowerCase();
      const q = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || item.q.toLowerCase().includes(q) || (item.tip && item.tip.toLowerCase().includes(q)) || item.company.toLowerCase().includes(q);
      return matchesCompany && matchesSearch;
    });
  }, [selectedCompany, searchQuery]);

  // Filtered Solved Questions
  const filteredSolved = useMemo(() => {
    return SOLVED_QUESTIONS.filter((item) => {
      const q = searchQuery.toLowerCase();
      return !searchQuery || item.title.toLowerCase().includes(q) || item.q.toLowerCase().includes(q) || item.ans.toLowerCase().includes(q);
    });
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative selection:bg-blue-500 selection:text-white transition-colors duration-200">
      <OrbsBackground />
      <RoadmapNav />

      <main className="relative z-10 max-w-4xl mx-auto px-5 py-12">
        <header className="mb-10 pb-8 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Building2 className="w-3.5 h-3.5" />
            <span>FINAL 9-COMPANY MASTER REPOSITORY · 2026 EDITION</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            SQL Interview Master Archive
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-6">
            174 verified technical interview questions from Capgemini, Deloitte, Infosys, Cognizant, NTT DATA, and Grid Dynamics, accompanied by 50 hands-on solved problems with runnable queries and cheat sheets.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 text-center">
              <span className="block text-2xl font-black font-mono text-blue-600 dark:text-blue-400">174</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Company Qs</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 text-center">
              <span className="block text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">9</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Tech Firms</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 text-center">
              <span className="block text-2xl font-black font-mono text-amber-600 dark:text-amber-400">50</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Solved Queries</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 text-center">
              <span className="block text-2xl font-black font-mono text-purple-600 dark:text-purple-400">8</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Live Patterns</span>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative mb-6">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword (e.g. 'SCD Type 2', 'DENSE_RANK', 'duplicate', 'Snowflake', 'Pentaho', 'shuffling')..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 p-1.5 rounded-2xl bg-slate-200/60 dark:bg-slate-900/60 border border-slate-300/40 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('companies')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'companies'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              174 Company Archive
            </button>
            <button
              onClick={() => setActiveTab('patterns')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'patterns'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Pattern Cheat Sheet
            </button>
            <button
              onClick={() => setActiveTab('solved')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'solved'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              50 Solved Problems
            </button>
          </div>
        </header>

        {/* TAB 1: COMPANY ARCHIVE */}
        {activeTab === 'companies' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {companiesList.map((comp) => (
                <button
                  key={comp}
                  onClick={() => setSelectedCompany(comp)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                    selectedCompany === comp
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-500'
                  }`}
                >
                  {comp}
                </button>
              ))}
            </div>

            <div className="space-y-3.5">
              {filteredCompanyQuestions.length === 0 ? (
                <div className="p-8 text-center text-sm text-slate-500">No questions match your filter.</div>
              ) : (
                filteredCompanyQuestions.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-white/40 dark:border-slate-800/80 shadow-sm hover:border-blue-500/50 transition-all"
                  >
                    <div className="flex items-center justify-between gap-3 mb-2.5">
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                        {item.company}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        {item.round}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 mb-3 leading-snug">
                      {item.q}
                    </h4>

                    {item.tip && (
                      <div className="p-3 rounded-xl bg-blue-500/5 border-l-2 border-blue-500 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <span><strong>Key Technical Takeaway:</strong> {item.tip}</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PATTERN CHEAT SHEET */}
        {activeTab === 'patterns' && (
          <div className="p-6 rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-white/40 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <span>The 8 Core Live-Coding Patterns</span>
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Most live SQL coding interviews test one of these 8 underlying patterns. Recognize the pattern in the problem description, and the SQL structure follows naturally.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-mono">
                    <th className="pb-3 pr-4 font-bold">Pattern</th>
                    <th className="pb-3 px-4 font-bold">Problem Prompt</th>
                    <th className="pb-3 pl-4 font-bold">Canonical Template</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="py-3 pr-4 font-bold text-blue-600 dark:text-blue-400">Nth Highest Value</td>
                    <td className="py-3 px-4">"Find second-highest salary"</td>
                    <td className="py-3 pl-4 font-mono text-xs"><code>DENSE_RANK() OVER (ORDER BY col DESC) = N</code></td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-bold text-blue-600 dark:text-blue-400">Top-N Per Group</td>
                    <td className="py-3 px-4">"Top 3 earners per department"</td>
                    <td className="py-3 pl-4 font-mono text-xs"><code>ROW_NUMBER() OVER (PARTITION BY dept ORDER BY score DESC) &lt;= N</code></td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-bold text-blue-600 dark:text-blue-400">Finding Duplicates</td>
                    <td className="py-3 px-4">"Find duplicate emails"</td>
                    <td className="py-3 pl-4 font-mono text-xs"><code>GROUP BY col HAVING COUNT(*) &gt; 1</code></td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-bold text-blue-600 dark:text-blue-400">Deleting Duplicates</td>
                    <td className="py-3 px-4">"Keep lowest ID, delete copies"</td>
                    <td className="py-3 pl-4 font-mono text-xs"><code>ROW_NUMBER() partitioned by duplicate key; DELETE rn &gt; 1</code></td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-bold text-blue-600 dark:text-blue-400">Running Total / Moving Avg</td>
                    <td className="py-3 px-4">"Cumulative revenue", "7-day average"</td>
                    <td className="py-3 pl-4 font-mono text-xs"><code>SUM(val) OVER (ORDER BY d ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)</code></td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-bold text-blue-600 dark:text-blue-400">Gaps and Islands</td>
                    <td className="py-3 px-4">"3+ consecutive login days"</td>
                    <td className="py-3 pl-4 font-mono text-xs"><code>login_date - CAST(rn AS INT) AS grp</code></td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-bold text-blue-600 dark:text-blue-400">Row-Over-Row Change</td>
                    <td className="py-3 px-4">"Month-over-month growth %"</td>
                    <td className="py-3 pl-4 font-mono text-xs"><code>LAG(revenue, 1) OVER (ORDER BY month)</code></td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-bold text-blue-600 dark:text-blue-400">Cohorts &amp; Sessions</td>
                    <td className="py-3 px-4">"Customer retention", "Sessionization"</td>
                    <td className="py-3 pl-4 font-mono text-xs"><code>LAG() gap check + running SUM() of session change flags</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: 50 SOLVED PROBLEMS */}
        {activeTab === 'solved' && (
          <div className="space-y-4">
            {filteredSolved.map((item) => (
              <div
                key={item.num}
                className="p-6 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-white/40 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    Q{item.num} · {item.cat}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {item.title}: {item.q}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.ans}
                </p>

                {item.code && (
                  <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800">
                    <code>{item.code}</code>
                  </pre>
                )}

                {item.tip && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border-l-2 border-amber-500 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span><strong>Interview Pro-Tip:</strong> {item.tip}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <footer className="mt-16 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 text-center text-xs text-slate-500 dark:text-slate-400">
          <p>
            174 Company Master SQL Archive · Built with Next.js 16 (App Router) &amp; TypeScript · Ready for Vercel.
          </p>
        </footer>
      </main>
    </div>
  );
}
