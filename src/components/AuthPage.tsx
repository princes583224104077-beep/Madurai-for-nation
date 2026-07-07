import React, { useState } from 'react';
import { UserRole, UserProfile } from '../types';
import { Card, InputField, PrimaryButton, SecondaryButton } from './UiComponents';
import { Landmark, ArrowRight, User, CheckCircle2, ShieldAlert } from 'lucide-react';

interface AuthPageProps {
  onAuthSuccess: (token: string, profile: UserProfile) => void;
  onBackToLanding: () => void;
  theme?: 'light' | 'dark';
  language?: 'en' | 'ta';
}

export default function AuthPage({ onAuthSuccess, onBackToLanding, theme = 'light', language = 'en' }: AuthPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState<UserRole>('citizen');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [ward, setWard] = useState('Ward 12, Sellur');
  const [constituency, setConstituency] = useState('Madurai Lok Sabha');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const endpoint = isSignUp ? '/api/auth/signup' : '/api/auth/signin';
    const payload = isSignUp
      ? { email, password, name, phone, ward, constituency, role }
      : { email, password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      onAuthSuccess(data.token, data.profile);
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAutofillMP = () => {
    setEmail('mp@maduraimp.in');
    setPassword('password');
    setRole('mp');
    setIsSignUp(false);
    setError(null);
  };

  const handleAutofillCitizen = () => {
    setEmail('citizen1@janvaani.in');
    setPassword('password');
    setRole('citizen');
    setIsSignUp(false);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-ivory">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-full text-indigo-950 mb-4 border border-indigo-100">
          <Landmark className="h-8 w-8" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-serif">
          Madurai MP Citizen Portal
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Official Digital Governance Platform for Madurai Lok Sabha Constituency
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="px-8 py-10 border-slate-200/80 shadow-xs">
          {/* Role selector tab */}
          {!isSignUp && (
            <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
              <button
                type="button"
                className={`flex-1 text-center py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  role === 'citizen'
                    ? 'bg-white text-indigo-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                onClick={() => {
                  setRole('citizen');
                  setError(null);
                }}
              >
                Citizen Portal
              </button>
              <button
                type="button"
                className={`flex-1 text-center py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  role === 'mp'
                    ? 'bg-white text-indigo-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                onClick={() => {
                  setRole('mp');
                  setError(null);
                }}
              >
                MP Action Dashboard
              </button>
            </div>
          )}

          {isSignUp && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900 font-serif">
                Create a Citizen Account
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                MPs are pre-registered. Citizens can sign up to submit and track concerns.
              </p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200/50 rounded-lg text-sm text-rose-800 flex items-start gap-3">
              <ShieldAlert className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <InputField
                  label="Full Name"
                  id="reg-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Amit Sharma"
                  required
                />
                <InputField
                  label="Phone Number"
                  id="reg-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                />
                <div className="mb-4">
                  <label htmlFor="reg-ward" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Ward / Locality in Madurai <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="reg-ward"
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:border-teal-700 focus:bg-white transition-all text-sm cursor-pointer"
                  >
                    <option value="Ward 12, Sellur">Ward 12, Sellur</option>
                    <option value="Ward 22, Goripalayam">Ward 22, Goripalayam</option>
                    <option value="Ward 45, K.K. Nagar">Ward 45, K.K. Nagar</option>
                    <option value="Ward 58, Madurai East">Ward 58, Madurai East</option>
                    <option value="Ward 3, Simmakkal">Ward 3, Simmakkal</option>
                    <option value="Ward 15, Tallakulam">Ward 15, Tallakulam</option>
                    <option value="Ward 8, Anna Nagar">Ward 8, Anna Nagar</option>
                    <option value="Ward 25, Arapalayam">Ward 25, Arapalayam</option>
                    <option value="Ward 32, Kalavasal">Ward 32, Kalavasal</option>
                    <option value="Ward 50, Madurai South">Ward 50, Madurai South</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="reg-constituency" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Constituency
                  </label>
                  <input
                    type="text"
                    id="reg-constituency"
                    value={constituency}
                    disabled
                    className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 text-sm font-semibold"
                  />
                </div>
              </>
            )}

            <InputField
              label="Email Address"
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. citizen1@janvaani.in"
              required
            />

            <InputField
              label="Password"
              id="auth-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <PrimaryButton type="submit" className="w-full justify-center flex items-center gap-2" disabled={loading}>
              {loading ? (
                'Processing...'
              ) : (
                <>
                  {isSignUp ? 'Sign Up' : 'Sign In'} <ArrowRight className="h-4 w-4" />
                </>
              )}
            </PrimaryButton>
          </form>

          {/* Quick autofills for demo convenience */}
          {!isSignUp && (
            <div className="mt-8 pt-6 border-t border-slate-100">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
                Demo Quick Sign-In
              </h4>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleAutofillCitizen}
                  className="flex items-center justify-between p-3 bg-indigo-50/50 hover:bg-indigo-100/50 border border-indigo-100 rounded-lg transition-colors text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <User className="h-4 w-4 text-indigo-700" />
                    <div>
                      <p className="text-xs font-semibold text-indigo-950">Test Citizen</p>
                      <p className="text-[10px] text-indigo-700">citizen1@janvaani.in (pass: password)</p>
                    </div>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-indigo-400 group-hover:text-indigo-600 transition-colors" />
                </button>
                <button
                  type="button"
                  onClick={handleAutofillMP}
                  className="flex items-center justify-between p-3 bg-amber-50/30 hover:bg-amber-100/30 border border-amber-100/60 rounded-lg transition-colors text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <Landmark className="h-4 w-4 text-amber-700" />
                    <div>
                      <p className="text-xs font-semibold text-amber-950">Test Member of Parliament (MP)</p>
                      <p className="text-[10px] text-amber-700">mp@maduraimp.in (pass: password)</p>
                    </div>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-amber-400 group-hover:text-amber-600 transition-colors" />
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 text-center text-sm">
            {isSignUp ? (
              <p className="text-slate-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(false);
                    setRole('citizen');
                    setError(null);
                  }}
                  className="text-indigo-700 hover:underline font-medium cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            ) : (
              role === 'citizen' && (
                <p className="text-slate-600">
                  New citizen here?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(true);
                      setRole('citizen');
                      setError(null);
                    }}
                    className="text-indigo-700 hover:underline font-medium cursor-pointer"
                  >
                    Register here
                  </button>
                </p>
              )
            )}
          </div>

          <div className="mt-4 text-center">
            <SecondaryButton onClick={onBackToLanding} className="py-2 text-xs w-full">
              Back to Landing Page
            </SecondaryButton>
          </div>
        </Card>
      </div>
    </div>
  );
}
