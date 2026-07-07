import React, { useState, useEffect } from 'react';
import { MPProfile, TransparencyCounters } from '../types';
import { Card, PrimaryButton, SecondaryButton } from './UiComponents';
import PublicSubmitConcern from './PublicSubmitConcern';
import ConcernTracker from './ConcernTracker';
import MpProfileView from './MpProfileView';
import {
  Landmark,
  ChevronRight,
  Sparkles,
  ChevronLeft,
  Copy,
  Check,
  Search,
  User,
  MapPin,
  ArrowRight,
  FileText,
  CheckCircle2,
  BarChart3,
  Mail,
  Phone,
  Award,
  BookOpen,
  Building,
  Clock,
  Star,
  MessageSquare,
  Calendar,
  Lock,
  ExternalLink,
  ShieldCheck,
  Users,
  GraduationCap,
  Radio,
  Menu,
  X
} from 'lucide-react';
import InteractiveMap from './InteractiveMap';
import AnalyticsCharts from './AnalyticsCharts';
import AIAssistant from './AIAssistant';

export const GopuramIcon = ({ className = "h-5 w-5" }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      {/* Base baseline */}
      <path d="M2 22h20" />
      {/* Gateway entrance at the bottom base */}
      <path d="M9 22v-3.5a3 3 0 0 1 6 0V22" />
      {/* Tier 1 (Lowest and widest) */}
      <path d="M4.5 22l1-4.5h13l1 4.5" />
      {/* Tier 1 boundary strip */}
      <path d="M5.5 17.5h13" />
      {/* Tier 2 */}
      <path d="M6 17.5l1-4h10l1 4" />
      {/* Tier 2 boundary strip */}
      <path d="M7 13.5h10" />
      {/* Tier 3 */}
      <path d="M7.5 13.5l1-3.5h7l1 3.5" />
      {/* Tier 3 boundary strip */}
      <path d="M8.5 10h7" />
      {/* Tier 4 */}
      <path d="M9 10l0.8-3h4.4l0.8 3" />
      {/* Tier 4 boundary strip */}
      <path d="M9.8 7h4.4" />
      {/* Dome Top Crown (Shikhara) */}
      <path d="M10.2 7c0-1.2.8-2 1.8-2s1.8.8 1.8 2z" />
      {/* Vertical Sacred Spires (Kalasams) on top */}
      <path d="M12 5V2" />
      <path d="M10.5 3h3" />
    </svg>
  );
};

export const maduraiWardsData = [
  {
    id: 'sellur',
    name: 'Ward 12, Sellur',
    population: '54,000 residents',
    vibe: 'Dense residential neighborhood bounded by the historic Sellur Tank. Famous for traditional handlooms, robust trade, and resilient community spirits.',
    primaryNeed: 'Water Supply & Sewage Canal Desilting',
    totalGrievances: 42,
    resolvedGrievances: 39,
    activeBudget: '₹4.2 Crores',
    activeAiPilot: 'Sellur Aquifer & Pipeline Predictive IoT Leak Detector',
    landmark: 'Sellur Kulam (Ancient Water Reservoir)',
    color: 'teal',
    colorClasses: { bg: 'bg-teal-50 border-teal-200/80', text: 'text-teal-900', pill: 'bg-teal-100 text-teal-800' }
  },
  {
    id: 'goripalayam',
    name: 'Ward 22, Goripalayam',
    population: '62,500 residents',
    vibe: 'Bustling transit gateway connecting northern Madurai. Home to landmark medical facilities, heavy trade corridors, and high commuter footfall.',
    primaryNeed: 'Traffic Congestion & Public Safety infrastructure',
    totalGrievances: 58,
    resolvedGrievances: 51,
    activeBudget: '₹12.5 Crores',
    activeAiPilot: 'Goripalayam Junction Traffic Density Signals Optimizer',
    landmark: 'Goripalayam Dargah & Medical Junction',
    color: 'red',
    colorClasses: { bg: 'bg-rose-50 border-rose-200/80', text: 'text-rose-900', pill: 'bg-rose-100 text-rose-800' }
  },
  {
    id: 'kknagar',
    name: 'Ward 45, K.K. Nagar',
    population: '48,000 residents',
    vibe: 'Planned residential sector with spacious avenues, rich parks, local colleges, and expanding commercial high streets.',
    primaryNeed: 'Sanitation & Solid Waste Management systems',
    totalGrievances: 29,
    resolvedGrievances: 27,
    activeBudget: '₹3.8 Crores',
    activeAiPilot: 'Bento-style Smart Garbage Compaction Sensors',
    landmark: 'K.K. Nagar Walkers Park & Arch',
    color: 'emerald',
    colorClasses: { bg: 'bg-emerald-50 border-emerald-200/80', text: 'text-emerald-900', pill: 'bg-emerald-100 text-emerald-800' }
  },
  {
    id: 'simmakkal',
    name: 'Ward 3, Simmakkal',
    population: '70,000 residents',
    vibe: 'Historic core near Meenakshi Amman Temple. Densely packed with historic lanes, bustling markets, and heritage tourist lanes.',
    primaryNeed: "Women's Safety & Heritage Lighting upgrades",
    totalGrievances: 65,
    resolvedGrievances: 61,
    activeBudget: '₹9.2 Crores',
    activeAiPilot: 'West Tower Smart Corridor Safety Nodes & CCTV Hubs',
    landmark: 'Old Simmakkal Fruit Market & Temple Transit',
    color: 'amber',
    colorClasses: { bg: 'bg-amber-50 border-amber-200/80', text: 'text-amber-900', pill: 'bg-amber-100 text-amber-800' }
  },
  {
    id: 'tallakulam',
    name: 'Ward 15, Tallakulam',
    population: '41,000 residents',
    vibe: 'Institutional heart of Madurai featuring government offices, historic colleges, and leafy residential layout grounds.',
    primaryNeed: 'Public Safety & Digital Connectivity schemes',
    totalGrievances: 23,
    resolvedGrievances: 22,
    activeBudget: '₹5.5 Crores',
    activeAiPilot: 'Sangam Verse Conversational AI Information Kiosks',
    landmark: 'Outpost Tallakulam Temple Ground Area',
    color: 'indigo',
    colorClasses: { bg: 'bg-indigo-50 border-indigo-200/80', text: 'text-indigo-900', pill: 'bg-indigo-100 text-indigo-800' }
  }
];

interface LandingPageProps {
  onEnterAuth: () => void;
  theme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
  language: 'en' | 'ta';
  setLanguage: React.Dispatch<React.SetStateAction<'en' | 'ta'>>;
}

