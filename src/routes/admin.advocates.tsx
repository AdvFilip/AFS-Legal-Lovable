/**
 * Admin Page: Advocates Management
 * Full CRUD interface for managing advocates
 */

import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Layout, Section, SectionHeading } from '@/components/afs';
import { AdvocateForm } from '@/components/afs/AdvocateForm';
import type { Advocate, AdvocateFormData } from '@/lib/advocates';
import { getAllAdvocates, createAdvocate, updateAdvocate, publishAdvocate, unpublishAdvocate } from '@/lib/advocates';

export const Route = createFileRoute('/admin/advocates')({
  component: AdminAdvocatesPage,
});

function AdminAdvocatesPage() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [selectedAdvocate, setSelectedAdvocate] = useState<Advocate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'list' | 'form'>('list');

  // Load advocates
  useEffect(() => {
    loadAdvocates();
  }, []);

  const loadAdvocates = async () => {
    try {
      setLoading(true);
      const data = await getAllAdvocates();
      setAdvocates(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading advocates');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: AdvocateFormData) => {
    try {
      setLoading(true);
      const newAdvocate = await createAdvocate(data);
      setAdvocates((prev) => [...prev, newAdvocate]);
      setActiveTab('list');
      setSelectedAdvocate(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating advocate');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data: AdvocateFormData) => {
    if (!selectedAdvocate) return;

    try {
      setLoading(true);
      const updated = await updateAdvocate(selectedAdvocate.id, data);
      setAdvocates((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
      setActiveTab('list');
      setSelectedAdvocate(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating advocate');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (advocate: Advocate) => {
    try {
      setLoading(true);
      const updated =
        advocate.status === 'published'
          ? await unpublishAdvocate(advocate.id)
          : await publishAdvocate(advocate.id);
      setAdvocates((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating status');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-500/20 text-green-300';
      case 'draft':
        return 'bg-yellow-500/20 text-yellow-300';
      case 'archived':
        return 'bg-gray-500/20 text-gray-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <Layout>
      <Section tone="paper">
        <SectionHeading em="management.">Advocates</SectionHeading>

        {error && (
          <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded text-red-200">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="mt-8 flex gap-4 border-b border-[color:var(--color-hairline-soft)]">
          <button
            onClick={() => {
              setActiveTab('list');
              setSelectedAdvocate(null);
            }}
            className={`px-4 py-3 font-semibold transition-colors ${
              activeTab === 'list'
                ? 'border-b-2 border-[color:var(--color-gold-deep)] text-[color:var(--color-gold-deep)]'
                : 'text-[color:var(--color-text-muted)]'
            }`}
          >
            Advocates ({advocates.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('form');
              setSelectedAdvocate(null);
            }}
            className={`px-4 py-3 font-semibold transition-colors ${
              activeTab === 'form'
                ? 'border-b-2 border-[color:var(--color-gold-deep)] text-[color:var(--color-gold-deep)]'
                : 'text-[color:var(--color-text-muted)]'
            }`}
          >
            {selectedAdvocate ? 'Edit' : 'Add New'} Advocate
          </button>
        </div>

        {/* List Tab */}
        {activeTab === 'list' && (
          <div className="mt-8">
            {loading ? (
              <p className="text-[color:var(--color-text-muted)]">Loading...</p>
            ) : advocates.length === 0 ? (
              <p className="text-[color:var(--color-text-muted)]">No advocates yet. Add one to get started.</p>
            ) : (
              <div className="space-y-4">
                {advocates.map((advocate) => (
                  <div
                    key={advocate.id}
                    className="p-4 border border-[color:var(--color-hairline-soft)] bg-[color:var(--color-paper-card)] rounded"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-[color:var(--color-text-strong)]">
                            {advocate.full_name}
                          </h3>
                          <span className={`px-2 py-1 text-xs rounded ${getStatusColor(advocate.status)}`}>
                            {advocate.status}
                          </span>
                        </div>
                        <p className="text-sm text-[color:var(--color-text-muted)]">
                          {advocate.designation} • {advocate.location} • {advocate.years_practice} years
                        </p>
                        <p className="text-xs text-[color:var(--color-text-subtle)] mt-1">
                          Joined: {new Date(advocate.joined_on).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedAdvocate(advocate);
                            setActiveTab('form');
                          }}
                          className="px-3 py-1 text-xs bg-blue-500/20 text-blue-300 rounded hover:bg-blue-500/30"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleTogglePublish(advocate)}
                          disabled={loading}
                          className="px-3 py-1 text-xs bg-[color:var(--color-gold-dim)] text-[color:var(--color-gold-deep)] rounded hover:bg-[color:var(--color-gold-deep)] hover:text-[color:var(--color-ink-deep)] disabled:opacity-50"
                        >
                          {advocate.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Form Tab */}
        {activeTab === 'form' && (
          <div className="mt-8">
            <AdvocateForm
              initial={selectedAdvocate || undefined}
              onSubmit={selectedAdvocate ? handleUpdate : handleCreate}
              loading={loading}
            />
          </div>
        )}
      </Section>
    </Layout>
  );
}
