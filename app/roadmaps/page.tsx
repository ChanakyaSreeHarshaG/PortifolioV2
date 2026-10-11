import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import RoadmapNav from '@/components/roadmaps/RoadmapNav';
import OrbsBackground from '@/components/roadmaps/OrbsBackground';
import { Sparkles, BarChart3, Database, BookOpen, ArrowRight, CheckCircle2, Award, Terminal, Video, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Technical Roadmaps & Interview Hub | G. Chanakya Sree Harsha',
  description: 'Curated technical roadmaps for Databricks & Spark, Power BI, 174+ tech company SQL interview questions, and 200 data engineering terms.',
};

export default function RoadmapsHubPage() {
  const roadmaps = [
    {
      title: 'Databricks & Apache Spark 7-Week Roadmap',
      badge: '7 WEEKS · 10 MASTERCLASSES',
      badgeColor: 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700',
      icon: Sparkles,
      iconColor: 'text-blue-600 dark:text-blue-400',
      description: 'The definitive Associate Data Engineer study guide replicated from techwithprateek. Covers Spark internals, Lakehouse architecture, PySpark DataFrames, Structured Streaming, and Delta Lake.',
      topics: [
        'Apache Spark Internals & Cluster Architecture',
        'Delta Lake ACID Transactions & Time Travel',
        'PySpark DataFrame API & Optimization',
        'Structured Streaming & Auto Loader',
        'Unity Catalog Governance & Data Lineage'
      ],
      href: '/guides/databricks-spark-roadmap',
      btnText: 'Open Databricks Roadmap',
      btnStyle: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20',
    },
    {
      title: 'Power BI & DAX 6-Week Master Roadmap',
      badge: 'PL-300 ALIGNED · 10 SCENARIO Q&AS',
      badgeColor: 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700',
      icon: BarChart3,
      iconColor: 'text-amber-600 dark:text-amber-400',
      description: 'Comprehensive 6-week curriculum progressing from raw Power Query (M) transformations to Star Schema dimensional modeling, VertiPaq engine compression, advanced DAX, and Dynamic RLS.',
      topics: [
        'Power Query (M Code) & Query Folding',
        'Star Schema Modeling & VertiPaq Compression',
        'DAX Filter Context & Evaluation Order',
        'Context Transition & Semi-Additive Measures',
        'Dynamic Row-Level Security (USERPRINCIPALNAME)'
      ],
      href: '/guides/powerbi-roadmap',
      btnText: 'Open Power BI Roadmap',
      btnStyle: 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-500/20',
    },
    {
      title: '174+ Company SQL Interview Master Archive',
      badge: '9 ENTERPRISES · 50 SOLVED PROBLEMS',
      badgeColor: 'bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 border-teal-300 dark:border-teal-700',
      icon: Database,
      iconColor: 'text-teal-600 dark:text-teal-400',
      description: 'Real interview questions from Deloitte, Capgemini, Infosys, Cognizant, Accenture, Saama, and NTT DATA. Features 50 solved SQL challenges and 8 essential query patterns.',
      topics: [
        'Window Functions (ROW_NUMBER, DENSE_RANK, LAG/LEAD)',
        'Common Table Expressions & Recursive Hierarchies',
        'Gaps & Islands Concurrency Problem Solving',
        '50 Solved Real Enterprise SQL Queries',
        'Live Company Filtering & Keyword Search'
      ],
      href: '/guides/sql-interview-master',
      btnText: 'Practice SQL Interview Archive',
      btnStyle: 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-500/20',
    },
    {
      title: '200 Core Data Engineering Vocabulary',
      badge: '12 CORE ENGINEERING DOMAINS',
      badgeColor: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
      icon: BookOpen,
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      description: 'Exhaustive dictionary spanning Lakehouses, ACID transactions, data partitioning, Change Data Capture (CDC), streaming brokers, and distributed data warehouse engines.',
      topics: [
        'Medallion Architecture (Bronze, Silver, Gold)',
        'ACID Transactions & Change Data Capture (CDC)',
        'Shuffle Partitioning & Data Skew Handling',
        'Kafka Streaming Brokers & Event Sourcing',
        'Interactive Flashcard Search & Domain Chips'
      ],
      href: '/guides/de-vocabulary',
      btnText: 'Explore 200 DE Vocabulary',
      btnStyle: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20',
    },
  ];

  const quickGuides = [
    {
      title: 'Databricks vs Snowflake Architecture Guide',
      desc: 'Role-based comparison, pricing models, and engine trade-offs.',
      href: '/guides/databricks-vs-snowflake',
      icon: Award,
      color: 'text-blue-500',
    },
    {
      title: '8 Core SQL Query Patterns Cheat Sheet',
      desc: 'Window ranking, self-joins, CTE hierarchies, and aggregations.',
      href: '/guides/sql-patterns',
      icon: Terminal,
      color: 'text-teal-500',
    },
    {
      title: 'Curated Free Python for DE Resources',
      desc: 'Top 5 free repositories, books, and end-to-end data pipelines.',
      href: '/guides/learn-python',
      icon: Video,
      color: 'text-amber-500',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative selection:bg-teal-500 selection:text-white transition-colors duration-200">
      <OrbsBackground />
      <RoadmapNav />

      <main className="relative z-10 roadmap-container py-10 sm:py-14">
        {/* Hero Header */}
        <header className="mb-12 text-center max-w-3xl mx-auto pb-10 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 dark:bg-teal-950/70 border border-teal-300 dark:border-teal-700 text-teal-800 dark:text-teal-300 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE LEARNING HUBS &amp; ROADMAPS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Data Engineering &amp; Analytics Master Hub
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            Comprehensive roadmaps, 174+ real enterprise interview questions, DAX scenario masterclasses, and 200 data engineering terms — structured for serious engineers.
          </p>

          {/* Quick Jump Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Link
              href="/guides/databricks-spark-roadmap"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Databricks &amp; Spark</span>
            </Link>
            <Link
              href="/guides/powerbi-roadmap"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 transition-all shadow-sm"
            >
              <BarChart3 className="w-3.5 h-3.5 text-amber-500" />
              <span>Power BI &amp; DAX</span>
            </Link>
            <Link
              href="/guides/sql-interview-master"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all shadow-sm"
            >
              <Database className="w-3.5 h-3.5 text-teal-500" />
              <span>174+ SQL Questions</span>
            </Link>
            <Link
              href="/guides/de-vocabulary"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
              <span>200 DE Vocabulary</span>
            </Link>
          </div>
        </header>

        {/* 4 Feature Roadmaps Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {roadmaps.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-teal-500/50 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                      <Icon className={`w-5 h-5 ${card.iconColor}`} />
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {card.title}
                  </h2>

                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                    {card.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Core Topics Covered:
                    </p>
                    <ul className="space-y-1.5">
                      {card.topics.map((t, tIdx) => (
                        <li
                          key={tIdx}
                          className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  href={card.href}
                  className={`inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm hover:opacity-95 ${card.btnStyle}`}
                >
                  <span>{card.btnText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Supplementary Guides Section */}
        <section className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-2xl font-bold mb-2">Supplementary Architecture &amp; Code Guides</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Deep dive comparisons, cheat sheets, and hands-on resource lists.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {quickGuides.map((guide, gIdx) => {
              const GIcon = guide.icon;
              return (
                <Link
                  key={gIdx}
                  href={guide.href}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 transition-all shadow-sm group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 border border-slate-200 dark:border-slate-700">
                      <GIcon className={`w-5 h-5 ${guide.color}`} />
                    </div>
                    <h4 className="font-bold text-base mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {guide.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                      {guide.desc}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 dark:text-teal-400 group-hover:underline">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Return to Portfolio Banner */}
        <section className="p-8 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center">
          <h3 className="text-xl font-bold mb-2">Looking for Analytics Projects &amp; Experience?</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-6">
            Explore my end-to-end Medallion Data Warehouse project, churn analytics pipeline, and certifications.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold text-sm hover:opacity-90 transition-all shadow-sm"
          >
            <span>← Back to Portfolio Home</span>
          </Link>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
          <p>
            Technical Roadmaps &amp; Learning Hub · Curated &amp; Maintained by G. Chanakya Sree Harsha.
          </p>
        </footer>
      </main>
    </div>
  );
}
