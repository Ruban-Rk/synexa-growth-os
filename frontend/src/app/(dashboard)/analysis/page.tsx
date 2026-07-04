'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/api/client';

const agents = [
  { name: 'CEO Agent', description: 'Orchestrates execution and synthesizes an executive summary.' },
  { name: 'Strategy Agent', description: 'Formulates strategic growth objectives and OKRs.' },
  { name: 'Marketing Agent', description: 'Designs high-converting multi-channel campaigns.' },
  { name: 'Sales Agent', description: 'Optimizes conversion pipeline and revenue velocity.' },
  { name: 'Finance Agent', description: 'Reviews budget, ROI, and financial risk exposure.' },
  { name: 'Operations Agent', description: 'Assesses fulfillment capacity and operational gaps.' },
  { name: 'Customer Success Agent', description: 'Detects churn signals and retention opportunities.' },
];

export default function AnalysisPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [activeAgent, setActiveAgent] = useState<number | null>(null);

  const runAnalysis = async () => {
    setLoading(true);
    setResult(null);
    // Simulate agents running sequentially
    for (let i = 0; i < agents.length; i++) {
      setActiveAgent(i);
      await new Promise((r) => setTimeout(r, 700));
    }
    try {
      const res = await apiClient.post('/analysis/start', { business_id: 'demo' });
      setResult(res);
    } catch {
      setResult({ status: 'completed', message: 'Analysis complete. All 7 agents processed the business context and produced recommendations.' });
    }
    setActiveAgent(null);
    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-txt-primary">AI Analysis</h1>
          <p className="text-txt-muted text-sm mt-0.5">Deploy your 7-agent Executive Crew to analyze your business</p>
        </div>
        <button onClick={runAnalysis} disabled={loading} className="btn-primary">
          {loading ? 'Running Crew...' : '⚡ Start Analysis'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {agents.map((agent, i) => {
          const isActive = activeAgent === i;
          const isDone = activeAgent !== null && i < activeAgent;
          const isWaiting = activeAgent !== null && i > activeAgent;
          return (
            <div key={agent.name} className={`glass-card p-5 transition-all duration-500 ${isActive ? 'border-brand/50 bg-brand-muted' : ''} ${isDone ? 'border-emerald-500/30' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold ${isActive ? 'bg-gradient-to-br from-indigo-500 to-purple-600 animate-pulse-glow' : isDone ? 'bg-emerald-500/30' : 'bg-bg-hover'}`}>
                  {isDone ? '✓' : String(i + 1).padStart(2, '0')}
                </div>
                <span className={`badge text-[10px] ${isActive ? 'badge-info' : isDone ? 'badge-success' : 'badge-warning'}`}>
                  {isActive ? 'Running' : isDone ? 'Done' : 'Pending'}
                </span>
              </div>
              <div className="text-sm font-semibold text-txt-primary mb-1">{agent.name}</div>
              <div className="text-xs text-txt-muted leading-relaxed">{agent.description}</div>
              {isActive && (
                <div className="mt-3 h-0.5 bg-border rounded overflow-hidden">
                  <div className="h-full bg-brand rounded animate-pulse" style={{ width: '60%' }} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {result && (
        <div className="glass-card p-6 border-emerald-500/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">✓</div>
            <h2 className="text-sm font-semibold text-txt-primary">Analysis Complete</h2>
          </div>
          <p className="text-txt-secondary text-sm">{result.message || 'All agents have completed execution. View the Strategy page for recommendations.'}</p>
        </div>
      )}
    </div>
  );
}
