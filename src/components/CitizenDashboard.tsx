import React, { useState, useEffect } from 'react';
import { Concern, ConcernUpdate, UserProfile, ConcernCategory } from '../types';
import { Card, StatusBadge, PriorityBadge, PrimaryButton, SecondaryButton, InputField } from './UiComponents';
import { MapPin, Plus, FileText, Calendar, Clock, AlertTriangle, LogOut, ChevronRight, CheckCircle2, ChevronLeft, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';

interface CitizenDashboardProps {
  profile: UserProfile;
  token: string;
  onLogout: () => void;
  theme?: 'light' | 'dark';
  language?: 'en' | 'ta';
}

export default function CitizenDashboard({ profile, token, onLogout, theme = 'light', language = 'en' }: CitizenDashboardProps) {
  const [concerns, setConcerns] = useState<Concern[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedConcern, setSelectedConcern] = useState<Concern | null>(null);
  const [selectedConcernUpdates, setSelectedConcernUpdates] = useState<ConcernUpdate[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [view, setView] = useState<'list' | 'create'>('list');

  // New concern form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ward, setWard] = useState(profile.ward || '');
  const [attachmentNote, setAttachmentNote] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Fetch concerns
  const fetchConcerns = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/concerns', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setConcerns(data);
      }
    } catch (err) {
      console.error('Error fetching concerns:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConcerns();
  }, [token]);

  // Fetch specific concern details & updates
  const handleViewConcern = async (concern: Concern) => {
    setLoadingDetails(true);
    setSelectedConcern(concern);
    try {
      const response = await fetch(`/api/concerns/${concern.id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setSelectedConcern(data.concern);
        setSelectedConcernUpdates(data.updates);
      }
    } catch (err) {
      console.error('Error fetching concern details:', err);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleCloseDetails = () => {
    setSelectedConcern(null);
    setSelectedConcernUpdates([]);
  };

  // Submit Concern
  const handleSubmitConcern = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Title and description are required.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/concerns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          ward,
          constituency: profile.constituency,
          attachmentNote,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit concern');
      }

      // Success! Add to list and go back
      setConcerns([data, ...concerns]);
      setView('list');
      // Reset form
      setTitle('');
      setDescription('');
      setAttachmentNote('');
      
      // Auto open details of the submitted concern to show the AI classification
      handleViewConcern(data);
    } catch (err: any) {
      setError(err.message || 'Failed to submit concern. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Dashboard Header */}
      <nav className="bg-white border-b border-slate-100 shadow-xs sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold font-serif text-teal-950">Madurai MP Citizen Portal</span>
              <span className="ml-3 px-2 py-0.5 text-[10px] uppercase font-semibold text-teal-800 bg-teal-50 rounded-full border border-teal-100/60">
                Citizen Account
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">{profile.name}</p>
                <p className="text-xs text-slate-500">{profile.ward} · {profile.constituency}</p>
              </div>
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors border border-rose-100/50 cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" /> Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Detail Modal Overlay (Slide over drawer style) */}
        {selectedConcern && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex justify-end z-40 transition-opacity">
            <div className="w-full max-w-2xl bg-ivory h-full shadow-2xl flex flex-col animate-slide-in overflow-y-auto">
              {/* Drawer Header */}
              <div className="bg-white border-b border-slate-100 px-6 py-5 flex items-center justify-between sticky top-0 z-10 shadow-xs">
                <button
                  onClick={handleCloseDetails}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="h-5 w-5" /> Back to My Submissions
                </button>
                <StatusBadge status={selectedConcern.status} />
              </div>

              {/* Drawer Body */}
              <div className="p-6 space-y-6 flex-1">
                {/* Concern Core Info */}
                <Card className="border-slate-200/60 bg-white">
                  <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
                    <span className="text-xs font-mono font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-sm">
                      {selectedConcern.category}
                    </span>
                    <PriorityBadge priority={selectedConcern.priority} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 font-serif leading-snug">
                    {selectedConcern.title}
                  </h3>
                  
                  <p className="text-sm text-slate-500 mt-2 flex items-center gap-1.5 font-mono">
                    <Calendar className="h-3.5 w-3.5" /> Filed on {formatDate(selectedConcern.createdAt)}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</h4>
                    <p className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">
                      {selectedConcern.description}
                    </p>
                  </div>

                  {selectedConcern.attachmentNote && (
                    <div className="mt-4 p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs text-slate-600 flex items-start gap-2">
                      <FileText className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold block text-slate-700">Attachment Description</span>
                        {selectedConcern.attachmentNote}
                      </div>
                    </div>
                  )}
                </Card>

                {/* AI Classifier Summary Panel */}
                <div className="bg-linear-to-r from-indigo-900 to-slate-900 rounded-xl p-5 text-white border border-indigo-800 shadow-md">
                  <div className="flex items-center gap-2 text-indigo-200 text-xs font-semibold uppercase tracking-wider mb-3">
                    <Sparkles className="h-4 w-4 text-indigo-400" />
                    AI-Assisted Classification Report (Gemini Flash)
                  </div>
                  <p className="text-slate-100 text-sm font-serif italic mb-4 leading-relaxed">
                    "{selectedConcern.aiSummary}"
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-indigo-850">
                    {selectedConcern.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-mono font-semibold bg-indigo-800/60 border border-indigo-750 px-2 py-0.5 rounded-full text-indigo-100">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Timeline of official responses */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-800 font-serif flex items-center gap-2">
                    <MessageSquare className="h-4.5 w-4.5 text-indigo-950" />
                    MP Action & Updates Timeline
                  </h4>
                  
                  {selectedConcernUpdates.length === 0 ? (
                    <div className="text-center py-8 bg-white border border-dashed border-slate-200 rounded-xl text-slate-500">
                      <Clock className="h-8 w-8 mx-auto text-slate-300 mb-2" />
                      <p className="text-xs">No status logs recorded yet. The representative's team will post notes here during triage.</p>
                    </div>
                  ) : (
                    <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-6">
                      {selectedConcernUpdates.map((update) => (
                        <div key={update.id} className="relative">
                          {/* Dot */}
                          <span className="absolute -left-[31px] top-1 bg-indigo-900 border-4 border-white h-4.5 w-4.5 rounded-full shadow-xs"></span>
                          
                          <div className="bg-white border border-slate-150/80 rounded-lg p-4">
                            <div className="flex justify-between items-start gap-4 mb-2 flex-wrap">
                              <div>
                                <span className="font-semibold text-xs text-slate-900">{update.mpName}</span>
                                <span className="text-[10px] text-slate-500 block">{formatDate(update.createdAt)}</span>
                              </div>
                              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-slate-50 text-indigo-900 rounded border border-slate-200">
                                Status: {update.status}
                              </span>
                            </div>
                            <p className="text-slate-700 text-sm italic leading-relaxed">
                              "{update.note}"
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View content switch */}
        {view === 'list' ? (
          <div className="space-y-6">
            
            {/* Citizen Welcome Card */}
            <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 font-serif leading-tight">
                  Good Morning, {profile.name} 👋
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                  Welcome to Madurai Citizen Connect. You have:
                </p>
                
                {/* Stats indicators requested by Phase 1 Part 2 */}
                <div className="grid grid-cols-3 gap-2 max-w-md mt-4">
                  <div className="bg-red-50 border border-red-100 rounded-lg p-2.5 text-center">
                    <span className="block text-lg font-bold font-mono text-red-900">
                      {concerns.filter(c => c.status === 'Submitted' || c.status === 'In Progress').length}
                    </span>
                    <span className="text-[9px] font-bold text-stone-500 uppercase tracking-wider block">Active</span>
                  </div>
                  <div className="bg-amber-50 border border-amber-100 rounded-lg p-2.5 text-center">
                    <span className="block text-lg font-bold font-mono text-amber-850">
                      {concerns.filter(c => c.status === 'Under Review').length}
                    </span>
                    <span className="text-[9px] font-bold text-stone-500 uppercase tracking-wider block">Under Review</span>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-2.5 text-center">
                    <span className="block text-lg font-bold font-mono text-emerald-900">
                      {concerns.filter(c => c.status === 'Resolved').length}
                    </span>
                    <span className="text-[9px] font-bold text-stone-500 uppercase tracking-wider block">Resolved</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 text-xs text-slate-500 font-mono">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-indigo-600" />
                    Locality: {profile.ward}
                  </span>
                  <span>Constituency: <strong className="text-indigo-950">{profile.constituency}</strong></span>
                </div>
              </div>
              <PrimaryButton onClick={() => setView('create')} className="inline-flex items-center gap-2 self-start md:self-center shrink-0">
                <Plus className="h-4 w-4" /> Submit a New Concern
              </PrimaryButton>
            </div>

            {/* List and Statistics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Submissions List Column */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-bold font-serif text-slate-900">
                  My Submissions ({concerns.length})
                </h3>

                {loading ? (
                  <div className="text-center py-12 bg-white rounded-xl border border-slate-100">
                    <p className="text-slate-500 text-sm animate-pulse">Loading grievances...</p>
                  </div>
                ) : concerns.length === 0 ? (
                  <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-xl">
                    <FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <h4 className="text-slate-800 font-bold font-serif text-base">No concerns filed yet</h4>
                    <p className="text-slate-500 text-sm max-w-sm mx-auto mt-1">
                      Fill out the simple concern submission form to flag an issue like potholes, water-cuts, or broken streetlights to your MP.
                    </p>
                    <PrimaryButton onClick={() => setView('create')} className="mt-4 text-xs">
                      Submit Your First Concern
                    </PrimaryButton>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {concerns.map((concern) => (
                      <div
                        key={concern.id}
                        onClick={() => handleViewConcern(concern)}
                        className="bg-white border border-slate-100/80 hover:border-indigo-200 rounded-xl p-5 shadow-xs hover:shadow-sm cursor-pointer transition-all flex justify-between items-start gap-4"
                      >
                        <div className="space-y-2 flex-1 min-w-0">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-[10px] font-mono font-medium text-indigo-700 bg-indigo-50 border border-indigo-100/40 px-2 py-0.5 rounded">
                              {concern.category}
                            </span>
                            <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                              <Calendar className="h-3 w-3" /> {new Date(concern.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                          <h4 className="font-bold font-serif text-slate-900 text-base leading-snug hover:text-indigo-950 truncate">
                            {concern.title}
                          </h4>
                          <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                            {concern.description}
                          </p>
                          <div className="pt-2 flex items-center gap-2 text-[10px] font-mono text-slate-500">
                            <MapPin className="h-3 w-3 text-slate-400" /> {concern.ward}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <StatusBadge status={concern.status} />
                          <ChevronRight className="h-5 w-5 text-slate-300" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar Help / FAQ panel */}
              <div className="space-y-6">
                <Card className="bg-white border-slate-100">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 font-sans">
                    Citizen Guidelines
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <span className="p-1 bg-indigo-50 text-indigo-700 rounded h-fit shrink-0 mt-0.5">
                        <Sparkles className="h-4 w-4" />
                      </span>
                      <div>
                        <h5 className="font-semibold text-xs text-slate-900">AI-assisted Classification</h5>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                          Your submission is categorized automatically by Gemini Flash AI, reducing MP manual classification and routing it to the right squad instantly.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="p-1 bg-emerald-50 text-emerald-700 rounded h-fit shrink-0 mt-0.5">
                        <CheckCircle2 className="h-4 w-4" />
                      </span>
                      <div>
                        <h5 className="font-semibold text-xs text-slate-900">Track Representative Response</h5>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                          Once an MP team reviews, any official updates, notes, and progress logs are visible in your concern detail panel.
                        </p>
                      </div>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>

          </div>
        ) : (
          /* Create Concern View */
          <div className="max-w-2xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={() => setView('list')}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" /> Back to My Submissions
              </button>
              <span className="text-xs font-mono text-slate-500">Form: Concern Submission</span>
            </div>

            <Card className="px-8 py-10 bg-white">
              <div className="mb-6 border-b border-slate-100 pb-4">
                <h3 className="text-2xl font-bold text-slate-900 font-serif">
                  Report a Constituency Concern
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Draft the grievance. The JanVaani AI will suggest categories, map urgency signals, and summarize issues for MP review.
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-lg text-xs text-rose-800 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-rose-600 mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmitConcern} className="space-y-6">
                <InputField
                  label="Concern Title"
                  id="concern-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Chronic sewer water backup outside block school entrance"
                  required
                />

                <div className="mb-4">
                  <label htmlFor="concern-description" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Detailed Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="concern-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    placeholder="Provide full details: exact location, duration of the issue, who it affects, and any prior complaints made..."
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-indigo-600 focus:bg-white transition-all text-sm leading-relaxed"
                  />
                  <p className="text-[10px] text-indigo-700 mt-1.5 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> JanVaani AI will analyze your description text to tag priority and taxonomy category.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="concern-ward" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Ward / Locality in Madurai <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="concern-ward"
                      value={ward}
                      onChange={(e) => setWard(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-hidden focus:border-teal-700 focus:bg-white transition-all cursor-pointer font-medium"
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
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Constituency
                    </label>
                    <input
                      type="text"
                      disabled
                      value={profile.constituency}
                      className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 text-sm cursor-not-allowed font-medium"
                    />
                  </div>
                </div>

                <InputField
                  label="Attachment Note (Optional)"
                  id="concern-attachment"
                  value={attachmentNote}
                  onChange={(e) => setAttachmentNote(e.target.value)}
                  placeholder="e.g. Photo of broken transformer and spilling oil submitted"
                />

                <div className="flex gap-4 pt-4 border-t border-slate-100 justify-end">
                  <SecondaryButton onClick={() => setView('list')} disabled={submitting}>
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton type="submit" disabled={submitting} className="flex items-center gap-2">
                    {submitting ? 'Analyzing & Submitting...' : 'Submit Concern'} <ArrowRight className="h-4 w-4" />
                  </PrimaryButton>
                </div>
              </form>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
