'use client';

import React, { useState } from 'react';
import { SqlQuestion } from '@/data/sqlPracticeData';
import { Lightbulb, ChevronLeft, ChevronRight, CheckCircle2, HelpCircle, Code2, Copy, Check } from 'lucide-react';

interface QuestionCardProps {
  question: SqlQuestion;
  currentIndex: number;
  totalQuestions: number;
  isSolved: boolean;
  onPrev: () => void;
  onNext: () => void;
  onLoadSolution: (sql: string) => void;
}

export default function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  isSolved,
  onPrev,
  onNext,
  onLoadSolution,
}: QuestionCardProps) {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [copied, setCopied] = useState(false);

  const getDifficultyBadge = (diff: 'Easy' | 'Medium' | 'Hard') => {
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700';
      case 'Medium':
        return 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700';
      case 'Hard':
        return 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-700';
    }
  };

  const handleCopySolution = () => {
    navigator.clipboard.writeText(question.solutionSql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
      <div>
        {/* Top bar with difficulty & stepper */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border ${getDifficultyBadge(question.difficulty)}`}>
              {question.difficulty}
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {question.category}
            </span>
            {isSolved && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Solved</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            <span>{currentIndex + 1} / {totalQuestions}</span>
            <button
              onClick={onPrev}
              disabled={currentIndex === 0}
              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              title="Previous Question"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onNext}
              disabled={currentIndex === totalQuestions - 1}
              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              title="Next Question"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 leading-snug">
          {question.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          {question.description}
        </p>

        {/* Hint Accordion */}
        {showHint && (
          <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border-l-4 border-amber-500 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold block mb-0.5">Hint:</span>
              <span>{question.hint}</span>
            </div>
          </div>
        )}

        {/* Solution Reveal Drawer */}
        {showSolution && (
          <div className="mb-4 p-3 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 text-xs font-mono">
            <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-800 text-[11px] text-slate-400">
              <span className="font-bold text-emerald-400">Official Solution SQL</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySolution}
                  className="flex items-center gap-1 hover:text-white"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={() => onLoadSolution(question.solutionSql)}
                  className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  Load in Editor
                </button>
              </div>
            </div>
            <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed">
              <code>{question.solutionSql}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Action Buttons Toolbar */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <button
          onClick={() => setShowHint(!showHint)}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
          <span>{showHint ? 'Hide Hint' : 'Get Hint'}</span>
        </button>

        <button
          onClick={() => setShowSolution(!showSolution)}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <Code2 className="w-3.5 h-3.5 text-blue-500" />
          <span>{showSolution ? 'Hide Solution' : 'Reveal Solution'}</span>
        </button>
      </div>
    </div>
  );
}
