'use client';

import React, { useState, useMemo } from 'react';
import RoadmapNav from '@/components/roadmaps/RoadmapNav';
import OrbsBackground from '@/components/roadmaps/OrbsBackground';
import { VOCABULARY_TERMS } from '@/data/vocabularyData';
import { Search, BookOpen, Layers } from 'lucide-react';

export default function DeVocabularyPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'all',
    'Domain Concepts',
    'Storage & Optimization',
    'Spark & Distributed',
    'Joins & Shuffles',
    'Streaming & Kafka',
    'ETL & Orchestration',
    'Quality & Governance',
    'SQL & Databases',
  ];

  const filteredTerms = useMemo(() => {
    return VOCABULARY_TERMS.filter((item) => {
      const matchesCat = selectedCategory === 'all' || item.cat.toLowerCase() === selectedCategory.toLowerCase();
      const q = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || item.name.toLowerCase().includes(q) || item.def.toLowerCase().includes(q) || item.uc.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      <OrbsBackground />
      <RoadmapNav />

      <main className="relative z-10 roadmap-container py-10 sm:py-14">
        <header className="mb-10 pb-8 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>COMPLETE ENCYCLOPEDIA · CURATED BY DATAWITH_RAI</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            200 Core Data Engineering Terms
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-6">
            A comprehensive reference of 200 essential data engineering terms, concepts, architectures, and production use cases across Spark, Kafka, Delta Lake, Airflow, and Cloud.
          </p>

          {/* Search Box */}
          <div className="relative mb-6">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any term, concept, or use case (e.g. 'Watermarking', 'Catalyst', 'Medallion', 'AQE', 'DLQ', 'Kafka')..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-emerald-500'
                }`}
              >
                {cat === 'all' ? 'All (200)' : cat}
              </button>
            ))}
          </div>
        </header>

        {/* Vocab Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTerms.length === 0 ? (
            <div className="col-span-full p-12 text-center text-sm text-slate-500">
              No terms match your search.
            </div>
          ) : (
            filteredTerms.map((term) => (
              <div
                key={term.n}
                className="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-white/40 dark:border-slate-800/80 shadow-sm flex flex-col justify-between hover:-translate-y-0.5 hover:border-emerald-500/60 dark:hover:border-emerald-400/60 transition-all duration-200"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      #{term.n.toString().padStart(3, '0')}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {term.cat}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2 leading-snug">
                    {term.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {term.def}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/5 border-l-2 border-emerald-500 text-xs text-slate-700 dark:text-slate-300">
                  <span className="font-semibold text-emerald-800 dark:text-emerald-300">💡 Use Case:</span>{' '}
                  {term.uc}
                </div>
              </div>
            ))
          )}
        </div>

        <footer className="mt-16 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 text-center text-xs text-slate-500 dark:text-slate-400">
          <p>
            200 Core Data Engineering Vocabulary · Next.js 16 (App Router) · Zero-latency static client search.
          </p>
        </footer>
      </main>
    </div>
  );
}
