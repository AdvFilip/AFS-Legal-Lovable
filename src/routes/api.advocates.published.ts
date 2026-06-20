/**
 * API Route: GET /api/advocates/published
 * Returns all published advocates sorted by seniority, join date, then name
 */

import { json } from '@tanstack/start';
import type { Advocate } from '@/lib/advocates';

export async function GET() {
  try {
    // This endpoint is called from the team page
    // In Lovable, this will query from Supabase directly
    // Example query:
    // SELECT * FROM advocates
    // WHERE status = 'published'
    // ORDER BY seniority_rank ASC, joined_on ASC, full_name ASC

    // For now, return placeholder that client will populate from database
    const advocates: Advocate[] = [];

    return json(advocates);
  } catch (error) {
    console.error('Error fetching published advocates:', error);
    return json({ error: 'Failed to fetch advocates' }, { status: 500 });
  }
}
