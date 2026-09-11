import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AnimatedCard, Badge, EmptyState, Field, PageHeader, inputClass } from '../../components/ui/primitives';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { AssetCategory, Priority } from '../../types';

const categories: AssetCategory[] = [
  'Passwords',
  'Cloud Storage',
  'Photos',
  'Videos',
  'Crypto Wallets',
  'Recovery Phrases',
  'Business Documents',
  'Social Media',
  'Subscriptions',
  'Banking Instructions',
  'Insurance',
  'Custom',
];

const priorities: Priority[] = ['Low', 'Standard', 'High', 'Critical'];

const priorityTone: Record<Priority, 'neutral' | 'steel' | 'pending' | 'critical'> = {
  Low: 'neutral',
  Standard: 'steel',
  High: 'pending',
  Critical: 'critical',
};

export const MyAssets: React.FC = () => {
  const { workspace, addAsset } = useApp();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Custom' as AssetCategory,
    priority: 'Standard' as Priority,
    beneficiaryId: '',
    releaseConditions: 'Release upon verification.',
  });

  if (!workspace) return null;
  const { assets, beneficiaries } = workspace;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    addAsset({
      title: form.title,
      description: form.description,
      category: form.category,
      priority: form.priority,
      beneficiaryId: form.beneficiaryId || null,
      releaseConditions: form.releaseConditions,
      encryptedNotes: '',
      attachments: [],
    });
    setForm({ title: '', description: '', category: 'Custom', priority: 'Standard', beneficiaryId: '', releaseConditions: 'Release upon verification.' });
    setOpen(false);
  };

  return (
    <div>
      <PageHeader
        title="My Assets"
        subtitle="Everything you want passed on, organized by category and priority."
        action={
          <Button onClick={() => setOpen(true)} className="flex items-center gap-1.5">
            <Plus size={16} /> Add asset
          </Button>
        }
      />

      {assets.length === 0 ? (
        <EmptyState
          title="No assets yet"
          body="Add your first digital asset — a password vault, a crypto wallet, or an important document."
          action={
            <Button onClick={() => setOpen(true)} className="flex items-center gap-1.5">
              <Plus size={16} /> Add your first asset
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {assets.map((asset, i) => {
            const beneficiary = beneficiaries.find((b) => b.id === asset.beneficiaryId);
            return (
              <AnimatedCard key={asset.id} delay={i * 0.03} className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <h3 className="font-semibold text-graphite-800 leading-snug">{asset.title}</h3>
                  <Badge tone={priorityTone[asset.priority]}>{asset.priority}</Badge>
                </div>
                {asset.description && <p className="text-sm text-graphite-500 mb-3 leading-relaxed">{asset.description}</p>}
                <div className="flex items-center justify-between text-xs text-graphite-400 pt-3 border-t border-platinum-200">
                  <span>{asset.category}</span>
                  <span>{beneficiary ? `→ ${beneficiary.name}` : 'No beneficiary assigned'}</span>
                </div>
              </AnimatedCard>
            );
          })}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Add a digital asset">
        <form onSubmit={submit} className="space-y-4">
          <Field label="Title">
            <input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Password manager vault" required />
          </Field>
          <Field label="Description">
            <textarea className={inputClass} rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="What is this and why does it matter?" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <select className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as AssetCategory })}>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Priority">
              <select className={inputClass} value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value as Priority })}>
                {priorities.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Beneficiary" hint="Who should receive access to this asset.">
            <select className={inputClass} value={form.beneficiaryId} onChange={(e) => setForm({ ...form, beneficiaryId: e.target.value })}>
              <option value="">No beneficiary assigned yet</option>
              {beneficiaries.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Release conditions">
            <input className={inputClass} value={form.releaseConditions} onChange={(e) => setForm({ ...form, releaseConditions: e.target.value })} />
          </Field>
          <div className="flex justify-end gap-2.5 pt-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Save asset</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
