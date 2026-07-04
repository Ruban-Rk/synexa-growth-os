'use client';

import { useAppStore } from '@/store';

interface SettingItem {
  label: string;
  value: string;
  badge?: string;
}

interface SettingSection {
  title: string;
  icon: string;
  items: SettingItem[];
}

const sections: SettingSection[] = [
  {
    title: 'AI Configuration',
    icon: '🤖',
    items: [
      { label: 'LLM Model', value: 'Gemini 1.5 Pro', badge: 'Active' },
      { label: 'Temperature', value: '0.7' },
      { label: 'Max Output Tokens', value: '4,096' },
      { label: 'Request Timeout', value: '60 seconds' },
      { label: 'Retry Attempts', value: '3 (exponential backoff)' },
    ],
  },
  {
    title: 'Executive AI Crew',
    icon: '👥',
    items: [
      { label: 'CEO Agent', value: 'Gemini 1.5 Pro', badge: 'Online' },
      { label: 'Strategy Agent', value: 'Gemini 1.5 Pro', badge: 'Online' },
      { label: 'Marketing Agent', value: 'Gemini 1.5 Pro', badge: 'Online' },
      { label: 'Sales Agent', value: 'Gemini 1.5 Pro', badge: 'Online' },
      { label: 'Finance Agent', value: 'Gemini 1.5 Pro', badge: 'Online' },
      { label: 'Operations Agent', value: 'Gemini 1.5 Pro', badge: 'Online' },
      { label: 'Customer Success Agent', value: 'Gemini 1.5 Pro', badge: 'Online' },
    ],
  },
  {
    title: 'Database',
    icon: '🗄️',
    items: [
      { label: 'Primary Database', value: 'Supabase (PostgreSQL)', badge: 'Connected' },
      { label: 'Vector Store', value: 'ChromaDB', badge: 'Local' },
      { label: 'ORM', value: 'SQLAlchemy + Alembic' },
      { label: 'Migrations', value: 'Applied — Init' },
    ],
  },
  {
    title: 'Authentication',
    icon: '🔐',
    items: [
      { label: 'Provider', value: 'Supabase Auth', badge: 'Active' },
      { label: 'JWT Algorithm', value: 'HS256' },
      { label: 'Session Strategy', value: 'Cookie-based SSR' },
    ],
  },
  {
    title: 'Backend API',
    icon: '⚡',
    items: [
      { label: 'Framework', value: 'FastAPI (Python)', badge: 'Running' },
      { label: 'API Version', value: 'v1' },
      { label: 'CORS', value: 'localhost:3000 + Vercel', badge: 'Enabled' },
      { label: 'Logging', value: 'Request-level with trace IDs', badge: 'Active' },
    ],
  },
];

export default function SettingsPage() {
  const user = useAppStore((state) => state.user);

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-txt-primary">Settings</h1>
          <p className="text-txt-muted text-sm mt-0.5">System configuration and AI agent status</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-400 font-medium">All systems operational</span>
        </div>
      </div>

      {/* User card */}
      <div className="glass-card p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold">
          {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
        </div>
        <div>
          <div className="text-sm font-semibold text-txt-primary">{user?.email || 'demo@synexa.ai'}</div>
          <div className="text-xs text-txt-muted">Executive Account · Synexa Growth OS</div>
        </div>
        <span className="ml-auto badge badge-success">Active</span>
      </div>

      {/* Config sections */}
      {sections.map((section) => (
        <div key={section.title} className="glass-card p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-txt-primary mb-4 pb-3 border-b border-border">
            <span>{section.icon}</span>
            {section.title}
          </h2>
          <div className="space-y-3">
            {section.items.map((item: SettingItem) => (
              <div key={item.label} className="flex items-center justify-between py-0.5">
                <span className="text-sm text-txt-secondary">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-txt-primary">{item.value}</span>
                  {item.badge !== undefined && (
                    <span className="badge badge-success text-[10px]">{item.badge}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
