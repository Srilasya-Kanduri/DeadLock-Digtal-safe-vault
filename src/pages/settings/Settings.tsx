import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AnimatedCard, Field, PageHeader, inputClass } from '../../components/ui/primitives';
import { Button } from '../../components/ui/Button';

export const Settings: React.FC = () => {
  const { workspace, signOut } = useApp();
  const [name, setName] = useState(workspace?.profile.name || '');
  const [phone, setPhone] = useState(workspace?.profile.phone || '');
  const [saved, setSaved] = useState(false);

  if (!workspace) return null;

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your profile, security, and account preferences." />

      <AnimatedCard className="p-6 mb-5">
        <p className="font-medium text-graphite-700 mb-4">Personal profile</p>
        <div className="space-y-4 max-w-md">
          <Field label="Full name">
            <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Email">
            <input className={inputClass} value={workspace.profile.email} disabled />
          </Field>
          <Field label="Phone">
            <input className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" />
          </Field>
          <Button
            onClick={() => {
              setSaved(true);
              setTimeout(() => setSaved(false), 2000);
            }}
          >
            {saved ? 'Saved' : 'Save changes'}
          </Button>
        </div>
      </AnimatedCard>

      <AnimatedCard delay={0.05} className="p-6 mb-5">
        <p className="font-medium text-graphite-700 mb-1">Security</p>
        <p className="text-sm text-graphite-500 mb-4 leading-relaxed">
          Two-factor authentication and password management for your account.
        </p>
        <div className="flex flex-col sm:flex-row gap-2.5">
          <Button variant="secondary">Change password</Button>
          <Button variant="secondary">Enable two-factor authentication</Button>
        </div>
      </AnimatedCard>

      <AnimatedCard delay={0.1} className="p-6 border-rose-100">
        <p className="font-medium text-graphite-700 mb-1">Danger zone</p>
        <p className="text-sm text-graphite-500 mb-4 leading-relaxed">
          Signing out will end your session. Your workspace data remains protected.
        </p>
        <Button variant="secondary" onClick={signOut}>Sign out</Button>
      </AnimatedCard>
    </div>
  );
};
