/**
 * API Route: GET /api/advocates/published
 * Returns all published advocates sorted by seniority, join date, then name
 */

import { json } from '@tanstack/start';
import type { Advocate } from '@/lib/advocates';

export async function GET() {
  try {
    // Query published advocates from Supabase
    // Using fetch to call Supabase REST API
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Missing Supabase credentials');
      return json({ advocates: [] });
    }

    const response = await fetch(
      `${supabaseUrl}/rest/v1/advocates?status=eq.published&order=seniority_rank.asc,joined_on.asc,full_name.asc`,
      {
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      console.error('Supabase query failed:', response.statusText);
      return json({ advocates: [] });
    }

    const advocates: Advocate[] = await response.json();
    return json(advocates);
  } catch (error) {
    console.error('Error fetching published advocates:', error);
    return json([]);
  }
}
