import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import RoadmapNav from '@/components/roadmaps/RoadmapNav';
import OrbsBackground from '@/components/roadmaps/OrbsBackground';
import { ArrowLeft, Play, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: '5 Free Resources to Learn Python From Scratch | Learning Path',
  description: 'A curated path to learn Python for free: full beginner course, project-based course, exercises, and 50+ mini projects.',
};

const RESOURCES = [
  {
    num: "01",
    tag: "Video Course",
    name: "Python Full Course for Beginners",
    oneline: "Best starting point — covers all the basics you need for any role, no prior experience assumed.",
    url: "https://www.youtube.com/watch?v=K5KVEU3aaeQ",
    videoId: "K5KVEU3aaeQ",
    isVideo: true
  },
  {
    num: "02",
    tag: "Video Course",
    name: "Learn Python by Building a Project",
    oneline: "Build while you learn instead of just watching — the fastest way to make concepts actually stick.",
    url: "https://www.youtube.com/watch?v=Dn1EjhcQk64",
    videoId: "Dn1EjhcQk64",
    isVideo: true
  },
  {
    num: "03",
    tag: "Interactive Exercises",
    name: "Practise Python",
    oneline: "Short, focused exercises to lock in what you've just learned before moving to the next concept.",
    url: "https://genepy.org/exercises/print-42",
    isVideo: false
  },
  {
    num: "04",
    tag: "GitHub Repository",
    name: "Python Mini Projects (50+)",
    oneline: "50+ beginner-friendly projects to build real confidence — pick one and finish it end to end.",
    url: "https://github.com/ndleah/python-mini-project",
    isVideo: false
  },
  {
    num: "05",
    tag: "GitHub Repository",
    name: "30 Days of Python",
    oneline: "A structured, day-by-day roadmap for once the basics are down and you're ready to go deeper.",
    url: "https://github.com/asabeneh/30-days-of-python",
    isVideo: false
  }
];

export default function LearnPythonPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative selection:bg-amber-500 selection:text-white transition-colors duration-200">
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

          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 uppercase tracking-wider mb-3">
            Learning Path
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            5 Free Resources to Learn Python From Scratch
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-6">
            A starting point, a project to build while you learn, exercises to lock it in, real projects to build confidence, and a structured plan to go deeper — in the order that makes each one click.
          </p>
        </header>

        <div className="space-y-4">
          {RESOURCES.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 p-4 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-white/40 dark:border-slate-800 shadow-sm hover:border-amber-500/60 dark:hover:border-amber-400/60 transition-all"
            >
              {item.isVideo && item.videoId ? (
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black shrink-0">
                  <Image
                    src={`https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 200px"
                    className="object-cover group-hover:scale-105 transition-transform"
                    unoptimized
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-10 h-10 rounded-full bg-slate-950/70 flex items-center justify-center shadow-lg">
                      <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold shrink-0">
                  <span>{item.tag}</span>
                </div>
              )}

              <div className="flex flex-col justify-center gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                    {item.num}
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.oneline}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 mt-1">
                  <span>Open Resource</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>
          ))}
        </div>

        <footer className="mt-16 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 text-center text-xs text-slate-500 dark:text-slate-400">
          <p>5 Free Python Resources · Next.js 16 (App Router) &amp; Tailwind CSS</p>
        </footer>
      </main>
    </div>
  );
}
