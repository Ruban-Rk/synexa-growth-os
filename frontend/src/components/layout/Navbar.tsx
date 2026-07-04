'use client';

import { useAppStore } from '@/store';

export default function Navbar() {
  const user = useAppStore((state) => state.user);
  const initials = user?.email ? user.email.charAt(0).toUpperCase() : 'U';

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-bg-secondary border-b border-border flex-shrink-0">
      {/* Status indicator */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-400 font-medium">All systems operational</span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notification bell */}
        <button className="relative p-2 rounded-lg text-txt-muted hover:text-txt-primary hover:bg-bg-hover transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-border" />

        {/* User avatar */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs font-medium text-txt-primary truncate max-w-[180px]">{user?.email || 'User'}</div>
            <div className="text-[11px] text-txt-muted">Executive</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}
