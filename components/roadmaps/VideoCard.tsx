'use client';

import React from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { VideoItem } from '@/data/roadmapData';

export default function VideoCard({ video }: { video: VideoItem }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 hover:border-blue-500/60 transition-all duration-200 shadow-sm"
    >
      <div className="relative w-full sm:w-[200px] h-[115px] rounded-lg overflow-hidden bg-slate-900 shrink-0">
        <img
          src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
          <div className="w-10 h-10 rounded-full bg-slate-950/80 border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-4 h-4 text-white fill-white ml-0.5" />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-1.5 pr-2 py-0.5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
            {video.num}
          </span>
          <span className="font-mono text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {video.channel}
          </span>
        </div>
        <h4 className="text-[15px] font-bold text-slate-900 dark:text-slate-100 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {video.title}
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
          {video.description}
        </p>
        <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 mt-1">
          <span>Watch on YouTube</span>
          <ExternalLink className="w-3 h-3" />
        </span>
      </div>
    </a>
  );
}