export default function LandingPage({ onEnterAuth, theme, setTheme, language, setLanguage }: LandingPageProps) {
  const [counters, setCounters] = useState<TransparencyCounters | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [mpProfile, setMpProfile] = useState<MPProfile | null>(null);
  const [loadingMp, setLoadingMp] = useState(true);

  // Ward Selector state for active filters
  const [selectedWardId, setSelectedWardId] = useState('sellur');

  // Active view workflow
  // 'landing' | 'profile' | 'submit' | 'track'
  const [currentView, setCurrentView] = useState<'landing' | 'profile' | 'submit' | 'track'>('landing');
  const [trackInitialId, setTrackInitialId] = useState('');
  const [quickTrackId, setQuickTrackId] = useState('');

  // Landing view tabs
  // 'overview' | 'about_mp' | 'projects' | 'parliament' | 'success_stories' | 'open_madurai'
  const [activeTab, setActiveTab] = useState<'overview' | 'about_mp' | 'projects' | 'parliament' | 'success_stories' | 'open_madurai'>('overview');

  // Modern UI layout and contact modal states
  const [showContactModal, setShowContactModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroSearchQuery, setHeroSearchQuery] = useState('');

  // OpenMadurAI community proposals state
  const [aiProposals, setAiProposals] = useState<Array<{
    title: string;
    developer: string;
    pitch: string;
    support: string;
    date: string;
  }>>(() => {
    const saved = localStorage.getItem('open_madurai_proposals');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return [
      {
        title: 'Madurai Traffic Flow AI Optimizer',
        developer: 'Ramkumar K., Deep Learning Architect',
        pitch: 'Computer vision mapping on main temple junction gopurams (Goripalayam, Simmakkal) to dynamically throttle municipal traffic signals based on pedestrian density during major festivals.',
        support: 'Access to Municipal Traffic CCTV Feeds & Compute Servers',
        date: 'Today'
      },
      {
        title: 'Sangam Verse Conversational AI Agent',
        developer: 'Priyadarshini S., NLP Lead at TamilTech',
        pitch: 'A localized Llama-3 model fine-tuned on native Sangam-era historic literature, rendering immersive, conversational multi-lingual answers for international heritage tourists at Meenakshi Amman Temple.',
        support: 'Collaboration with Madurai Cultural Department & Tourism Datasets',
        date: 'Yesterday'
      },
      {
        title: 'Aquifer & Pipeline Leakage Predictive IoT Model',
        developer: 'Madhavan V., Smart Grid Engineer',
        pitch: 'Predictive water resource models charting Sellur aquifer flow rates and Ward 12 pipeline pressure sensors to predict and flags micro-leakages before sewage mixture occurs.',
        support: 'Corporation Water Flow Sensor API Access & Pilot Ward Testing',
        date: '3 days ago'
      }
    ];
  });

  const [aiTitle, setAiTitle] = useState('');
  const [aiDev, setAiDev] = useState('');
  const [aiPitch, setAiPitch] = useState('');
  const [aiSupport, setAiSupport] = useState('Compute Infrastructure');

  const handleAiProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiTitle.trim() || !aiDev.trim() || !aiPitch.trim()) return;
    const newProposal = {
      title: aiTitle.trim(),
      developer: aiDev.trim(),
      pitch: aiPitch.trim(),
      support: aiSupport,
      date: 'Just Now'
    };
    const updated = [newProposal, ...aiProposals];
    setAiProposals(updated);
    localStorage.setItem('open_madurai_proposals', JSON.stringify(updated));
    setAiTitle('');
    setAiDev('');
    setAiPitch('');
  };

  useEffect(() => {
    // Fetch Transparency Counters
    const fetchCounters = async () => {
      try {
        const response = await fetch('/api/transparency-counters');
        if (response.ok) {
          const data = await response.json();
          setCounters(data);
        }
      } catch (err) {
        console.error('Error fetching transparency counters:', err);
      } finally {
        setLoadingStats(false);
      }
    };

    // Fetch the single MP (S. Venkatesan)
    const fetchMp = async () => {
      try {
        const response = await fetch('/api/mps');
        if (response.ok) {
          const mpsList = await response.json();
          if (mpsList && mpsList.length > 0) {
            // S. Venkatesan is the only seeded MP
            setMpProfile(mpsList[0]);
          }
        }
      } catch (err) {
        console.error('Error fetching S. Venkatesan profile:', err);
      } finally {
        setLoadingMp(false);
      }
    };

    fetchCounters();
    fetchMp();
  }, []);

  const handleOpenSubmit = () => {
    setCurrentView('submit');
  };

  const handleOpenTrack = (id: string = '') => {
    setTrackInitialId(id);
    setCurrentView('track');
  };

  const handleQuickTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTrackId.trim()) {
      handleOpenTrack(quickTrackId.trim());
    }
  };

  // Static Madurai Projects Data (from S. Venkatesan's initiatives)
  const maduraiProjects = [
    {
      id: 'proj-1',
      title: 'Mullaiperiyar Drinking Water Scheme (Phase II)',
      budget: '₹320 Crores',
      status: '92% Completed',
      description: 'Pipeline laying and water treatment plant construction in Sellur and Goripalayam to provide drinking water to 100+ wards of Madurai.',
      date: 'Est Completion: Dec 2026'
    },
    {
      id: 'proj-2',
      title: 'Goripalayam Junction Flyover Triaging',
      budget: '₹185 Crores',
      status: '65% Underway',
      description: 'Triaged and secured national clearance for flyover pillars to decongest Madurai East and temple transit entry points.',
      date: 'Est Completion: Mar 2027'
    },
    {
      id: 'proj-3',
      title: 'Meenakshi Temple Smart Corridor Development',
      budget: '₹95 Crores',
      status: '80% Underway',
      description: 'Underground cable mapping, street widening, and municipal safety surveillance cameras near West Tower and South Gate of the temple.',
      date: 'Est Completion: Sep 2026'
    },
    {
      id: 'proj-4',
      title: 'Corporation School Smart Classroom Upgrades',
      budget: '₹15 Crores',
      status: 'Completed',
      description: 'Upgraded 48 government-run corporation schools with interactive smartboards, high-speed internet, and hybrid science laboratories.',
      date: 'Finished: May 2026'
    }
  ];

  // Static Parliamentary Speeches & Lok Sabha Activity Data
  const parliamentSpeeches = [
    {
      title: 'Allotment of Budgetary Funds for AIIMS Madurai Campus',
      date: 'Winter Session 2025',
      summary: 'Strongly advocated on the Lok Sabha floor for immediate release of ₹1,900 Crores central grants to accelerate building works of Madurai AIIMS in Thoppur.',
      category: 'Healthcare'
    },
    {
      title: 'Upgrading Madurai Railway Junction to World Heritage Hub',
      date: 'Budget Session 2026',
      summary: 'Submitted proposal to Railway Minister seeking modern passenger amenities, heritage architectural styling, and direct train connectivity to southern districts.',
      category: 'Public Transport'
    },
    {
      title: 'Minimum Support Price & Welfare Boards for Jasmine Flower Weavers',
      date: 'Monsoon Session 2025',
      summary: 'Demanded GI-tagged Madurai Malli (Jasmine) crop insurance, export subsidies, and active welfare schemes for traditional flower-picking families.',
      category: 'Public Welfare'
    },
    {
      title: 'Expanding Digital Literacy via BSNL Fiber across Madurai Rural',
      date: 'Budget Session 2026',
      summary: 'Asked 5 parliamentary questions on rural telecom infrastructure, ensuring high-speed broadband reaches Madurai East and village panchayats.',
      category: 'Education'
    }
  ];

  // Static Success Stories / Resolved Grievances with Citizen Reviews
  const successStories = [
    {
      title: 'Streetlight Upgrades near West Tower Entry',
      ward: 'Ward 3, Simmakkal',
      category: "Women's Safety",
      description: 'Citizen filed a complaint (ID: JV-MDU-103) about dark zones near West Tower of Meenakshi Temple. MP Venkatesan directed municipal lighting officers. 15 energy-efficient LED posts and 4 CCTV hubs were commissioned within 4 days.',
      citizenReview: 'The West Tower path is fully illuminated now. Our family feels incredibly safe during evening temple walks. Thank you S. Venkatesan MP for the immediate intervention!',
      citizenName: 'Meenakshi Sundaram S.',
      rating: 5
    },
    {
      title: 'Sellur Ward 12 Drinking Water Leakage Rectification',
      ward: 'Ward 12, Sellur',
      category: 'Water Supply',
      description: 'Underground drinking water main pipeline had a severe clog and sewage mixture. Following public report (ID: JV-MDU-101), MP S. Venkatesan pushed corporation engineers to deploy suction trucks. Replaced 80 meters of damaged water lines.',
      citizenReview: 'Water pressure is excellent now, and the purity is perfect. This issue was pending for weeks, resolved in just 48 hours after posting here.',
      citizenName: 'Karthikeyan R.',
      rating: 5
    },
    {
      title: 'Goripalayam Main Junction Drainage Clog Cleared',
      ward: 'Ward 22, Goripalayam',
      category: 'Sanitation',
      description: 'Severe waterlogging during brief spells. Citizen submitted complaint (ID: JV-MDU-104) regarding storm water drains filled with plastic. MP team initiated solid waste squad triage. Deep desilting completed.',
      citizenReview: 'Silt and garbage cleared. Drains are draining beautifully. Extremely swift response from the MP grievance cell.',
      citizenName: 'Fathima Banu',
      rating: 5
    }
  ];

  const t = {
    en: {
      officialBadge: "Official Citizen Engagement Platform",
      mpStatus: "MP Status",
      mpStatusVal: "In Madurai (Constituency Office)",
      meetings: "Today's Citizen Meetings",
      meetingsVal: "10:30 AM - Sellur Office",
      announcement: "Latest MP Announcement",
      announcementVal: "Secured ₹15 Cr central heritage grant for Keeladi Excavation Museum.",
      totalIssuesSolved: "Total Issues Solved This Month",
      totalIssuesVal: "482 Grievances",
      raiseConcern: "Raise a Concern",
      viewProfile: "View MP Profile",
      heroHeadlinePart1: "Connect with Your",
      heroHeadlinePart2: "Member of Parliament",
      heroHeadlinePart3: "Build a Better Madurai Together",
      heroSubtitle: "Empowering every citizen of the Madurai Lok Sabha Constituency to raise concerns, track development, and strengthen democracy through transparent governance.",
      searchPlaceholder: "Search public services, development projects, or your concern..."
    },
    ta: {
      officialBadge: "அதிகாரப்பூர்வ குடிமக்கள் தொடர்பு தளம்",
      mpStatus: "எம்பி நிலை",
      mpStatusVal: "மதுரையில் (தொகுதி அலுவலகம்)",
      meetings: "இன்றைய குடிமக்கள் சந்திப்புகள்",
      meetingsVal: "முற்பகல் 10:30 மணி - செல்லூர் அலுவலகம்",
      announcement: "சமீபத்திய அறிவிப்பு",
      announcementVal: "கீழடி அருங்காட்சியகத்திற்கு ₹15 கோடி மத்திய பாரம்பரிய நிதியைப் பெற்றார்.",
      totalIssuesSolved: "இந்த மாத பிரச்சினைகள் தீர்க்கப்பட்டவை",
      totalIssuesVal: "482 குறைகள்",
      raiseConcern: "குறையை பதிவு செய்க",
      viewProfile: "எம்பி சுயவிவரம்",
      heroHeadlinePart1: "இணையுங்கள் உங்கள்",
      heroHeadlinePart2: "நாடாளுமன்ற உறுப்பினருடன்",
      heroHeadlinePart3: "ஒன்றாக இணைந்து சிறந்த மதுரையை உருவாக்குவோம்",
      heroSubtitle: "மதுரை மக்களவைத் தொகுதியின் ஒவ்வொரு குடிமகனும் தங்களது குறைகளைத் தெரிவிப்பதற்கும், வளர்ச்சிப் பணிகளைக் கண்காணிப்பதற்கும், வெளிப்படையான நிர்வாகத்தின் மூலம் ஜனநாயகத்தை வலுப்படுத்துவதற்கும் அதிகாரம் அளிக்கிறது.",
      searchPlaceholder: "பொது சேவைகள், வளர்ச்சி திட்டங்கள் அல்லது உங்கள் புகாரை தேடவும்..."
    }
  }[language];

  return (
    <div id="janvaani-platform-root" className={`min-h-screen flex flex-col justify-between transition-colors duration-200 ${theme === 'dark' ? 'bg-stone-950 text-stone-100' : 'bg-white text-stone-900'}`}>
      
      {/* 1. CSS Animations injection */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(0.5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes subtle-pulse {
          0%, 100% { opacity: 0.9; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-subtle-pulse {
          animation: subtle-pulse 4s ease-in-out infinite;
        }
        .bg-temple-green { background-color: #0E5C4B; }
        .text-temple-green { color: #0E5C4B; }
        .border-temple-green { border-color: #0E5C4B; }
        .bg-royal-maroon { background-color: #6B1E24; }
        .text-royal-maroon { color: #6B1E24; }
        .border-royal-maroon { border-color: #6B1E24; }
        .text-temple-gold { color: #C89B3C; }
        .bg-temple-gold { background-color: #C89B3C; }
        .border-temple-gold { border-color: #C89B3C; }
      `}</style>

      {/* 2. Indian Tricolor Heritage Border */}
      <div className="h-1.5 flex w-full sticky top-0 z-50">
        <div className="w-1/3 bg-[#FF9933]"></div>
        <div className="w-1/3 bg-white"></div>
        <div className="w-1/3 bg-[#138808]"></div>
      </div>

      {/* 3. Glassmorphism Main Navigation Header */}
      <header className={`sticky top-1.5 z-40 w-full border-b backdrop-blur-md shadow-xs transition-all ${theme === 'dark' ? 'bg-stone-900/95 border-stone-800 text-stone-100' : 'bg-white/95 border-stone-200/50 text-stone-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setCurrentView('landing');
                  setActiveTab('overview');
                }}
                className="p-2 bg-[#0E5C4B] text-white rounded-xl shadow-xs hover:bg-[#0E5C4B]/90 transition-all cursor-pointer flex items-center justify-center border border-[#C89B3C]/40"
              >
                <GopuramIcon className="h-5 w-5 text-[#C89B3C]" />
              </button>
              <div className="text-left">
                <button
                  onClick={() => {
                    setCurrentView('landing');
                    setActiveTab('overview');
                  }}
                  className="text-xl font-extrabold font-sans text-[#0E5C4B] tracking-tight hover:opacity-90 block"
                >
                  Madurai<span className="text-[#6B1E24]">Connect</span>
                </button>
                <span className="text-[9px] text-[#C89B3C] font-mono font-bold uppercase tracking-widest block -mt-0.5">
                  Lok Sabha Constituency Portal
                </span>
              </div>
            </div>

            {/* Desktop Navigation Items */}
            <nav className="hidden lg:flex items-center gap-6">
              <button
                onClick={() => {
                  setCurrentView('landing');
                  setActiveTab('overview');
                }}
                className={`text-xs font-bold font-sans tracking-wide transition-all cursor-pointer ${
                  currentView === 'landing' && activeTab === 'overview'
                    ? 'text-[#0E5C4B] border-b-2 border-[#0E5C4B] pb-1'
                    : 'text-stone-600 hover:text-[#0E5C4B]'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  setCurrentView('landing');
                  setActiveTab('about_mp');
                }}
                className={`text-xs font-bold font-sans tracking-wide transition-all cursor-pointer ${
                  currentView === 'landing' && activeTab === 'about_mp'
                    ? 'text-[#0E5C4B] border-b-2 border-[#0E5C4B] pb-1'
                    : 'text-stone-600 hover:text-[#0E5C4B]'
                }`}
              >
                About MP
              </button>
              <button
                onClick={() => {
                  setCurrentView('landing');
                  setActiveTab('projects');
                }}
                className={`text-xs font-bold font-sans tracking-wide transition-all cursor-pointer ${
                  currentView === 'landing' && activeTab === 'projects'
                    ? 'text-[#0E5C4B] border-b-2 border-[#0E5C4B] pb-1'
                    : 'text-stone-600 hover:text-[#0E5C4B]'
                }`}
              >
                Development Projects
              </button>
              <button
                onClick={handleOpenSubmit}
                className={`text-xs font-bold font-sans tracking-wide transition-all cursor-pointer ${
                  currentView === 'submit'
                    ? 'text-[#0E5C4B] border-b-2 border-[#0E5C4B] pb-1'
                    : 'text-stone-600 hover:text-[#0E5C4B]'
                }`}
              >
                Raise Concern
              </button>
              <button
                onClick={() => handleOpenTrack()}
                className={`text-xs font-bold font-sans tracking-wide transition-all cursor-pointer ${
                  currentView === 'track'
                    ? 'text-[#0E5C4B] border-b-2 border-[#0E5C4B] pb-1'
                    : 'text-stone-600 hover:text-[#0E5C4B]'
                }`}
              >
                Track Complaint
              </button>
              <button
                onClick={() => {
                  setCurrentView('landing');
                  setActiveTab('parliament');
                }}
                className={`text-xs font-bold font-sans tracking-wide transition-all cursor-pointer ${
                  currentView === 'landing' && activeTab === 'parliament'
                    ? 'text-[#0E5C4B] border-b-2 border-[#0E5C4B] pb-1'
                    : 'text-stone-600 hover:text-[#0E5C4B]'
                }`}
              >
                Parliament Updates
              </button>
              <button
                onClick={() => setShowContactModal(true)}
                className="text-xs font-bold font-sans tracking-wide text-stone-600 hover:text-[#0E5C4B] cursor-pointer"
              >
                Contact
              </button>
            </nav>

            {/* Right Side Controls */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language Selector Toggle */}
              <button
                onClick={() => setLanguage(lang => lang === 'en' ? 'ta' : 'en')}
                className={`px-2.5 py-1.5 text-[10px] font-bold font-mono uppercase rounded-lg border cursor-pointer transition-all ${
                  theme === 'dark'
                    ? 'border-stone-800 bg-stone-950 text-[#C89B3C] hover:bg-stone-850'
                    : 'border-stone-200 bg-[#FBF9F4] text-[#0E5C4B] hover:bg-stone-50'
                }`}
              >
                {language === 'en' ? 'தமிழ்' : 'English'}
              </button>

              {/* Theme Selector Toggle */}
              <button
                onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
                className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                  theme === 'dark'
                    ? 'border-stone-800 bg-stone-950 text-amber-400 hover:bg-stone-850'
                    : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                }`}
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>

              <span className="text-stone-300 text-sm">|</span>
              <button
                onClick={onEnterAuth}
                className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-[#0E5C4B] hover:bg-[#0E5C4B]/90 text-white text-xs font-bold rounded-lg transition-all cursor-pointer shadow-xs border border-[#C89B3C]/30 hover:shadow-md"
              >
                <User className="h-3.5 w-3.5 text-[#C89B3C]" /> {language === 'en' ? 'Citizen Login' : 'குடிமகன் உள்நுழைவு'}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-[#0E5C4B] hover:bg-stone-50 rounded-lg transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Responsive Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-stone-200/60 px-4 py-4 space-y-3 shadow-lg animate-fade-in">
            <button
              onClick={() => {
                setCurrentView('landing');
                setActiveTab('overview');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-bold text-stone-700 hover:bg-[#0E5C4B]/5 hover:text-[#0E5C4B] rounded-lg block"
            >
              Home
            </button>
            <button
              onClick={() => {
                setCurrentView('landing');
                setActiveTab('about_mp');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-bold text-stone-700 hover:bg-[#0E5C4B]/5 hover:text-[#0E5C4B] rounded-lg block"
            >
              About MP
            </button>
            <button
              onClick={() => {
                setCurrentView('landing');
                setActiveTab('projects');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-bold text-stone-700 hover:bg-[#0E5C4B]/5 hover:text-[#0E5C4B] rounded-lg block"
            >
              Development Projects
            </button>
            <button
              onClick={() => {
                handleOpenSubmit();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-bold text-stone-700 hover:bg-[#0E5C4B]/5 hover:text-[#0E5C4B] rounded-lg block"
            >
              Raise Concern
            </button>
            <button
              onClick={() => {
                handleOpenTrack();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-bold text-stone-700 hover:bg-[#0E5C4B]/5 hover:text-[#0E5C4B] rounded-lg block"
            >
              Track Complaint
            </button>
            <button
              onClick={() => {
                setCurrentView('landing');
                setActiveTab('parliament');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-bold text-stone-700 hover:bg-[#0E5C4B]/5 hover:text-[#0E5C4B] rounded-lg block"
            >
              Parliament Updates
            </button>
            <button
              onClick={() => {
                setShowContactModal(true);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-bold text-stone-700 hover:bg-[#0E5C4B]/5 hover:text-[#0E5C4B] rounded-lg block"
            >
              Contact
            </button>
            <div className="h-px bg-stone-100 my-2" />
            <button
              onClick={() => {
                onEnterAuth();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2.5 bg-[#0E5C4B] text-white text-xs font-bold rounded-lg block border border-[#C89B3C]/30"
            >
              Citizen Login
            </button>
          </div>
        )}
      </header>

      {/* 4. Main Frame Views */}
      <main className="flex-1">
        
        {/* VIEW A: PUBLIC FORM SUBMISSION */}
        {currentView === 'submit' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <PublicSubmitConcern
              onBack={() => {
                setCurrentView('landing');
                setActiveTab('overview');
              }}
              onSuccess={(id) => {
                // Done inside subcomponent
              }}
            />
          </div>
        )}

        {/* VIEW B: MP PROFILE DETAIL */}
        {currentView === 'profile' && mpProfile && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <MpProfileView
              mp={mpProfile}
              onBack={() => {
                setCurrentView('landing');
                setActiveTab('overview');
              }}
              onRaiseConcern={handleOpenSubmit}
            />
          </div>
        )}

        {/* VIEW C: CONCERN TRACKER */}
        {currentView === 'track' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <ConcernTracker
              initialId={trackInitialId}
              onBack={() => {
                setCurrentView('landing');
                setActiveTab('overview');
              }}
            />
          </div>
        )}

        {/* VIEW D: MADURAI DEDICATED HOME PAGE */}
        {currentView === 'landing' && (
          <div className="space-y-10 pb-12">
            
            {/* Redesigned Premium Hero Section */}
            <section className={`relative overflow-hidden pt-12 pb-24 border-b ${theme === 'dark' ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200/55'}`}>
              {/* Soft background radial visual details */}
              <div className="absolute top-0 right-0 w-[45%] h-[45%] bg-[#0E5C4B]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-10 w-[30%] h-[30%] bg-[#6B1E24]/3 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Hero Left Column */}
                  <div className="lg:col-span-7 space-y-6 text-left">
                    {/* Small Official badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border shadow-3xs ${theme === 'dark' ? 'bg-stone-950 border-stone-800' : 'bg-[#FBF9F4] border-[#C89B3C]/30'}`}>
                      <span className="text-xs">🇮🇳</span>
                      <span className={`text-[11px] font-mono font-bold tracking-wider uppercase ${theme === 'dark' ? 'text-[#C89B3C]' : 'text-[#0E5C4B]'}`}>
                        {t.officialBadge}
                      </span>
                    </div>

                    {/* Headline */}
                    <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12] ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>
                      {t.heroHeadlinePart1} <br className="hidden sm:inline" />
                      <span className="text-[#0E5C4B]">{t.heroHeadlinePart2}</span> <br />
                      <span className="text-[#6B1E24] font-serif italic font-semibold">{t.heroHeadlinePart3}</span>
                    </h1>

                    {/* Subtitle */}
                    <p className={`text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-sans ${theme === 'dark' ? 'text-stone-300' : 'text-stone-600'}`}>
                      {t.heroSubtitle}
                    </p>

                    {/* Search box with dynamic search logic */}
                    <div className={`relative max-w-lg shadow-sm rounded-xl overflow-hidden border transition-all ${theme === 'dark' ? 'border-stone-800 focus-within:border-[#C89B3C]' : 'border-stone-200 focus-within:border-[#0E5C4B]'}`}>
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                        <Search className="h-4 w-4 text-[#0E5C4B]" />
                      </div>
                      <input
                        type="text"
                        value={heroSearchQuery}
                        onChange={(e) => setHeroSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            setCurrentView('landing');
                            setActiveTab('projects');
                          }
                        }}
                        placeholder={t.searchPlaceholder}
                        className={`w-full pl-10 pr-24 py-3 text-xs font-sans focus:outline-hidden ${theme === 'dark' ? 'bg-stone-950/40 text-stone-100 focus:bg-stone-950' : 'bg-[#FBF9F4]/40 text-stone-800 focus:bg-white'}`}
                      />
                      <button
                        onClick={() => {
                          setCurrentView('landing');
                          setActiveTab('projects');
                        }}
                        className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#0E5C4B] hover:bg-[#0E5C4B]/90 text-white text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        {language === 'en' ? 'Search' : 'தேடு'}
                      </button>
                    </div>

                    {/* Primary & Secondary Buttons */}
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <button
                        onClick={handleOpenSubmit}
                        className="px-7 py-3.5 bg-[#0E5C4B] text-white font-bold rounded-xl hover:bg-[#0E5C4B]/95 transition-all duration-200 cursor-pointer shadow-sm text-xs uppercase tracking-wider flex items-center gap-2 border border-[#C89B3C]/30 hover:scale-101 hover:shadow-md"
                      >
                        {t.raiseConcern} <ChevronRight className="h-4 w-4 text-[#C89B3C]" />
                      </button>
                      <button
                        onClick={() => {
                          setCurrentView('landing');
                          setActiveTab('about_mp');
                        }}
                        className={`px-7 py-3.5 border font-bold rounded-xl transition-all duration-200 cursor-pointer text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-3xs ${theme === 'dark' ? 'bg-stone-950 border-stone-800 text-stone-200 hover:bg-stone-850' : 'bg-white border-stone-200 text-[#6B1E24] hover:bg-stone-50'}`}
                      >
                        <User className="h-4 w-4" /> {t.viewProfile}
                      </button>
                    </div>
                  </div>

                  {/* Hero Right Column with stunning Temple Line Art & floating effect */}
                  <div className="lg:col-span-5 flex flex-col justify-center items-center">
                    <div className="relative w-full max-w-sm bg-[#FBF9F4] border-2 border-[#C89B3C]/30 p-4.5 rounded-2xl shadow-sm animate-float">
                      
                      {/* Background community elements/tint styling */}
                      <div className="absolute inset-0 bg-radial from-transparent to-[#0E5C4B]/3 pointer-events-none" />

                      {/* Header in image card */}
                      <div className="flex justify-between items-center border-b border-[#C89B3C]/20 pb-3 mb-3.5">
                        <span className="text-[10px] font-mono text-[#0E5C4B] font-bold tracking-widest uppercase">
                          Heritage Architectural Line Art
                        </span>
                        <span className="px-2 py-0.5 text-[8px] font-mono font-bold bg-[#6B1E24]/10 text-[#6B1E24] border border-[#6B1E24]/20 rounded uppercase">
                          Vibrant Madurai
                        </span>
                      </div>

                      {/* Line Art Temple Image */}
                      <div className="relative rounded-xl overflow-hidden border border-stone-200/80 bg-white shadow-2xs group">
                        <img
                          src="/src/assets/images/madurai_gopuram_minimal_1783327375532.jpg"
                          alt="Madurai Meenakshi Temple Gopuram Sketch"
                          className="w-full h-auto object-contain max-h-[380px] p-2 transition-transform duration-500 group-hover:scale-102"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-stone-900/80 backdrop-blur-xs text-[8px] font-mono text-white px-3 py-1 rounded-md border border-white/10 flex justify-between items-center">
                          <span className="uppercase tracking-wider">Meenakshi Temple Gopuram</span>
                          <span className="text-[#C89B3C] font-semibold">Gold Accent Sketch</span>
                        </div>
                      </div>

                      {/* Ancient pillars & skyline references */}
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="bg-white border border-stone-200/70 rounded-lg p-2 flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#0E5C4B]" />
                          <span className="text-[9px] font-medium text-stone-500 font-sans">Vaigai River Blueprints</span>
                        </div>
                        <div className="bg-white border border-stone-200/70 rounded-lg p-2 flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#6B1E24]" />
                          <span className="text-[9px] font-medium text-stone-500 font-sans">Assembly Hall Sketch</span>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Phase 1 Part 1: Live MP Constituency Dashboard */}
            <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl border shadow-lg ${theme === 'dark' ? 'bg-stone-900/90 border-stone-800' : 'bg-white border-[#C89B3C]/30'}`}>
                
                {/* 1. MP Current Status Card */}
                <div className={`p-4 rounded-xl border flex gap-3 items-start transition-all duration-200 ${theme === 'dark' ? 'bg-stone-950 border-stone-800' : 'bg-[#FBF9F4] border-[#C89B3C]/10'}`}>
                  <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-lg shrink-0 border border-emerald-500/20">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider block">
                      {t.mpStatus}
                    </span>
                    <span className={`text-xs font-black font-sans leading-tight block ${theme === 'dark' ? 'text-stone-100' : 'text-[#0E5C4B]'}`}>
                      {t.mpStatusVal}
                    </span>
                    <span className="text-[10px] text-stone-500 block leading-tight">
                      {language === 'en' ? 'Available for physical grievances' : 'நேரடி குறைகேட்புக்கு அணுகலாம்'}
                    </span>
                  </div>
                </div>

                {/* 2. Today's Citizen Meetings Card */}
                <div className={`p-4 rounded-xl border flex gap-3 items-start transition-all duration-200 ${theme === 'dark' ? 'bg-stone-950 border-stone-800' : 'bg-[#FBF9F4] border-[#C89B3C]/10'}`}>
                  <div className="p-2.5 bg-[#0E5C4B]/10 text-[#0E5C4B] rounded-lg shrink-0 border border-[#0E5C4B]/20">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider block">
                      {t.meetings}
                    </span>
                    <span className={`text-xs font-black font-sans leading-tight block ${theme === 'dark' ? 'text-stone-100' : 'text-[#6B1E24]'}`}>
                      {t.meetingsVal}
                    </span>
                    <span className="text-[10px] text-stone-500 block leading-tight">
                      {language === 'en' ? '8 public consultations scheduled' : '8 பொது சந்திப்புகள் திட்டமிடப்பட்டுள்ளன'}
                    </span>
                  </div>
                </div>

                {/* 3. Total Issues Solved This Month Card */}
                <div className={`p-4 rounded-xl border flex gap-3 items-start transition-all duration-200 ${theme === 'dark' ? 'bg-stone-950 border-stone-800' : 'bg-[#FBF9F4] border-[#C89B3C]/10'}`}>
                  <div className="p-2.5 bg-indigo-500/10 text-indigo-500 rounded-lg shrink-0 border border-indigo-500/20">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider block">
                      {t.totalIssuesSolved}
                    </span>
                    <span className={`text-xs font-black font-mono leading-tight block ${theme === 'dark' ? 'text-stone-100' : 'text-stone-900'}`}>
                      {t.totalIssuesVal}
                    </span>
                    <span className="text-[10px] text-stone-500 block leading-tight">
                      {language === 'en' ? '92.4% success resolution rate' : '92.4% வெற்றிகரமான தீர்வு விகிதம்'}
                    </span>
                  </div>
                </div>

                {/* 4. Latest Announcement Card */}
                <div className={`p-4 rounded-xl border flex gap-3 items-start transition-all duration-200 ${theme === 'dark' ? 'bg-stone-950 border-stone-800' : 'bg-[#FBF9F4] border-[#C89B3C]/10'}`}>
                  <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-lg shrink-0 border border-amber-500/20">
                    <Sparkles className="h-5 w-5 animate-pulse" />
                  </div>
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider block">
                      {t.announcement}
                    </span>
                    <span className={`text-xs font-black font-sans leading-tight block ${theme === 'dark' ? 'text-amber-400' : 'text-[#6B1E24]'}`}>
                      {t.announcementVal}
                    </span>
                    <span className="text-[10px] text-stone-500 block leading-tight">
                      {language === 'en' ? 'Click Parliament tab for details' : 'விவரங்களுக்கு நாடாளுமன்ற தாவலை கிளிக் செய்க'}
                    </span>
                  </div>
                </div>

              </div>
            </section>

            {/* Redesigned Animated Statistics Section */}
            <section className="relative -mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`border-2 rounded-2xl p-6 sm:p-8 shadow-md transition-all ${theme === 'dark' ? 'bg-stone-900 border-[#C89B3C]/30' : 'bg-[#FBF9F4] border-[#C89B3C]/20'}`}>
                
                <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b pb-4 ${theme === 'dark' ? 'border-stone-800' : 'border-stone-200/60'}`}>
                  <div className="space-y-1 text-left">
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-widest block ${theme === 'dark' ? 'text-amber-400' : 'text-[#6B1E24]'}`}>Live Civic Ledger</span>
                    <h3 className={`text-lg font-serif font-bold ${theme === 'dark' ? 'text-[#C89B3C]' : 'text-[#0E5C4B]'}`}>Constituency Performance Indicators</h3>
                  </div>
                  <div className={`flex items-center gap-1 text-[10px] font-mono font-bold px-2.5 py-1 rounded border ${theme === 'dark' ? 'text-amber-400 bg-amber-400/5 border-amber-400/20' : 'text-[#0E5C4B] bg-[#0E5C4B]/5 border-[#0E5C4B]/10'}`}>
                    <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping" /> Real-time Audit
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  
                  {/* Card 1: Citizens Registered */}
                  <div className={`rounded-xl p-4.5 text-center shadow-3xs hover:scale-102 transition-all duration-200 border ${theme === 'dark' ? 'bg-stone-950 border-[#C89B3C]/10 hover:border-[#C89B3C]/45 text-stone-100' : 'bg-white border-[#C89B3C]/10 hover:border-[#C89B3C]/40'}`}>
                    <div className="inline-flex p-2 bg-[#0E5C4B]/5 text-[#0E5C4B] rounded-full mb-1 border border-[#0E5C4B]/10">
                      <Users className="h-4.5 w-4.5 text-[#C89B3C]" />
                    </div>
                    <span className={`block text-2xl sm:text-3xl font-mono font-black tracking-tight ${theme === 'dark' ? 'text-stone-100' : 'text-[#0E5C4B]'}`}>
                      15,000+
                    </span>
                    <span className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mt-1.5">
                      Citizens Registered
                    </span>
                  </div>

                  {/* Card 2: Concerns Submitted */}
                  <div className={`rounded-xl p-4.5 text-center shadow-3xs hover:scale-102 transition-all duration-200 border ${theme === 'dark' ? 'bg-stone-950 border-[#C89B3C]/10 hover:border-[#C89B3C]/45 text-stone-100' : 'bg-white border-[#C89B3C]/10 hover:border-[#C89B3C]/40'}`}>
                    <div className="inline-flex p-2 bg-[#6B1E24]/5 text-[#6B1E24] rounded-full mb-1 border border-[#6B1E24]/10">
                      <FileText className="h-4.5 w-4.5 text-red-400" />
                    </div>
                    <span className={`block text-2xl sm:text-3xl font-mono font-black tracking-tight ${theme === 'dark' ? 'text-stone-100' : 'text-stone-900'}`}>
                      3,450
                    </span>
                    <span className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mt-1.5">
                      Concerns Submitted
                    </span>
                  </div>

                  {/* Card 3: Issues Resolved */}
                  <div className={`rounded-xl p-4.5 text-center shadow-3xs hover:scale-102 transition-all duration-200 border ${theme === 'dark' ? 'bg-stone-950 border-[#C89B3C]/10 hover:border-[#C89B3C]/45 text-stone-100' : 'bg-white border-[#C89B3C]/10 hover:border-[#C89B3C]/40'}`}>
                    <div className="inline-flex p-2 bg-emerald-50 text-emerald-700 rounded-full mb-1 border border-emerald-100">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <span className="block text-2xl sm:text-3xl font-mono font-black text-emerald-500 tracking-tight">
                      2,980
                    </span>
                    <span className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mt-1.5">
                      Issues Resolved
                    </span>
                  </div>

                  {/* Card 4: Development Projects */}
                  <div className={`rounded-xl p-4.5 text-center shadow-3xs hover:scale-102 transition-all duration-200 border ${theme === 'dark' ? 'bg-stone-950 border-[#C89B3C]/10 hover:border-[#C89B3C]/45 text-stone-100' : 'bg-white border-[#C89B3C]/10 hover:border-[#C89B3C]/40'}`}>
                    <div className="inline-flex p-2 bg-[#C89B3C]/10 text-[#C89B3C] rounded-full mb-1 border border-[#C89B3C]/20">
                      <Building className="h-4.5 w-4.5 text-[#C89B3C]" />
                    </div>
                    <span className={`block text-2xl sm:text-3xl font-mono font-black tracking-tight ${theme === 'dark' ? 'text-[#C89B3C]' : 'text-[#6B1E24]'}`}>
                      125
                    </span>
                    <span className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mt-1.5">
                      Development Projects
                    </span>
                  </div>

                  {/* Card 5: Wards Covered */}
                  <div className={`col-span-2 sm:col-span-1 rounded-xl p-4.5 text-center shadow-3xs hover:scale-102 transition-all duration-200 border ${theme === 'dark' ? 'bg-stone-950 border-[#C89B3C]/10 hover:border-[#C89B3C]/45 text-stone-100' : 'bg-white border-[#C89B3C]/10 hover:border-[#C89B3C]/40'}`}>
                    <div className="inline-flex p-2 bg-amber-50 text-amber-700 rounded-full mb-1 border border-amber-100">
                      <MapPin className="h-4.5 w-4.5" />
                    </div>
                    <span className={`block text-2xl sm:text-3xl font-mono font-black tracking-tight ${theme === 'dark' ? 'text-stone-100' : 'text-stone-900'}`}>
                      100%
                    </span>
                    <span className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mt-1.5">
                      Wards Covered
                    </span>
                  </div>

                </div>

              </div>
            </section>

            {/* Custom Tabbed Portal Panels */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Tab Selector Buttons */}
              <div className={`flex flex-wrap border-b gap-1 sm:gap-2 mb-8 p-1.5 rounded-xl transition-all ${theme === 'dark' ? 'bg-stone-900 border-stone-800' : 'bg-stone-50 border-stone-200'}`}>
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'overview'
                      ? theme === 'dark' ? 'bg-[#C89B3C] text-stone-950 shadow-xs' : 'bg-teal-900 text-white shadow-xs'
                      : theme === 'dark' ? 'text-stone-400 hover:text-white hover:bg-stone-800' : 'text-stone-600 hover:text-teal-950 hover:bg-stone-100'
                  }`}
                >
                  🏛️ Madurai Overview
                </button>
                <button
                  onClick={() => setActiveTab('about_mp')}
                  className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'about_mp'
                      ? theme === 'dark' ? 'bg-[#C89B3C] text-stone-950 shadow-xs' : 'bg-teal-900 text-white shadow-xs'
                      : theme === 'dark' ? 'text-stone-400 hover:text-white hover:bg-stone-800' : 'text-stone-600 hover:text-teal-950 hover:bg-stone-100'
                  }`}
                >
                  👤 About S. Venkatesan MP
                </button>
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'projects'
                      ? theme === 'dark' ? 'bg-[#C89B3C] text-stone-950 shadow-xs' : 'bg-teal-900 text-white shadow-xs'
                      : theme === 'dark' ? 'text-stone-400 hover:text-white hover:bg-stone-800' : 'text-stone-600 hover:text-teal-950 hover:bg-stone-100'
                  }`}
                >
                  🏗️ Ongoing Projects
                </button>
                <button
                  onClick={() => setActiveTab('parliament')}
                  className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'parliament'
                      ? theme === 'dark' ? 'bg-[#C89B3C] text-stone-950 shadow-xs' : 'bg-teal-900 text-white shadow-xs'
                      : theme === 'dark' ? 'text-stone-400 hover:text-white hover:bg-stone-800' : 'text-stone-600 hover:text-teal-950 hover:bg-stone-100'
                  }`}
                >
                  📢 Parliament Speeches
                </button>
                <button
                  onClick={() => setActiveTab('success_stories')}
                  className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'success_stories'
                      ? theme === 'dark' ? 'bg-[#C89B3C] text-stone-950 shadow-xs' : 'bg-teal-900 text-white shadow-xs'
                      : theme === 'dark' ? 'text-stone-400 hover:text-white hover:bg-stone-800' : 'text-stone-600 hover:text-teal-950 hover:bg-stone-100'
                  }`}
                >
                  🏆 Success Stories
                </button>
                <button
                  onClick={() => setActiveTab('open_madurai')}
                  className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'open_madurai'
                      ? theme === 'dark' ? 'bg-[#C89B3C] text-stone-950 shadow-xs border border-amber-400/30' : 'bg-teal-900 text-white shadow-xs border border-amber-400/30'
                      : theme === 'dark' ? 'text-teal-400 hover:text-teal-300 hover:bg-teal-950/40 border border-teal-900/40 bg-teal-950/20' : 'text-teal-850 hover:text-teal-950 hover:bg-teal-50/50 border border-teal-100/40 bg-teal-50/20'
                  }`}
                >
                  ✨ OpenMadurAI Hub
                </button>
              </div>

              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  
                  {/* Left stats & welcome */}
                  <div className="lg:col-span-2 space-y-8 animate-fade-in">
                    
                    {/* Public ledger section */}
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-widest block ${theme === 'dark' ? 'text-amber-400' : 'text-red-800'}`}>Accountability Indicators</span>
                        <h2 className={`text-2xl font-bold font-serif ${theme === 'dark' ? 'text-[#C89B3C]' : 'text-teal-950'}`}>Constituency Action Metrics</h2>
                        <p className={`text-xs ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Live tracking of municipal grievance filings, reviews, and verified MP resolutions.</p>
                      </div>

                      {loadingStats ? (
                        <div className="text-center py-6 animate-pulse text-stone-400 font-mono text-xs">
                          Fetching Madurai grievance metrics...
                        </div>
                      ) : counters ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                          {/* Total Received */}
                          <div className={`flex flex-col items-center justify-center p-6 text-center shadow-2xs border rounded-xl transition-all ${theme === 'dark' ? 'bg-stone-900 border-stone-850 text-stone-100' : 'bg-white border-stone-200 text-stone-900'}`}>
                            <div className={`p-3 rounded-full mb-2 border ${theme === 'dark' ? 'bg-teal-950/40 text-teal-300 border-teal-900/40' : 'bg-teal-50 text-teal-900 border-teal-100'}`}>
                              <FileText className="h-5 w-5" />
                            </div>
                            <span className={`text-3.5xl font-mono font-bold ${theme === 'dark' ? 'text-stone-100' : 'text-teal-950'}`}>{counters.totalReceived}</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mt-2">Grievances Registered</span>
                          </div>

                          {/* MP Resolved */}
                          <div className={`flex flex-col items-center justify-center p-6 text-center shadow-2xs border rounded-xl transition-all ${theme === 'dark' ? 'bg-stone-900 border-stone-850 text-stone-100' : 'bg-white border-stone-200 text-stone-900'}`}>
                            <div className={`p-3 rounded-full mb-2 border ${theme === 'dark' ? 'bg-red-950/40 text-red-300 border-red-900/40' : 'bg-red-50 text-red-900 border-red-150'}`}>
                              <CheckCircle2 className="h-5 w-5" />
                            </div>
                            <span className={`text-3.5xl font-mono font-bold ${theme === 'dark' ? 'text-emerald-400' : 'text-red-950'}`}>{counters.resolvedThisMonth}</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mt-2">MP-Resolved Actions</span>
                          </div>

                          {/* Closure rate */}
                          <div className={`flex flex-col items-center justify-center p-6 text-center shadow-2xs border rounded-xl transition-all ${theme === 'dark' ? 'bg-stone-900 border-stone-850 text-stone-100' : 'bg-white border-stone-200 text-stone-900'}`}>
                            <div className={`p-3 rounded-full mb-2 border ${theme === 'dark' ? 'bg-amber-950/40 text-amber-300 border-amber-900/40' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                              <BarChart3 className="h-5 w-5" />
                            </div>
                            <span className={`text-3.5xl font-mono font-bold ${theme === 'dark' ? 'text-stone-100' : 'text-teal-950'}`}>
                              {counters.totalReceived > 0 
                                ? `${Math.round((counters.resolvedThisMonth / counters.totalReceived) * 100)}%` 
                                : '100%'}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mt-2">Resolution Rate</span>
                          </div>
                        </div>
                      ) : null}
                    </div>

                    {/* Quick grievance search widget */}
                    <div className={`p-6 space-y-4 shadow-sm border rounded-xl transition-all ${theme === 'dark' ? 'bg-stone-900 border-stone-850 text-stone-100' : 'bg-white border-stone-200/80 text-stone-900'}`}>
                      <div className="space-y-1">
                        <h3 className={`font-bold text-lg font-serif ${theme === 'dark' ? 'text-[#C89B3C]' : 'text-teal-950'}`}>Instant Grievance Tracker</h3>
                        <p className={`text-xs ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Enter your 8-digit tracking ID (e.g. JV-MDU-101) below to view action logs and status instantly.</p>
                      </div>

                      <form onSubmit={handleQuickTrackSubmit} className="flex gap-2.5">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            value={quickTrackId}
                            onChange={(e) => setQuickTrackId(e.target.value)}
                            placeholder="e.g. JV-MDU-101"
                            className={`w-full pl-8.5 pr-3 py-2.5 rounded-lg text-xs font-semibold focus:outline-hidden transition-all ${theme === 'dark' ? 'bg-stone-950 border-stone-850 text-stone-100 focus:bg-stone-950 focus:border-amber-400' : 'bg-stone-50 border-stone-200 text-slate-800 focus:bg-white focus:border-teal-700'}`}
                          />
                          <Search className="absolute left-2.5 top-3.5 h-3.5 w-3.5 text-stone-400" />
                        </div>
                        <button
                          type="submit"
                          className={`px-5 py-2.5 font-semibold rounded-lg text-xs cursor-pointer transition-colors ${theme === 'dark' ? 'bg-[#C89B3C] hover:bg-amber-300 text-stone-950' : 'bg-teal-900 hover:bg-teal-850 text-white'}`}
                        >
                          Track Status
                        </button>
                      </form>
                    </div>

                    {/* Interactive Citizen Feedback Stream */}
                    <div className="space-y-4">
                      <div className={`border-b pb-2 flex justify-between items-center ${theme === 'dark' ? 'border-stone-850' : 'border-stone-200'}`}>
                        <h3 className={`font-bold text-lg font-serif flex items-center gap-1.5 ${theme === 'dark' ? 'text-amber-400' : 'text-teal-950'}`}>
                          <MessageSquare className="h-4.5 w-4.5 text-teal-900" /> Recent Citizen Reviews
                        </h3>
                        <span className="text-[10px] font-mono text-stone-400 uppercase font-semibold">Verified Resolutions</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {successStories.slice(0, 2).map((st, idx) => (
                          <div key={idx} className={`border rounded-xl p-4 space-y-3 shadow-2xs transition-all ${theme === 'dark' ? 'bg-stone-900 border-stone-850 text-stone-100' : 'bg-white border-stone-200 text-stone-900'}`}>
                            <div className="flex justify-between items-center">
                              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${theme === 'dark' ? 'text-red-350 bg-red-950/40 border border-red-900/50' : 'text-red-800 bg-red-50 border border-red-100'}`}>{st.ward}</span>
                              <div className="flex items-center gap-0.5 text-amber-500">
                                {[...Array(st.rating)].map((_, i) => (
                                  <Star key={i} className="h-3 w-3 fill-amber-500" />
                                ))}
                              </div>
                            </div>
                            <h4 className={`font-bold text-sm font-serif leading-tight ${theme === 'dark' ? 'text-stone-100' : 'text-teal-950'}`}>{st.title}</h4>
                            <p className={`text-xs italic leading-relaxed ${theme === 'dark' ? 'text-stone-300' : 'text-stone-600'}`}>"{st.citizenReview}"</p>
                            <p className="text-[10px] text-stone-400 font-mono text-right">- {st.citizenName}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Right side MP highlight card */}
                  <div className="space-y-6 animate-fade-in">
                    
                    {loadingMp ? (
                      <div className={`border rounded-xl p-6 text-center animate-pulse ${theme === 'dark' ? 'bg-stone-900 border-stone-850' : 'bg-white border-stone-200'}`}>
                        <span className="text-xs font-mono text-stone-400">Loading MP S. Venkatesan's profile...</span>
                      </div>
                    ) : mpProfile ? (
                      <div className={`p-5 shadow-sm space-y-5 flex flex-col justify-between border rounded-xl transition-all ${theme === 'dark' ? 'bg-stone-900 border-stone-850 text-stone-100' : 'bg-white border-stone-200 text-stone-900'}`}>
                        <div className="space-y-4">
                          <h4 className={`text-[10px] font-mono font-bold uppercase tracking-wider border-b pb-2 ${theme === 'dark' ? 'text-amber-400 border-stone-850' : 'text-red-800 border-stone-100'}`}>Elected Member of Parliament</h4>
                          
                          <div className={`h-56 rounded-xl overflow-hidden border relative ${theme === 'dark' ? 'border-stone-800 bg-stone-950' : 'border-stone-200/80 bg-stone-50'}`}>
                            <img
                              src="/src/assets/images/mp_venkatesan_portrait_1783325490674.jpg"
                              alt="S. Venkatesan MP Portrait"
                              className="w-full h-full object-cover object-top"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-2.5 right-2.5 bg-teal-900 text-white p-1 rounded-lg">
                              <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                            </div>
                            <div className="absolute bottom-2.5 left-2.5">
                              <span className="bg-red-900 text-white px-2.5 py-0.5 text-[9px] font-bold rounded-md uppercase tracking-wider border border-red-800">
                                {mpProfile.party}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <h3 className={`font-serif font-bold text-xl leading-tight ${theme === 'dark' ? 'text-amber-400' : 'text-teal-950'}`}>{mpProfile.name}</h3>
                            <p className={`text-xs font-medium ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>MP for Madurai Lok Sabha Constituency</p>
                            <p className={`text-[10px] font-mono italic ${theme === 'dark' ? 'text-stone-500' : 'text-stone-400'}`}>CPI(M) Central Committee Member · Tamil Writers Association President</p>
                          </div>

                          <p className={`text-xs leading-relaxed line-clamp-4 pt-1.5 border-t ${theme === 'dark' ? 'text-stone-300 border-stone-850' : 'text-stone-600 border-stone-100/60'}`}>
                            {mpProfile.biography}
                          </p>
                        </div>

                        <div className={`space-y-2 pt-3 border-t ${theme === 'dark' ? 'border-stone-850' : 'border-stone-100'}`}>
                          <button
                            onClick={() => {
                              setCurrentView('profile');
                              setActiveTab('about_mp');
                            }}
                            className={`w-full py-2 border rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${theme === 'dark' ? 'bg-stone-950 hover:bg-stone-800 border-stone-800 text-amber-400' : 'bg-stone-100 hover:bg-stone-200 border-stone-200 text-teal-950'}`}
                          >
                            Read Full Biography & Stats <ChevronRight className="h-3.5 w-3.5 text-teal-900" />
                          </button>
                        </div>
                      </div>
                    ) : null}

                    {/* Grievance Category distribution chart summary */}
                    {counters && counters.topCategories && counters.topCategories.length > 0 && (
                      <div className={`rounded-xl p-5 shadow-2xs space-y-4 border transition-all ${theme === 'dark' ? 'bg-stone-900 border-stone-850 text-stone-100' : 'bg-white border-stone-200 text-stone-900'}`}>
                        <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">Grievance Distribution</h4>
                        <div className="space-y-3">
                          {counters.topCategories.slice(0, 4).map((item, idx) => {
                            const total = counters.topCategories.reduce((acc, c) => acc + c.count, 0) || 1;
                            const percentage = Math.round((item.count / total) * 100);

                            return (
                              <div key={idx} className="space-y-1">
                                <div className="flex justify-between text-[11px] font-semibold text-stone-850 dark:text-stone-200">
                                  <span>{item.category}</span>
                                  <span className={`font-mono ${theme === 'dark' ? 'text-amber-400' : 'text-teal-950'}`}>{item.count} filed</span>
                                </div>
                                <div className={`w-full h-1.5 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-stone-950' : 'bg-stone-100'}`}>
                                  <div style={{ width: `${percentage}%` }} className={`h-full rounded-full ${theme === 'dark' ? 'bg-amber-400' : 'bg-teal-900'}`} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  </div>

                </div>

                {/* Phase 1 Part 3: Interactive Development Project Map */}
                <div className="mt-8">
                  <InteractiveMap theme={theme} />
                </div>

                {/* Phase 4: Smart Civic Analytics Dashboard */}
                <div className="mt-12">
                  <div className={`border-b pb-3 mb-6 text-left ${theme === 'dark' ? 'border-stone-850' : 'border-stone-200'}`}>
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-widest block ${theme === 'dark' ? 'text-amber-400' : 'text-[#6B1E24]'}`}>Phase 4 Analytics</span>
                    <h3 className={`text-2xl font-serif font-bold ${theme === 'dark' ? 'text-[#C89B3C]' : 'text-[#0E5C4B]'}`}>Smart Civic Analytics Dashboard</h3>
                    <p className={`text-xs ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>A comprehensive visual breakdown of local issues categorized by urgency, status lifecycles, and resolution timelines.</p>
                  </div>
                  <AnalyticsCharts theme={theme} />
                </div>
                </>
              )}

              {/* TAB 2: ABOUT MP PROFILE */}
              {activeTab === 'about_mp' && mpProfile && (
                <div className="space-y-8 animate-fade-in">
                  <div className={`border rounded-2xl overflow-hidden shadow-xs p-6 sm:p-8 transition-all ${theme === 'dark' ? 'bg-stone-900 border-stone-850 text-stone-100' : 'bg-white border-stone-200 text-stone-900'}`}>
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      
                      {/* Portrait */}
                      <div className={`w-full md:w-56 h-64 rounded-xl overflow-hidden border shrink-0 relative shadow-2xs ${theme === 'dark' ? 'border-stone-800 bg-stone-950' : 'border-stone-200 bg-stone-100'}`}>
                        <img
                          src="/src/assets/images/mp_venkatesan_portrait_1783325490674.jpg"
                          alt={mpProfile.name}
                          className="w-full h-full object-cover object-top"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-3 left-3">
                          <span className="px-2.5 py-0.5 text-[9px] font-mono font-bold bg-red-900 text-white rounded border border-red-800 uppercase tracking-wider">
                            {mpProfile.party}
                          </span>
                        </div>
                      </div>

                      {/* Bio content */}
                      <div className="space-y-4 flex-1">
                        <div className="space-y-1">
                          <span className={`text-[10px] font-mono font-bold uppercase tracking-widest block ${theme === 'dark' ? 'text-amber-400' : 'text-red-800'}`}>Lok Sabha Profile</span>
                          <h2 className={`text-3xl font-bold font-serif leading-tight ${theme === 'dark' ? 'text-amber-400' : 'text-teal-950'}`}>{mpProfile.name}</h2>
                          <p className={`text-xs font-semibold font-mono ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Member of Parliament (Madurai Constituency) · CPI(M)</p>
                        </div>

                        <div className={`space-y-2 border-t pt-3 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${theme === 'dark' ? 'border-stone-800 text-stone-300' : 'border-stone-100 text-stone-700'}`}>
                          <p>{mpProfile.biography}</p>
                          <p className="pt-2"><strong>A Literary Voice in Parliament:</strong> Beyond his political career, S. Venkatesan is a celebrated Tamil novelist and writer. He won the prestigious <strong>Sahitya Akademi Award</strong> in 2011 for his historical epic <em>Kaval Kottam</em>, which depicts the rich history and guardianship of Madurai. He is also the President of the Tamil Nadu Progressive Writers and Artists Association, actively championing local heritage preservation and artistic communities.</p>
                          <p>In the Lok Sabha, S. Venkatesan has been an active voice representing the subalterns, constantly raising questions on railway connectivity, health infrastructure, and craft weavers' livelihoods in Madurai.</p>
                        </div>

                        {/* Attendance, Debates, Questions stats */}
                        <div className={`grid grid-cols-3 gap-4 border-t border-b py-4 mt-4 p-4 rounded-xl text-center ${theme === 'dark' ? 'bg-stone-950/60 border-stone-800/60' : 'bg-stone-50/50 border-stone-100'}`}>
                          <div>
                            <span className={`block text-xl sm:text-2xl font-bold font-mono ${theme === 'dark' ? 'text-amber-400' : 'text-teal-900'}`}>98%</span>
                            <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">Parliament Attendance</span>
                          </div>
                          <div>
                            <span className={`block text-xl sm:text-2xl font-bold font-mono ${theme === 'dark' ? 'text-amber-400' : 'text-teal-900'}`}>105+</span>
                            <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">Questions Raised</span>
                          </div>
                          <div>
                            <span className={`block text-xl sm:text-2xl font-bold font-mono ${theme === 'dark' ? 'text-amber-400' : 'text-teal-900'}`}>18+</span>
                            <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">Debates Attended</span>
                          </div>
                        </div>

                        {/* Contact details */}
                        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs p-4 border rounded-xl ${theme === 'dark' ? 'text-stone-300 bg-stone-950 border-stone-850' : 'text-stone-600 bg-stone-50 border-stone-200/40'}`}>
                          <div className="flex items-center gap-2.5">
                            <div className={`p-1.5 border rounded-lg text-stone-500 ${theme === 'dark' ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200/60'}`}>
                              <Mail className="h-4 w-4" />
                            </div>
                            <div>
                              <span className="block text-[10px] text-stone-400 font-medium">Official Parliament Email</span>
                              <a href={`mailto:${mpProfile.email}`} className={`font-semibold hover:underline ${theme === 'dark' ? 'text-amber-400' : 'text-teal-950'}`}>{mpProfile.email}</a>
                            </div>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <div className={`p-1.5 border rounded-lg text-stone-500 ${theme === 'dark' ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200/60'}`}>
                              <Phone className="h-4 w-4" />
                            </div>
                            <div>
                              <span className="block text-[10px] text-stone-400 font-medium">Residence Office / Contact</span>
                              <span className={`font-semibold ${theme === 'dark' ? 'text-stone-100' : 'text-stone-800'}`}>{mpProfile.phone}</span>
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Committees card */}
                    <div className={`p-6 space-y-4 border rounded-xl transition-all ${theme === 'dark' ? 'bg-stone-900 border-stone-850 text-stone-100' : 'bg-white border-stone-200 text-stone-900'}`}>
                      <div className={`flex items-center gap-2 border-b pb-2.5 ${theme === 'dark' ? 'border-stone-800' : 'border-stone-100'}`}>
                        <Building className="h-5 w-5 text-teal-900" />
                        <h3 className={`font-bold font-serif text-base ${theme === 'dark' ? 'text-amber-400' : 'text-teal-950'}`}>Committees Served</h3>
                      </div>
                      <ul className={`space-y-3 text-xs ${theme === 'dark' ? 'text-stone-300' : 'text-stone-600'}`}>
                        {mpProfile.committees.map((comm, idx) => (
                          <li key={idx} className="flex gap-2 items-start">
                            <Award className="h-4 w-4 text-red-900 shrink-0 mt-0.5" />
                            <span>{comm}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Parliamentary Activities card */}
                    <div className={`p-6 space-y-4 border rounded-xl transition-all ${theme === 'dark' ? 'bg-stone-900 border-stone-850 text-stone-100' : 'bg-white border-stone-200 text-stone-900'}`}>
                      <div className={`flex items-center gap-2 border-b pb-2.5 ${theme === 'dark' ? 'border-stone-800' : 'border-stone-100'}`}>
                        <BookOpen className="h-5 w-5 text-teal-900" />
                        <h3 className={`font-bold font-serif text-base ${theme === 'dark' ? 'text-amber-400' : 'text-teal-950'}`}>Key Parliamentary Interventions</h3>
                      </div>
                      <ul className={`space-y-3.5 text-xs ${theme === 'dark' ? 'text-stone-300' : 'text-stone-600'}`}>
                        {mpProfile.recentActivities.map((act, idx) => (
                          <li key={idx} className="relative pl-4 border-l-2 border-teal-900/40">
                            <span className="absolute -left-1.5 top-1 h-2.5 w-2.5 rounded-full bg-teal-900" />
                            <p>{act}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 3: ONGOING PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-1">
                    <h2 className={`text-2xl font-bold font-serif ${theme === 'dark' ? 'text-amber-400' : 'text-teal-950'}`}>Major Development Schemes in Madurai</h2>
                    <p className={`text-xs ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>A review of large infrastructural, agricultural, and educational schemes tracked directly under S. Venkatesan MP's constituency mandate.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {maduraiProjects.map((proj) => (
                      <div key={proj.id} className={`border rounded-xl shadow-2xs p-6 hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 ${theme === 'dark' ? 'bg-stone-900 border-stone-850 text-stone-100' : 'bg-white border-stone-200 text-stone-900'}`}>
                        <div className="space-y-2">
                          <div className="flex justify-between items-start gap-3">
                            <h3 className={`font-bold font-serif text-base leading-tight ${theme === 'dark' ? 'text-stone-100' : 'text-teal-950'}`}>{proj.title}</h3>
                            <span className="px-2.5 py-0.5 text-[9px] font-mono font-bold bg-teal-50 text-teal-900 rounded border border-teal-200 uppercase tracking-wider shrink-0 mt-0.5">
                              {proj.status}
                            </span>
                          </div>
                          <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-stone-300' : 'text-stone-600'}`}>{proj.description}</p>
                        </div>

                        <div className={`flex justify-between items-center pt-3 border-t text-[10px] font-mono ${theme === 'dark' ? 'border-stone-800 text-stone-400' : 'border-stone-100 text-stone-400'}`}>
                          <span>Budget Allocation: <strong className={`font-sans font-semibold ${theme === 'dark' ? 'text-amber-400' : 'text-teal-950'}`}>{proj.budget}</strong></span>
                          <span>{proj.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: PARLIAMENT SPEECHES */}
              {activeTab === 'parliament' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-1">
                    <h2 className={`text-2xl font-bold font-serif ${theme === 'dark' ? 'text-amber-400' : 'text-teal-950'}`}>Lok Sabha Floor Interventions</h2>
                    <p className={`text-xs ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Official statements, floor debates, and parliamentary files submitted on behalf of Madurai citizens.</p>
                  </div>

                  <div className="space-y-4">
                    {parliamentSpeeches.map((sp, idx) => (
                      <div key={idx} className={`border rounded-xl shadow-2xs p-5 hover:shadow-md transition-all duration-200 space-y-3 ${theme === 'dark' ? 'bg-stone-900 border-stone-850 text-stone-100' : 'bg-white border-stone-200 text-stone-900'}`}>
                        <div className="flex justify-between items-center flex-wrap gap-2">
                          <span className="px-2 py-0.5 text-[9px] font-mono font-bold text-red-900 bg-red-50 border border-red-150 rounded uppercase">
                            {sp.category}
                          </span>
                          <span className="text-[10px] text-stone-400 font-mono flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" /> {sp.date}
                          </span>
                        </div>
                        <h3 className={`font-bold font-serif text-base leading-tight ${theme === 'dark' ? 'text-[#C89B3C]' : 'text-teal-950'}`}>{sp.title}</h3>
                        <p className={`text-xs leading-relaxed italic border-l-2 pl-3 ${theme === 'dark' ? 'text-stone-300 border-[#C89B3C]/40' : 'text-stone-600 border-red-800/40'}`}>
                          "{sp.summary}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: SUCCESS STORIES */}
              {activeTab === 'success_stories' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-1">
                    <h2 className={`text-2xl font-bold font-serif ${theme === 'dark' ? 'text-amber-400' : 'text-teal-950'}`}>Resolved Grievance Highlights</h2>
                    <p className={`text-xs ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Real-world examples showing how citizen alerts submitted on JanVaani have led to municipal actions in Madurai.</p>
                  </div>

                  <div className="space-y-6">
                    {successStories.map((story, idx) => (
                      <div key={idx} className={`border rounded-xl shadow-2xs p-6 hover:shadow-md transition-all duration-200 space-y-4 ${theme === 'dark' ? 'bg-stone-900 border-stone-850 text-stone-100' : 'bg-white border-stone-200 text-stone-900'}`}>
                        <div className={`flex justify-between items-center flex-wrap gap-2 border-b pb-3 ${theme === 'dark' ? 'border-stone-800' : 'border-stone-100'}`}>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold text-red-800 bg-red-50 border border-red-100 px-2 py-0.5 rounded">{story.ward}</span>
                            <span className="text-[10px] font-mono text-stone-400">Category: {story.category}</span>
                          </div>
                          <span className="px-2.5 py-0.5 text-[9px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider rounded">
                            Resolution Approved
                          </span>
                        </div>

                        <div className="space-y-2">
                          <h3 className={`font-bold font-serif text-base ${theme === 'dark' ? 'text-amber-400' : 'text-teal-950'}`}>{story.title}</h3>
                          <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-stone-300' : 'text-stone-600'}`}>{story.description}</p>
                        </div>

                        {/* Citizen review quote block */}
                        <div className={`p-4 border-l-4 rounded-r-xl space-y-2 ${theme === 'dark' ? 'bg-stone-950 border-[#C89B3C]' : 'bg-stone-50 border-teal-900'}`}>
                          <div className="flex justify-between items-center">
                            <span className={`text-[10px] font-mono font-bold uppercase ${theme === 'dark' ? 'text-amber-400' : 'text-teal-900'}`}>Citizen Verification Review</span>
                            <div className="flex gap-0.5 text-amber-500">
                              {[...Array(story.rating)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-amber-500" />
                              ))}
                            </div>
                          </div>
                          <p className={`text-xs italic leading-relaxed ${theme === 'dark' ? 'text-stone-300' : 'text-stone-600'}`}>"{story.citizenReview}"</p>
                          <p className="text-[10px] text-stone-400 font-mono text-right">- {story.citizenName}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: OPENMADURAI ECOSYSTEM */}
              {activeTab === 'open_madurai' && (
                <div className="space-y-10 animate-fade-in">
                  
                  {/* SECTION 1: UNLEASH THE POWER OF MADURAI'S GLOBAL TALENT (Screenshot 2 faithful) */}
                  <div className={`border rounded-2xl p-6 sm:p-12 relative overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all ${theme === 'dark' ? 'bg-stone-900 border-stone-850 text-stone-100' : 'bg-white border-stone-200 text-stone-900'}`}>
                    <div className="lg:col-span-7 space-y-6">
                      <div className={`inline-flex items-center gap-2 border px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase ${theme === 'dark' ? 'bg-teal-950/40 border-teal-900/40 text-teal-300' : 'bg-teal-50 border-teal-100 text-teal-900'}`}>
                        <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" /> Join 5,000+ Innovators
                      </div>
                      
                      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black font-sans leading-tight tracking-tight ${theme === 'dark' ? 'text-stone-100' : 'text-stone-900'}`}>
                        Unleash the Power of <br />
                        <span className="text-teal-600 font-extrabold dark:text-amber-400">Madurai's</span> Global Talent
                      </h2>

                      <p className={`text-xs sm:text-sm leading-relaxed max-w-xl ${theme === 'dark' ? 'text-stone-300' : 'text-stone-600'}`}>
                        Join the premier ecosystem connecting local innovators with global opportunities. Collaborate, scale, and lead from South India.
                      </p>

                      {/* Interactive search bar style */}
                      <div className="relative max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                          <Search className="h-4.5 w-4.5" />
                        </div>
                        <input
                          type="text"
                          placeholder="Search for developers or tools..."
                          className={`w-full pl-10 pr-4 py-3 rounded-lg text-xs font-sans focus:outline-hidden transition-all ${theme === 'dark' ? 'bg-stone-950 border-stone-850 text-stone-100 focus:bg-stone-950 focus:border-teal-500' : 'bg-stone-50 border-stone-200 rounded-lg text-xs font-sans focus:outline-hidden focus:border-teal-600 focus:bg-white text-stone-850'}`}
                        />
                      </div>

                      <div className="flex flex-wrap gap-3 pt-2">
                        <button className={`px-6 py-3 font-bold rounded-lg text-xs tracking-wider transition-colors cursor-pointer shadow-xs ${theme === 'dark' ? 'bg-amber-400 hover:bg-amber-300 text-stone-950' : 'bg-teal-950 hover:bg-teal-900 text-white'}`}>
                          Get Started →
                        </button>
                        <button className={`px-6 py-3 border font-bold rounded-lg text-xs tracking-wider transition-colors cursor-pointer ${theme === 'dark' ? 'bg-stone-950 border-stone-850 text-stone-300 hover:text-stone-100 hover:bg-stone-900' : 'bg-white border-stone-200 text-stone-755 hover:text-stone-950 hover:bg-stone-50'}`}>
                          View Community
                        </button>
                      </div>

                      {/* Stats row */}
                      <div className={`grid grid-cols-3 gap-4 pt-6 border-t max-w-lg ${theme === 'dark' ? 'border-stone-800' : 'border-stone-100'}`}>
                        <div>
                          <span className={`block text-2xl font-black font-sans leading-none ${theme === 'dark' ? 'text-amber-400' : 'text-teal-950'}`}>5k+</span>
                          <span className="text-[10px] font-mono text-stone-400 font-bold uppercase tracking-wider block mt-1">Members</span>
                        </div>
                        <div>
                          <span className={`block text-2xl font-black font-sans leading-none ${theme === 'dark' ? 'text-amber-400' : 'text-teal-950'}`}>100+</span>
                          <span className="text-[10px] font-mono text-stone-400 font-bold uppercase tracking-wider block mt-1">Alumni</span>
                        </div>
                        <div>
                          <span className={`block text-2xl font-black font-sans leading-none ${theme === 'dark' ? 'text-amber-400' : 'text-teal-950'}`}>50+</span>
                          <span className="text-[10px] font-mono text-stone-400 font-bold uppercase tracking-wider block mt-1">Startups</span>
                        </div>
                      </div>
                    </div>

                    {/* Right side Temple drawing */}
                    <div className="lg:col-span-5 flex justify-center items-center">
                      <div className={`relative w-full max-w-xs sm:max-w-sm rounded-xl overflow-hidden border shadow-2xs hover:scale-101 transition-transform duration-300 ${theme === 'dark' ? 'border-stone-850 bg-stone-950' : 'border-stone-100 bg-white'}`}>
                        <img
                          src="/src/assets/images/madurai_gopuram_minimal_1783327375532.jpg"
                          alt="Madurai Gopuram Minimal Sketch"
                          className="w-full h-auto object-contain max-h-[380px] sm:max-h-[460px] p-2"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-2.5 right-2.5 bg-stone-900/80 backdrop-blur-xs text-[8px] font-mono text-white px-2 py-0.5 rounded border border-white/10 uppercase tracking-widest font-semibold">
                          Gopuram Vector Architectural Sketch
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: NATIVE ALUMNI CONNECT BANNER (Screenshot 1 faithful) */}
                  <div className={`relative border rounded-2xl overflow-hidden shadow-xs ${theme === 'dark' ? 'bg-stone-950 border-stone-850' : 'bg-[#fcfbfa] border-stone-200'}`}>
                    
                    {/* The beautiful banner container with image in background and absolute elements */}
                    <div className="relative min-h-[360px] sm:min-h-[440px] flex flex-col justify-center items-center text-center px-4 py-16">
                      
                      {/* Banner Background Image */}
                      <img
                        src="/src/assets/images/madurai_community_banner_1783327392206.jpg"
                        alt="Native Alumni Connect Landscape Banner"
                        className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-multiply pointer-events-none"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Subtle dark/soft-tint gradient over background to preserve text readability */}
                      <div className={`absolute inset-0 pointer-events-none ${theme === 'dark' ? 'bg-gradient-to-b from-stone-950/90 via-transparent to-stone-950/90' : 'bg-gradient-to-b from-[#fcfbfa]/90 via-transparent to-[#fcfbfa]/90'}`} />
 
                      {/* Content block centered */}
                      <div className="relative z-10 space-y-5 max-w-3xl">
                        <div className={`inline-flex items-center gap-1.5 border px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${theme === 'dark' ? 'bg-teal-950/40 border-teal-900/40 text-teal-300' : 'bg-teal-50 border-teal-200/60 text-teal-900'}`}>
                          🎓 OpenMadurAI Professional Guild
                        </div>
                        
                        <h3 className={`text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight leading-tight ${theme === 'dark' ? 'text-stone-100' : 'text-stone-900'}`}>
                          Native Alumni <span className="text-emerald-600 dark:text-amber-400">Connect</span>
                        </h3>

                        <p className={`text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-sans ${theme === 'dark' ? 'text-stone-300' : 'text-stone-600'}`}>
                          A vibrant community of founders, engineers, and visionaries shaping the future of AI. <br className="hidden sm:inline" />
                          Discover stories, find mentors, and grow together.
                        </p>

                        <div className="flex flex-wrap justify-center gap-3.5 pt-2">
                          <button className={`px-6 py-3 font-bold rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs ${theme === 'dark' ? 'bg-amber-400 hover:bg-amber-300 text-stone-950' : 'bg-teal-950 hover:bg-teal-900 text-white'}`}>
                            Register as Alumni
                          </button>
                          <button className={`px-6 py-3 border font-bold rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer shadow-2xs ${theme === 'dark' ? 'bg-stone-900 border-stone-850 text-stone-300 hover:text-stone-100 hover:bg-stone-850 font-semibold' : 'bg-white border-stone-200 text-stone-700 hover:text-stone-900 hover:bg-stone-50 font-semibold'}`}>
                            Explore Alumni
                          </button>
                        </div>
                      </div>

                    </div>

                    {/* Stats cards overlapping / positioned perfectly at the bottom like the screenshot */}
                    <div className={`border-t px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-5 ${theme === 'dark' ? 'bg-stone-900 border-stone-850' : 'bg-white border-stone-150'}`}>
                      
                      {/* Stat 1: Total Alumni */}
                      <div className={`flex items-center gap-4 border p-4 rounded-xl ${theme === 'dark' ? 'bg-stone-950 border-stone-850' : 'bg-stone-50/60 border-stone-200/70'}`}>
                        <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-teal-950/40 text-teal-300 border border-teal-900/30' : 'bg-teal-50 border border-teal-100 text-teal-950'}`}>
                          <Users className="h-5.5 w-5.5" />
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-stone-500 font-sans uppercase tracking-wider leading-none">Total Alumni</span>
                          <span className={`block text-2xl font-bold font-mono mt-1 ${theme === 'dark' ? 'text-amber-400' : 'text-teal-950'}`}>11</span>
                        </div>
                      </div>

                      {/* Stat 2: Mentors */}
                      <div className={`flex items-center gap-4 border p-4 rounded-xl ${theme === 'dark' ? 'bg-stone-950 border-stone-850' : 'bg-stone-50/60 border-stone-200/70'}`}>
                        <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-rose-950/40 text-rose-350 border border-rose-900/30' : 'bg-rose-50 border border-rose-100 text-rose-950'}`}>
                          <GraduationCap className="h-5.5 w-5.5" />
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-stone-500 font-sans uppercase tracking-wider leading-none">Mentors</span>
                          <span className={`block text-2xl font-bold font-mono mt-1 ${theme === 'dark' ? 'text-rose-450' : 'text-rose-950'}`}>8</span>
                        </div>
                      </div>

                      {/* Stat 3: Speakers */}
                      <div className={`flex items-center gap-4 border p-4 rounded-xl ${theme === 'dark' ? 'bg-stone-950 border-stone-850' : 'bg-stone-50/60 border-stone-200/70'}`}>
                        <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-amber-950/40 text-amber-350 border border-amber-900/30' : 'bg-amber-50 border border-amber-100 text-amber-950'}`}>
                          <Radio className="h-5.5 w-5.5" />
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-stone-500 font-sans uppercase tracking-wider leading-none">Speakers</span>
                          <span className={`block text-2xl font-bold font-mono mt-1 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-950'}`}>6</span>
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* Strategic Tech Pillars */}
                  <div className="space-y-4">
                    <h3 className={`text-lg font-bold font-serif ${theme === 'dark' ? 'text-amber-400' : 'text-teal-950'}`}>Strategic AI Development Pillars</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                      
                      <div className={`border rounded-xl p-5 shadow-2xs space-y-3 hover:scale-[1.01] transition-all duration-200 ${theme === 'dark' ? 'bg-stone-900 border-stone-850 text-stone-100' : 'bg-white border-stone-200 text-stone-900'}`}>
                        <div className="h-10 w-10 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-950 font-bold text-lg">
                          💻
                        </div>
                        <h4 className={`font-bold text-sm ${theme === 'dark' ? 'text-stone-100' : 'text-stone-900'}`}>ELCOT Vadapalanji AI Sandbox</h4>
                        <p className={`text-[11px] leading-relaxed ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>
                          Secured dedicated allocation for deep tech startups, AI incubation corridors, and high-speed labs inside Madurai ELCOT Vadapalanji park.
                        </p>
                      </div>

                      <div className={`border rounded-xl p-5 shadow-2xs space-y-3 hover:scale-[1.01] transition-all duration-200 ${theme === 'dark' ? 'bg-stone-900 border-stone-850 text-stone-100' : 'bg-white border-stone-200 text-stone-900'}`}>
                        <div className="h-10 w-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-950 font-bold text-lg">
                          ⚡
                        </div>
                        <h4 className={`font-bold text-sm ${theme === 'dark' ? 'text-stone-100' : 'text-stone-900'}`}>Community Compute Pool</h4>
                        <p className={`text-[11px] leading-relaxed ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>
                          MP campaign seeking centralized high-performance GPU grants (A100/H100 clusters) specifically pooled for local open-source researchers.
                        </p>
                      </div>

                      <div className={`border rounded-xl p-5 shadow-2xs space-y-3 hover:scale-[1.01] transition-all duration-200 ${theme === 'dark' ? 'bg-stone-900 border-stone-850 text-stone-100' : 'bg-white border-stone-200 text-stone-900'}`}>
                        <div className="h-10 w-10 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-950 font-bold text-lg">
                          📚
                        </div>
                        <h4 className={`font-bold text-sm ${theme === 'dark' ? 'text-stone-100' : 'text-stone-900'}`}>Tamil LLM Localization</h4>
                        <p className={`text-[11px] leading-relaxed ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>
                          Funding digital initiatives to fine-tune regional models on Sangam literature, ancient Tamil epigraphy, and native conversational idioms.
                        </p>
                      </div>

                      <div className={`border rounded-xl p-5 shadow-2xs space-y-3 hover:scale-[1.01] transition-all duration-200 ${theme === 'dark' ? 'bg-stone-900 border-stone-850 text-stone-100' : 'bg-white border-stone-200 text-stone-900'}`}>
                        <div className="h-10 w-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-950 font-bold text-lg">
                          🧠
                        </div>
                        <h4 className={`font-bold text-sm ${theme === 'dark' ? 'text-stone-100' : 'text-stone-900'}`}>Corporation School Upskilling</h4>
                        <p className={`text-[11px] leading-relaxed ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>
                          Equipping 48 Government Corporation Schools with foundational Prompt Engineering courses, visual model sandboxes, and modern coding tools.
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* Interactive Proposal Board */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Submission Form Column */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className={`p-6 rounded-2xl border shadow-sm space-y-4 ${theme === 'dark' ? 'bg-stone-900 border-stone-850' : 'bg-slate-900 text-slate-100 border-slate-800'}`}>
                        <div className="space-y-1 text-left">
                          <h3 className="font-bold text-base text-white">Submit an AI Project Proposal</h3>
                          <p className={`text-xs ${theme === 'dark' ? 'text-stone-400' : 'text-slate-400'}`}>Are you an AI developer or startup founder in Madurai? Pitch your civic tech concept directly to the MP development squad.</p>
                        </div>

                        <form onSubmit={handleAiProposalSubmit} className="space-y-4 text-slate-800 text-xs font-sans">
                          <div className="text-left">
                            <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1.5 ${theme === 'dark' ? 'text-amber-400' : 'text-slate-300'}`}>Project / Tool Name</label>
                            <input
                              type="text"
                              value={aiTitle}
                              onChange={(e) => setAiTitle(e.target.value)}
                              placeholder="e.g. Madurai Traffic AI Vision"
                              className={`w-full border rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-hidden focus:border-teal-500 ${theme === 'dark' ? 'bg-stone-950 border-stone-850' : 'bg-slate-800 border-slate-700'}`}
                              required
                            />
                          </div>

                          <div className="text-left">
                            <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1.5 ${theme === 'dark' ? 'text-amber-400' : 'text-slate-300'}`}>Developer / Founder Name & Bio</label>
                            <input
                              type="text"
                              value={aiDev}
                              onChange={(e) => setAiDev(e.target.value)}
                              placeholder="e.g. Ramkumar S., NLP Architect"
                              className={`w-full border rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-hidden focus:border-teal-500 ${theme === 'dark' ? 'bg-stone-950 border-stone-850' : 'bg-slate-800 border-slate-700'}`}
                              required
                            />
                          </div>

                          <div className="text-left">
                            <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1.5 ${theme === 'dark' ? 'text-amber-400' : 'text-slate-300'}`}>Type of Support Requested</label>
                            <select
                              value={aiSupport}
                              onChange={(e) => setAiSupport(e.target.value)}
                              className={`w-full border rounded-lg px-3.5 py-2.5 text-white focus:outline-hidden focus:border-teal-500 cursor-pointer ${theme === 'dark' ? 'bg-stone-950 border-stone-850' : 'bg-slate-800 border-slate-700'}`}
                            >
                              <option value="Compute Infrastructure">Compute Infrastructure (GPUs)</option>
                              <option value="Municipal API & CCTV access">Municipal API & CCTV access</option>
                              <option value="Incubation & ELCOT Co-working Space">Incubation & ELCOT Co-working Space</option>
                              <option value="Government Pilot/Adoption Scheme">Government Pilot/Adoption Scheme</option>
                              <option value="Local Language Datasets">Local Language Datasets (Cultural Collab)</option>
                            </select>
                          </div>

                          <div className="text-left">
                            <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1.5 ${theme === 'dark' ? 'text-amber-400' : 'text-slate-300'}`}>Project Pitch & Civic Value</label>
                            <textarea
                              rows={4}
                              value={aiPitch}
                              onChange={(e) => setAiPitch(e.target.value)}
                              placeholder="Describe your AI architecture, what problem it solves in Madurai, and how the MP's office can accelerate your team."
                              className={`w-full border rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-hidden focus:border-teal-500 resize-none ${theme === 'dark' ? 'bg-stone-950 border-stone-850' : 'bg-slate-800 border-slate-700'}`}
                              required
                            />
                          </div>

                          <button
                            type="submit"
                            className={`w-full py-3 font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer text-center ${theme === 'dark' ? 'bg-amber-400 hover:bg-amber-300 text-stone-950' : 'bg-teal-500 hover:bg-teal-400 text-slate-950'}`}
                          >
                            Post Proposal to Board
                          </button>
                        </form>
                      </div>
                    </div>

                    {/* Active Proposal Feed Column */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className={`border-b pb-2 flex justify-between items-center ${theme === 'dark' ? 'border-stone-850' : 'border-stone-200'}`}>
                        <h3 className={`font-bold text-lg font-serif flex items-center gap-1.5 ${theme === 'dark' ? 'text-amber-400' : 'text-teal-950'}`}>
                          💡 Open Source AI Proposals
                        </h3>
                        <span className="text-[10px] font-mono text-stone-400 uppercase font-semibold">Community Submissions</span>
                      </div>

                      <div className="space-y-4 max-h-[580px] overflow-y-auto pr-2">
                        {aiProposals.map((prop, idx) => (
                          <div key={idx} className={`border rounded-xl p-5 space-y-3.5 shadow-2xs hover:shadow-xs transition-shadow duration-200 ${theme === 'dark' ? 'bg-stone-900 border-stone-850 text-stone-100' : 'bg-white border-stone-200 text-stone-900'}`}>
                            <div className="flex justify-between items-start gap-2 flex-wrap">
                              <div className="text-left">
                                <h4 className={`font-bold text-sm font-sans ${theme === 'dark' ? 'text-amber-400' : 'text-teal-950'}`}>{prop.title}</h4>
                                <span className="text-[10px] font-mono text-stone-400">By {prop.developer}</span>
                              </div>
                              <span className="px-2 py-0.5 text-[8px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200 rounded uppercase tracking-wider">
                                {prop.date}
                              </span>
                            </div>
                            
                            <p className={`text-xs leading-relaxed text-left ${theme === 'dark' ? 'text-stone-300' : 'text-stone-600'}`}>
                              {prop.pitch}
                            </p>

                            <div className={`pt-2.5 border-t flex items-center justify-between text-[10px] font-mono ${theme === 'dark' ? 'border-stone-800' : 'border-stone-100'}`}>
                              <span className="text-stone-400">Request: <strong className={`font-semibold ${theme === 'dark' ? 'text-amber-400' : 'text-teal-900'}`}>{prop.support}</strong></span>
                              <span className="text-red-800 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-100 uppercase tracking-widest text-[8px]">
                                Pending Triage
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>
              )}

            </section>

          </div>
        )}

      </main>

      {/* 4. Heritage Footer */}
      <footer className="bg-stone-900 text-stone-400 border-t border-stone-800 py-10 mt-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-stone-800 pb-6">
            <div className="flex items-center gap-2">
              <Landmark className="h-6 w-6 text-amber-400" />
              <div>
                <span className="text-sm font-bold text-white font-serif tracking-wider">Madurai MP Citizen Engagement Council</span>
                <p className="text-[10px] text-stone-500">Connecting Lok Sabha representatives with municipal electors.</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-teal-400 font-mono font-bold uppercase tracking-wider bg-teal-950/60 border border-teal-900 px-2.5 py-1 rounded">
                Powered by Gemini 2.5 Flash AI Triage
              </span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between text-[10px] text-stone-500 gap-2">
            <p>© 2026. Official civic communication platform under parliamentary constituency mandate.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Constitutional Rights</a>
              <a href="#" className="hover:text-white transition-colors">Usage Policies</a>
              <a href="#" className="hover:text-white transition-colors">Help & Documentation</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 5. Interactive Contact Dialog Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl border-2 border-[#C89B3C]/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-5 bg-[#0E5C4B] text-white flex justify-between items-center border-b border-[#C89B3C]/20">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-white/15 rounded-lg text-[#C89B3C]">
                  <GopuramIcon className="h-5 w-5 text-[#C89B3C]" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-white">Constituency Contact Hub</h3>
                  <p className="text-[10px] text-[#C89B3C] uppercase tracking-wider font-mono font-bold">Office of S. Venkatesan, MP</p>
                </div>
              </div>
              <button
                onClick={() => setShowContactModal(false)}
                className="p-1 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content (Scrollable if needed) */}
            <div className="p-6 space-y-6 overflow-y-auto text-stone-800 text-xs">
              
              {/* Madurai Office */}
              <div className="bg-[#FBF9F4] border border-[#C89B3C]/20 rounded-xl p-4.5 space-y-3">
                <span className="text-[9px] font-mono text-[#6B1E24] font-bold uppercase tracking-widest block">Main Nodal Office (Madurai)</span>
                <h4 className="font-serif font-bold text-[#0E5C4B] text-sm flex items-center gap-1.5">
                  <Building className="h-4 w-4 text-[#C89B3C]" /> Goripalayam MP Office
                </h4>
                <p className="text-stone-600 leading-relaxed font-sans">
                  Member of Parliament Office, Goripalayam Main Junction,<br />
                  (Opposite Government Rajaji Hospital Transit Gate),<br />
                  Madurai, Tamil Nadu - 625020
                </p>
                <div className="flex flex-col sm:flex-row gap-2 pt-1 border-t border-stone-200/50">
                  <a
                    href="tel:04522533221"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 bg-white hover:bg-stone-50 text-[#0E5C4B] border border-stone-200 rounded-lg font-bold transition-all text-[11px]"
                  >
                    <Phone className="h-3.5 w-3.5" /> 0452-2533221
                  </a>
                  <a
                    href="mailto:mp.madurai@venkatesan.org"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 bg-[#0E5C4B] hover:bg-[#0E5C4B]/90 text-white rounded-lg font-bold transition-all text-[11px]"
                  >
                    <Mail className="h-3.5 w-3.5 text-[#C89B3C]" /> Email MP Team
                  </a>
                </div>
              </div>

              {/* Parliament Office */}
              <div className="bg-[#FBF9F4] border border-stone-200/60 rounded-xl p-4.5 space-y-3">
                <span className="text-[9px] font-mono text-stone-400 font-bold uppercase tracking-widest block">New Delhi Residence Office</span>
                <h4 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-1.5">
                  <Landmark className="h-4 w-4 text-[#0E5C4B]" /> Parliament Quarters
                </h4>
                <p className="text-stone-600 leading-relaxed font-sans">
                  201, North Avenue, New Delhi - 110001
                </p>
                <div className="flex gap-2 pt-1 border-t border-stone-200/50">
                  <span className="text-[10px] text-stone-500 font-sans flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-stone-400" /> Active during Lok Sabha parliamentary sessions
                  </span>
                </div>
              </div>

              {/* Citizen Hotline */}
              <div className="flex items-center justify-between p-4 bg-[#6B1E24]/5 border border-[#6B1E24]/20 rounded-xl">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-[#6B1E24] font-bold uppercase tracking-widest block">24/7 Grievance Helpline</span>
                  <span className="text-sm font-bold font-mono text-[#6B1E24] block">+91 94440 23114</span>
                </div>
                <div className="p-2.5 bg-[#6B1E24] text-white rounded-full">
                  <Phone className="h-4.5 w-4.5" />
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 bg-stone-50 border-t border-stone-100 flex justify-end gap-2">
              <button
                onClick={() => setShowContactModal(false)}
                className="px-5 py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold rounded-lg text-xs tracking-wider transition-colors cursor-pointer"
              >
                Close Hub
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating AI Citizen Assistant (Phase 10 & 2) */}
      <AIAssistant theme={theme} lang={language} />

    </div>
  );
}
