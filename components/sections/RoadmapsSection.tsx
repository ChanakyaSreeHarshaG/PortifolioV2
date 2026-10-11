'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, BarChart3, Database, BookOpen, ArrowRight, Video, CheckCircle2, Award, Terminal } from 'lucide-react';

export default function RoadmapsSection() {
  const roadmaps = [
    {
      title: 'Databricks & Apache Spark Roadmap',
      badge: '7 WEEKS · 10 VIDEOS',
      badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
      icon: Sparkles,
      iconColor: 'text-blue-500',
      description: 'The complete associate data engineer roadmap replicated from techwithprateek. Covers Spark internals, Lakehouse architecture, PySpark DataFrames, Structured Streaming, and Delta Lake.',
      topics: ['Apache Spark Internals', 'Lakehouse & Medallion', 'Structured Streaming', 'Delta Lake & Unity Catalog'],
      href: '/guides/databricks-spark-roadmap',
      btnText: 'Explore Databricks Roadmap',
      btnColor: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
    {
      title: 'Power BI & DAX Master Roadmap',
      badge: 'PL-300 ALIGNED · 10 SCENARIO Q&AS',
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
      icon: BarChart3,
      iconColor: 'text-amber-500',
      description: 'Structured 6-week curriculum going from raw transformation in Power Query (M) to Star Schema modeling, VertiPaq engine compression, advanced DAX, and enterprise Row-Level Security.',
      topics: ['Power Query (M) & Folding', 'Star Schema vs Snowflake', 'DAX Context Transition', 'VertiPaq & Dynamic RLS'],
      href: '/guides/powerbi-roadmap',
      btnText: 'Explore Power BI Roadmap',
      btnColor: 'bg-amber-600 hover:bg-amber-700 text-white',
    },
    {
      title: '174+ Company SQL Interview Master',
      badge: '9 ENTERPRISES · 50 SOLVED',
      badgeColor: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30',
      icon: Database,
      iconColor: 'text-teal-500',
      description: 'Real interview questions gathered from Deloitte, Capgemini, Infosys, Cognizant, Accenture, Saama, and more. Features 50 solved challenges and 8 foundational SQL patterns.',
      topics: ['Window Functions & Ranking', 'Recursive CTEs & Hierarchies', 'Gaps & Islands Pattern', '50 Solved Real Queries'],
      href: '/guides/sql-interview-master',
      btnText: 'Practice SQL Interview Archive',
      btnColor: 'bg-teal-600 hover:bg-teal-700 text-white',
    },
    {
      title: '200 Core Data Engineering Vocabulary',
      badge: '12 CORE DOMAINS',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      icon: BookOpen,
      iconColor: 'text-emerald-500',
      description: 'Interactive glossary spanning Lakehouses, ACID transactions, partitioning, Change Data Capture (CDC), streaming brokers, and distributed data warehouse engines.',
      topics: ['Medallion Architecture', 'ACID Transactions & CDC', 'Shuffling & Skew Handling', 'Streaming & Micro-batching'],
      href: '/guides/de-vocabulary',
      btnText: 'Browse 200 DE Terms',
      btnColor: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    },
  ];

  const quickGuides = [
    { title: 'Databricks vs Snowflake Architecture Guide', href: '/guides/databricks-vs-snowflake', icon: Award },
    { title: '8 Core SQL Query Patterns Cheat Sheet', href: '/guides/sql-patterns', icon: Terminal },
    { title: 'Curated Free Python for DE Resources', href: '/guides/learn-python', icon: Video },
  ];

  return (
    <section id="roadmaps" className="section-py relative">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge badge-avail mb-4">
            <span className="pulse-dot-green"></span>
            <span>INTERACTIVE LEARNING HUBS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Technical Roadmaps &amp; Interview Hub
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Curated curriculums, 174+ real enterprise interview questions, DAX scenario masterclasses, and 200 essential data engineering terms.
          </p>
        </div>

        {/* 4 Main Roadmap Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {roadmaps.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="glass-card flex flex-col justify-between p-6 sm:p-8 rounded-2xl hover:border-teal-500/40 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center shrink-0">
                      <Icon className={`w-5 h-5 ${card.iconColor}`} />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    {card.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Core Topics Covered:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {card.topics.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-medium"
                        >
                          <CheckCircle2 className="w-3 h-3 text-teal-500 shrink-0" />
                          <span>{t}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  href={card.href}
                  className={`inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm ${card.btnColor}`}
                >
                  <span>{card.btnText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Quick Guides Bar */}
        <div className="p-6 rounded-2xl bg-slate-100/80 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h4 className="text-base font-bold mb-1">Explore Supplementary Guides</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Deep dives into architecture trade-offs, SQL patterns, and Python tools.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {quickGuides.map((guide, gIdx) => {
              const GIcon = guide.icon;
              return (
                <Link
                  key={gIdx}
                  href={guide.href}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all shadow-sm"
                >
                  <GIcon className="w-3.5 h-3.5 text-teal-500" />
                  <span>{guide.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
