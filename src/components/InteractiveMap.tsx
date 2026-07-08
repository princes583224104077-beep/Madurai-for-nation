import React, { useState } from 'react';
import { MapPin, CheckCircle2, AlertCircle, TrendingUp, Info } from 'lucide-react';

interface InteractiveMapProps {
  theme?: 'light' | 'dark';
  lang?: 'en' | 'ta';
}

interface ConstituencyDetails {
  id: string;
  name: string;
  tamilName: string;
  population: string;
  primaryNeed: string;
  activeBudget: string;
  heatLevel: 'high' | 'medium' | 'low';
  projects: {
    name: string;
    tamilName: string;
    type: 'Road' | 'Water' | 'Hospital' | 'School';
    budget: string;
    completion: number;
    timeline: string;
  }[];
}

const constituencyDetailsData: Record<string, ConstituencyDetails> = {
  sellur: {
    id: 'sellur',
    name: 'Madurai Central',
    tamilName: 'மதுரை மத்திய',
    population: '54,000 residents',
    primaryNeed: 'Water Supply & Sewage Canal Desilting',
    activeBudget: '₹4.2 Crores',
    heatLevel: 'medium',
    projects: [
      { name: 'Sellur Aquifer Reconstruction', tamilName: 'செல்லூர் நீர்நிலை புனரமைப்பு', type: 'Water', budget: '₹2.1 Cr', completion: 92, timeline: 'Dec 2026' },
      { name: 'Traditional Weaver Lane Road Laying', tamilName: 'நெசவாளர் வீதி சாலை அமைத்தல்', type: 'Road', budget: '₹1.3 Cr', completion: 45, timeline: 'Oct 2026' },
      { name: 'Sellur Primary School Smartboards', tamilName: 'செல்லூர் தொடக்கப் பள்ளி ஸ்மார்ட்போர்டுகள்', type: 'School', budget: '₹80 Lakhs', completion: 100, timeline: 'Completed' }
    ]
  },
  goripalayam: {
    id: 'goripalayam',
    name: 'Madurai North',
    tamilName: 'மதுரை வடக்கு',
    population: '62,500 residents',
    primaryNeed: 'Traffic Congestion & Public Safety Infrastructure',
    activeBudget: '₹12.5 Crores',
    heatLevel: 'high',
    projects: [
      { name: 'Goripalayam Flyover Foundation', tamilName: 'கோரிப்பாளையம் மேம்பாலம்', type: 'Road', budget: '₹8.5 Cr', completion: 65, timeline: 'Mar 2027' },
      { name: 'Government Rajaji Hospital Pediatric Wing', tamilName: 'ராஜாஜி அரசு மருத்துவமனை குழந்தைகள் பிரிவு', type: 'Hospital', budget: '₹3.2 Cr', completion: 90, timeline: 'Sep 2026' },
      { name: 'Traffic signal IoT synchronization', tamilName: 'போக்குவரத்து சிக்னல் சீரமைப்பு', type: 'Road', budget: '₹80 Lakhs', completion: 30, timeline: 'Nov 2026' }
    ]
  },
  kknagar: {
    id: 'kknagar',
    name: 'Madurai West',
    tamilName: 'மதுரை மேற்கு',
    population: '48,000 residents',
    primaryNeed: 'Sanitation & Solid Waste Management Systems',
    activeBudget: '₹3.8 Crores',
    heatLevel: 'low',
    projects: [
      { name: 'Walkers Park Bio-waste Plant', tamilName: 'பூங்கா உரம் தயாரிப்பு நிலையம்', type: 'Water', budget: '₹1.5 Cr', completion: 100, timeline: 'Completed' },
      { name: 'K.K. Nagar Main Road Widening', tamilName: 'கே.கே. நகர் சாலை விரிவாக்கம்', type: 'Road', budget: '₹2.3 Cr', completion: 80, timeline: 'Sep 2026' }
    ]
  },
  simmakkal: {
    id: 'simmakkal',
    name: 'Madurai Central',
    tamilName: 'மதுரை மத்திய',
    population: '70,000 residents',
    primaryNeed: "Women's Safety & Heritage Lighting upgrades",
    activeBudget: '₹9.2 Crores',
    heatLevel: 'high',
    projects: [
      { name: 'Meenakshi Temple West Tower Safety Lighting', tamilName: 'மேற்கு கோபுர வீதி விளக்குகள்', type: 'Road', budget: '₹4.5 Cr', completion: 82, timeline: 'Sep 2026' },
      { name: 'Market Area Sanitary block reconstruction', tamilName: 'சிம்மக்கல் சந்தை சுகாதார வளாகம்', type: 'Hospital', budget: '₹2.2 Cr', completion: 50, timeline: 'Feb 2027' },
      { name: 'Simmakkal Heritage Digital Kiosk', tamilName: 'சிம்மக்கல் பாரம்பரிய டிஜிட்டல் மையம்', type: 'School', budget: '₹1.5 Cr', completion: 100, timeline: 'Completed' }
    ]
  },
  tallakulam: {
    id: 'tallakulam',
    name: 'Madurai South',
    tamilName: 'மதுரை தெற்கு',
    population: '41,000 residents',
    primaryNeed: 'Public Safety & Digital Connectivity schemes',
    activeBudget: '₹5.5 Crores',
    heatLevel: 'low',
    projects: [
      { name: 'Tallakulam Corporation School Lab', tamilName: 'தல்லாகுளம் பள்ளி ஆய்வகம்', type: 'School', budget: '₹1.2 Cr', completion: 100, timeline: 'Completed' },
      { name: 'High-speed BSNL Fiber Laying', tamilName: 'பி.எஸ்.என்.எல் அதிவேக இணைய இணைப்பு', type: 'Road', budget: '₹3.1 Cr', completion: 75, timeline: 'Oct 2026' },
      { name: 'Eco-Park Surveillance Drone Node', tamilName: 'பூங்கா பாதுகாப்பு கேமராக்கள்', type: 'Hospital', budget: '₹1.2 Cr', completion: 95, timeline: 'Aug 2026' }
    ]
  }
};

