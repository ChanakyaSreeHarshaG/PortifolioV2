'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import RoadmapNav from '@/components/roadmaps/RoadmapNav';
import OrbsBackground from '@/components/roadmaps/OrbsBackground';
import { ArrowLeft, ChevronDown, CheckCircle2 } from 'lucide-react';

const ROLES = [
  {
    id: "analyst", label: "📊 Data Analyst", sub: "SQL, dashboards, BI",
    pick: "Snowflake", badge: "sf",
    reason: "Your day-to-day is writing SQL, building dashboards, and answering business questions — Snowflake was built exactly for that. You'll be productive fast without ever touching Spark, Python, or cluster configs.",
  },
  {
    id: "engineer", label: "🛠️ Data Engineer", sub: "Pipelines, Spark, ML",
    pick: "Databricks", badge: "db",
    reason: "Your job is moving and transforming raw, often messy data into something clean and usable — that's Spark's whole reason for existing. Databricks gives you notebooks, pipelines, orchestration, and governance in one place.",
  },
  {
    id: "both", label: "🏢 Big Company / Not Sure", sub: "Likely need both eventually",
    pick: "Both — in that order", badge: "both",
    reason: "Most companies run both together: Databricks does the heavy engineering and ML work upstream, Snowflake sits downstream as the clean, fast layer analysts query.",
  },
];

const DB_COMPONENTS = [
  ["Notebooks", "A Jupyter-style coding environment (Python, SQL, Scala) where engineers write pipelines and data scientists train models."],
  ["Delta Lake", "Makes raw files behave like proper database tables — reliable, ACID transactions, time travel."],
  ["Workflows", "Schedules and chains pipelines/notebooks to run automatically — e.g. 'run this every night at 2am'."],
  ["Unity Catalog", "One place to control who can see and use which data, plus tracks where every table came from."],
  ["SQL Warehouse", "A serverless SQL editor and dashboards for analysts who just want to query, not code."],
  ["MLflow", "Tracks machine learning experiments and manages models from training to deployment."],
];

const SF_COMPONENTS = [
  ["Virtual Warehouse", "Snowflake's unit of compute, sized like a T-shirt (X-Small to XX-Large) — you never configure a cluster."],
  ["Storage / Compute Split", "Data sits once in cloud storage; spin up multiple independent warehouses without slowing each other down."],
  ["Pure SQL", "No notebook setup by default — write SQL, get instant results, and connect to BI."],
  ["Elastic Pay-Per-Second", "Warehouses auto-suspend when idle and auto-resume on a query, so you never pay for idle servers."],
  ["Zero-Copy Cloning & Time Travel", "Clone a database instantly without duplicating storage, or query data as it existed minutes ago."],
  ["Fully Managed Infra", "Snowflake runs its own infrastructure end to end — zero maintenance."],
];

export default function DatabricksVsSnowflakePage() {
  const [selectedRole, setSelectedRole] = useState(ROLES[0]);
  const [openDb, setOpenDb] = useState<number | null>(null);
  const [openSf, setOpenSf] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative selection:bg-blue-500 selection:text-white transition-colors duration-200">
      <OrbsBackground />
      <RoadmapNav />

      <main className="relative z-10 max-w-4xl mx-auto px-5 py-12">
        <header className="mb-10 pb-8 border-b border-slate-200/80 dark:border-slate-800/80">
          <Link
            href="/guides/databricks-spark-roadmap"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Spark &amp; Databricks Roadmap</span>
          </Link>

          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 uppercase tracking-wider mb-3">
            Data Platform Comparison
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Databricks vs Snowflake
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-6">
            They get lumped together because both live in the cloud and both run SQL. What they're actually built for is fundamentally different — and the right one to learn first depends on your target data role.
          </p>

          <div className="p-4 rounded-2xl bg-blue-500/10 border-l-4 border-blue-500 text-sm text-slate-800 dark:text-slate-200">
            <strong>The confusion cleared up in one line:</strong> Snowflake is a <strong>data warehouse</strong> (fast SQL analytics on clean tabular data). Databricks is a <strong>data + AI lakehouse</strong> (pipelines, raw data cleansing, and ML on Apache Spark).
          </div>
        </header>

        {/* Role Picker */}
        <section className="mb-12">
          <h2 className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100 mb-2">
            Start Here — Pick Your Lane
          </h2>
          <p className="text-sm text-slate-500 mb-4">Tap your target role to see the exact recommended learning path.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            {ROLES.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRole(r)}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  selectedRole.id === r.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-blue-500'
                }`}
              >
                <span className="font-bold block text-sm mb-1">{r.label}</span>
                <span className={`text-xs ${selectedRole.id === r.id ? 'text-blue-100' : 'text-slate-500'}`}>
                  {r.sub}
                </span>
              </button>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white uppercase tracking-wider">
                {selectedRole.pick}
              </span>
              <span className="text-xs text-slate-500">← Recommended First Choice</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {selectedRole.reason}
            </p>
          </div>
        </section>

        {/* Side by side platform components */}
        <section className="mb-12">
          <h2 className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100 mb-6">
            Inside Each Platform
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Databricks */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xl">🧱</span>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Databricks</h3>
              </div>
              <div className="space-y-2">
                {DB_COMPONENTS.map(([name, desc], i) => (
                  <div
                    key={i}
                    onClick={() => setOpenDb(openDb === i ? null : i)}
                    className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-blue-500 transition-all"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-100">
                      <span>{name}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDb === i ? 'rotate-180' : ''}`} />
                    </div>
                    {openDb === i && (
                      <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                        {desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Snowflake */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xl">❄️</span>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Snowflake</h3>
              </div>
              <div className="space-y-2">
                {SF_COMPONENTS.map(([name, desc], i) => (
                  <div
                    key={i}
                    onClick={() => setOpenSf(openSf === i ? null : i)}
                    className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-blue-500 transition-all"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-100">
                      <span>{name}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openSf === i ? 'rotate-180' : ''}`} />
                    </div>
                    {openSf === i && (
                      <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                        {desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-16 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 text-center text-xs text-slate-500 dark:text-slate-400">
          <p>Next.js 16 App Router · Interactive Databricks vs Snowflake Guide</p>
        </footer>
      </main>
    </div>
  );
}
