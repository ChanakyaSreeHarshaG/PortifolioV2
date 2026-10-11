'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, BarChart3, Database, BookOpen, ArrowLeft, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/ui/ThemeToggle';

export default function RoadmapNav() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { href: '/roadmaps', label: 'All Roadmaps', icon: Sparkles, activeColor: 'bg-teal-600 text-white' },
    { href: '/guides/databricks-spark-roadmap', label: 'Databricks & Spark', icon: Sparkles, activeColor: 'bg-blue-600 text-white' },
    { href: '/guides/powerbi-roadmap', label: 'Power BI Roadmap', icon: BarChart3, activeColor: 'bg-amber-600 text-white' },
    { href: '/guides/sql-interview-master', label: '174+ SQL Archive', icon: Database, activeColor: 'bg-teal-600 text-white' },
    { href: '/guides/de-vocabulary', label: '200 DE Vocabulary', icon: BookOpen, activeColor: 'bg-emerald-600 text-white' },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 px-4 py-3 transition-colors shadow-sm">
      <div className="roadmap-container flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-1 scrollbar-none">
          <Link 
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-500 transition-all shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Portfolio</span>
          </Link>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 shrink-0" />

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg shrink-0 transition-all ${
                  isActive
                    ? `${item.activeColor} shadow-sm ring-1 ring-black/5`
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100/60 dark:bg-slate-800/40 hover:bg-slate-200/80 dark:hover:bg-slate-800 border border-transparent hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-slate-300 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:border-teal-500 transition-all shrink-0 cursor-pointer"
        >
          {theme === 'dark' ? <Moon className="w-3.5 h-3.5 text-amber-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
          <span className="capitalize">{theme}</span>
        </button>
      </div>
    </nav>
  );
}
