import { Workspace } from '../types';

export function createEmptyWorkspace(name: string, email: string): Workspace {
  const now = new Date();
  const next = new Date(now);
  next.setDate(next.getDate() + 30);

  return {
    isDemo: false,
    profile: {
      name,
      email,
      phone: '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    },
    assets: [],
    beneficiaries: [],
    verifiers: [],
    policies: [],
    schedule: {
      frequencyDays: '30',
      notifyEmail: true,
      notifySms: false,
      notifyPush: false,
      lastCheckIn: now.toISOString(),
      nextCheckIn: next.toISOString(),
    },
    activity: [
      {
        id: 'a-welcome',
        type: 'system',
        message: 'Workspace created.',
        timestamp: now.toISOString(),
      },
    ],
    auditLog: [
      {
        id: 'l-welcome',
        actor: name || 'You',
        action: 'Created workspace',
        target: 'Account',
        timestamp: now.toISOString(),
        ipContext: 'Web session',
      },
    ],
    operations: {
      status: 'Idle',
      startedAt: null,
      verifierApprovals: [],
      notes: '',
    },
    notifications: [
      {
        id: 'n-welcome',
        title: 'Welcome to DeadLock',
        body: 'Start by adding your first digital asset, then assign a beneficiary.',
        timestamp: now.toISOString(),
        read: false,
      },
    ],
    onboardingComplete: false,
  };
}
