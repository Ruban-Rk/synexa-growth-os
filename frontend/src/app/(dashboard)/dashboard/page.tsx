'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RevenueTrend, LeadFunnel } from '@/components/dashboard/KPICharts';
import { apiClient } from '@/lib/api/client';

const DEMO_DATA = {
  metrics: {
    business_health: { value: 'Strong', trend: '+12%' },
    growth_score: { value: 74, trend: '+8 pts' },
    revenue_opportunity: { value: '24,500', trend: '+18%' },
    risk_alerts: { value: 2, trend: '-1' },
    executive_summary: 'The business is showing strong revenue momentum with consistent week-over-week lead volume. Marketing conversion has improved, though two supply chain risks require attention before Q3 campaign launch.',
  },
  charts: {
    revenue_trend: [
      { name: 'Jan', revenue: 18000, leads: 420 },
      { name: 'Feb', revenue: 21000, leads: 510 },
      { name: 'Mar', revenue: 19500, leads: 480 },
      { name: 'Apr', revenue: 24000, leads: 590 },
      { name: 'May', revenue: 22800, leads: 550 },
      { name: 'Jun', revenue: 27000, leads: 640 },
    ],
  },
};

const agents = [
  { name: 'CEO', role: 'Orchestrator', status: 'online', color: 'indigo' },
  { name: 'Strategy', role: 'CSO', status: 'online', color: 'purple' },
  { name: 'Marketing', role: 'CMO', status: 'online', color: 'blue' },
  { name: 'Sales', role: 'VP Sales', status: 'online', color: 'emerald' },
  { name: 'Finance', role: 'CFO', status: 'online', color: 'amber' },
  { name: 'Operations', role: 'COO', status: 'online', color: 'rose' },
  { name: 'CS', role: 'Head CS', status: 'online', color: 'cyan' },
];

const colorMap: Record<string, string> = {
  indigo: 'from-indigo-500 to-indigo-600',
  purple: 'from-purple-500 to-purple-600',
  blue: 'from-blue-500 to-blue-600',
  emerald: 'from-emerald-500 to-emerald-600',
  amber: 'from-amber-500 to-amber-600',
  rose: 'from-rose-500 to-rose-600',
  cyan: 'from-cyan-500 to-cyan-600',
};

function StatCard({ label, value, trend, trendUp, color }: { label: string; value: string; trend: string; trendUp: boolean; color: string }) {
  return (
    <div className="glass-card p-5 animate-fade-in">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold text-txt-muted uppercase tracking-wider">{label}</p>
        <span className={`badge text-xs ${trendUp ? 'badge-success' : 'badge-danger'}`}>{trend}</span>
      </div>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(DEMO_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await apiClient.get('/dashboard?business_id=demo');
        setData(res);
      } catch {
        setData(DEMO_DATA); // graceful fallback
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const { metrics, charts } = data;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-txt-primary">Executive Dashboard</h1>
          <p className="text-txt-muted text-sm mt-0.5">Real-time business intelligence powered by your AI Executive Crew</p>
        </div>
        <button onClick={() => router.push('/analysis')} className="btn-primary flex items-center gap-2 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Run AI Analysis
        </button>
      </div>

      {/* KPI Cards */}
      {loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-24" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Business Health" value={metrics.business_health.value} trend={metrics.business_health.trend} trendUp={true} color="text-emerald-400" />
          <StatCard label="Growth Score" value={`${metrics.growth_score.value}/100`} trend={metrics.growth_score.trend} trendUp={true} color="text-brand" />
          <StatCard label="Revenue Opportunity" value={`$${metrics.revenue_opportunity.value}`} trend={metrics.revenue_opportunity.trend} trendUp={true} color="text-txt-primary" />
          <StatCard label="Risk Alerts" value={`${metrics.risk_alerts.value} Warnings`} trend={metrics.risk_alerts.trend} trendUp={false} color="text-red-400" />
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-txt-primary mb-4">Revenue Trend</h3>
          <RevenueTrend data={charts.revenue_trend} />
        </div>
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-txt-primary mb-4">Lead Generation</h3>
          <LeadFunnel data={charts.revenue_trend} />
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* AI Executive Crew */}
        <div className="glass-card p-5 col-span-1">
          <h2 className="text-sm font-semibold text-txt-primary mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Executive Crew — Online
          </h2>
          <div className="space-y-2">
            {agents.map((a) => (
              <div key={a.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-bg-hover transition-colors">
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${colorMap[a.color]} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>
                  {a.name.substring(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-txt-primary">{a.name} Agent</div>
                  <div className="text-xs text-txt-muted">{a.role}</div>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Executive Summary */}
        <div className="glass-card p-5 col-span-2">
          <h2 className="text-sm font-semibold text-txt-primary mb-4">AI Executive Summary</h2>
          <p className="text-txt-secondary text-sm leading-relaxed">{metrics.executive_summary}</p>
          <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
            <span className="badge badge-info">Strategy</span>
            <span className="badge badge-success">Revenue</span>
            <span className="badge badge-warning">Risk</span>
            <span className="ml-auto text-xs text-txt-muted">Generated by CEO Agent</span>
          </div>
        </div>
      </div>
    </div>
  );
}
