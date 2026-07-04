'use client';

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-txt-primary">Settings</h1>
        <p className="text-txt-muted text-sm mt-0.5">Configure your AI Operating System</p>
      </div>

      {[
        {
          title: 'AI Configuration',
          items: [
            { label: 'LLM Model', value: 'Gemini 1.5 Pro', badge: 'Active' },
            { label: 'Temperature', value: '0.7' },
            { label: 'Max Tokens', value: '4096' },
          ],
        },
        {
          title: 'Database',
          items: [
            { label: 'Provider', value: 'Supabase (PostgreSQL)', badge: 'Connected' },
            { label: 'Vector Store', value: 'ChromaDB', badge: 'Local' },
          ],
        },
        {
          title: 'Authentication',
          items: [
            { label: 'Provider', value: 'Supabase Auth', badge: 'Active' },
            { label: 'JWT Expiry', value: '1 hour' },
          ],
        },
      ].map((section) => (
        <div key={section.title} className="glass-card p-5">
          <h2 className="text-sm font-semibold text-txt-primary mb-4 pb-3 border-b border-border">{section.title}</h2>
          <div className="space-y-3">
            {section.items.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-txt-secondary">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-txt-primary">{item.value}</span>
                  {item.badge && <span className="badge badge-success text-[10px]">{item.badge}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
