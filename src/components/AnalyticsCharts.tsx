import React, { useState } from 'react';
import { BarChart3, PieChart, Activity, Award } from 'lucide-react';

interface AnalyticsChartsProps {
  theme?: 'light' | 'dark';
  lang?: 'en' | 'ta';
}

export default function AnalyticsCharts({ theme = 'light', lang = 'en' }: AnalyticsChartsProps) {
  const [activeChart, setActiveChart] = useState<'category' | 'status' | 'timeline'>('category');

  const t = {
    en: {
      title: 'Smart Governance Analytics Engine',
      subtitle: 'Real-time classification analysis, resolution speeds, and geographic distribution of issues raised across Madurai constituency.',
      pieTab: 'Issues by Category',
      statusTab: 'Resolution Status',
      timelineTab: 'Grievance Volume Timeline',
      categoryTitle: 'Grievance Distribution by Department Category',
      statusTitle: 'Current Resolution Lifecycle Split',
      timelineTitle: 'Monthly Grievance Filing Volume Trend (2026)',
      wardRanking: 'Constituency Activity & Resolve Rates (Top Constituencies)',
      ward: 'Constituency',
      received: 'Received',
      resolved: 'Resolved',
      efficiency: 'Efficiency'
    },
    ta: {
      title: 'ஸ்மார்ட் நிர்வாக பகுப்பாய்வு மையம்',
      subtitle: 'மதுரைத் தொகுதியில் எழுப்பப்பட்ட பிரச்சினைகளின் துறை வாரியான பகுப்பாய்வு, தீர்வு வேகம் மற்றும் புவியியல் விநியோகம்.',
      pieTab: 'துறை வாரியான சிக்கல்கள்',
      statusTab: 'தீர்வு நிலைமை',
      timelineTab: 'புகார்கள் காலவரிசை',
      categoryTitle: 'துறை வாரியான குறைபாடுகளின் பங்கீடு',
      statusTitle: 'தற்போதைய தீர்வு வாழ்க்கைச் சுழற்சி பிரிவு',
      timelineTitle: 'மாதாந்திர புகார் தாக்கல் அளவு போக்கு (2026)',
      wardRanking: 'தொகுதி செயல்திறன் & தீர்வு விகிதங்கள்',
      ward: 'தொகுதி',
      received: 'பெறப்பட்டவை',
      resolved: 'தீர்க்கப்பட்டவை',
      efficiency: 'செயல்திறன்'
    }
  }[lang];

  // Raw statistics
  const categories = [
    { label: lang === 'ta' ? 'சாலைகள்' : 'Roads', count: 120, percentage: 34, color: '#F59E0B' },
    { label: lang === 'ta' ? 'குடிநீர் வழங்கல்' : 'Water Supply', count: 88, percentage: 25, color: '#3B82F6' },
    { label: lang === 'ta' ? 'சுகாதாரம்' : 'Sanitation', count: 62, percentage: 18, color: '#10B981' },
    { label: lang === 'ta' ? 'மின்சாரம்' : 'Electricity', count: 45, percentage: 13, color: '#8B5CF6' },
    { label: lang === 'ta' ? 'பெண்கள் பாதுகாப்பு' : "Women's Safety", count: 35, percentage: 10, color: '#EC4899' }
  ];

  const statuses = [
    { label: lang === 'ta' ? 'தீர்க்கப்பட்டவை' : 'Resolved', count: 2980, percentage: 86, color: '#10B981' },
    { label: lang === 'ta' ? 'செயல்பாட்டில் உள்ளது' : 'In Progress', count: 280, percentage: 8, color: '#3B82F6' },
    { label: lang === 'ta' ? 'மதிப்பாய்வில் உள்ளது' : 'Under Review', count: 110, percentage: 3, color: '#F59E0B' },
    { label: lang === 'ta' ? 'சமர்ப்பிக்கப்பட்டது' : 'Submitted', count: 80, percentage: 3, color: '#6B7280' }
  ];

  const timelineData = [
    { month: 'Jan', count: 240 },
    { month: 'Feb', count: 290 },
    { month: 'Mar', count: 350 },
    { month: 'Apr', count: 310 },
    { month: 'May', count: 420 },
    { month: 'Jun', count: 480 }
  ];

  const topWards = [
    { name: lang === 'ta' ? 'மெலூர்' : 'Melur', received: 580, resolved: 510, efficiency: 88 },
    { name: lang === 'ta' ? 'மதுரை கிழக்கு' : 'Madurai East', received: 420, resolved: 390, efficiency: 92 },
    { name: lang === 'ta' ? 'மதுரை வடக்கு' : 'Madurai North', received: 350, resolved: 310, efficiency: 88 },
    { name: lang === 'ta' ? 'மதுரை தெற்கு' : 'Madurai South', received: 290, resolved: 275, efficiency: 94 },
    { name: lang === 'ta' ? 'மதுரை மத்திய' : 'Madurai Central', received: 230, resolved: 220, efficiency: 95 }
  ];

  return (
    <div className={`rounded-2xl border ${theme === 'dark' ? 'bg-stone-900 border-stone-800 text-stone-100' : 'bg-white border-stone-200/60 text-stone-800'} p-5 sm:p-6 shadow-xl relative`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-stone-100 dark:border-stone-800 pb-4">
        <div className="text-left">
          <h3 className={`text-lg sm:text-xl font-bold font-serif ${theme === 'dark' ? 'text-white' : 'text-[#0E5C4B]'}`}>{t.title}</h3>
          <p className="text-[11px] sm:text-xs text-stone-500 max-w-2xl mt-1 leading-relaxed">{t.subtitle}</p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-stone-100 dark:bg-stone-950 p-1 rounded-lg border border-stone-200/40">
          <button
            onClick={() => setActiveChart('category')}
            className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${activeChart === 'category' ? 'bg-[#0E5C4B] text-white' : 'text-stone-600 dark:text-stone-300'}`}
          >
            {t.pieTab}
          </button>
          <button
            onClick={() => setActiveChart('status')}
            className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${activeChart === 'status' ? 'bg-[#0E5C4B] text-white' : 'text-stone-600 dark:text-stone-300'}`}
          >
            {t.statusTab}
          </button>
          <button
            onClick={() => setActiveChart('timeline')}
            className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${activeChart === 'timeline' ? 'bg-[#0E5C4B] text-white' : 'text-stone-600 dark:text-stone-300'}`}
          >
            {t.timelineTab}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Dynamic visual graph container */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 bg-stone-50/50 dark:bg-stone-950/20 rounded-xl border border-stone-200/50 min-h-[310px]">
          {activeChart === 'category' && (
            <div className="w-full space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 font-sans text-center">{t.categoryTitle}</h4>
              
              <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
                {/* SVG Semi-Donut Pie Chart */}
                <svg width="180" height="180" viewBox="0 0 100 100" className="rotate-[-90deg]">
                  {/* Outer circle rings representing categories */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#E2E8F0" strokeWidth="12" />
                  {/* Roads Arc - 34% (stroke-dasharray: 251.2 * 0.34 = 85.4) */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F59E0B" strokeWidth="12" strokeDasharray="85.4 251.2" strokeDashoffset="0" />
                  {/* Water Supply Arc - 25% (stroke-dasharray: 251.2 * 0.25 = 62.8) */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3B82F6" strokeWidth="12" strokeDasharray="62.8 251.2" strokeDashoffset="-85.4" />
                  {/* Sanitation Arc - 18% (45.2) */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10B981" strokeWidth="12" strokeDasharray="45.2 251.2" strokeDashoffset="-148.2" />
                  {/* Electricity Arc - 13% (32.6) */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#8B5CF6" strokeWidth="12" strokeDasharray="32.6 251.2" strokeDashoffset="-193.4" />
                  {/* Women's Safety Arc - 10% (25.1) */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#EC4899" strokeWidth="12" strokeDasharray="25.1 251.2" strokeDashoffset="-226" />
                </svg>

                {/* Legend list */}
                <div className="space-y-1.5 text-left text-xs">
                  {categories.map((cat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                      <span className="font-semibold text-stone-900 dark:text-stone-200">{cat.percentage}%</span>
                      <span className="text-stone-500">{cat.label} ({cat.count})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeChart === 'status' && (
            <div className="w-full space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 font-sans text-center">{t.statusTitle}</h4>
              
              <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
                {/* SVG Progress Donut */}
                <div className="relative">
                  <svg width="170" height="170" viewBox="0 0 100 100" className="rotate-[-90deg]">
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#E2E8F0" strokeWidth="14" />
                    {/* Resolved - 86% (238.6 dasharray) */}
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#10B981" strokeWidth="14" strokeDasharray="205.3 238.6" strokeDashoffset="0" />
                    {/* In Progress - 8% (19.1) */}
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#3B82F6" strokeWidth="14" strokeDasharray="19.1 238.6" strokeDashoffset="-205.3" />
                    {/* Under Review - 3% (7.1) */}
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#F59E0B" strokeWidth="14" strokeDasharray="7.1 238.6" strokeDashoffset="-224.4" />
                    {/* Submitted - 3% (7.1) */}
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#6B7280" strokeWidth="14" strokeDasharray="7.1 238.6" strokeDashoffset="-231.5" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
                    <span className="text-2xl font-mono font-black text-emerald-800 dark:text-emerald-400">86%</span>
                    <span className="text-[8px] font-mono font-bold uppercase text-stone-500">Resolved Rate</span>
                  </div>
                </div>

                {/* Legend list */}
                <div className="space-y-1.5 text-left text-xs">
                  {statuses.map((st, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: st.color }} />
                      <span className="font-semibold text-stone-900 dark:text-stone-200">{st.percentage}%</span>
                      <span className="text-stone-500">{st.label} ({st.count})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeChart === 'timeline' && (
            <div className="w-full space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 font-sans text-center">{t.timelineTitle}</h4>
              
              {/* Interactive Area Chart */}
              <div className="p-2">
                <svg width="280" height="150" className="overflow-visible" viewBox="0 0 280 150">
                  {/* Horizontal gridlines */}
                  <line x1="0" y1="30" x2="280" y2="30" stroke="#E2E8F0" strokeDasharray="3 3" />
                  <line x1="0" y1="75" x2="280" y2="75" stroke="#E2E8F0" strokeDasharray="3 3" />
                  <line x1="0" y1="120" x2="280" y2="120" stroke="#E2E8F0" strokeDasharray="3 3" />
                  
                  {/* Solid/Gradients Area */}
                  {/* points: Jan (10, 110), Feb (64, 100), Mar (118, 85), Apr (172, 95), May (226, 65), Jun (280, 50) */}
                  <path
                    d="M 10 150 L 10 110 L 64 100 L 118 85 L 172 95 L 226 65 L 280 50 L 280 150 Z"
                    fill="url(#indigoGrad)"
                    opacity="0.15"
                  />
                  
                  {/* Line pathway */}
                  <path
                    d="M 10 110 L 64 100 L 118 85 L 172 95 L 226 65 L 280 50"
                    fill="none"
                    stroke="#0E5C4B"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Nodes & tooltip markers */}
                  <circle cx="10" cy="110" r="4.5" fill="#0E5C4B" stroke="white" strokeWidth="1.5" />
                  <circle cx="64" cy="100" r="4.5" fill="#0E5C4B" stroke="white" strokeWidth="1.5" />
                  <circle cx="118" cy="85" r="4.5" fill="#0E5C4B" stroke="white" strokeWidth="1.5" />
                  <circle cx="172" cy="95" r="4.5" fill="#0E5C4B" stroke="white" strokeWidth="1.5" />
                  <circle cx="226" cy="65" r="4.5" fill="#0E5C4B" stroke="white" strokeWidth="1.5" />
                  <circle cx="280" cy="50" r="4.5" fill="#0E5C4B" stroke="white" strokeWidth="1.5" />

                  {/* Value tags on top */}
                  <text x="10" y="98" fill="#333" fontSize="8" textAnchor="middle" fontWeight="bold">240</text>
                  <text x="64" y="88" fill="#333" fontSize="8" textAnchor="middle" fontWeight="bold">290</text>
                  <text x="118" y="73" fill="#333" fontSize="8" textAnchor="middle" fontWeight="bold">350</text>
                  <text x="172" y="83" fill="#333" fontSize="8" textAnchor="middle" fontWeight="bold">310</text>
                  <text x="226" y="53" fill="#333" fontSize="8" textAnchor="middle" fontWeight="bold">420</text>
                  <text x="280" y="38" fill="#333" fontSize="8" textAnchor="middle" fontWeight="bold">480</text>

                  {/* Horizontal Labels */}
                  <text x="10" y="145" fill="#666" fontSize="8" textAnchor="middle">Jan</text>
                  <text x="64" y="145" fill="#666" fontSize="8" textAnchor="middle">Feb</text>
                  <text x="118" y="145" fill="#666" fontSize="8" textAnchor="middle">Mar</text>
                  <text x="172" y="145" fill="#666" fontSize="8" textAnchor="middle">Apr</text>
                  <text x="226" y="145" fill="#666" fontSize="8" textAnchor="middle">May</text>
                  <text x="280" y="145" fill="#666" fontSize="8" textAnchor="middle">Jun</text>

                  {/* Gradients definitions */}
                  <defs>
                    <linearGradient id="indigoGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0E5C4B" />
                      <stop offset="100%" stopColor="#FFF" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Top Wards Leaderboard List Panel */}
        <div className="lg:col-span-6 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 font-sans text-left flex items-center gap-1.5">
            <Activity className="h-4.5 w-4.5 text-[#C89B3C]" /> {t.wardRanking}
          </h4>

          <div className="space-y-3">
            {topWards.map((ward, idx) => (
              <div
                key={idx}
                className={`p-3 bg-white dark:bg-stone-850 border ${theme === 'dark' ? 'border-stone-800' : 'border-stone-150/85'} rounded-xl shadow-3xs flex justify-between items-center`}
              >
                <div className="flex items-center gap-3">
                  <span className={`h-6 w-6 font-mono font-black text-[10px] rounded-lg flex items-center justify-center ${idx === 0 ? 'bg-amber-100 text-amber-800 border border-amber-300/40' : 'bg-stone-100 text-stone-700'}`}>
                    #{idx + 1}
                  </span>
                  <div className="text-left">
                    <span className="font-bold text-xs sm:text-sm text-stone-950 dark:text-white block">{ward.name}</span>
                    <span className="text-[10px] text-stone-500 font-sans">
                      {t.received}: <strong>{ward.received}</strong> · {t.resolved}: <strong className="text-emerald-700">{ward.resolved}</strong>
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9px] text-stone-400 uppercase tracking-widest block">{t.efficiency}</span>
                  <span className="text-sm font-mono font-bold text-emerald-700">{ward.efficiency}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