export default function InteractiveMap({ theme = 'light', lang = 'en' }: InteractiveMapProps) {
  const [selectedConstituency, setSelectedConstituency] = useState<string>('sellur');
  const details = constituencyDetailsData[selectedConstituency];

  const t = {
    en: {
      mapTitle: 'Interactive Development & Complaint Heat Map',
      mapSubtitle: 'Click on any ward on the visual map of Madurai to view active development projects, budget allocation, completion ratios, and complaint density.',
      constituencyName: 'Constituency Name',
      population: 'Population',
      primaryNeed: 'Primary Need',
      activeBudget: 'Active Budget Allocation',
      completion: 'Completion %',
      timeline: 'Timeline',
      roadWork: 'Road Infrastructure',
      waterProject: 'Water Project',
      hospital: 'Healthcare',
      school: 'Education',
      projectsHeader: 'Active Constituency Projects',
      heatLevel: 'Grievance Intensity',
      high: 'High Density (Red Zone)',
      medium: 'Medium Density (Orange Zone)',
      low: 'Low Density (Green Zone)',
      backToMap: 'Click Constituencies on the Map to view metrics'
    },
    ta: {
      mapTitle: 'ஊடாடும் வளர்ச்சி மற்றும் குறை தீர்க்கும் வரைபடம்',
      mapSubtitle: 'மதுரையின் குறிப்பிட்ட வார்டை கிளிக் செய்வதன் மூலம் அங்கு நடக்கும் வளர்ச்சி திட்டங்கள், நிதி ஒதுக்கீடு, மற்றும் புகார்களின் அடர்த்தியைக் கண்டறியலாம்.',
      wardName: 'வார்டின் பெயர்',
      population: 'மக்கள் தொகை',
      primaryNeed: 'முக்கிய தேவை',
      activeBudget: 'செயலில் உள்ள நிதி ஒதுக்கீடு',
      completion: 'முழுமை %',
      timeline: 'காலக்கெடு',
      roadWork: 'சாலை உள்கட்டமைப்பு',
      waterProject: 'குடிநீர் திட்டம்',
      hospital: 'சுகாதாரம்',
      school: 'கல்வி',
      projectsHeader: 'செயலில் உள்ள திட்டங்கள்',
      heatLevel: 'குறைகளின் தீவிரம்',
      high: 'அதிக அடர்த்தி (சிவப்பு மண்டலம்)',
      medium: 'நடுத்தர அடர்த்தி (ஆரஞ்சு மண்டலம்)',
      low: 'குறைந்த அடர்த்தி (பச்சை மண்டலம்)',
      backToMap: 'வார்டுகளின் விவரங்களைக் காண வரைபடத்தில் கிளிக் செய்யவும்'
    }
  }[lang];

  return (
    <div className={`rounded-2xl border ${theme === 'dark' ? 'bg-stone-900 border-stone-800 text-stone-100' : 'bg-white border-stone-200/60 text-stone-800'} p-5 sm:p-6 shadow-xl relative`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="text-left">
          <h3 className={`text-lg sm:text-xl font-bold font-serif ${theme === 'dark' ? 'text-white' : 'text-[#0E5C4B]'}`}>{t.mapTitle}</h3>
          <p className="text-[11px] sm:text-xs text-stone-500 max-w-2xl mt-1 leading-relaxed">{t.mapSubtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-[10px] font-mono">
          <span className="flex items-center gap-1 bg-rose-500/10 text-rose-500 border border-rose-500/20 px-2 py-0.5 rounded-full">
            <span className="h-2 w-2 rounded-full bg-rose-500" /> {t.high}
          </span>
          <span className="flex items-center gap-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded-full">
            <span className="h-2 w-2 rounded-full bg-amber-500" /> {t.medium}
          </span>
          <span className="flex items-center gap-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> {t.low}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* SVG Interactive Map Column */}
        <div className="lg:col-span-5 flex items-center justify-center bg-stone-50/50 dark:bg-stone-950/30 rounded-xl border border-stone-200/50 p-4 min-h-[300px]">
          <svg
            viewBox="0 0 400 400"
            className="w-full max-w-[280px] h-auto drop-shadow-md select-none"
          >
            {/* Outline design of Madurai 5 main central zones */}
            
            {/* Sellur (Top-Left) */}
            <g
              onClick={() => setSelectedConstituency('sellur')}
              className={`cursor-pointer transition-all ${selectedConstituency === 'sellur' ? 'scale-102 filter drop-shadow-md' : 'opacity-85 hover:opacity-100'}`}
            >
              <path
                d="M 50 150 L 150 100 L 220 150 L 150 190 Z"
                fill={selectedConstituency === 'sellur' ? '#C89B3C' : '#F59E0B'}
                fillOpacity={selectedConstituency === 'sellur' ? '0.25' : '0.1'}
                stroke={selectedConstituency === 'sellur' ? '#C89B3C' : '#F59E0B'}
                strokeWidth={selectedConstituency === 'sellur' ? '3.5' : '2'}
              />
              <circle cx="140" cy="140" r="14" fill="#F59E0B" fillOpacity="0.8" />
              <text x="140" y="144" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">S</text>
            </g>

            {/* Goripalayam (Top-Right) */}
            <g
              onClick={() => setSelectedConstituency('goripalayam')}
              className={`cursor-pointer transition-all ${selectedConstituency === 'goripalayam' ? 'scale-102 filter drop-shadow-md' : 'opacity-85 hover:opacity-100'}`}
            >
              <path
                d="M 220 150 L 150 100 L 260 50 L 330 130 L 250 170 Z"
                fill={selectedConstituency === 'goripalayam' ? '#6B1E24' : '#EF4444'}
                fillOpacity={selectedConstituency === 'goripalayam' ? '0.25' : '0.1'}
                stroke={selectedConstituency === 'goripalayam' ? '#6B1E24' : '#EF4444'}
                strokeWidth={selectedConstituency === 'goripalayam' ? '3.5' : '2'}
              />
              <circle cx="230" cy="110" r="14" fill="#EF4444" fillOpacity="0.8" />
              <text x="230" y="114" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">G</text>
            </g>

            {/* Simmakkal (Temple Core Center) */}
            <g
              onClick={() => setSelectedConstituency('simmakkal')}
              className={`cursor-pointer transition-all ${selectedConstituency === 'simmakkal' ? 'scale-102 filter drop-shadow-md' : 'opacity-85 hover:opacity-100'}`}
            >
              <path
                d="M 150 190 L 220 150 L 250 170 L 210 260 L 130 240 Z"
                fill={selectedConstituency === 'simmakkal' ? '#6B1E24' : '#EF4444'}
                fillOpacity={selectedConstituency === 'simmakkal' ? '0.25' : '0.1'}
                stroke={selectedConstituency === 'simmakkal' ? '#6B1E24' : '#EF4444'}
                strokeWidth={selectedConstituency === 'simmakkal' ? '3.5' : '2'}
              />
              <circle cx="190" cy="200" r="14" fill="#EF4444" fillOpacity="0.8" />
              <text x="190" y="204" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">M</text>
            </g>

            {/* K.K. Nagar (Far Right) */}
            <g
              onClick={() => setSelectedConstituency('kknagar')}
              className={`cursor-pointer transition-all ${selectedConstituency === 'kknagar' ? 'scale-102 filter drop-shadow-md' : 'opacity-85 hover:opacity-100'}`}
            >
              <path
                d="M 250 170 L 330 130 L 380 230 L 290 280 Z"
                fill={selectedConstituency === 'kknagar' ? '#0E5C4B' : '#10B981'}
                fillOpacity={selectedConstituency === 'kknagar' ? '0.25' : '0.1'}
                stroke={selectedConstituency === 'kknagar' ? '#0E5C4B' : '#10B981'}
                strokeWidth={selectedConstituency === 'kknagar' ? '3.5' : '2'}
              />
              <circle cx="310" cy="200" r="14" fill="#10B981" fillOpacity="0.8" />
              <text x="310" y="204" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">K</text>
            </g>

            {/* Tallakulam (Bottom Center-Left) */}
            <g
              onClick={() => setSelectedConstituency('tallakulam')}
              className={`cursor-pointer transition-all ${selectedConstituency === 'tallakulam' ? 'scale-102 filter drop-shadow-md' : 'opacity-85 hover:opacity-100'}`}
            >
              <path
                d="M 130 240 L 210 260 L 290 280 L 250 360 L 100 320 Z"
                fill={selectedConstituency === 'tallakulam' ? '#0E5C4B' : '#10B981'}
                fillOpacity={selectedConstituency === 'tallakulam' ? '0.25' : '0.1'}
                stroke={selectedConstituency === 'tallakulam' ? '#0E5C4B' : '#10B981'}
                strokeWidth={selectedConstituency === 'tallakulam' ? '3.5' : '2'}
              />
              <circle cx="190" cy="300" r="14" fill="#10B981" fillOpacity="0.8" />
              <text x="190" y="304" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">T</text>
            </g>

            {/* Compass rose or watermark logo */}
            <text x="50" y="370" fill="#999" fontSize="8" fontFamily="monospace">MAP: MADURAI METRO</text>
            <circle cx="350" cy="350" r="15" fill="none" stroke="#ddd" strokeWidth="1" />
            <line x1="350" y1="335" x2="350" y2="365" stroke="#aaa" strokeWidth="1" />
            <line x1="335" y1="350" x2="365" y2="350" stroke="#aaa" strokeWidth="1" />
            <text x="350" y="331" fill="#666" fontSize="8" textAnchor="middle" fontWeight="bold">N</text>
          </svg>
        </div>

        {/* Live Project Panel Details Column */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="space-y-4 text-left">
            {/* Constituency Title Card */}
            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-stone-900 border-stone-800' : 'bg-[#FBF9F4] border-[#C89B3C]/20'} flex justify-between items-start`}>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest block">{t.constituencyName}</span>
                <h4 className="text-base sm:text-lg font-serif font-black text-[#0E5C4B] dark:text-teal-400">
                  {lang === 'ta' ? details.tamilName : details.name}
                </h4>
                <div className="flex gap-4 pt-1.5 text-xs text-stone-600 font-sans">
                  <span>{details.population}</span>
                  <span>•</span>
                  <span>{t.primaryNeed}: <strong className="text-red-800">{details.primaryNeed}</strong></span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest block">{t.activeBudget}</span>
                <span className="text-base font-mono font-bold text-teal-950 dark:text-amber-400">{details.activeBudget}</span>
              </div>
            </div>

            {/* List of active projects with progress bars */}
            <div className="space-y-3.5">
              <h5 className="text-xs font-bold uppercase tracking-wider text-stone-400 font-sans flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-[#C89B3C]" /> {t.projectsHeader}
              </h5>
              
              {details.projects.map((proj, idx) => (
                <div key={idx} className={`p-3.5 bg-white dark:bg-stone-850 border ${theme === 'dark' ? 'border-stone-800' : 'border-stone-150/85'} rounded-xl shadow-3xs space-y-2`}>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h6 className="font-semibold text-xs sm:text-sm text-stone-950 dark:text-white leading-snug">
                        {lang === 'ta' ? proj.tamilName : proj.name}
                      </h6>
                      <span className="inline-block mt-1 text-[9px] font-mono px-2 py-0.5 bg-stone-100 dark:bg-stone-800 text-stone-600 rounded">
                        {proj.type} Project
                      </span>
                    </div>
                    <div className="text-right font-mono text-xs">
                      <span className="block font-bold text-teal-950 dark:text-amber-400">{proj.budget}</span>
                      <span className="text-[9px] text-stone-500 block">{proj.timeline}</span>
                    </div>
                  </div>

                  {/* Custom progress bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-stone-500">
                      <span>{t.completion}</span>
                      <span className="font-bold">{proj.completion}%</span>
                    </div>
                    <div className="w-full bg-stone-100 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${proj.completion}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-[#0E5C4B]/5 border border-[#0E5C4B]/10 rounded-lg text-left text-xs text-stone-600 dark:text-stone-300">
            <Info className="h-4.5 w-4.5 text-[#C89B3C] shrink-0" />
            <span>Interactive governance maps allow citizens to audit municipal public fund deployment and trace S. Venkatesan MP's projects real-time.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
