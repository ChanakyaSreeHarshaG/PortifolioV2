'use client';

import React from 'react';

export default function OrbsBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      <div 
        className="absolute rounded-full filter blur-[100px] opacity-25 dark:opacity-30 w-[460px] h-[460px] -top-[120px] -left-[100px] pointer-events-none"
        style={{ background: '#1856ff' }}
      />
      <div 
        className="absolute rounded-full filter blur-[100px] opacity-20 dark:opacity-25 w-[420px] h-[420px] top-[38%] -right-[140px] pointer-events-none"
        style={{ background: '#8a6dff' }}
      />
      <div 
        className="absolute rounded-full filter blur-[100px] opacity-20 dark:opacity-25 w-[380px] h-[380px] -bottom-[120px] left-[20%] pointer-events-none"
        style={{ background: '#07ca6b' }}
      />
    </div>
  );
}
