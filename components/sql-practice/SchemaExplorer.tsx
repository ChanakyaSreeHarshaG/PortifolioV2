'use client';

import React, { useState } from 'react';
import { DatabaseDefinition, SqlTableSchema } from '@/data/sqlPracticeData';
import { Database, Table, Key, Link2, Eye, ChevronDown, ChevronRight } from 'lucide-react';

interface SchemaExplorerProps {
  databases: DatabaseDefinition[];
  activeDb: DatabaseDefinition;
  onSelectDb: (db: DatabaseDefinition) => void;
  onPreviewTable: (tableName: string) => void;
}

export default function SchemaExplorer({
  databases,
  activeDb,
  onSelectDb,
  onPreviewTable,
}: SchemaExplorerProps) {
  const [expandedTables, setExpandedTables] = useState<Record<string, boolean>>({
    [activeDb.tables[0]?.tableName || '']: true,
  });

  const toggleTable = (tableName: string) => {
    setExpandedTables((prev) => ({
      ...prev,
      [tableName]: !prev[tableName],
    }));
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
      {/* Database Selector Header */}
      <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80">
        <div className="flex items-center gap-2 mb-2">
          <Database className="w-4 h-4 text-teal-500" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Database Schema
          </span>
        </div>
        <select
          value={activeDb.id}
          onChange={(e) => {
            const chosen = databases.find((d) => d.id === e.target.value);
            if (chosen) {
              onSelectDb(chosen);
              setExpandedTables({ [chosen.tables[0]?.tableName || '']: true });
            }
          }}
          className="w-full text-xs font-semibold px-2.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer"
        >
          {databases.map((db) => (
            <option key={db.id} value={db.id}>
              {db.name}
            </option>
          ))}
        </select>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-snug">
          {activeDb.description}
        </p>
      </div>

      {/* Tables & Columns Tree */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-thin">
        {activeDb.tables.map((table: SqlTableSchema) => {
          const isExpanded = !!expandedTables[table.tableName];
          return (
            <div
              key={table.tableName}
              className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950/60 overflow-hidden shadow-xs"
            >
              {/* Table Header Bar */}
              <div className="flex items-center justify-between px-3 py-2 bg-slate-100/70 dark:bg-slate-850">
                <button
                  onClick={() => toggleTable(table.tableName)}
                  className="flex items-center gap-1.5 text-xs font-bold font-mono text-slate-900 dark:text-slate-100 hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer text-left flex-1"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  )}
                  <Table className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                  <span>{table.tableName}</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    ({table.columns.length})
                  </span>
                </button>

                <button
                  onClick={() => onPreviewTable(table.tableName)}
                  title={`Preview top rows of ${table.tableName}`}
                  className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Table Columns List */}
              {isExpanded && (
                <div className="px-3 py-2 space-y-1.5 border-t border-slate-100 dark:border-slate-800/60 text-[11px] font-mono">
                  {table.columns.map((col) => (
                    <div
                      key={col.name}
                      className="flex items-center justify-between gap-2 py-0.5 text-slate-600 dark:text-slate-300"
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        {col.isPk ? (
                          <span title="Primary Key" className="inline-flex shrink-0">
                            <Key className="w-3 h-3 text-amber-500" />
                          </span>
                        ) : col.isFk ? (
                          <span title={`Foreign Key (${col.references})`} className="inline-flex shrink-0">
                            <Link2 className="w-3 h-3 text-blue-500" />
                          </span>
                        ) : (
                          <span className="w-3 h-3 inline-block" />
                        )}
                        <span className="truncate font-semibold">{col.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        {col.type}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
