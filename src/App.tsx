import React, { useState, useEffect } from 'react';
import { UserProfile } from './types';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import CitizenDashboard from './components/CitizenDashboard';
import MpDashboard from './components/MpDashboard';

export default function App() {
  const [authMode, setAuthMode] = useState<'landing' | 'auth' | 'app'>('landing');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Raised theme & language state to ensure unified application shell look & feel
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('janvaani_theme') as 'light' | 'dark') || 'light';
  });
  const [language, setLanguage] = useState<'en' | 'ta'>(() => {
    return (localStorage.getItem('janvaani_language') as 'en' | 'ta') || 'en';
  });

  // Check active session on mount
  useEffect(() => {
    const checkSession = async () => {
      const storedToken = localStorage.getItem('janvaani_token');
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${storedToken}` },
        });

        if (response.ok) {
          const data = await response.json();
          setToken(storedToken);
          setUserProfile(data.profile);
          setAuthMode('app');
        } else {
          // stale token, clear it
          localStorage.removeItem('janvaani_token');
        }
      } catch (err) {
        console.error('Failed to restore session:', err);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  // Synchronize document elements to allow modern Tailwind dark mode utility classes
  useEffect(() => {
    localStorage.setItem('janvaani_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark', 'bg-stone-950', 'text-stone-100');
      document.body.classList.remove('bg-ivory', 'text-slate-850');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark', 'bg-stone-950', 'text-stone-100');
      document.body.classList.add('bg-ivory', 'text-slate-850');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('janvaani_language', language);
  }, [language]);

  const handleLogout = () => {
    localStorage.removeItem('janvaani_token');
    setToken(null);
    setUserProfile(null);
    setAuthMode('landing');
  };

  const handleAuthSuccess = (newToken: string, profile: UserProfile) => {
    localStorage.setItem('janvaani_token', newToken);
    setToken(newToken);
    setUserProfile(profile);
    setAuthMode('app');
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center font-serif text-slate-850 transition-colors duration-250 ${theme === 'dark' ? 'bg-stone-950 text-stone-100' : 'bg-ivory text-slate-800'}`}>
        <div className="text-center space-y-4">
          <div className={`inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-r-transparent align-[-0.125em] ${theme === 'dark' ? 'border-[#C89B3C]' : 'border-[#0E5C4B]'}`} role="status"></div>
          <p className="text-sm font-semibold tracking-wide animate-pulse font-sans">Initializing JanVaani Portal...</p>
        </div>
      </div>
    );
  }

  switch (authMode) {
    case 'landing':
      return (
        <LandingPage 
          onEnterAuth={() => setAuthMode('auth')} 
          theme={theme}
          setTheme={setTheme}
          language={language}
          setLanguage={setLanguage}
        />
      );
    case 'auth':
      return (
        <AuthPage
          onAuthSuccess={handleAuthSuccess}
          onBackToLanding={() => setAuthMode('landing')}
          theme={theme}
          language={language}
        />
      );
    case 'app':
      if (userProfile?.role === 'citizen') {
        return (
          <CitizenDashboard
            profile={userProfile}
            token={token!}
            onLogout={handleLogout}
            theme={theme}
            language={language}
          />
        );
      } else if (userProfile?.role === 'mp') {
        return (
          <MpDashboard
            profile={userProfile}
            token={token!}
            onLogout={handleLogout}
            theme={theme}
            language={language}
          />
        );
      } else {
        return (
          <div className={`min-h-screen flex items-center justify-center text-center p-8 ${theme === 'dark' ? 'bg-stone-950 text-stone-100' : 'bg-ivory text-slate-800'}`}>
            <div className="space-y-4 max-w-sm p-6 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-lg">
              <p className="text-rose-600 font-bold font-serif">Error: Role configuration issue.</p>
              <button onClick={handleLogout} className="px-5 py-2.5 bg-[#0E5C4B] text-white rounded-lg text-xs font-bold cursor-pointer hover:bg-[#0E5C4B]/90 transition-all">
                Return to Login
              </button>
            </div>
          </div>
        );
      }
    default:
      return (
        <LandingPage 
          onEnterAuth={() => setAuthMode('auth')} 
          theme={theme}
          setTheme={setTheme}
          language={language}
          setLanguage={setLanguage}
        />
      );
  }
}
