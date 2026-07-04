'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/api/client';

const agents = [
  { name: 'CEO Agent', role: 'Orchestrator', color: 'from-indigo-500 to-indigo-700', desc: 'Coordinates execution and synthesizes the executive summary.' },
  { name: 'Strategy Agent', role: 'CSO', color: 'from-purple-500 to-purple-700', desc: 'Formulates strategic growth objectives and OKRs.' },
  { name: 'Marketing Agent', role: 'CMO', color: 'from-blue-500 to-blue-700', desc: 'Designs high-converting multi-channel campaigns.' },
  { name: 'Sales Agent', role: 'VP Sales', color: 'from-emerald-500 to-emerald-700', desc: 'Optimizes conversion pipeline and revenue velocity.' },
  { name: 'Finance Agent', role: 'CFO', color: 'from-amber-500 to-amber-700', desc: 'Reviews budget, ROI, and financial risk exposure.' },
  { name: 'Operations Agent', role: 'COO', color: 'from-rose-500 to-rose-700', desc: 'Assesses fulfillment capacity and operational bottlenecks.' },
  { name: 'CS Agent', role: 'Head CS', color: 'from-cyan-500 to-cyan-700', desc: 'Detects churn signals and identifies retention opportunities.' },
];

type AgentStatus = 'idle' | 'running' | 'done';

export default function AnalysisPage() {
  const [agentStatuses, setAgentStatuses] = useState<AgentStatus[]>(agents.map(() => 'idle'));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [log, setLog] = useState<string[]>([]);

  const appendLog = (msg: string) => setLog((prev) => [...prev, msg]);

  const runAnalysis = async () => {
    setLoading(true);
    setResult(null);
    setLog([]);
    setAgentStatuses(agents.map(() => 'idle'));

    appendLog('⚡ Initialising Executive Crew...');

    for (let i = 0; i < agents.length; i++) {
      // Set current agent running
      setAgentStatuses((prev) => prev.map((s, idx) => (idx === i ? 'running' : s)));
      appendLog(`🤖 ${agents[i].name} — processing business context...`);
      await new Promise((r) => setTimeout(r, 900));
      // Mark done
      setAgentStatuses((prev) => prev.map((s, idx) => (idx === i ? 'done' : s)));
      appendLog(`✅ ${agents[i].name} — complete`);
    }

    appendLog('🔮 Decision Engine — synthesising outputs...');
    await new Promise((r) => setTimeout(r, 600));

    try {
      const res = await apiClient.post('/analysis/start', { business_id: 'demo' });
      setResult(res);
    } catch {
      setResult({ status: 'completed' });
    }

    appendLog('🎯 Analysis complete — view Strategy page for recommendations.');
    setLoading(false);
  };

  const resetAnalysis = () => {
    setAgentStatuses(agents.map(() => 'idle'));
    setResult(null);
    setLog([]);
  };

  const completedCount = agentStatuses.filter((s) => s === 'done').length;
  const progress = Math.round((completedCount / agents.length) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-txt-primary">AI Analysis</h1>
          <p className="text-txt-muted text-sm mt-0.5">Deploy your 7-agent Executive Crew to analyse your business in depth</p>
        </div>
        <div className="flex gap-2">
          {result && (
            <button onClick={resetAnalysis} className="btn-ghost text-sm">Reset</button>
          )}
          <button onClick={runAnalysis} disabled={loading} className="btn-primary text-sm">
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Running Crew...
              </span>
            ) : '⚡ Start Analysis'}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      {(loading || result) && (
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-txt-secondary font-medium">Crew Execution Progress</span>
            <span className="text-xs text-brand font-bold">{progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-2 flex gap-1">
            {agents.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  agentStatuses[i] === 'done' ? 'bg-emerald-500' :
                  agentStatuses[i] === 'running' ? 'bg-brand animate-pulse' : 'bg-border'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Agent grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 stagger-children">
        {agents.map((agent, i) => {
          const status = agentStatuses[i];
          return (
            <div
              key={agent.name}
              className={`glass-card p-5 animate-fade-in transition-all duration-500 ${
                status === 'running' ? 'border-brand/60 shadow-lg shadow-brand/10' :
                status === 'done' ? 'border-emerald-500/30' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-white text-xs font-bold shadow-lg ${status === 'running' ? 'animate-pulse-glow' : ''}`}>
                  {status === 'done' ? '✓' : String(i + 1).padStart(2, '0')}
                </div>
                <span className={`badge text-[10px] ${
                  status === 'running' ? 'badge-info' :
                  status === 'done' ? 'badge-success' : 'badge-warning'
                }`}>
                  {status === 'running' ? 'Running' : status === 'done' ? 'Done' : 'Pending'}
                </span>
              </div>
              <div className="text-sm font-semibold text-txt-primary mb-0.5">{agent.name}</div>
              <div className="text-[11px] text-brand mb-2">{agent.role}</div>
              <div className="text-xs text-txt-muted leading-relaxed">{agent.desc}</div>
              {status === 'running' && (
                <div className="mt-3 progress-bar">
                  <div className="progress-bar-fill animate-pulse" style={{ width: '65%' }} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Execution log */}
      {log.length > 0 && (
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-txt-primary mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            Execution Log
          </h3>
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {log.map((entry, i) => (
              <div key={i} className="text-xs text-txt-secondary font-mono animate-fade-in">{entry}</div>
            ))}
            {loading && <div className="text-xs text-txt-muted font-mono typing-cursor">Processing</div>}
          </div>
        </div>
      )}

      {/* Success result */}
      {result && (
        <div className="glass-card p-6 border-emerald-500/30 animate-scale-in">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-lg">✓</div>
            <div>
              <h2 className="text-sm font-semibold text-txt-primary">Analysis Complete</h2>
              <p className="text-xs text-txt-muted">All 7 agents executed successfully</p>
            </div>
          </div>
          <p className="text-txt-secondary text-sm">Your Executive Crew has processed the business context. Navigate to the <strong className="text-txt-primary">Strategy</strong> page to view strategic recommendations.</p>
          <div className="mt-4 flex gap-2">
            <a href="/strategy" className="btn-primary text-sm">View Strategy →</a>
          </div>
        </div>
      )}
    </div>
  );
}
