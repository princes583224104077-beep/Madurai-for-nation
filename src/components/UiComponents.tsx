import React from 'react';
import { ConcernStatus } from '../types';

export function StatusBadge({ status }: { status: ConcernStatus }) {
  const styles: Record<ConcernStatus, string> = {
    'Submitted': 'bg-[#E8F9F0] text-[#0F6B4D] border border-[#D6F2E6]',
    'Received by Office': 'bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0]',
    'Under Verification': 'bg-[#FFF7ED] text-[#B45309] border border-[#FCD34D]/30',
    'Assigned to Department': 'bg-[#EEF2FF] text-[#4338CA] border border-[#C7D2FE]',
    'Officer Reviewing': 'bg-[#ECFEFF] text-[#0E7490] border border-[#A5F3FC]',
    'Action Initiated': 'bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]',
    'In Progress': 'bg-[#EEF2FF] text-[#4338CA] border border-[#C7D2FE]',
    'Awaiting Approval': 'bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]',
    'Resolved': 'bg-[#ECFDF5] text-[#166534] border border-[#A7F3D0]',
    'Closed': 'bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0]',
    'Under Review': 'bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]',
  };

  return (
    <span id={`status-badge-${status.toLowerCase().replace(/\s+/g, '-')}`} className={`px-3 py-1.5 text-[11px] font-semibold rounded-full tracking-wide ${styles[status] || 'bg-slate-50 text-slate-700'}`}>
      {status}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority?: 'Low' | 'Medium' | 'High' }) {
  const prio = priority || 'Medium';
  const styles = {
    'Low': 'bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]',
    'Medium': 'bg-[#FEF9C3] text-[#92400E] border border-[#FDE68A]',
    'High': 'bg-[#FEE2E2] text-[#B91C1C] border border-[#FECACA] font-semibold',
  };

  return (
    <span id={`priority-badge-${prio.toLowerCase()}`} className={`px-3 py-1.5 text-[11px] font-semibold rounded-full uppercase tracking-[0.22em] ${styles[prio]}`}>
      {prio}
    </span>
  );
}

export function Card({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <div id={id} className={`glass-card p-6 ${className}`}>
      {children}
    </div>
  );
}

export function PrimaryButton({ children, onClick, type = 'button', disabled = false, className = '', id }: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-5 py-2.5 rounded-[16px] bg-gradient-to-r from-[#0F6B4D] to-[#118C62] text-white font-semibold shadow-[0_18px_40px_-20px_rgba(15,107,77,0.55)] transition duration-200 hover:shadow-[0_22px_50px_-22px_rgba(15,107,77,0.65)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, onClick, type = 'button', disabled = false, className = '', id }: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-5 py-2.5 rounded-[16px] bg-white text-[#0F172A] border border-[#E5E7EB] font-semibold transition duration-200 hover:border-[#0F6B4D] hover:text-[#0F6B4D] hover:bg-[#F8FAFC] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}

export function InputField({ label, id, type = 'text', value, onChange, placeholder, required = false, disabled = false, className = '' }: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-indigo-600 focus:bg-white transition-all text-sm"
      />
    </div>
  );
}
