'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, BarChart3, Database, BookOpen, ArrowLeft, Sun, Moon } from 'lucide-react';

export default function RoadmapNav() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved as 'light' | 'dark');
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const navItems = [
    { href: '/guides/databricks-spark-roadmap', label: 'Databricks & Spark', icon: Sparkles },
    { href: '/guides/powerbi-roadmap', label: 'Power BI Roadmap', icon: BarChart3 },
    { href: '/guides/sql-interview-master', label: '174+ SQL Archive', icon: Database },
    { href: '/guides/de-vocabulary', label: '200 DE Vocabulary', icon: BookOpen },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/75 dark:bg-slate-900/75 border-b border-white/20 dark:border-slate-800 px-4 py-3 transition-colors">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-x-auto py-1 scrollbar-none">
          <Link 
            href="/"
            className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500 transition-all shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Portfolio</span>
          </Link>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 shrink-0" />

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg shrink-0 transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60'
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
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:border-blue-500 transition-all shrink-0"
        >
          {theme === 'dark' ? <Moon className="w-3.5 h-3.5 text-amber-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
          <span className="capitalize">{theme}</span>
        </button>
      </div>
    </nav>
  );
}
