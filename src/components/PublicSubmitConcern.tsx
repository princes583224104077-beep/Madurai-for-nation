import React, { useState } from 'react';
import { ConcernCategory } from '../types';
import { Card, InputField, PrimaryButton, SecondaryButton } from './UiComponents';
import {
  Sparkles,
  MapPin,
  FileText,
  User,
  Mail,
  Phone,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  Copy,
  Check,
  EyeOff
} from 'lucide-react';

interface PublicSubmitConcernProps {
  initialState?: {
    state?: string;
    district?: string;
    constituency?: string;
  };
  onBack: () => void;
  onSuccess: (trackingId: string) => void;
}

export default function PublicSubmitConcern({ initialState, onBack, onSuccess }: PublicSubmitConcernProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ConcernCategory | ''>('');
  const [description, setDescription] = useState('');
  const [state, setState] = useState('Tamil Nadu');
  const [district, setDistrict] = useState('Madurai');
  const [constituency, setConstituency] = useState('Madurai Lok Sabha');
  const [ward, setWard] = useState('Ward 12, Sellur');
  const [attachmentNote, setAttachmentNote] = useState('');
  
  // Guest user contact details
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [citizenName, setCitizenName] = useState('');
  const [citizenEmail, setCitizenEmail] = useState('');
  const [citizenPhone, setCitizenPhone] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Success view state
  const [trackingId, setTrackingId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !constituency.trim()) {
      setError('Title, description, and constituency are required.');
      return;
    }

    if (!isAnonymous && (!citizenName.trim() || !citizenEmail.trim())) {
      setError('Name and Email are required unless submitting anonymously.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/concerns/public', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          state,
          district,
          constituency,
          ward: ward || 'General Locality',
          category: category || undefined, // backend AI will classify if empty
          isAnonymous,
          citizenName: isAnonymous ? 'Anonymous Citizen' : citizenName,
          citizenEmail: isAnonymous ? '' : citizenEmail,
          citizenPhone: isAnonymous ? '' : citizenPhone,
          attachmentNote
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit concern.');
      }

      setTrackingId(data.id);
      onSuccess(data.id);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error submitting your concern. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!trackingId) return;
    navigator.clipboard.writeText(trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (trackingId) {
    return (
      <div id="submission-success-card" className="max-w-xl mx-auto py-12 animate-fade-in">
        <Card className="bg-white border-emerald-100 shadow-lg text-center p-8 space-y-6">
          <div className="mx-auto h-16 w-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-9 w-9" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-900 font-serif">Concern Registered Successfully!</h3>
            <p className="text-sm text-slate-500">
              Your grievance has been safely cataloged on the JanVaani public directory and routed to your Member of Parliament's triage portal.
            </p>
          </div>

          {/* Tracking ID Accent Box */}
          <div className="bg-slate-50 border border-slate-150 rounded-xl p-5 space-y-2 relative overflow-hidden">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block tracking-widest">
              Grievance Tracking ID
            </span>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl font-mono font-bold text-indigo-950 tracking-wide select-all">
                {trackingId}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="p-1.5 hover:bg-slate-100 border border-slate-200/60 rounded-lg text-slate-500 hover:text-indigo-950 cursor-pointer transition-all"
                title="Copy tracking ID"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            {copied && <span className="text-[10px] text-emerald-600 font-semibold block animate-pulse">Copied to clipboard!</span>}
          </div>

          <div className="space-y-3.5 text-xs text-slate-500 border-t border-slate-100 pt-5 leading-relaxed max-w-sm mx-auto">
            <p className="font-semibold text-slate-700">How to monitor progress:</p>
            <p>1. Copy the tracking ID above and keep it safe.</p>
            <p>2. Paste it in the <strong>JanVaani Public Tracker</strong> on our home page to see live, official MP logs.</p>
            <p>3. If you didn't submit anonymously, we will also link updates to your email profile if you decide to sign up later.</p>
          </div>

          <div className="pt-3">
            <PrimaryButton id="btn-return-landing" onClick={onBack} className="w-full justify-center">
              Return to Home Page
            </PrimaryButton>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div id="submit-concern-form-container" className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-950 hover:text-indigo-800 cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5" /> Back
        </button>
        <span className="text-xs font-mono text-slate-400">Step 2 of 2 · Form</span>
      </div>

      <Card className="p-8 sm:p-10 bg-white border-slate-150 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4 space-y-1.5">
          <h3 className="text-2xl font-bold text-slate-900 font-serif">
            Raise a Grievance with MP
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Fill out the form below. Once filed, our server-side <strong>Gemini Flash Classifier</strong> will auto-suggest specific tags, audit categories, and highlight urgency metrics to ensure your MP sees it promptly.
          </p>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-lg text-xs text-rose-800 flex items-start gap-2.5">
            <AlertTriangle className="h-4.5 w-4.5 text-rose-600 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-slate-800">
          {/* Title */}
          <InputField
            label="Concern Title"
            id="public-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Broken water mains flooding block lane for over a week"
            required
          />

          {/* Category & Ward Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="public-category" className="block text-sm font-medium text-slate-700 mb-1.5">
                Category
              </label>
              <select
                id="public-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as ConcernCategory)}
                className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-hidden focus:border-teal-700 focus:bg-white transition-all cursor-pointer font-medium"
              >
                <option value="">Auto-Detect using Gemini AI</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="public-ward" className="block text-sm font-medium text-slate-700 mb-1.5">
                Ward / Locality in Madurai <span className="text-rose-500">*</span>
              </label>
              <select
                id="public-ward"
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
          </div>

          {/* Location details (Read-only or pre-selected for context) */}
          <div className="bg-slate-50/80 p-4 border border-slate-100 rounded-xl space-y-3">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              Target Representation Location (Constituency Boundaries)
            </span>
            <div className="grid grid-cols-3 gap-3 text-xs text-slate-700">
              <div>
                <span className="block text-slate-400 text-[10px] font-medium">State</span>
                <input
                  type="text"
                  value={state}
                  disabled
                  className="w-full bg-transparent border-b border-slate-200 py-1 font-semibold focus:outline-hidden text-slate-500"
                />
              </div>
              <div>
                <span className="block text-slate-400 text-[10px] font-medium">District</span>
                <input
                  type="text"
                  value={district}
                  disabled
                  className="w-full bg-transparent border-b border-slate-200 py-1 font-semibold focus:outline-hidden text-slate-500"
                />
              </div>
              <div>
                <span className="block text-slate-400 text-[10px] font-medium">Constituency</span>
                <input
                  type="text"
                  value={constituency}
                  disabled
                  className="w-full bg-transparent border-b border-slate-200 py-1 font-semibold focus:outline-hidden text-teal-800"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label htmlFor="public-desc" className="block text-sm font-medium text-slate-700">
              Detailed Grievance Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="public-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Provide exact details: which streets are affected, how long the issue has persisted, visual metrics, and previous municipality actions..."
              required
              className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-hidden focus:border-indigo-600 focus:bg-white transition-all leading-relaxed"
            />
          </div>

          {/* Photo note / Documents */}
          <InputField
            label="Optional Attachment Description / Photo Note"
            id="public-attachment"
            value={attachmentNote}
            onChange={(e) => setAttachmentNote(e.target.value)}
            placeholder="e.g. Document copy sent to municipal office on June 20, or Photo of flooded lane attached"
          />

          {/* Privacy controls */}
          <div className="border-t border-slate-100 pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">Privacy Selection</h4>
                <p className="text-[11px] text-slate-500">Choose whether to reveal your identity on the public portal.</p>
              </div>
              <label className="flex items-center gap-2.5 cursor-pointer relative">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="h-4.5 w-4.5 rounded border-slate-300 text-indigo-950 focus:ring-indigo-900 cursor-pointer"
                />
                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <EyeOff className="h-3.5 w-3.5 text-slate-400" /> Submit Anonymously
                </span>
              </label>
            </div>

            {!isAnonymous ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50/40 border border-slate-100 rounded-xl animate-fade-in text-slate-800">
                <div className="sm:col-span-1">
                  <InputField
                    label="Your Name"
                    id="citizen-name"
                    value={citizenName}
                    onChange={(e) => setCitizenName(e.target.value)}
                    placeholder="e.g. Rohan Sharma"
                    required={!isAnonymous}
                  />
                </div>
                <div className="sm:col-span-1">
                  <InputField
                    label="Your Email"
                    id="citizen-email"
                    type="email"
                    value={citizenEmail}
                    onChange={(e) => setCitizenEmail(e.target.value)}
                    placeholder="e.g. rohan@gmail.com"
                    required={!isAnonymous}
                  />
                </div>
                <div className="sm:col-span-1">
                  <InputField
                    label="Your Phone (Optional)"
                    id="citizen-phone"
                    value={citizenPhone}
                    onChange={(e) => setCitizenPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                  />
                </div>
              </div>
            ) : (
              <div className="p-3.5 bg-indigo-50/50 border border-indigo-100 rounded-xl text-indigo-900 text-[11px] leading-relaxed flex items-start gap-2 animate-fade-in">
                <EyeOff className="h-4.5 w-4.5 text-indigo-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Secured Anonymity:</strong> Your real name, email, and phone will be masked completely. Only your general ward/locality and concern details will be sent to the MP's dashboard.
                </p>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-slate-100 flex gap-4">
            <SecondaryButton onClick={onBack} disabled={loading} className="w-1/3 justify-center">
              Cancel
            </SecondaryButton>
            <PrimaryButton
              id="btn-public-submit"
              type="submit"
              disabled={loading}
              className="w-2/3 justify-center flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" /> {loading ? 'Filing Concern...' : 'Register Public Grievance'}
            </PrimaryButton>
          </div>
        </form>
      </Card>
    </div>
  );
}
