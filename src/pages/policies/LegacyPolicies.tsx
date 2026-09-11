import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AnimatedCard, Badge, EmptyState, Field, PageHeader, inputClass } from '../../components/ui/primitives';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { ThresholdRule } from '../../types';

const rules: ThresholdRule[] = ['2-of-3', '3-of-5', '4-of-7', 'custom'];

export const LegacyPolicies: React.FC = () => {
  const { workspace, addPolicy } = useApp();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', thresholdRule: '2-of-3' as ThresholdRule });

  if (!workspace) return null;
  const { policies, assets } = workspace;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    addPolicy({ ...form, linkedAssetIds: [], active: true });
    setForm({ name: '', description: '', thresholdRule: '2-of-3' });
    setOpen(false);
  };

  return (
    <div>
      <PageHeader
        title="Legacy Policies"
        subtitle="Rules that govern how and when your assets are released."
        action={
          <Button onClick={() => setOpen(true)} className="flex items-center gap-1.5">
            <Plus size={16} /> Create policy
          </Button>
        }
      />

      {policies.length === 0 ? (
        <EmptyState
          title="No policies yet"
          body="Create a policy to define verifier thresholds and release rules for groups of assets."
          action={
            <Button onClick={() => setOpen(true)} className="flex items-center gap-1.5">
              <Plus size={16} /> Create your first policy
            </Button>
          }
        />
      ) : (
        <div className="space-y-3">
          {policies.map((p, i) => (
            <AnimatedCard key={p.id} delay={i * 0.03} className="p-5">
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <h3 className="font-semibold text-graphite-800">{p.name}</h3>
                <div className="flex items-center gap-2">
                  <Badge tone="steel">{p.thresholdRule}</Badge>
                  <Badge tone={p.active ? 'verified' : 'neutral'}>{p.active ? 'Active' : 'Inactive'}</Badge>
                </div>
              </div>
              {p.description && <p className="text-sm text-graphite-500 mb-3 leading-relaxed">{p.description}</p>}
              <p className="text-xs text-graphite-400">
                {p.linkedAssetIds.length} of {assets.length} assets linked
              </p>
            </AnimatedCard>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Create a legacy policy">
        <form onSubmit={submit} className="space-y-4">
          <Field label="Policy name">
            <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. High-value asset policy" required />
          </Field>
          <Field label="Description">
            <textarea className={inputClass} rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="When should this apply, and to what?" />
          </Field>
          <Field label="Verifier threshold" hint="How many trusted verifiers must agree before release begins.">
            <select className={inputClass} value={form.thresholdRule} onChange={(e) => setForm({ ...form, thresholdRule: e.target.value as ThresholdRule })}>
              {rules.map((r) => (
                <option key={r} value={r}>{r === 'custom' ? 'Custom threshold' : r}</option>
              ))}
            </select>
          </Field>
          <div className="flex justify-end gap-2.5 pt-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Save policy</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
