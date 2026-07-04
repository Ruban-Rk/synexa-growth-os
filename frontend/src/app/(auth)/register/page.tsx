'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => router.push('/login'), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-brand-muted rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-6 animate-fade-in">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-2xl font-bold text-txt-primary">Synexa</span>
          </div>
          <h1 className="text-3xl font-bold text-txt-primary mb-2">Create account</h1>
          <p className="text-txt-secondary text-sm">Start your AI Business Operating System</p>
        </div>

        <div className="glass-card p-8">
          {success ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-400 text-xl">✓</span>
              </div>
              <p className="text-txt-primary font-semibold mb-1">Account created!</p>
              <p className="text-txt-secondary text-sm">Check your email to confirm. Redirecting to login...</p>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{error}</div>
              )}
              <form onSubmit={handleRegister} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-txt-secondary mb-1.5">Email address</label>
                  <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                    className="w-full px-4 py-3 rounded-lg bg-bg-secondary border border-border text-txt-primary placeholder-txt-muted focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/50 transition-colors text-sm"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-txt-secondary mb-1.5">Password</label>
                  <input
                    type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
                    className="w-full px-4 py-3 rounded-lg bg-bg-secondary border border-border text-txt-primary placeholder-txt-muted focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/50 transition-colors text-sm"
                    placeholder="Min. 6 characters"
                  />
                </div>
                <button
                  type="submit" disabled={loading}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 shadow-lg shadow-indigo-500/20"
                >
                  {loading ? 'Creating account...' : 'Create account'}
                </button>
              </form>
              <p className="mt-6 text-center text-txt-muted text-sm">
                Already have an account?{' '}
                <Link href="/login" className="text-brand-hover hover:underline font-medium">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
