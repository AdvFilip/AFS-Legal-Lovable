/**
 * Advocate Admin Form
 * Complete form for adding/editing advocates with all SOP fields
 */

import { useState } from 'react';
import type { Advocate, AdvocateFormData } from '@/lib/advocates';
import {
  DESIGNATION_OPTIONS,
  PRACTICE_OPTIONS,
  INDUSTRIES_OPTIONS,
  generateSlug,
  getSeniorityRank,
} from '@/lib/advocates';

interface AdvocateFormProps {
  initial?: Advocate;
  onSubmit: (data: AdvocateFormData) => Promise<void>;
  loading?: boolean;
}

export function AdvocateForm({ initial, onSubmit, loading = false }: AdvocateFormProps) {
  const [formData, setFormData] = useState<AdvocateFormData>(
    initial || {
      full_name: '',
      slug: '',
      designation: 'Associate',
      location: 'Tiruchirappalli',
      enrollment_no: '',
      languages: [],
      primary_practice: '',
      secondary_practices: [],
      industries: [],
      years_practice: 0,
      education: [],
      memberships: [],
      publications: [],
      highlights: [],
      email: '',
      linkedin_url: '',
      photo_url: '',
      seniority_rank: 3,
      joined_on: new Date().toISOString().split('T')[0],
      status: 'draft',
    },
  );

  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Auto-generate slug from name
    if (field === 'full_name' && !initial) {
      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(value),
      }));
    }

    // Auto-calculate seniority rank from designation
    if (field === 'designation') {
      setFormData((prev) => ({
        ...prev,
        seniority_rank: getSeniorityRank(value),
      }));
    }
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData((prev) => {
      const arr = [...(prev[field as keyof typeof prev] as any[])];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  };

  const handleArrayAdd = (field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field as keyof typeof prev] as any[]), ''],
    }));
  };

  const handleArrayRemove = (field: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as any[]).filter((_, i) => i !== index),
    }));
  };

  const handleEducationChange = (
    index: number,
    field: 'degree' | 'institution' | 'year',
    value: string | number,
  ) => {
    const edu = [...formData.education];
    edu[index] = { ...edu[index], [field]: value };
    setFormData((prev) => ({ ...prev, education: edu }));
  };

  const handleEducationAdd = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: '', institution: '', year: new Date().getFullYear() }],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Validate required fields
      if (!formData.full_name.trim()) throw new Error('Full name is required');
      if (!formData.slug?.trim()) throw new Error('Slug is required');
      if (!formData.designation) throw new Error('Designation is required');
      if (!formData.primary_practice) throw new Error('Primary practice is required');
      if (!formData.email.trim()) throw new Error('Email is required');

      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error submitting form');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500 rounded text-red-200">
          {error}
        </div>
      )}

      {/* Part A.1: Identity */}
      <fieldset className="border border-[color:var(--color-hairline-soft)] p-6 space-y-4">
        <legend className="text-sm font-semibold text-[color:var(--color-gold-deep)]">
          Part A.1 — Identity
        </legend>

        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full name"
            value={formData.full_name}
            onChange={(e) => handleChange('full_name', e.target.value)}
            className="px-3 py-2 bg-[color:var(--color-paper-card)] border border-[color:var(--color-hairline-soft)] rounded text-white"
          />
          <input
            type="text"
            placeholder="Slug (auto-generated)"
            value={formData.slug}
            onChange={(e) => handleChange('slug', e.target.value)}
            className="px-3 py-2 bg-[color:var(--color-paper-card)] border border-[color:var(--color-hairline-soft)] rounded text-white"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <select
            value={formData.designation}
            onChange={(e) => handleChange('designation', e.target.value)}
            className="px-3 py-2 bg-[color:var(--color-paper-card)] border border-[color:var(--color-hairline-soft)] rounded text-white"
          >
            {DESIGNATION_OPTIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Location (City)"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="px-3 py-2 bg-[color:var(--color-paper-card)] border border-[color:var(--color-hairline-soft)] rounded text-white"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Bar Council enrollment number"
            value={formData.enrollment_no}
            onChange={(e) => handleChange('enrollment_no', e.target.value)}
            className="px-3 py-2 bg-[color:var(--color-paper-card)] border border-[color:var(--color-hairline-soft)] rounded text-white"
          />
          <input
            type="text"
            placeholder="Languages (comma-separated)"
            value={formData.languages.join(', ')}
            onChange={(e) => handleChange('languages', e.target.value.split(',').map((s) => s.trim()))}
            className="px-3 py-2 bg-[color:var(--color-paper-card)] border border-[color:var(--color-hairline-soft)] rounded text-white"
          />
        </div>
      </fieldset>

      {/* Part A.2: Practice */}
      <fieldset className="border border-[color:var(--color-hairline-soft)] p-6 space-y-4">
        <legend className="text-sm font-semibold text-[color:var(--color-gold-deep)]">
          Part A.2 — Practice
        </legend>

        <select
          value={formData.primary_practice}
          onChange={(e) => handleChange('primary_practice', e.target.value)}
          className="w-full px-3 py-2 bg-[color:var(--color-paper-card)] border border-[color:var(--color-hairline-soft)] rounded text-white"
        >
          <option value="">Select primary practice area</option>
          {PRACTICE_OPTIONS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <div>
          <label className="text-xs text-[color:var(--color-text-muted)] block mb-2">
            Secondary practice areas
          </label>
          {formData.secondary_practices.map((p, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <select
                value={p}
                onChange={(e) => handleArrayChange('secondary_practices', i, e.target.value)}
                className="flex-1 px-3 py-2 bg-[color:var(--color-paper-card)] border border-[color:var(--color-hairline-soft)] rounded text-white"
              >
                <option value="">Select practice area</option>
                {PRACTICE_OPTIONS.map((pr) => (
                  <option key={pr} value={pr}>
                    {pr}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => handleArrayRemove('secondary_practices', i)}
                className="px-3 py-2 bg-red-500/20 text-red-300 rounded text-xs"
              >
                Remove
              </button>
            </div>
          ))}
          {formData.secondary_practices.length < 3 && (
            <button
              type="button"
              onClick={() => handleArrayAdd('secondary_practices')}
              className="text-xs text-[color:var(--color-gold-deep)]"
            >
              + Add secondary practice
            </button>
          )}
        </div>

        <div>
          <label className="text-xs text-[color:var(--color-text-muted)] block mb-2">
            Industries served (comma-separated)
          </label>
          <input
            type="text"
            value={formData.industries.join(', ')}
            onChange={(e) => handleChange('industries', e.target.value.split(',').map((s) => s.trim()))}
            className="w-full px-3 py-2 bg-[color:var(--color-paper-card)] border border-[color:var(--color-hairline-soft)] rounded text-white"
            placeholder="e.g. Real Estate, MSMEs, Technology"
          />
        </div>

        <input
          type="number"
          placeholder="Years of practice"
          value={formData.years_practice}
          onChange={(e) => handleChange('years_practice', parseInt(e.target.value))}
          className="w-full px-3 py-2 bg-[color:var(--color-paper-card)] border border-[color:var(--color-hairline-soft)] rounded text-white"
        />
      </fieldset>

      {/* Part A.3: Credentials */}
      <fieldset className="border border-[color:var(--color-hairline-soft)] p-6 space-y-4">
        <legend className="text-sm font-semibold text-[color:var(--color-gold-deep)]">
          Part A.3 — Credentials
        </legend>

        <div>
          <label className="text-xs text-[color:var(--color-text-muted)] block mb-2">Education</label>
          {formData.education.map((edu, i) => (
            <div key={i} className="grid grid-cols-3 gap-2 mb-2">
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => handleEducationChange(i, 'degree', e.target.value)}
                className="px-3 py-2 bg-[color:var(--color-paper-card)] border border-[color:var(--color-hairline-soft)] rounded text-white text-sm"
              />
              <input
                type="text"
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => handleEducationChange(i, 'institution', e.target.value)}
                className="px-3 py-2 bg-[color:var(--color-paper-card)] border border-[color:var(--color-hairline-soft)] rounded text-white text-sm"
              />
              <input
                type="number"
                placeholder="Year"
                value={edu.year}
                onChange={(e) => handleEducationChange(i, 'year', parseInt(e.target.value))}
                className="px-3 py-2 bg-[color:var(--color-paper-card)] border border-[color:var(--color-hairline-soft)] rounded text-white text-sm"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleEducationAdd}
            className="text-xs text-[color:var(--color-gold-deep)]"
          >
            + Add education
          </button>
        </div>

        <div>
          <label className="text-xs text-[color:var(--color-text-muted)] block mb-2">Memberships</label>
          {formData.memberships.map((m, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                value={m}
                onChange={(e) => handleArrayChange('memberships', i, e.target.value)}
                className="flex-1 px-3 py-2 bg-[color:var(--color-paper-card)] border border-[color:var(--color-hairline-soft)] rounded text-white"
                placeholder="e.g. Bar Council, ICA"
              />
              <button
                type="button"
                onClick={() => handleArrayRemove('memberships', i)}
                className="px-3 py-2 bg-red-500/20 text-red-300 rounded text-xs"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleArrayAdd('memberships')}
            className="text-xs text-[color:var(--color-gold-deep)]"
          >
            + Add membership
          </button>
        </div>
      </fieldset>

      {/* Part A.4: Experience Highlights */}
      <fieldset className="border border-[color:var(--color-hairline-soft)] p-6 space-y-4">
        <legend className="text-sm font-semibold text-[color:var(--color-gold-deep)]">
          Part A.4 — Experience Highlights (Anonymised)
        </legend>
        {formData.highlights.map((h, i) => (
          <div key={i} className="flex gap-2">
            <textarea
              value={h}
              onChange={(e) => handleArrayChange('highlights', i, e.target.value)}
              className="flex-1 px-3 py-2 bg-[color:var(--color-paper-card)] border border-[color:var(--color-hairline-soft)] rounded text-white text-sm"
              placeholder="e.g. Advised a [sector] client on [matter type] involving [value/scope]"
              rows={2}
            />
            <button
              type="button"
              onClick={() => handleArrayRemove('highlights', i)}
              className="px-3 py-2 bg-red-500/20 text-red-300 rounded text-xs"
            >
              Remove
            </button>
          </div>
        ))}
        {formData.highlights.length < 5 && (
          <button
            type="button"
            onClick={() => handleArrayAdd('highlights')}
            className="text-xs text-[color:var(--color-gold-deep)]"
          >
            + Add highlight
          </button>
        )}
      </fieldset>

      {/* Part A.5: Contact */}
      <fieldset className="border border-[color:var(--color-hairline-soft)] p-6 space-y-4">
        <legend className="text-sm font-semibold text-[color:var(--color-gold-deep)]">
          Part A.5 — Contact
        </legend>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="w-full px-3 py-2 bg-[color:var(--color-paper-card)] border border-[color:var(--color-hairline-soft)] rounded text-white"
        />
        <input
          type="url"
          placeholder="LinkedIn URL (optional)"
          value={formData.linkedin_url || ''}
          onChange={(e) => handleChange('linkedin_url', e.target.value)}
          className="w-full px-3 py-2 bg-[color:var(--color-paper-card)] border border-[color:var(--color-hairline-soft)] rounded text-white"
        />
      </fieldset>

      {/* Part A.6: Profile Photo */}
      <fieldset className="border border-[color:var(--color-hairline-soft)] p-6 space-y-4">
        <legend className="text-sm font-semibold text-[color:var(--color-gold-deep)]">
          Part A.6 — Profile Photo
        </legend>
        <input
          type="url"
          placeholder="Photo URL (from Cloud Storage)"
          value={formData.photo_url || ''}
          onChange={(e) => handleChange('photo_url', e.target.value)}
          className="w-full px-3 py-2 bg-[color:var(--color-paper-card)] border border-[color:var(--color-hairline-soft)] rounded text-white"
        />
        {formData.photo_url && (
          <img
            src={formData.photo_url}
            alt="Preview"
            className="w-32 h-40 object-cover rounded border border-[color:var(--color-hairline-soft)]"
          />
        )}
      </fieldset>

      {/* Display & Status */}
      <fieldset className="border border-[color:var(--color-hairline-soft)] p-6 space-y-4">
        <legend className="text-sm font-semibold text-[color:var(--color-gold-deep)]">
          Display & Status
        </legend>
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="date"
            value={formData.joined_on}
            onChange={(e) => handleChange('joined_on', e.target.value)}
            className="px-3 py-2 bg-[color:var(--color-paper-card)] border border-[color:var(--color-hairline-soft)] rounded text-white"
          />
          <select
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="px-3 py-2 bg-[color:var(--color-paper-card)] border border-[color:var(--color-hairline-soft)] rounded text-white"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </fieldset>

      {/* Submit */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-[color:var(--color-gold-deep)] text-[color:var(--color-ink-deep)] font-semibold rounded disabled:opacity-50"
        >
          {loading ? 'Saving...' : initial ? 'Update Advocate' : 'Create Advocate'}
        </button>
      </div>
    </form>
  );
}
