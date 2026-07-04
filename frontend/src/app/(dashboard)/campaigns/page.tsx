'use client';

const campaigns = [
  { name: 'Summer Enterprise Push', channel: 'Email + LinkedIn', status: 'active', budget: 4500, leads: 312, conversion: '4.2%', roi: '+186%' },
  { name: 'Retargeting — Abandoned Demos', channel: 'Google Ads', status: 'active', budget: 1800, leads: 87, conversion: '7.1%', roi: '+240%' },
  { name: 'Q3 Brand Awareness', channel: 'Meta + YouTube', status: 'planning', budget: 6000, leads: 0, conversion: '-', roi: '-' },
  { name: 'Referral Programme', channel: 'In-App + Email', status: 'paused', budget: 800, leads: 54, conversion: '9.3%', roi: '+340%' },
];

const statusColor: Record<string, string> = {
  active: 'badge-success',
  planning: 'badge-info',
  paused: 'badge-warning',
};

export default function CampaignsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-txt-primary">Campaigns</h1>
          <p className="text-txt-muted text-sm mt-0.5">Marketing campaigns designed by your AI Marketing Agent</p>
        </div>
        <button className="btn-primary text-sm">+ New Campaign</button>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-txt-muted uppercase tracking-wider">Campaign</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-txt-muted uppercase tracking-wider">Channel</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-txt-muted uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-3 text-[11px] font-semibold text-txt-muted uppercase tracking-wider">Budget</th>
                <th className="text-right px-5 py-3 text-[11px] font-semibold text-txt-muted uppercase tracking-wider">Leads</th>
                <th className="text-right px-5 py-3 text-[11px] font-semibold text-txt-muted uppercase tracking-wider">Conv.</th>
                <th className="text-right px-5 py-3 text-[11px] font-semibold text-txt-muted uppercase tracking-wider">ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {campaigns.map((c) => (
                <tr key={c.name} className="hover:bg-bg-hover transition-colors">
                  <td className="px-5 py-3.5 font-medium text-txt-primary">{c.name}</td>
                  <td className="px-5 py-3.5 text-txt-secondary">{c.channel}</td>
                  <td className="px-5 py-3.5"><span className={`badge ${statusColor[c.status]} text-[11px]`}>{c.status}</span></td>
                  <td className="px-5 py-3.5 text-right text-txt-secondary">${c.budget.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-right text-txt-secondary">{c.leads || '-'}</td>
                  <td className="px-5 py-3.5 text-right text-txt-secondary">{c.conversion}</td>
                  <td className={`px-5 py-3.5 text-right font-semibold ${c.roi !== '-' ? 'text-emerald-400' : 'text-txt-muted'}`}>{c.roi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
