import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AnimatedCard, Badge, EmptyState, Field, PageHeader, inputClass } from '../../components/ui/primitives';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';

const statusTone = { Verified: 'verified', Pending: 'pending', Unverified: 'neutral' } as const;

export const Beneficiaries: React.FC = () => {
  const { workspace, addBeneficiary } = useApp();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', relationship: '', email: '', phone: '' });

  if (!workspace) return null;
  const { beneficiaries, assets } = workspace;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    addBeneficiary(form);
    setForm({ name: '', relationship: '', email: '', phone: '' });
    setOpen(false);
  };

  return (
    <div>
      <PageHeader
        title="Beneficiaries"
        subtitle="The people who will receive access to your assets."
        action={
          <Button onClick={() => setOpen(true)} className="flex items-center gap-1.5">
            <Plus size={16} /> Add beneficiary
          </Button>
        }
      />

      {beneficiaries.length === 0 ? (
        <EmptyState
          title="No beneficiaries yet"
          body="Add someone who should receive access to your assets when the time comes."
          action={
            <Button onClick={() => setOpen(true)} className="flex items-center gap-1.5">
              <Plus size={16} /> Add your first beneficiary
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {beneficiaries.map((b, i) => {
            const assigned = assets.filter((a) => a.beneficiaryId === b.id);
            return (
              <AnimatedCard key={b.id} delay={i * 0.03} className="p-5">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="font-semibold text-graphite-800">{b.name}</h3>
                  <Badge tone={statusTone[b.verificationStatus]}>{b.verificationStatus}</Badge>
                </div>
                <p className="text-sm text-graphite-500 mb-3">{b.relationship || 'Relationship not set'}</p>
                <div className="text-xs text-graphite-400 space-y-0.5 mb-3">
                  {b.email && <p>{b.email}</p>}
                  {b.phone && <p>{b.phone}</p>}
                </div>
                <div className="pt-3 border-t border-platinum-200 text-xs text-graphite-500">
                  {assigned.length} asset{assigned.length !== 1 ? 's' : ''} assigned
                </div>
              </AnimatedCard>
            );
          })}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Add a beneficiary">
        <form onSubmit={submit} className="space-y-4">
          <Field label="Name">
            <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Sam Rivera" required />
          </Field>
          <Field label="Relationship">
            <input className={inputClass} value={form.relationship} onChange={(e) => setForm({ ...form, relationship: e.target.value })} placeholder="e.g. Spouse, Child, Friend" />
          </Field>
          <Field label="Email">
            <input className={inputClass} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="sam@example.com" />
          </Field>
          <Field label="Phone">
            <input className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+1 (555) 000-0000" />
          </Field>
          <div className="flex justify-end gap-2.5 pt-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Save beneficiary</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
