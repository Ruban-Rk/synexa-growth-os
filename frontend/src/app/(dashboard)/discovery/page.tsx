'use client';

const businesses = [
  { name: 'The Rustic Spoon', industry: 'Restaurant', health: 'Strong', revenue: '$30K/mo', goal: 'Boost weekday lunch sales' },
  { name: 'Lumina Apparel', industry: 'Retail', health: 'Good', revenue: '$45K/mo', goal: 'Clear winter inventory' },
  { name: 'IronCore Fitness', industry: 'Gym', health: 'At Risk', revenue: '$25K/mo', goal: 'Acquire 50 new members' },
  { name: 'Vitality Clinic', industry: 'Healthcare', health: 'Strong', revenue: '$80K/mo', goal: 'Increase patient bookings' },
  { name: 'TechHaven', industry: 'E-commerce', health: 'Good', revenue: '$120K/mo', goal: 'Reduce cart abandonment' },
  { name: 'SaaSify', industry: 'Startup', health: 'Good', revenue: '$4.5K MRR', goal: 'Secure 5 enterprise pilots' },
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
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-txt-primary">Business Discovery</h1>
          <p className="text-txt-muted text-sm mt-0.5">Manage and explore your business profiles</p>
        </div>
        <button className="btn-primary text-sm">+ Add Business</button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {businesses.map((b) => (
          <div key={b.name} className="glass-card p-5 cursor-pointer hover:border-brand/30">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-bg-hover flex items-center justify-center text-xl flex-shrink-0">
                {industryIcon[b.industry]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 justify-between">
                  <h3 className="text-sm font-semibold text-txt-primary truncate">{b.name}</h3>
                  <span className={`badge ${healthColor[b.health]} text-[11px] flex-shrink-0`}>{b.health}</span>
                </div>
                <p className="text-xs text-txt-muted">{b.industry}</p>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-txt-muted">Revenue</span>
                <span className="text-txt-primary font-medium">{b.revenue}</span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-txt-muted">Goal</span>
                <span className="text-txt-secondary text-right">{b.goal}</span>
              </div>
            </div>
            <button className="mt-4 w-full py-2 rounded-lg border border-brand/30 text-brand text-xs font-medium hover:bg-brand-muted transition-colors">
              View Analysis →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
