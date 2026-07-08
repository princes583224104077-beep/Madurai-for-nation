import React, { useState } from 'react';
import { Concern, ConcernUpdate } from '../types';
import { Card, StatusBadge, PriorityBadge } from './UiComponents';
import {
  Search,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  MessageSquare,
  AlertTriangle,
  FileText,
  ChevronLeft,
  RefreshCw
} from 'lucide-react';

interface ConcernTrackerProps {
  onBack?: () => void;
  initialId?: string;
}

export default function ConcernTracker({ onBack, initialId = '' }: ConcernTrackerProps) {
  const [trackingId, setTrackingId] = useState(initialId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [concern, setConcern] = useState<Concern | null>(null);
  const [updates, setUpdates] = useState<ConcernUpdate[]>([]);

  const handleTrack = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!trackingId.trim()) return;

    setLoading(true);
    setError(null);
    setConcern(null);
    setUpdates([]);

    try {
      const response = await fetch(`/api/concerns/track/${trackingId.trim()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Tracking ID not found.');
      }

      setConcern(data.concern);
      setUpdates(data.updates || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Could not find any registered concern with that Tracking ID.');
    } finally {
      setLoading(false);
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

  // Run automatically if initial ID is provided
  React.useEffect(() => {
    if (initialId) {
      handleTrack();
    }
  }, [initialId]);

  return (
    <div id="concern-tracker-container" className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-950 hover:text-indigo-800 cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" /> Back to Home Page
          </button>
        )}
        <span className="text-xs font-mono text-indigo-800 bg-indigo-50 border border-indigo-100/60 px-2.5 py-1 rounded">
          Public Action Directory
        </span>
      </div>

      {/* Tracker Search Box */}
      <Card className="bg-white border-slate-150 shadow-xs p-6 space-y-4">
        <h3 className="text-xl font-bold font-serif text-indigo-950">
          JanVaani Grievance Tracker
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Elected MPs process thousands of complaints. If you filed a grievance, enter your <strong>JV-XXXXXX</strong> tracking code below to monitor official review timelines, audit responses, and closure statuses.
        </p>

        <form onSubmit={handleTrack} className="flex gap-2.5">
          <div className="relative flex-1">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter tracking ID (e.g. JV-123456)"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:border-indigo-600 focus:bg-white text-sm font-semibold uppercase tracking-wider"
              required
            />
            <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
          </div>
          <button
            type="submit"
            disabled={loading || !trackingId.trim()}
            className="px-5 py-3 bg-indigo-950 text-white hover:bg-indigo-900 rounded-lg font-bold text-sm cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
          >
            {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : 'Track Concern'}
          </button>
        </form>

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-lg text-xs text-rose-800 flex items-start gap-2">
            <AlertTriangle className="h-4.5 w-4.5 text-rose-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
      </Card>

      {/* Tracked Results View */}
      {concern && (
        <div className="space-y-6 animate-fade-in">
          {/* Main Card */}
          <Card className="bg-white border-slate-150 p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-indigo-800 bg-indigo-50 border border-indigo-150 px-2 py-0.5 rounded">
                  {concern.category}
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  ID: {concern.id}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={concern.status} />
                <PriorityBadge priority={concern.priority} />
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-indigo-950">
                {concern.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> Filed {formatDate(concern.createdAt)}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {concern.assemblyConstituency}, {concern.constituency}
                </span>
              </div>
            </div>

            <div className="pt-3">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Grievance Description
              </span>
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                {concern.description}
              </p>
            </div>

            {concern.attachmentNote && (
              <div className="p-3.5 bg-slate-50 border border-slate-150 rounded-lg text-xs text-slate-600 flex items-start gap-2.5">
                <FileText className="h-4.5 w-4.5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-700 font-semibold mb-0.5">Attachment Note</strong>
                  {concern.attachmentNote}
                </div>
              </div>
            )}

            {/* AI Summary report */}
            <div className="p-4 bg-indigo-950 rounded-xl text-white border border-indigo-900 space-y-2">
              <span className="text-[10px] text-indigo-300 font-mono font-bold uppercase flex items-center gap-1 tracking-wider">
                <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                Gemini AI Triage Report
              </span>
              <p className="text-slate-100 text-xs italic font-serif leading-relaxed">
                "{concern.aiSummary}"
              </p>
              <div className="flex flex-wrap gap-1 pt-1.5 border-t border-indigo-900">
                {concern.tags.map((t, i) => (
                  <span key={i} className="text-[9px] font-mono text-indigo-200 bg-indigo-900 px-2 py-0.5 rounded">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </Card>

          {/* Timeline of MP Action Logs */}
          <div className="space-y-4">
            <h4 className="font-bold font-serif text-slate-800 flex items-center gap-2">
              <MessageSquare className="h-4.5 w-4.5 text-indigo-950" />
              Official Resolution Timeline
            </h4>

            {updates.length === 0 ? (
              <Card className="bg-white text-center py-10 text-slate-400 border-slate-100">
                <Clock className="h-8 w-8 mx-auto text-slate-300 mb-2" />
                <p className="text-xs">This grievance is in the queue for triaging. MP team response logs will be published here.</p>
              </Card>
            ) : (
              <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-6">
                {updates.map((update) => (
                  <div key={update.id} className="relative">
                    {/* Circle timeline dot */}
                    <span className="absolute -left-[31px] top-1 bg-indigo-950 border-4 border-white h-4.5 w-4.5 rounded-full shadow-xs"></span>
                    
                    <div className="bg-white border border-slate-150 rounded-xl p-4.5 space-y-2 shadow-2xs">
                      <div className="flex justify-between items-start gap-4 flex-wrap">
                        <div>
                          <span className="font-bold text-xs text-slate-900">{update.mpName}</span>
                          <span className="text-[10px] text-slate-400 block font-mono mt-0.5">{formatDate(update.createdAt)}</span>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-900 rounded">
                          {update.status}
                        </span>
                      </div>
                      <p className="text-slate-600 text-xs italic font-serif leading-relaxed border-t border-slate-50 pt-2">
                        "{update.note}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
