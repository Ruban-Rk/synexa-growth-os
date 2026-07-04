'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/api/client';

const DEMO_MESSAGES = [
  { role: 'assistant', content: "Hello! I'm your AI Executive Copilot, backed by a crew of 7 specialized business agents. Ask me anything about your business strategy, KPIs, campaigns, or growth opportunities." },
];

export default function CopilotPage() {
  const [messages, setMessages] = useState(DEMO_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await apiClient.post('/copilot/chat', { business_id: 'demo', message: input });
      setMessages((prev) => [...prev, { role: 'assistant', content: res.response || res.message || 'I have processed your request.' }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'I am currently running in demo mode. In production, I will provide real-time AI analysis powered by your Gemini-backed Executive Crew.' }]);
    }
    setLoading(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const suggestions = [
    'What is my biggest growth opportunity this quarter?',
    'Summarize my current revenue performance',
    'What campaigns should I prioritize?',
    'Where are the top operational risks?',
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-fade-in">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-txt-primary">AI Copilot</h1>
        <p className="text-txt-muted text-sm mt-0.5">Your intelligent executive assistant — ask anything about your business</p>
      </div>

      {/* Chat window */}
      <div className="flex-1 glass-card flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold ${msg.role === 'assistant' ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white' : 'bg-bg-hover border border-border text-txt-secondary'}`}>
                {msg.role === 'assistant' ? 'S' : 'U'}
              </div>
              <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'assistant' ? 'bg-bg-card border border-border text-txt-primary rounded-tl-sm' : 'bg-brand text-white rounded-tr-sm'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">S</div>
              <div className="px-4 py-3 rounded-2xl bg-bg-card border border-border rounded-tl-sm">
                <div className="flex gap-1.5 items-center h-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-txt-muted animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-txt-muted animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-txt-muted animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="px-6 pb-3">
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button key={s} onClick={() => setInput(s)} className="text-xs px-3 py-1.5 rounded-full bg-bg-hover border border-border text-txt-secondary hover:border-brand/50 hover:text-brand transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="px-4 pb-4 border-t border-border pt-4">
          <div className="flex gap-3 items-end">
            <textarea
              value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKey}
              placeholder="Ask your Executive Crew anything..."
              rows={1}
              className="flex-1 resize-none bg-bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-txt-primary placeholder-txt-muted focus:outline-none focus:border-brand/50 transition-colors"
            />
            <button
              onClick={send} disabled={loading || !input.trim()}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white disabled:opacity-40 hover:opacity-90 transition-all flex-shrink-0"
            >
              <svg className="w-4 h-4 rotate-90" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
