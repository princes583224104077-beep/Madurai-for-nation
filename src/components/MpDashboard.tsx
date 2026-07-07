import React, { useState, useEffect } from 'react';
import { Concern, ConcernUpdate, UserProfile, ConcernStatus, ConcernCategory } from '../types';
import { Card, StatusBadge, PriorityBadge, PrimaryButton, SecondaryButton, InputField } from './UiComponents';
import {
  Inbox,
  Filter,
  Layers,
  ArrowUpDown,
  FileText,
  Clock,
  User,
  MapPin,
  Calendar,
  Sparkles,
  Phone,
  Mail,
  Send,
  CheckSquare,
  Square,
  Edit3,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  LogOut,
  AlertTriangle,
  Flame,
  ArrowRight
} from 'lucide-react';

interface MpDashboardProps {
  profile: UserProfile;
  token: string;
  onLogout: () => void;
  theme?: 'light' | 'dark';
  language?: 'en' | 'ta';
}

export default function MpDashboard({ profile, token, onLogout, theme = 'light', language = 'en' }: MpDashboardProps) {
  const [concerns, setConcerns] = useState<Concern[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);
  
  // Navigation
  const [activeTab, setActiveTab] = useState<'inbox' | 'analytics'>('inbox');
  
  // Filters
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterUrgency, setFilterUrgency] = useState<string>('All');
  const [filterWard, setFilterWard] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'priority' | 'newest' | 'oldest'>('priority');

  // Selection & Details
  const [selectedConcern, setSelectedConcern] = useState<Concern | null>(null);
  const [selectedConcernUpdates, setSelectedConcernUpdates] = useState<ConcernUpdate[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);
  
  // Update fields
  const [newStatus, setNewStatus] = useState<ConcernStatus>('Under Review');
  const [mpNote, setMpNote] = useState('');
  const [visibleToCitizen, setVisibleToCitizen] = useState(true);
  const [updatingConcern, setUpdatingConcern] = useState(false);

  // Bulk action fields
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkStatus, setBulkStatus] = useState<string>('');
  const [bulkCategory, setBulkCategory] = useState<string>('');
  const [bulkUpdating, setBulkUpdating] = useState(false);

  // Load Inbox
  const fetchInbox = async () => {
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
      console.error('Error loading MP inbox:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load Analytics
  const fetchAnalytics = async () => {
    setLoadingAnalytics(true);
    try {
      const response = await fetch('/api/analytics', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (err) {
      console.error('Error loading MP analytics:', err);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  useEffect(() => {
    fetchInbox();
    fetchAnalytics();
  }, [token]);

  // View specific concern
  const handleViewConcern = async (concern: Concern) => {
    setLoadingDetails(true);
    setSelectedConcern(concern);
    // Sync default state
    setNewStatus(concern.status);
    setMpNote('');
    setVisibleToCitizen(true);

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
      console.error('Error loading concern details:', err);
    } finally {
      setLoadingDetails(false);
    }
  };

  // Submit Official Response/Status Update
  const handleAddUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConcern || !mpNote.trim()) return;

    setUpdatingConcern(true);
    try {
      const response = await fetch(`/api/concerns/${selectedConcern.id}/updates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: newStatus,
          note: mpNote,
          visibleToCitizen
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Update concern in local list
        setConcerns(concerns.map(c => c.id === selectedConcern.id ? data.concern : c));
        
        // Update selected concern and updates list
        setSelectedConcern(data.concern);
        setSelectedConcernUpdates([data.update, ...selectedConcernUpdates]);
        
        setMpNote('');
        
        // Refresh analytics in background
        fetchAnalytics();
      }
    } catch (err) {
      console.error('Error posting update:', err);
    } finally {
      setUpdatingConcern(false);
    }
  };

  // Handle individual selection for bulk operations
  const handleToggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent opening details
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSelectAll = (filteredConcerns: Concern[]) => {
    const filteredIds = filteredConcerns.map(c => c.id);
    const allSelected = filteredIds.every(id => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds(selectedIds.filter(id => !filteredIds.includes(id)));
    } else {
      setSelectedIds(Array.from(new Set([...selectedIds, ...filteredIds])));
    }
  };

  // Execute Bulk Action
  const handleBulkUpdate = async () => {
    if (selectedIds.length === 0 || (!bulkStatus && !bulkCategory)) return;

    setBulkUpdating(true);
    try {
      const response = await fetch('/api/concerns/bulk-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          concernIds: selectedIds,
          status: bulkStatus || undefined,
          category: bulkCategory || undefined
        })
      });

      if (response.ok) {
        const data = await response.json();
        // Success
        setSelectedIds([]);
        setBulkStatus('');
        setBulkCategory('');
        
        // Refresh inbox and analytics
        await fetchInbox();
        await fetchAnalytics();
        
        if (selectedConcern && selectedIds.includes(selectedConcern.id)) {
          // Re-fetch active selected detail
          const detailRes = await fetch(`/api/concerns/${selectedConcern.id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (detailRes.ok) {
            const detailData = await detailRes.json();
            setSelectedConcern(detailData.concern);
            setSelectedConcernUpdates(detailData.updates);
          }
        }
      }
    } catch (e) {
      console.error('Error running bulk update:', e);
    } finally {
      setBulkUpdating(false);
    }
  };

  // Priority queue calculation: Score = Priority_Score + Age_Weight
  // High Priority = 15 points, Medium = 8 points, Low = 2 points
  // Age weight = days elapsed * 0.5 points
  const getPriorityScore = (c: Concern) => {
    let priorityScore = 8;
    const pri = c.priority || 'Medium';
    if (pri === 'High') priorityScore = 15;
    if (pri === 'Low') priorityScore = 2;

    const daysElapsed = (Date.now() - new Date(c.createdAt).getTime()) / (1000 * 60 * 60 * 24);
    const ageWeight = Math.min(daysElapsed * 0.5, 10); // cap age score at 10 points

    // Boost unresolved statuses slightly so they sit on top of Resolved
    let statusBoost = 5;
    if (c.status === 'Resolved') statusBoost = -15;

    return priorityScore + ageWeight + statusBoost;
  };

  // Unique lists for filtering
  const wards = Array.from(new Set(concerns.map(c => c.ward)));
  const categories: ConcernCategory[] = [
    'Roads',
    'Water Supply',
    'Electricity',
    'Healthcare',
    'Education',
    'Public Transport',
    'Sanitation',
    "Women's Safety",
    'Public Welfare',
    'Others'
  ];

  // Apply filters and sorting
  const filteredConcerns = concerns
    .filter(c => {
      if (filterCategory !== 'All' && c.category !== filterCategory) return false;
      if (filterStatus !== 'All' && c.status !== filterStatus) return false;
      if (filterUrgency !== 'All' && c.priority !== filterUrgency) return false;
      if (filterWard !== 'All' && c.ward !== filterWard) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === 'priority') {
        return getPriorityScore(b) - getPriorityScore(a);
      }
      if (sortOrder === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortOrder === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return 0;
    });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-100 shadow-xs sticky top-0 z-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold font-serif text-teal-950">Madurai MP Action Portal</span>
              <span className="ml-3 px-2 py-0.5 text-[10px] uppercase font-semibold text-amber-700 bg-amber-50 rounded-full border border-amber-100/60 flex items-center gap-1">
                <Layers className="h-3 w-3" /> MP Triage
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">{profile.name}</p>
                <p className="text-xs text-slate-500">MP for {profile.constituency}</p>
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

      {/* Subnav Tabs */}
      <div className="bg-slate-100/60 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-6">
            <button
              onClick={() => setActiveTab('inbox')}
              className={`py-3.5 px-1 border-b-2 font-medium text-sm flex items-center gap-2 cursor-pointer transition-all ${
                activeTab === 'inbox'
                  ? 'border-indigo-950 text-indigo-950 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Inbox className="h-4.5 w-4.5" />
              Grievance Inbox
              <span className="bg-indigo-950 text-white text-xs px-2 py-0.5 rounded-full font-mono">
                {concerns.filter(c => c.status !== 'Resolved' && c.status !== 'Closed').length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-3.5 px-1 border-b-2 font-medium text-sm flex items-center gap-2 cursor-pointer transition-all ${
                activeTab === 'analytics'
                  ? 'border-indigo-950 text-indigo-950 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <BarChart3 className="h-4.5 w-4.5" />
              Constituency Analytics
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Concern Detail Overlay Drawer */}
        {selectedConcern && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex justify-end z-40">
            <div className="w-full max-w-2xl bg-ivory h-full shadow-2xl flex flex-col animate-slide-in overflow-y-auto">
              {/* Drawer Header */}
              <div className="bg-white border-b border-slate-100 px-6 py-5 flex items-center justify-between sticky top-0 z-10 shadow-xs">
                <button
                  onClick={() => setSelectedConcern(null)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="h-5 w-5" /> Close Details
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-400 bg-slate-50 border px-2 py-1 rounded">
                    Score: {getPriorityScore(selectedConcern).toFixed(1)}
                  </span>
                  <StatusBadge status={selectedConcern.status} />
                </div>
              </div>

              {/* Drawer Body */}
              <div className="p-6 space-y-6 flex-1">
                
                {/* Core Complaint Details */}
                <Card className="border-slate-200/60 bg-white">
                  <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
                    <span className="text-xs font-mono font-medium text-indigo-700 bg-indigo-50 border border-indigo-150 px-2.5 py-1 rounded-sm">
                      {selectedConcern.category}
                    </span>
                    <PriorityBadge priority={selectedConcern.priority} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 font-serif leading-snug">
                    {selectedConcern.title}
                  </h3>
                  
                  <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5 font-mono">
                    <Calendar className="h-3.5 w-3.5" /> Received {formatDate(selectedConcern.createdAt)}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Complaint Description</h4>
                    <p className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">
                      {selectedConcern.description}
                    </p>
                  </div>

                  {selectedConcern.attachmentNote && (
                    <div className="mt-4 p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs text-slate-600 flex items-start gap-2">
                      <FileText className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold block text-slate-700">Citizen Attachment Note</span>
                        {selectedConcern.attachmentNote}
                      </div>
                    </div>
                  )}
                </Card>

                {/* Citizen Information Card */}
                <Card className="border-slate-150 bg-white p-5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Citizen Contact Info</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-slate-100 rounded-md text-slate-600">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 leading-none">{selectedConcern.citizenName}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Locality: {selectedConcern.ward}</p>
                      </div>
                    </div>
                    <div className="space-y-1 text-xs text-slate-600">
                      <p className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-slate-400" /> {selectedConcern.citizenEmail}
                      </p>
                      {selectedConcern.citizenPhone && (
                        <p className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-slate-400" /> {selectedConcern.citizenPhone}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>

                {/* AI Classifier Summary Panel */}
                <div className="bg-indigo-950 rounded-xl p-5 text-white border border-indigo-900 shadow-md">
                  <div className="flex items-center gap-2 text-indigo-200 text-xs font-semibold uppercase tracking-wider mb-2.5">
                    <Sparkles className="h-4 w-4 text-indigo-400" />
                    AI Classifier Detail (Gemini Flash Report)
                  </div>
                  <p className="text-slate-100 text-sm font-serif italic mb-4 leading-relaxed">
                    "{selectedConcern.aiSummary}"
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-indigo-900">
                    {selectedConcern.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-mono font-semibold bg-indigo-900/80 border border-indigo-850 px-2 py-0.5 rounded-full text-indigo-100">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Response / Update Form */}
                <Card className="border-indigo-100 bg-white/70 p-6">
                  <h4 className="text-sm font-bold text-slate-900 font-serif mb-4 flex items-center gap-1.5">
                    <Edit3 className="h-4 w-4 text-indigo-950" /> Add Official Response & Update Status
                  </h4>
                  <form onSubmit={handleAddUpdate} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Update Status To</label>
                        <select
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value as ConcernStatus)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-hidden focus:border-indigo-600 cursor-pointer font-medium"
                        >
                          <option value="Submitted">Submitted</option>
                          <option value="Under Review">Under Review</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </div>
                      <div className="flex items-end pb-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={visibleToCitizen}
                            onChange={(e) => setVisibleToCitizen(e.target.checked)}
                            className="h-4.5 w-4.5 rounded border-slate-300 text-indigo-950 focus:ring-indigo-900 cursor-pointer"
                          />
                          Show this update to the citizen
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Official Response Note</label>
                      <textarea
                        rows={4}
                        value={mpNote}
                        onChange={(e) => setMpNote(e.target.value)}
                        placeholder="Draft the message explaining what steps are being taken, municipal orders placed, or inspection outcomes..."
                        required
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-hidden focus:border-indigo-600 leading-relaxed"
                      />
                    </div>

                    <PrimaryButton type="submit" disabled={updatingConcern || !mpNote.trim()} className="w-full justify-center flex items-center gap-2 py-2">
                      <Send className="h-4 w-4" /> {updatingConcern ? 'Posting update...' : 'Submit Action Log'}
                    </PrimaryButton>
                  </form>
                </Card>

                {/* Timeline of Updates */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-800 font-serif">Action History</h4>
                  {selectedConcernUpdates.length === 0 ? (
                    <p className="text-xs text-slate-400 italic text-center py-4">No historical status updates on record.</p>
                  ) : (
                    <div className="relative border-l border-slate-200 ml-4 pl-5 space-y-4">
                      {selectedConcernUpdates.map((update) => (
                        <div key={update.id} className="relative">
                          <span className="absolute -left-[25px] top-1 bg-slate-400 border-2 border-white h-2.5 w-2.5 rounded-full"></span>
                          <div className="text-xs">
                            <div className="flex justify-between text-slate-400 font-mono">
                              <span>{formatDate(update.createdAt)}</span>
                              <span>{!update.visibleToCitizen && '🔒 Internal Log'}</span>
                            </div>
                            <p className="mt-1 font-semibold text-slate-800">Status set to "{update.status}"</p>
                            <p className="text-slate-600 mt-1 italic font-serif">"{update.note}"</p>
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

        {/* Dashboard Panels */}
        {activeTab === 'inbox' ? (
          <div className="space-y-6">
            
            {/* Inbox Quick Stats & Welcome */}
            <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-serif">
                  Representative Action Center — {profile.constituency}
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                  Manage citizen grievances, apply bulk action updates, override AI classifications, and communicate progress directly with voters.
                </p>
              </div>
              <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                <button
                  onClick={fetchInbox}
                  className="p-2 bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 border border-slate-200/50 hover:bg-slate-200/60 transition-all cursor-pointer flex items-center gap-1 text-xs"
                >
                  <RefreshCw className="h-4 w-4" /> Refresh Inbox
                </button>
              </div>
            </div>

            {/* Filter and Control Bar */}
            <Card className="p-4 bg-white border-slate-200/60 shadow-xs space-y-4">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700 text-sm font-semibold">
                  <Filter className="h-4 w-4 text-indigo-950" /> Filter Concerns
                </div>
                
                {/* Sorting options */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-500 flex items-center gap-1"><ArrowUpDown className="h-3.5 w-3.5" /> Sort Order:</span>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as any)}
                    className="px-2 py-1 bg-slate-100 border border-slate-200/80 rounded text-slate-700 font-medium cursor-pointer"
                  >
                    <option value="priority">🔥 Priority Score (AI + Age)</option>
                    <option value="newest">🗓️ Newest Received</option>
                    <option value="oldest">⏳ Oldest Received</option>
                  </select>
                </div>
              </div>

              {/* Filters grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-500 mb-1">Taxonomy Category</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-md text-slate-700 cursor-pointer"
                  >
                    <option value="All">All Categories</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-500 mb-1">Status</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-md text-slate-700 cursor-pointer"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Under Review">Under Review</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-500 mb-1">Priority</label>
                  <select
                    value={filterUrgency}
                    onChange={(e) => setFilterUrgency(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-md text-slate-700 cursor-pointer"
                  >
                    <option value="All">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-500 mb-1">Ward / Locality</label>
                  <select
                    value={filterWard}
                    onChange={(e) => setFilterWard(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-md text-slate-700 cursor-pointer"
                  >
                    <option value="All">All Wards</option>
                    {wards.map(w => <option key={w} value={w}>{w}</option>)}
                  </select>
                </div>
              </div>
            </Card>

            {/* Bulk actions and Inbox list */}
            <div className="space-y-3">
              <div className="flex justify-between items-center px-2 flex-wrap gap-3">
                <div className="text-xs text-slate-500 font-mono">
                  Showing <strong>{filteredConcerns.length}</strong> of {concerns.length} concerns
                </div>
                
                {/* Bulk Actions Console */}
                {selectedIds.length > 0 && (
                  <div className="bg-amber-50 border border-amber-200/60 rounded-lg px-4 py-2 flex items-center gap-3 animate-fade-in text-xs text-amber-900 font-medium">
                    <span><strong>{selectedIds.length}</strong> selected for bulk update</span>
                    
                    <div className="flex items-center gap-2">
                      <select
                        value={bulkStatus}
                        onChange={(e) => setBulkStatus(e.target.value)}
                        className="p-1.5 bg-white border border-amber-200 rounded text-xs cursor-pointer text-slate-700"
                      >
                        <option value="">Set Status</option>
                        <option value="Submitted">Submitted</option>
                        <option value="Under Review">Under Review</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>

                      <select
                        value={bulkCategory}
                        onChange={(e) => setBulkCategory(e.target.value)}
                        className="p-1.5 bg-white border border-amber-200 rounded text-xs cursor-pointer text-slate-700"
                      >
                        <option value="">Set Category</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>

                      <button
                        onClick={handleBulkUpdate}
                        disabled={bulkUpdating || (!bulkStatus && !bulkCategory)}
                        className="px-3 py-1.5 bg-indigo-950 text-white font-bold rounded hover:bg-indigo-900 cursor-pointer disabled:opacity-50"
                      >
                        {bulkUpdating ? 'Applying...' : 'Apply Bulk Action'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {loading ? (
                <div className="text-center py-16 bg-white rounded-xl border border-slate-100">
                  <p className="text-slate-500 text-sm animate-pulse">Loading grievance queue...</p>
                </div>
              ) : filteredConcerns.length === 0 ? (
                <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-xl">
                  <Inbox className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                  <h4 className="text-slate-800 font-bold font-serif text-base">No matching concerns</h4>
                  <p className="text-slate-500 text-sm max-w-sm mx-auto mt-1">
                    Try relaxing your filters or changing categories to inspect more complaints.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  
                  {/* Select All Checkbox Header */}
                  <div className="flex items-center px-4 py-2 bg-slate-50 border border-slate-150 rounded-lg text-xs font-semibold text-slate-500">
                    <button
                      onClick={() => handleSelectAll(filteredConcerns)}
                      className="mr-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {filteredConcerns.every(c => selectedIds.includes(c.id)) ? (
                        <CheckSquare className="h-4.5 w-4.5 text-indigo-900" />
                      ) : (
                        <Square className="h-4.5 w-4.5" />
                      )}
                    </button>
                    <span>Select All Visible Concerns ({filteredConcerns.length})</span>
                  </div>

                  {/* Grievance Queue */}
                  {filteredConcerns.map((concern) => {
                    const isSelected = selectedIds.includes(concern.id);
                    const priScore = getPriorityScore(concern);
                    const isHot = concern.priority === 'High' && (concern.status !== 'Resolved');

                    return (
                      <div
                        key={concern.id}
                        onClick={() => handleViewConcern(concern)}
                        className={`bg-white border ${
                          isSelected ? 'border-indigo-600 bg-indigo-50/10' : 'border-slate-100'
                        } hover:border-indigo-200 rounded-xl p-5 shadow-xs hover:shadow-sm cursor-pointer transition-all flex justify-between gap-4 items-start relative`}
                      >
                        {/* High Priority Urgency Accent Strip */}
                        {isHot && (
                          <span className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500 rounded-l-xl"></span>
                        )}

                        <div className="flex items-start gap-3 min-w-0">
                          {/* Bulk Checkbox */}
                          <button
                            onClick={(e) => handleToggleSelect(concern.id, e)}
                            className="text-slate-400 hover:text-slate-600 cursor-pointer mt-1"
                          >
                            {isSelected ? (
                              <CheckSquare className="h-4.5 w-4.5 text-indigo-900" />
                            ) : (
                              <Square className="h-4.5 w-4.5" />
                            )}
                          </button>

                          <div className="space-y-2 min-w-0">
                            <div className="flex items-center gap-2.5 flex-wrap">
                              <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50/80 border border-indigo-100 px-2 py-0.5 rounded">
                                {concern.category}
                              </span>
                              <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                                <Calendar className="h-3 w-3" /> {new Date(concern.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </span>
                              {isHot && (
                                <span className="text-[10px] uppercase font-bold text-rose-700 bg-rose-50 border border-rose-100 px-1.5 py-0.5 rounded flex items-center gap-0.5 animate-pulse">
                                  <Flame className="h-3 w-3 text-rose-500" /> Hot Signal
                                </span>
                              )}
                            </div>

                            <h4 className="font-bold font-serif text-slate-900 text-base leading-snug hover:text-indigo-950 truncate">
                              {concern.title}
                            </h4>

                            <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed max-w-2xl">
                              {concern.description}
                            </p>

                            <div className="pt-1 flex flex-wrap items-center gap-4 text-[10px] font-mono text-slate-500">
                              <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-slate-400" /> {concern.ward}</span>
                              <span className="flex items-center gap-1"><User className="h-3 w-3 text-slate-400" /> By: {concern.citizenName}</span>
                              <span className="bg-slate-50 text-slate-500 border border-slate-150 rounded px-1.5 py-0.5 font-bold">
                                Priority Score: {priScore.toFixed(1)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2.5 shrink-0">
                          <StatusBadge status={concern.status} />
                          <PriorityBadge priority={concern.priority} />
                          <ChevronRight className="h-5 w-5 text-slate-300 mt-1" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        ) : (
          /* Analytics Panel (Active Tab) */
          <div className="space-y-8 animate-fade-in">
            {/* Summary Analytics Card */}
            <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900 font-serif mb-2">Constituency Pulse Center</h2>
              <p className="text-slate-600 text-sm">
                Statistical dashboard tracking grievances, volume patterns, active hot spots, and ward ratios for your constituency.
              </p>
            </div>

            {loadingAnalytics || !analytics ? (
              <div className="text-center py-20 bg-white border rounded-xl animate-pulse text-slate-500 text-sm">
                Assembling analytics calculations...
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 1. Category Breakdown Bar Chart */}
                <Card className="bg-white p-6">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Concerns by Category (Bar Chart)</h4>
                  <div className="space-y-4">
                    {analytics.byCategory.map((item: any) => {
                      const maxCount = Math.max(...analytics.byCategory.map((i: any) => i.count), 1);
                      const widthPercent = (item.count / maxCount) * 100;
                      
                      return (
                        <div key={item.category} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-medium text-slate-700">{item.category}</span>
                            <span className="font-bold font-mono text-slate-900">{item.count}</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${widthPercent}%` }}
                              className="bg-indigo-950 h-full rounded-full transition-all duration-500"
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                {/* 2. Status Breakdown Donut Chart */}
                <Card className="bg-white p-6">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Concerns by Status (Donut Chart)</h4>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-around gap-6 pt-2">
                    {/* Handcrafted Responsive Donut SVG */}
                    <div className="relative h-44 w-44 shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 42 42">
                        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#e2e8f0" strokeWidth="4.5" />
                        
                        {/* Build segmented stroke-dasharray arcs */}
                        {(() => {
                          const total = analytics.byStatus.reduce((acc: number, item: any) => acc + item.count, 0) || 1;
                          let currentOffset = 0;
                          const colors = {
                            'New': '#3b82f6',         // Blue
                            'Under Review': '#f59e0b', // Amber
                            'In Progress': '#4f46e5',  // Indigo
                            'Resolved': '#10b981',     // Green
                            'Closed': '#64748b'        // Slate
                          };

                          return analytics.byStatus.map((item: any, idx: number) => {
                            const percentage = (item.count / total) * 100;
                            if (percentage === 0) return null;
                            const strokeDash = `${percentage} ${100 - percentage}`;
                            const strokeOffset = 100 - currentOffset;
                            currentOffset += percentage;

                            return (
                              <circle
                                key={item.status}
                                cx="21"
                                cy="21"
                                r="15.915"
                                fill="transparent"
                                stroke={colors[item.status as keyof typeof colors] || '#cccccc'}
                                strokeWidth="4.5"
                                strokeDasharray={strokeDash}
                                strokeDashoffset={strokeOffset}
                              />
                            );
                          });
                        })()}
                      </svg>
                      {/* Center summary total */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold font-mono text-slate-900">
                          {analytics.byStatus.reduce((acc: number, item: any) => acc + item.count, 0)}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Total Filed</span>
                      </div>
                    </div>

                    {/* Legends Table */}
                    <div className="space-y-2.5 text-xs">
                      {analytics.byStatus.map((item: any) => {
                        const colors: Record<string, string> = {
                          'New': 'bg-blue-500',
                          'Under Review': 'bg-amber-500',
                          'In Progress': 'bg-indigo-500',
                          'Resolved': 'bg-emerald-500',
                          'Closed': 'bg-slate-500'
                        };
                        return (
                          <div key={item.status} className="flex items-center gap-2.5 font-mono">
                            <span className={`h-3 w-3 rounded-full ${colors[item.status] || 'bg-slate-300'}`}></span>
                            <span className="text-slate-600 w-24 text-left">{item.status}:</span>
                            <strong className="text-slate-900">{item.count}</strong>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Card>

                {/* 3. Volume over Time Line Chart */}
                <Card className="bg-white p-6 md:col-span-1">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Grievance Volume Trends (Daily Timeline)</h4>
                  
                  {analytics.volumeOverTime.length === 0 ? (
                    <p className="text-xs text-slate-400 italic text-center py-12">Waiting for timeline logs.</p>
                  ) : (
                    <div className="space-y-6">
                      <div className="h-44 w-full flex items-end gap-1.5 border-b border-l border-slate-100 pb-2 pl-2">
                        {analytics.volumeOverTime.map((item: any, idx: number) => {
                          const maxCount = Math.max(...analytics.volumeOverTime.map((i: any) => i.count), 1);
                          const heightPercent = (item.count / maxCount) * 85; // cap at 85% for visual buffer

                          return (
                            <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end cursor-pointer">
                              {/* Hover bubble */}
                              <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 bg-indigo-950 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs transition-opacity duration-150 pointer-events-none whitespace-nowrap z-10">
                                {item.count} concerns
                              </div>
                              {/* Bar element */}
                              <div
                                style={{ height: `${heightPercent}%` }}
                                className="w-full bg-indigo-950/20 group-hover:bg-indigo-950 rounded-t transition-all duration-300"
                              ></div>
                              <span className="text-[9px] text-slate-400 font-mono mt-1 w-full text-center truncate">{item.date}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </Card>

                {/* 4. Top Wards Comparative Panel */}
                <Card className="bg-white p-6 md:col-span-1">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Top Hot Spot Wards (Complaint Densities)</h4>
                  
                  {analytics.topWards.length === 0 ? (
                    <p className="text-xs text-slate-400 italic text-center py-12">No locality stats calculated.</p>
                  ) : (
                    <div className="space-y-5">
                      {analytics.topWards.map((item: any, idx: number) => {
                        const total = analytics.topWards.reduce((acc: number, i: any) => acc + i.count, 0) || 1;
                        const percentage = ((item.count / total) * 100).toFixed(1);

                        return (
                          <div key={idx} className="flex justify-between items-center gap-4 border-b border-slate-50 pb-2.5 last:border-0 last:pb-0">
                            <div className="flex items-center gap-3">
                              <span className="h-6 w-6 font-mono font-bold text-xs flex items-center justify-center bg-slate-100 text-indigo-950 rounded-full shrink-0">
                                {idx + 1}
                              </span>
                              <div>
                                <h5 className="text-xs font-bold text-slate-800">{item.ward}</h5>
                                <p className="text-[10px] text-slate-400 font-mono">Constituency Ward Area</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-bold text-slate-800 font-mono">{item.count} concerns</span>
                              <span className="text-[9px] text-indigo-700 font-bold block bg-indigo-50 border border-indigo-100 px-1 py-0.2 rounded-sm mt-0.5">{percentage}% of Top Wards</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </Card>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
