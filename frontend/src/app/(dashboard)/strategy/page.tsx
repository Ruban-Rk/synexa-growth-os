'use client';

const strategies = [
  { title: 'Q3 Revenue Acceleration', owner: 'Strategy Agent', status: 'active', priority: 'high', description: 'Expand into enterprise tier with targeted ABM approach. Projected uplift: +35% ARR.', tags: ['Revenue', 'Enterprise'] },
  { title: 'Customer Retention Programme', owner: 'CS Agent', status: 'planning', priority: 'high', description: 'Reduce churn by 15% through proactive health scoring and automated intervention workflows.', tags: ['Retention', 'Automation'] },
  { title: 'Digital Marketing Overhaul', owner: 'Marketing Agent', status: 'active', priority: 'medium', description: 'Migrate 60% of ad spend to performance-based channels. Focus on SEO and conversion rate optimisation.', tags: ['Marketing', 'Digital'] },
  { title: 'Operational Cost Reduction', owner: 'Operations Agent', status: 'review', priority: 'medium', description: 'Identify 20% cost savings through process automation and vendor renegotiation.', tags: ['Operations', 'Cost'] },
];

const priorityColor: Record<string, string> = {
  high: 'badge-danger',
  medium: 'badge-warning',
  low: 'badge-info',
};
const statusColor: Record<string, string> = {
  active: 'badge-success',
  planning: 'badge-info',
  review: 'badge-warning',
};

export default function StrategyPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-txt-primary">Strategy</h1>
          <p className="text-txt-muted text-sm mt-0.5">AI-generated strategic initiatives from your Executive Crew</p>
        </div>
        <button className="btn-primary text-sm">+ New Initiative</button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {strategies.map((s) => (
          <div key={s.title} className="glass-card p-5 hover:border-brand/30 cursor-pointer">
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-sm font-semibold text-txt-primary">{s.title}</h3>
              <div className="flex gap-1.5 flex-shrink-0">
                <span className={`badge ${statusColor[s.status]} text-[11px]`}>{s.status}</span>
                <span className={`badge ${priorityColor[s.priority]} text-[11px]`}>{s.priority}</span>
              </div>
            </div>
            <p className="text-txt-secondary text-xs leading-relaxed mb-4">{s.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                {s.tags.map((t) => <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-bg-hover border border-border text-txt-muted">{t}</span>)}
              </div>
              <span className="text-[11px] text-txt-muted">{s.owner}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
