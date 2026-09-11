import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AnimatedCard, Badge, EmptyState, Field, PageHeader, inputClass } from '../../components/ui/primitives';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { VerifierRole } from '../../types';

const roles: VerifierRole[] = ['Spouse', 'Sibling', 'Friend', 'Lawyer', 'Doctor', 'Other'];
const statusTone = { Verified: 'verified', Pending: 'pending', Unverified: 'neutral' } as const;

export const TrustedVerifiers: React.FC = () => {
  const { workspace, addVerifier } = useApp();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', role: 'Friend' as VerifierRole, email: '', phone: '' });

  if (!workspace) return null;
  const { verifiers } = workspace;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    addVerifier(form);
    setForm({ name: '', role: 'Friend', email: '', phone: '' });
    setOpen(false);
  };

  return (
    <div>
      <PageHeader
        title="Trusted Verifiers"
        subtitle="People who confirm your status if you become unreachable. Configure how many must agree before release begins."
        action={
          <Button onClick={() => setOpen(true)} className="flex items-center gap-1.5">
            <Plus size={16} /> Add verifier
          </Button>
        }
      />

      {verifiers.length === 0 ? (
        <EmptyState
          title="No trusted verifiers yet"
          body="Add at least two people — a spouse, sibling, friend, lawyer, or doctor — who can confirm your status."
          action={
            <Button onClick={() => setOpen(true)} className="flex items-center gap-1.5">
              <Plus size={16} /> Add your first verifier
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {verifiers.map((v, i) => (
            <AnimatedCard key={v.id} delay={i * 0.03} className="p-5">
              <div className="flex items-start justify-between gap-3 mb-1">
                <h3 className="font-semibold text-graphite-800">{v.name}</h3>
                <Badge tone={statusTone[v.status]}>{v.status}</Badge>
              </div>
              <p className="text-sm text-graphite-500 mb-3">{v.role}</p>
              <div className="text-xs text-graphite-400 space-y-0.5">
                {v.email && <p>{v.email}</p>}
                {v.phone && <p>{v.phone}</p>}
              </div>
            </AnimatedCard>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Add a trusted verifier">
        <form onSubmit={submit} className="space-y-4">
          <Field label="Name">
            <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Taylor Chen" required />
          </Field>
          <Field label="Role">
            <select className={inputClass} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as VerifierRole })}>
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </Field>
          <Field label="Email">
            <input className={inputClass} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="taylor@example.com" />
          </Field>
          <Field label="Phone">
            <input className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+1 (555) 000-0000" />
          </Field>
          <div className="flex justify-end gap-2.5 pt-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Save verifier</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
