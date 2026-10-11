'use client';

import React from 'react';

export default function OrbsBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      <div 
        className="absolute rounded-full filter blur-[80px] opacity-35 dark:opacity-40 w-[460px] height-[460px] -top-[120px] -left-[100px] pointer-events-none"
        style={{ background: 'var(--o1, #1856ff)' }}
      />
      <div 
        className="absolute rounded-full filter blur-[80px] opacity-35 dark:opacity-40 w-[420px] height-[420px] top-[38%] -right-[140px] pointer-events-none"
        style={{ background: 'var(--o2, #8a6dff)' }}
      />
      <div 
        className="absolute rounded-full filter blur-[80px] opacity-35 dark:opacity-40 w-[380px] height-[380px] -bottom-[120px] left-[20%] pointer-events-none"
        style={{ background: 'var(--o3, #07ca6b)' }}
      />
    </div>
  );
}
