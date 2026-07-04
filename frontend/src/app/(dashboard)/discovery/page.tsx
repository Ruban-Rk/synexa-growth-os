'use client';

import { useState } from 'react';

const businesses = [
  { name: 'The Rustic Spoon', industry: 'Restaurant', health: 'Strong', revenue: '$30K/mo', goal: 'Boost weekday lunch sales', mrr_growth: '+12%' },
  { name: 'Lumina Apparel', industry: 'Retail', health: 'Good', revenue: '$45K/mo', goal: 'Clear winter inventory', mrr_growth: '+7%' },
  { name: 'IronCore Fitness', industry: 'Gym', health: 'At Risk', revenue: '$25K/mo', goal: 'Acquire 50 new members', mrr_growth: '-3%' },
  { name: 'Vitality Clinic', industry: 'Healthcare', health: 'Strong', revenue: '$80K/mo', goal: 'Increase patient bookings', mrr_growth: '+18%' },
  { name: 'TechHaven', industry: 'E-commerce', health: 'Good', revenue: '$120K/mo', goal: 'Reduce cart abandonment', mrr_growth: '+9%' },
  { name: 'SaaSify', industry: 'Startup', health: 'Good', revenue: '$4.5K MRR', goal: 'Secure 5 enterprise pilots', mrr_growth: '+22%' },
];

const healthColor: Record<string, string> = {
  Strong: 'badge-success',
  Good: 'badge-info',
  'At Risk': 'badge-danger',
};

const industryIcon: Record<string, string> = {
  Restaurant: '🍽️',
  Retail: '🛍️',
  Gym: '💪',
  Healthcare: '🏥',
  'E-commerce': '🛒',
  Startup: '🚀',
};

export default function DiscoveryPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-txt-primary">Business Discovery</h1>
          <p className="text-txt-muted text-sm mt-0.5">Select a business profile to run the AI Executive Crew on it</p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="btn-primary text-sm"
        >
          + Add Business
        </button>
      </div>

      {/* Add modal */}
      {adding && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-scale-in" onClick={() => setAdding(false)}>
          <div className="glass-card p-8 w-full max-w-md m-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-txt-primary mb-5">Add Business Profile</h2>
            <div className="space-y-4">
              {['Business Name', 'Industry', 'Monthly Revenue', 'Primary Goal'].map((field) => (
                <div key={field}>
                  <label className="block text-sm text-txt-secondary mb-1.5">{field}</label>
                  <input
                    type="text"
                    placeholder={`Enter ${field.toLowerCase()}...`}
                    className="w-full px-4 py-3 rounded-lg bg-bg-secondary border border-border text-txt-primary placeholder-txt-muted focus:outline-none focus:border-brand/50 text-sm transition-colors"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button className="btn-primary flex-1 text-sm" onClick={() => setAdding(false)}>Save Profile</button>
              <button className="btn-ghost flex-1 text-sm" onClick={() => setAdding(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Business grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 stagger-children">
        {businesses.map((b, i) => (
          <div
            key={b.name}
            className={`glass-card p-5 cursor-pointer animate-fade-in ${selected === i ? 'border-brand/50 bg-brand-muted' : 'hover:border-brand/30'}`}
            onClick={() => setSelected(selected === i ? null : i)}
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-bg-hover flex items-center justify-center text-2xl flex-shrink-0">
                {industryIcon[b.industry]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 justify-between">
                  <h3 className="text-sm font-semibold text-txt-primary truncate">{b.name}</h3>
                  <span className={`badge ${healthColor[b.health]} text-[10px] flex-shrink-0`}>{b.health}</span>
                </div>
                <p className="text-xs text-txt-muted">{b.industry}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-2 text-xs mb-4">
              <div className="flex justify-between items-center">
                <span className="text-txt-muted">Revenue</span>
                <span className="text-txt-primary font-semibold">{b.revenue}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-txt-muted">MoM Growth</span>
                <span className={`font-semibold ${b.mrr_growth.startsWith('-') ? 'text-red-400' : 'text-emerald-400'}`}>{b.mrr_growth}</span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-txt-muted flex-shrink-0">Goal</span>
                <span className="text-txt-secondary text-right">{b.goal}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <a
                href="/analysis"
                className="flex-1 py-2 rounded-lg bg-brand/10 border border-brand/30 text-brand text-xs font-medium text-center hover:bg-brand/20 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                ⚡ Run Analysis
              </a>
              <button
                className="py-2 px-3 rounded-lg border border-border text-txt-muted text-xs font-medium hover:border-brand/30 hover:text-brand transition-colors"
                onClick={(e) => { e.stopPropagation(); setSelected(selected === i ? null : i); }}
              >
                {selected === i ? '▲' : '▼'}
              </button>
            </div>

            {/* Expanded detail */}
            {selected === i && (
              <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                <p className="text-xs text-txt-muted mb-2 font-semibold uppercase tracking-wider">Business Profile</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-bg-secondary rounded-lg p-2">
                    <div className="text-txt-muted">Industry</div>
                    <div className="text-txt-primary font-medium mt-0.5">{b.industry}</div>
                  </div>
                  <div className="bg-bg-secondary rounded-lg p-2">
                    <div className="text-txt-muted">Health</div>
                    <div className="text-txt-primary font-medium mt-0.5">{b.health}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
