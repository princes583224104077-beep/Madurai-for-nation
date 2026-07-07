import React from 'react';
import { ConcernStatus } from '../types';

export function StatusBadge({ status }: { status: ConcernStatus }) {
  const styles: Record<ConcernStatus, string> = {
    'Submitted': 'bg-blue-50 text-blue-700 border border-blue-200/60',
    'Under Review': 'bg-amber-50 text-amber-700 border border-amber-200/60',
    'In Progress': 'bg-indigo-50 text-indigo-700 border border-indigo-200/60',
    'Resolved': 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
  };

  return (
    <span id={`status-badge-${status.toLowerCase().replace(/\s+/g, '-')}`} className={`px-2.5 py-1 text-xs font-semibold rounded-full ${styles[status] || 'bg-slate-50 text-slate-700'}`}>
      {status}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority?: 'Low' | 'Medium' | 'High' }) {
  const prio = priority || 'Medium';
  const styles = {
    'Low': 'bg-slate-100 text-slate-700 border border-slate-200/60',
    'Medium': 'bg-amber-50 text-amber-800 border border-amber-200/60',
    'High': 'bg-rose-50 text-rose-700 border border-rose-200/60 font-semibold',
  };

  return (
    <span id={`priority-badge-${prio.toLowerCase()}`} className={`px-2.5 py-1 text-xs font-medium rounded-full uppercase tracking-wider ${styles[prio]}`}>
      {prio} Priority
    </span>
  );
}

export function Card({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <div id={id} className={`bg-white border border-slate-100 rounded-xl shadow-xs p-6 hover:shadow-md transition-shadow duration-200 ${className}`}>
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
      className={`px-5 py-2.5 bg-indigo-950 text-white rounded-lg font-medium hover:bg-indigo-900 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${className}`}
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
      className={`px-5 py-2.5 bg-white text-indigo-950 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${className}`}
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
