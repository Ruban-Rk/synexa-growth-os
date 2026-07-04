'use client';

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const revenueData = [
  { name: 'Jan', revenue: 18000, target: 20000 },
  { name: 'Feb', revenue: 21000, target: 20000 },
  { name: 'Mar', revenue: 19500, target: 22000 },
  { name: 'Apr', revenue: 24000, target: 22000 },
  { name: 'May', revenue: 22800, target: 24000 },
  { name: 'Jun', revenue: 27000, target: 24000 },
];

const channelData = [
  { name: 'Organic', value: 38 },
  { name: 'Paid', value: 28 },
  { name: 'Referral', value: 19 },
  { name: 'Direct', value: 15 },
];

const PIE_COLORS = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bg-card border border-border rounded-lg px-3 py-2 text-xs shadow-xl">
        <p className="text-txt-muted mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }} className="font-medium">{p.name}: ${p.value?.toLocaleString() ?? p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-txt-primary">Analytics</h1>
        <p className="text-txt-muted text-sm mt-0.5">Business performance metrics and trend analysis</p>
      </div>

      {/* KPI summary row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Total Revenue', value: '$132.3K', trend: '+22%', up: true },
          { label: 'Avg. Deal Size', value: '$4,200', trend: '+8%', up: true },
          { label: 'Conversion Rate', value: '5.8%', trend: '+1.2%', up: true },
          { label: 'Customer Churn', value: '3.4%', trend: '-0.8%', up: true },
        ].map((k) => (
          <div key={k.label} className="glass-card p-4">
            <p className="text-[11px] text-txt-muted uppercase tracking-wider font-semibold mb-2">{k.label}</p>
            <p className="text-xl font-bold text-txt-primary">{k.value}</p>
            <p className={`text-xs mt-1 ${k.up ? 'text-emerald-400' : 'text-red-400'}`}>{k.trend} vs last period</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="glass-card p-5 lg:col-span-2">
          <h3 className="text-sm font-semibold text-txt-primary mb-4">Revenue vs Target</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2d38" />
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} dot={false} name="Revenue" />
              <Line type="monotone" dataKey="target" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" dot={false} name="Target" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-txt-primary mb-4">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={channelData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {channelData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: '#16181f', border: '1px solid #2a2d38', borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-1.5">
            {channelData.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[i] }} />
                  <span className="text-txt-secondary">{d.name}</span>
                </div>
                <span className="text-txt-primary font-medium">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
