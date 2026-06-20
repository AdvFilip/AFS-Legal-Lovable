/**
 * Advocates Database Types & Utilities
 * Complete type system for the advocates management system
 */

// Advocate Education entry
export type AdvocateEducation = {
  degree: string; // LLB, MBA, M.Phil., etc
  institution: string;
  year: number;
};

// Main Advocate type - matches database schema
export type Advocate = {
  id: string;

  // Identity
  full_name: string;
  slug: string;
  designation: 'Partner' | 'Senior Associate' | 'Associate' | 'Of Counsel';
  location: string;
  enrollment_no: string;
  languages: string[];

  // Practice
  primary_practice: string;
  secondary_practices: string[];
  industries: string[];
  years_practice: number;

  // Credentials
  education: AdvocateEducation[];
  memberships: string[];
  publications: string[];

  // Experience
  highlights: string[];

  // Contact
  email: string;
  linkedin_url?: string;

  // Profile
  photo_url?: string;

  // Display
  seniority_rank: number;
  joined_on: string; // ISO date

  // Status
  status: 'draft' | 'published' | 'archived';
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
};

// Form data type (for admin input)
export type AdvocateFormData = Omit<Advocate, 'id' | 'slug' | 'created_at' | 'updated_at'> & {
  slug?: string; // Optional for auto-generation
};

// Practice areas options
export const PRACTICE_OPTIONS = [
  'Corporate & Commercial',
  'Dispute Resolution & Litigation',
  'Real Estate & Property',
  'Banking & Finance',
  'Tax',
  'IP & Technology',
  'Employment',
  'Family & Matrimonial',
  'Criminal',
  'Emerging Practice Areas',
] as const;

// Designation options
export const DESIGNATION_OPTIONS = [
  'Partner',
  'Senior Associate',
  'Associate',
  'Of Counsel',
] as const;

// Industries options
export const INDUSTRIES_OPTIONS = [
  'Individuals & Families',
  'MSMEs',
  'Startups',
  'Agriculture & Agribusiness',
  'Real Estate',
  'Educational Institutions',
  'Banking & Finance',
  'Healthcare',
  'Technology',
  'Manufacturing',
] as const;

// Database query functions (to be called from server functions)
export async function getPublishedAdvocates(): Promise<Advocate[]> {
  // This will be called from a server function that queries the database
  // SELECT * FROM advocates WHERE status = 'published' ORDER BY seniority_rank, joined_on, full_name
  const response = await fetch('/api/advocates/published');
  if (!response.ok) throw new Error('Failed to fetch advocates');
  return response.json();
}

export async function getAdvocateBySlug(slug: string): Promise<Advocate | null> {
  // SELECT * FROM advocates WHERE slug = $1 AND status = 'published'
  const response = await fetch(`/api/advocates/${slug}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Failed to fetch advocate');
  return response.json();
}

export async function getAllAdvocates(): Promise<Advocate[]> {
  // Admin only: SELECT * FROM advocates ORDER BY seniority_rank, joined_on, full_name
  const response = await fetch('/api/admin/advocates');
  if (!response.ok) throw new Error('Failed to fetch advocates');
  return response.json();
}

export async function createAdvocate(data: AdvocateFormData): Promise<Advocate> {
  // Admin only: INSERT into advocates
  const response = await fetch('/api/admin/advocates', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create advocate');
  return response.json();
}

export async function updateAdvocate(
  id: string,
  data: Partial<AdvocateFormData>,
): Promise<Advocate> {
  // Admin only: UPDATE advocates WHERE id = $1
  const response = await fetch(`/api/admin/advocates/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update advocate');
  return response.json();
}

export async function deleteAdvocate(id: string): Promise<void> {
  // Admin only: UPDATE advocates SET status = 'archived' WHERE id = $1
  const response = await fetch(`/api/admin/advocates/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete advocate');
}

export async function publishAdvocate(id: string): Promise<Advocate> {
  // Admin only: UPDATE advocates SET status = 'published' WHERE id = $1
  return updateAdvocate(id, { status: 'published' });
}

export async function unpublishAdvocate(id: string): Promise<Advocate> {
  // Admin only: UPDATE advocates SET status = 'draft' WHERE id = $1
  return updateAdvocate(id, { status: 'draft' });
}

// Utility: Generate slug from name
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Utility: Format date for display
export function formatAdvocateDate(date: string): string {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Utility: Get seniority rank value
export function getSeniorityRank(designation: string): number {
  const ranks: Record<string, number> = {
    'Partner': 1,
    'Senior Associate': 2,
    'Associate': 3,
    'Of Counsel': 4,
  };
  return ranks[designation] || 999;
}

// Utility: Sort advocates by seniority, join date, then name
export function sortAdvocates(advocates: Advocate[]): Advocate[] {
  return [...advocates].sort((a, b) => {
    // First by seniority rank
    if (a.seniority_rank !== b.seniority_rank) {
      return a.seniority_rank - b.seniority_rank;
    }
    // Then by join date (oldest first)
    const aDate = new Date(a.joined_on);
    const bDate = new Date(b.joined_on);
    if (aDate.getTime() !== bDate.getTime()) {
      return aDate.getTime() - bDate.getTime();
    }
    // Then by name
    return a.full_name.localeCompare(b.full_name);
  });
}
