'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import {
  DATABASES,
  SQL_PRACTICE_QUESTIONS,
  SQL_PATTERNS,
  PATTERN_QUESTIONS,
  DatabaseDefinition,
  SqlQuestion,
  SqlPatternDefinition,
} from '@/data/sqlPracticeData';
import SchemaExplorer from '@/components/sql-practice/SchemaExplorer';
import QuestionCard from '@/components/sql-practice/QuestionCard';
import SqlEditor from '@/components/sql-practice/SqlEditor';
import ResultsTable, { QueryResult, VerificationState } from '@/components/sql-practice/ResultsTable';
import QuestionNavigator from '@/components/sql-practice/QuestionNavigator';
import RoadmapNav from '@/components/roadmaps/RoadmapNav';
import OrbsBackground from '@/components/roadmaps/OrbsBackground';
import {
  Terminal,
  Database,
  Sparkles,
  Filter,
  RefreshCw,
  Trophy,
  Layers,
  Code2,
  CheckCircle2,
  BookOpen,
  ChevronRight,
  Flame,
} from 'lucide-react';

export default function SqlPracticePage() {
  // Practice Track Toggle: 'standard' (72 authentic sql-practice questions) vs 'patterns' (200 repeating interview patterns)
  const [practiceMode, setPracticeMode] = useState<'standard' | 'patterns'>('standard');
  const [selectedPatternId, setSelectedPatternId] = useState<string>(SQL_PATTERNS[0].id);

  const [activeDb, setActiveDb] = useState<DatabaseDefinition>(DATABASES[0]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');

  // Currently active pattern definition
  const currentPattern = useMemo(() => {
    return SQL_PATTERNS.find((p) => p.id === selectedPatternId) || SQL_PATTERNS[0];
  }, [selectedPatternId]);

  // Questions filtered based on mode and difficulty
  const filteredQuestions = useMemo(() => {
    if (practiceMode === 'patterns') {
      return PATTERN_QUESTIONS.filter((q) => {
        const matchPattern = q.category.startsWith(`Pattern ${currentPattern.number}:`);
        const matchDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
        return matchPattern && matchDiff;
      });
    } else {
      return SQL_PRACTICE_QUESTIONS.filter((q) => {
        const matchDb = q.database === activeDb.id;
        const matchDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
        return matchDb && matchDiff;
      });
    }
  }, [practiceMode, currentPattern, activeDb, selectedDifficulty]);

  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const currentQuestion: SqlQuestion | undefined = filteredQuestions[questionIndex] || filteredQuestions[0];

  const [sqlCode, setSqlCode] = useState<string>('');
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [engineReady, setEngineReady] = useState<boolean>(false);
  const [engineError, setEngineError] = useState<string | null>(null);

  const [verification, setVerification] = useState<{
    state: VerificationState;
    message?: string;
  }>({ state: 'idle' });

  const [solvedIds, setSolvedIds] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sql_practice_solved_ids');
        if (saved) return new Set(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load solved IDs from localStorage', e);
      }
    }
    return new Set();
  });

  // Save solved IDs to localStorage whenever updated
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('sql_practice_solved_ids', JSON.stringify(Array.from(solvedIds)));
      } catch (e) {
        console.error('Failed to save solved IDs to localStorage', e);
      }
    }
  }, [solvedIds]);

  // SQLite references
  const sqlModuleRef = useRef<any>(null);
  const dbInstanceRef = useRef<any>(null);

  // Initialize SQLite in WebAssembly
  useEffect(() => {
    let isMounted = true;

    const loadSqlEngine = async () => {
      try {
        if (typeof window === 'undefined') return;

        // Check if script already attached
        if (!(window as any).initSqlJs) {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/sql-wasm.js';
          script.async = true;
          document.body.appendChild(script);

          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = () => reject(new Error('Failed to load sql-wasm.js from CDN'));
          });
        }

        const SQL = await (window as any).initSqlJs({
          locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/${file}`,
        });

        if (!isMounted) return;
        sqlModuleRef.current = SQL;

        // Init database with active schema
        initDb(activeDb, SQL);
        setEngineReady(true);
      } catch (err: any) {
        if (!isMounted) return;
        console.error('SQL Engine init error:', err);
        setEngineError(err.message || 'Could not initialize WebAssembly SQLite');
      }
    };

    loadSqlEngine();

    return () => {
      isMounted = false;
    };
  }, []);

  // Re-initialize database whenever active database changes
  const initDb = (dbDef: DatabaseDefinition, SQLModule?: any) => {
    const SQL = SQLModule || sqlModuleRef.current;
    if (!SQL) return;
    try {
      const db = new SQL.Database();
      db.run(dbDef.initSql);
      dbInstanceRef.current = db;
    } catch (err) {
      console.error('Failed to init DDL seed:', err);
    }
  };

  const handleSelectDb = (newDb: DatabaseDefinition) => {
    setActiveDb(newDb);
    setQuestionIndex(0);
    initDb(newDb);
    setQueryResult(null);
    setVerification({ state: 'idle' });
  };

  // Switch Track Mode handler
  const handleSwitchMode = (mode: 'standard' | 'patterns') => {
    setPracticeMode(mode);
    setQuestionIndex(0);
    setQueryResult(null);
    setVerification({ state: 'idle' });

    if (mode === 'patterns') {
      // Switch active db to Enterprise / Patterns Master Sandbox
      const patternsDb = DATABASES.find((d) => d.id === 'enterprise') || DATABASES[1];
      setActiveDb(patternsDb);
      initDb(patternsDb);
    } else {
      // Switch back to Hospital
      const hospitalDb = DATABASES[0];
      setActiveDb(hospitalDb);
      initDb(hospitalDb);
    }
  };

  // Clear editor when question changes so user starts clean and writes query
  useEffect(() => {
    if (currentQuestion) {
      setSqlCode('');
      setVerification({ state: 'idle' });
      setQueryResult(null);
    }
  }, [currentQuestion?.id]);

  // Unified Run Query & Solution Verification Handler
  const handleExecuteQuery = (customSql?: string) => {
    const sqlToRun = customSql || sqlCode;
    if (!sqlToRun.trim()) {
      setVerification({
        state: 'error',
        message: 'Please write an SQL query in the editor first.',
      });
      return;
    }

    const db = dbInstanceRef.current;
    if (!db) {
      setVerification({
        state: 'error',
        message: 'SQLite WebAssembly engine is initializing. Please wait a moment...',
      });
      return;
    }

    setIsRunning(true);

    setTimeout(() => {
      const startTime = performance.now();
      try {
        const userRes = db.exec(sqlToRun);
        const elapsed = Math.round(performance.now() - startTime);

        if (!userRes || userRes.length === 0) {
          // If query produced 0 rows, check whether solution expects 0 rows
          const expectedRes = currentQuestion ? db.exec(currentQuestion.solutionSql) : null;
          const expectedRows = expectedRes && expectedRes.length > 0 ? expectedRes[0].values.length : 0;

          if (expectedRows === 0 && expectedRes) {
            setVerification({
              state: 'correct',
              message: '🎉 Correct! Your query satisfies all problem constraints and matches the expected answer.',
            });
            if (currentQuestion) {
              setSolvedIds((prev) => new Set([...prev, currentQuestion.id]));
            }
          } else {
            setVerification({
              state: 'mismatch',
              message: `Your query returned 0 rows, but the solution expects ${expectedRows} record(s).`,
            });
          }

          setQueryResult({
            columns: [],
            values: [],
            executionTimeMs: elapsed,
          });
          return;
        }

        const u = userRes[0];
        setQueryResult({
          columns: u.columns,
          values: u.values,
          executionTimeMs: elapsed,
        });

        if (!currentQuestion) {
          setVerification({ state: 'idle' });
          return;
        }

        // Compare against expected solution query
        const expectedRes = db.exec(currentQuestion.solutionSql);
        if (!expectedRes || expectedRes.length === 0) {
          setVerification({
            state: 'mismatch',
            message: 'Row count mismatch: Solution produces 0 rows.',
          });
          return;
        }

        const e = expectedRes[0];

        // 1. Check Row count
        if (u.values.length !== e.values.length) {
          setVerification({
            state: 'mismatch',
            message: `Row count mismatch: Returned ${u.values.length} row(s), but expected solution produces ${e.values.length} row(s).`,
          });
          return;
        }

        // 2. Check Column count
        if (u.columns.length !== e.columns.length) {
          setVerification({
            state: 'mismatch',
            message: `Column count mismatch: Expected ${e.columns.length} columns (${e.columns.join(', ')}), but your query returned ${u.columns.length}.`,
          });
          return;
        }

        // 3. Robust Normalized Content Comparison
        const normalizeCell = (cell: any) => {
          if (cell === null || cell === undefined) return 'NULL';
          const str = String(cell).trim();
          const num = Number(str);
          if (!isNaN(num) && str !== '') {
            return String(Math.round(num * 10000) / 10000);
          }
          return str.toLowerCase();
        };

        const normalizeValues = (rows: any[][]) =>
          rows
            .map((row) => row.map(normalizeCell).join('###'))
            .sort()
            .join('@@@');

        if (normalizeValues(u.values) === normalizeValues(e.values)) {
          setVerification({
            state: 'correct',
            message: '🎉 Correct! Your query satisfies all problem constraints and matches the expected answer.',
          });
          setSolvedIds((prev) => new Set([...prev, currentQuestion.id]));
        } else {
          setVerification({
            state: 'mismatch',
            message: 'Row count matches, but returned calculations or values differ from expected output.',
          });
        }
      } catch (err: any) {
        setVerification({
          state: 'error',
          message: err.message,
        });
        setQueryResult({
          columns: [],
          values: [],
          error: err.message,
        });
      } finally {
        setIsRunning(false);
      }
    }, 15);
  };

  // Preview top rows of any table from Schema Explorer without failing question check
  const handlePreviewTable = (tableName: string) => {
    const previewSql = `SELECT * FROM ${tableName} LIMIT 5;`;
    setSqlCode(previewSql);
    const db = dbInstanceRef.current;
    if (!db) return;
    try {
      const res = db.exec(previewSql);
      if (res && res.length > 0) {
        setQueryResult({
          columns: res[0].columns,
          values: res[0].values,
          executionTimeMs: 5,
        });
        setVerification({ state: 'idle' });
      }
    } catch (e: any) {
      setQueryResult({ columns: [], values: [], error: e.message });
    }
  };

  const totalBankQuestions =
    practiceMode === 'patterns' ? PATTERN_QUESTIONS.length : SQL_PRACTICE_QUESTIONS.length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative selection:bg-teal-500 selection:text-white transition-colors duration-200">
      <OrbsBackground />
      <RoadmapNav />

      <main className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Top Header Bar */}
        <header className="mb-6 pb-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-700">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>IN-BROWSER SQL TERMINAL · WEBASSEMBLY SQLITE</span>
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                  {engineReady ? '● SQLite Engine Ready' : '○ Loading Engine...'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                SQL Practice Terminal
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Master 270+ hands-on SQL challenges across Healthcare, Enterprise relational schemas, and all 20 core interview patterns with real-time browser execution.
              </p>
            </div>

            {/* Mode Toggle & Progress Meta */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Primary Mode Toggle: Standard vs Patterns */}
              <div className="flex items-center p-1 rounded-xl bg-slate-200/80 dark:bg-slate-900 border border-slate-300 dark:border-slate-750 text-xs font-semibold shadow-xs">
                <button
                  onClick={() => handleSwitchMode('standard')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    practiceMode === 'standard'
                      ? 'bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 shadow-sm font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Standard (72 Qs)</span>
                </button>
                <button
                  onClick={() => handleSwitchMode('patterns')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    practiceMode === 'patterns'
                      ? 'bg-teal-600 text-white shadow-sm font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-amber-300" />
                  <span>20 Interview Patterns (200 Qs)</span>
                </button>
              </div>

              {/* Solved Counter */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>
                  Solved:{' '}
                  <strong className="text-teal-600 dark:text-teal-400">{solvedIds.size}</strong> /{' '}
                  {totalBankQuestions}
                </span>
              </div>
            </div>
          </div>

          {/* Secondary Sub-Bar: Pattern Selector OR Difficulty Selector */}
          <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
            {practiceMode === 'patterns' ? (
              /* Pattern Selector Dropdown & Technique Badge */
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" /> Pattern:
                  </span>
                  <select
                    value={selectedPatternId}
                    onChange={(e) => {
                      setSelectedPatternId(e.target.value);
                      setQuestionIndex(0);
                    }}
                    className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer shadow-xs max-w-[280px] sm:max-w-none"
                  >
                    {SQL_PATTERNS.map((pat) => (
                      <option key={pat.id} value={pat.id}>
                        #{pat.number}. {pat.name} (10 Qs)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-mono bg-white/60 dark:bg-slate-900/60 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none">
                  <span className="font-bold text-slate-800 dark:text-slate-200 shrink-0">Technique:</span>
                  <span className="text-teal-600 dark:text-teal-400 shrink-0">{currentPattern.technique}</span>
                </div>
              </div>
            ) : (
              /* Standard Mode Subtitle */
              <div className="text-xs text-slate-500 font-mono">
                Showing authentic questions for{' '}
                <strong className="text-slate-700 dark:text-slate-300">{activeDb.name}</strong>
              </div>
            )}

            {/* Difficulty Pills */}
            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold shrink-0 self-start sm:self-auto">
              {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => {
                    setSelectedDifficulty(diff);
                    setQuestionIndex(0);
                  }}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    selectedDifficulty === diff
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </header>

        {engineError && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-300 text-xs font-mono">
            <strong>Warning:</strong> {engineError}. Ensure CDN access is available to run SQLite WebAssembly.
          </div>
        )}

        {/* Main 3-Column Layout: Schema (Left), Editor & Results (Center), Question Navigator (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Schema Explorer (3 cols) */}
          <div className="order-2 lg:order-1 lg:col-span-3 h-[700px] lg:sticky lg:top-6">
            <SchemaExplorer
              databases={DATABASES}
              activeDb={activeDb}
              currentQuestion={currentQuestion}
              onSelectDb={handleSelectDb}
              onPreviewTable={handlePreviewTable}
            />
          </div>

          {/* Center Column: Question Card + Editor + Results (6 cols) */}
          <div className="order-1 lg:order-2 lg:col-span-6 flex flex-col gap-5">
            {/* Question Card */}
            {currentQuestion ? (
              <QuestionCard
                question={currentQuestion}
                currentIndex={questionIndex}
                totalQuestions={filteredQuestions.length}
                isSolved={solvedIds.has(currentQuestion.id)}
                onPrev={() => setQuestionIndex((prev) => Math.max(0, prev - 1))}
                onNext={() => setQuestionIndex((prev) => Math.min(filteredQuestions.length - 1, prev + 1))}
                onLoadSolution={(sol) => setSqlCode(sol)}
              />
            ) : (
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
                No questions match the current filter. Try selecting 'All' difficulty.
              </div>
            )}

            {/* SQL Code Editor */}
            <div className="h-[270px]">
              <SqlEditor
                sql={sqlCode}
                onChange={setSqlCode}
                onRun={() => handleExecuteQuery()}
                onCheck={() => handleExecuteQuery()}
                onReset={() => {
                  setSqlCode('');
                  setVerification({ state: 'idle' });
                  setQueryResult(null);
                }}
                isRunning={isRunning}
              />
            </div>

            {/* Results Grid Table */}
            <div className="min-h-[280px]">
              <ResultsTable
                result={queryResult}
                verification={verification}
                isLoading={isRunning}
                onNextQuestion={() => setQuestionIndex((prev) => Math.min(filteredQuestions.length - 1, prev + 1))}
              />
            </div>
          </div>

          {/* Right Column: Question Navigator with Question Numbers (3 cols) */}
          <div className="order-3 lg:order-3 lg:col-span-3 h-[700px] lg:sticky lg:top-6">
            <QuestionNavigator
              questions={filteredQuestions}
              currentIndex={questionIndex}
              solvedIds={solvedIds}
              onSelectQuestion={(idx) => {
                setQuestionIndex(idx);
                if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            />
          </div>
        </div>

        {/* Bottom Quick Reference Bar */}
        <footer className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>
            Client-Side SQLite in WebAssembly · All 272 queries execute locally in your browser with zero latency.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/guides/sql-interview-master" className="hover:text-teal-600 transition-colors">
              174+ Company SQL Questions
            </Link>
            <Link href="/roadmaps" className="hover:text-teal-600 transition-colors">
              All Roadmaps
            </Link>
            <Link href="/" className="hover:text-teal-600 transition-colors">
              Portfolio Home
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
