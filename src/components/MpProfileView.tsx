import React from 'react';
import { MPProfile } from '../types';
import { Card, PrimaryButton, SecondaryButton } from './UiComponents';
import {
  User,
  MapPin,
  Award,
  BookOpen,
  Calendar,
  Building,
  Mail,
  Phone,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface MpProfileViewProps {
  mp: MPProfile;
  onBack: () => void;
  onRaiseConcern: () => void;
}

export default function MpProfileView({ mp, onBack, onRaiseConcern }: MpProfileViewProps) {
  // Map party to custom styles
  const getPartyStyles = (party: string) => {
    const p = party.toUpperCase();
    if (p.includes('CPI(M)') || p.includes('COMMUNIST') || p.includes('CPIM')) {
      return {
        bg: 'bg-red-50 border-red-200/60',
        text: 'text-red-800',
        dot: 'bg-red-600',
        badge: 'Communist Party of India (Marxist) [CPI(M)]'
      };
    }
    if (p.includes('BJP') || p.includes('BHARATIYA')) {
      return {
        bg: 'bg-amber-50 border-amber-200/60',
        text: 'text-amber-800',
        dot: 'bg-amber-600',
        badge: 'Bharatiya Janata Party (BJP)'
      };
    }
    if (p.includes('INC') || p.includes('CONGRESS')) {
      return {
        bg: 'bg-sky-50 border-sky-200/60',
        text: 'text-sky-800',
        dot: 'bg-sky-600',
        badge: 'Indian National Congress (INC)'
      };
    }
    if (p.includes('AAP') || p.includes('AAM')) {
      return {
        bg: 'bg-emerald-50 border-emerald-200/60',
        text: 'text-emerald-800',
        dot: 'bg-emerald-600',
        badge: 'Aam Aadmi Party (AAP)'
      };
    }
    return {
      bg: 'bg-slate-50 border-slate-200/60',
      text: 'text-slate-800',
      dot: 'bg-slate-600',
      badge: party
    };
  };

  const partyStyle = getPartyStyles(mp.party);

  return (
    <div id="mp-profile-container" className="space-y-8 animate-fade-in">
      {/* Navigation & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          id="btn-back-to-discovery"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-teal-950 hover:text-teal-800 cursor-pointer transition-colors"
        >
          <ArrowLeft className="h-4.5 w-4.5" /> Back to Madurai Portal
        </button>
        <span className="text-xs font-mono bg-indigo-50 text-indigo-800 border border-indigo-100/60 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
          Constituency Profile
        </span>
      </div>

      {/* Hero Header Section */}
      <div className="bg-white border border-slate-150/80 rounded-2xl overflow-hidden shadow-xs">
        {/* Flag saffron-white-green subtle background banner */}
        <div className="h-2 flex">
          <div className="w-1/3 bg-[#FF9933]"></div>
          <div className="w-1/3 bg-white"></div>
          <div className="w-1/3 bg-[#138808]"></div>
        </div>

        <div className="p-6 sm:p-8 md:p-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* MP Image Card */}
            <div className="w-full md:w-48 h-56 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 relative shrink-0 shadow-xs flex items-center justify-center">
              {mp.photoUrl ? (
                <img
                  src={mp.photoUrl}
                  alt={mp.name}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to avatar if image fails to load
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : null}
              <div className="absolute inset-0 flex items-center justify-center bg-slate-50 text-slate-300">
                <User className="h-16 w-16" />
              </div>
              <div className="absolute top-3 right-3 bg-indigo-950 text-white p-1.5 rounded-lg shadow-sm">
                <ShieldCheck className="h-4 w-4" />
              </div>
            </div>

            {/* MP Information */}
            <div className="space-y-4 flex-1">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-full border ${partyStyle.bg} ${partyStyle.text}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${partyStyle.dot}`}></span>
                    {partyStyle.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {mp.district}, {mp.state}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold font-serif text-indigo-950 leading-tight">
                  {mp.name}
                </h2>
                <p className="text-sm font-semibold text-amber-700 font-mono uppercase tracking-wider">
                  Member of Parliament (Lok Sabha) · {mp.constituency}
                </p>
              </div>

              {/* Biography excerpt */}
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line border-t border-slate-100 pt-3">
                {mp.biography}
              </p>

              {/* Contact Details Panel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/50 p-4 border border-slate-100 rounded-xl text-xs text-slate-600">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-white border border-slate-200/60 rounded-lg text-slate-500">
                    <Mail className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <span className="block text-slate-400 font-medium">Official Email</span>
                    <a href={`mailto:${mp.email}`} className="font-semibold text-slate-800 hover:underline">{mp.email}</a>
                  </div>
                </div>
                {mp.phone && (
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-white border border-slate-200/60 rounded-lg text-slate-500">
                      <Phone className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <span className="block text-slate-400 font-medium">Delhi Office / Residence</span>
                      <span className="font-semibold text-slate-800">{mp.phone}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Highlight Action Block */}
              <div className="pt-2">
                <button
                  id="btn-raise-concern-profile"
                  onClick={onRaiseConcern}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-950 hover:bg-indigo-900 text-white font-bold rounded-xl cursor-pointer shadow-md hover:shadow-lg transition-all text-sm group"
                >
                  Raise a Concern with {mp.name} <ArrowLeft className="h-4.5 w-4.5 rotate-180 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid: Committees, Recent Activities, Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 1. Committees Served */}
        <Card className="bg-white border-slate-150/80 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <div className="p-2 bg-indigo-50 text-indigo-950 rounded-lg">
                <Building className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base font-serif text-indigo-950">
                Committees Served
              </h3>
            </div>
            
            <ul className="space-y-3.5">
              {mp.committees.map((committee, idx) => (
                <li key={idx} className="flex gap-2.5 items-start text-xs text-slate-600">
                  <Award className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{committee}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* 2. Recent Parliamentary Activities */}
        <Card className="bg-white border-slate-150/80 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <div className="p-2 bg-indigo-50 text-indigo-950 rounded-lg">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base font-serif text-indigo-950">
                Recent Activities
              </h3>
            </div>

            <ul className="space-y-4">
              {mp.recentActivities.map((act, idx) => (
                <li key={idx} className="relative pl-5 text-xs text-slate-600 leading-relaxed border-l border-slate-100 pb-0.5">
                  <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-indigo-950 border border-white"></span>
                  <p className="text-slate-600 text-xs leading-relaxed">{act}</p>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* 3. Ongoing Development Projects */}
        <Card className="bg-white border-slate-150/80 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <div className="p-2 bg-indigo-50 text-indigo-950 rounded-lg">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base font-serif text-indigo-950">
                Ongoing Development
              </h3>
            </div>

            <ul className="space-y-4">
              {mp.ongoingProjects.map((proj, idx) => (
                <li key={idx} className="bg-slate-50/70 border border-slate-100 rounded-xl p-3 space-y-1.5 text-xs">
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-bold text-indigo-950 block">{proj.title}</span>
                    <span className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded ${
                      proj.status.includes('Completed') 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-150' 
                        : 'bg-amber-50 text-amber-700 border border-amber-150'
                    }`}>
                      {proj.status}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px] leading-relaxed">{proj.description}</p>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 border-t border-slate-100/60 pt-1.5 mt-1">
                    <span>Budget: {proj.budget}</span>
                    <span>Status: {proj.status}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card>

      </div>
    </div>
  );
}
