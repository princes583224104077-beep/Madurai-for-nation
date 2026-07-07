export type UserRole = 'citizen' | 'mp';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone: string;
  ward: string;
  constituency: string;
  state?: string;
  district?: string;
  role: UserRole;
  createdAt: string;
}

export type ConcernStatus = 'Submitted' | 'Under Review' | 'In Progress' | 'Resolved';

export type ConcernCategory =
  | 'Roads'
  | 'Water Supply'
  | 'Electricity'
  | 'Healthcare'
  | 'Education'
  | 'Public Transport'
  | 'Sanitation'
  | 'Women\'s Safety'
  | 'Public Welfare'
  | 'Others';

export interface MPProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  constituency: string;
  district: string;
  state: string;
  party: string;
  partyColor?: string;
  photoUrl: string;
  biography: string;
  committees: string[];
  recentActivities: string[];
  ongoingProjects: {
    id: string;
    title: string;
    budget: string;
    status: string;
    description: string;
  }[];
}

export interface Concern {
  id: string; // This is also the tracking ID
  citizenId: string;
  citizenName: string;
  citizenEmail: string;
  citizenPhone: string;
  title: string;
  description: string;
  state: string;
  district: string;
  constituency: string;
  ward: string;
  category: ConcernCategory;
  tags: string[];
  status: ConcernStatus;
  attachmentNote?: string;
  isAnonymous: boolean;
  createdAt: string;
  updatedAt: string;
  mpNotes?: string;
  priority?: 'Low' | 'Medium' | 'High';
}

export interface ConcernUpdate {
  id: string;
  concernId: string;
  mpId: string;
  mpName: string;
  status: ConcernStatus;
  note: string;
  visibleToCitizen: boolean;
  createdAt: string;
}

export interface TransparencyCounters {
  totalReceived: number;
  resolvedThisMonth: number;
  topCategories: { category: string; count: number }[];
}

export interface AnalyticsData {
  byCategory: { category: string; count: number }[];
  byStatus: { status: string; count: number }[];
  volumeOverTime: { date: string; count: number }[];
  topWards: { ward: string; count: number }[];
}

