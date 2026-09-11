import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import {
  Workspace,
  DigitalAsset,
  Beneficiary,
  TrustedVerifier,
  LegacyPolicy,
  ActivityEntry,
  AuditLogEntry,
  NotificationItem,
} from '../types';
import { createDemoWorkspace } from '../data/demoWorkspace';
import { createEmptyWorkspace } from '../data/emptyWorkspace';

export type SessionState = 'entrance' | 'auth' | 'onboarding' | 'workspace';

interface AppContextValue {
  session: SessionState;
  setSession: (s: SessionState) => void;
  workspace: Workspace | null;
  enterDemo: () => void;
  createAccount: (name: string, email: string) => void;
  signIn: (email: string) => void;
  signOut: () => void;
  completeOnboarding: () => void;
  addAsset: (asset: Omit<DigitalAsset, 'id' | 'createdAt'>) => void;
  addBeneficiary: (b: Omit<Beneficiary, 'id' | 'assignedAssetIds' | 'verificationStatus'>) => void;
  addVerifier: (v: Omit<TrustedVerifier, 'id' | 'status'>) => void;
  addPolicy: (p: Omit<LegacyPolicy, 'id'>) => void;
  updateSchedule: (patch: Partial<Workspace['schedule']>) => void;
  confirmCheckIn: () => void;
  markNotificationRead: (id: string) => void;
  logActivity: (entry: Omit<ActivityEntry, 'id' | 'timestamp'>) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<SessionState>('entrance');
  const [workspace, setWorkspace] = useState<Workspace | null>(null);

  const pushAudit = useCallback((ws: Workspace, action: string, target: string): Workspace => {
    const entry: AuditLogEntry = {
      id: uid('log'),
      actor: ws.profile.name || 'You',
      action,
      target,
      timestamp: new Date().toISOString(),
      ipContext: 'Web session',
    };
    return { ...ws, auditLog: [entry, ...ws.auditLog] };
  }, []);

  const pushActivity = useCallback((ws: Workspace, entry: Omit<ActivityEntry, 'id' | 'timestamp'>): Workspace => {
    const full: ActivityEntry = { ...entry, id: uid('act'), timestamp: new Date().toISOString() };
    return { ...ws, activity: [full, ...ws.activity] };
  }, []);

  const enterDemo = useCallback(() => {
    setWorkspace(createDemoWorkspace());
    setSession('workspace');
  }, []);

  const createAccount = useCallback((name: string, email: string) => {
    setWorkspace(createEmptyWorkspace(name, email));
    setSession('onboarding');
  }, []);

  const signIn = useCallback((email: string) => {
    // Simulated sign-in: returns an existing (empty, onboarded) workspace.
    const ws = createEmptyWorkspace(email.split('@')[0] || 'You', email);
    ws.onboardingComplete = true;
    setWorkspace(ws);
    setSession('workspace');
  }, []);

  const signOut = useCallback(() => {
    setWorkspace(null);
    setSession('auth');
  }, []);

  const completeOnboarding = useCallback(() => {
    setWorkspace((prev) => {
      if (!prev) return prev;
      let ws: Workspace = { ...prev, onboardingComplete: true };
      ws = pushAudit(ws, 'Completed onboarding', 'Account');
      return ws;
    });
    setSession('workspace');
  }, [pushAudit]);

  const addAsset: AppContextValue['addAsset'] = useCallback(
    (asset) => {
      setWorkspace((prev) => {
        if (!prev) return prev;
        const newAsset: DigitalAsset = { ...asset, id: uid('as'), createdAt: new Date().toISOString() };
        let ws: Workspace = { ...prev, assets: [newAsset, ...prev.assets] };
        ws = pushActivity(ws, { type: 'asset', message: `Added asset "${newAsset.title}."` });
        ws = pushAudit(ws, 'Added asset', newAsset.title);
        return ws;
      });
    },
    [pushActivity, pushAudit],
  );

  const addBeneficiary: AppContextValue['addBeneficiary'] = useCallback(
    (b) => {
      setWorkspace((prev) => {
        if (!prev) return prev;
        const newB: Beneficiary = { ...b, id: uid('b'), assignedAssetIds: [], verificationStatus: 'Pending' };
        let ws: Workspace = { ...prev, beneficiaries: [newB, ...prev.beneficiaries] };
        ws = pushActivity(ws, { type: 'beneficiary', message: `Added beneficiary "${newB.name}."` });
        ws = pushAudit(ws, 'Added beneficiary', newB.name);
        return ws;
      });
    },
    [pushActivity, pushAudit],
  );

  const addVerifier: AppContextValue['addVerifier'] = useCallback(
    (v) => {
      setWorkspace((prev) => {
        if (!prev) return prev;
        const newV: TrustedVerifier = { ...v, id: uid('v'), status: 'Pending' };
        let ws: Workspace = { ...prev, verifiers: [newV, ...prev.verifiers] };
        ws = pushActivity(ws, { type: 'verifier', message: `Added trusted verifier "${newV.name}."` });
        ws = pushAudit(ws, 'Added trusted verifier', newV.name);
        return ws;
      });
    },
    [pushActivity, pushAudit],
  );

  const addPolicy: AppContextValue['addPolicy'] = useCallback(
    (p) => {
      setWorkspace((prev) => {
        if (!prev) return prev;
        const newP: LegacyPolicy = { ...p, id: uid('p') };
        let ws: Workspace = { ...prev, policies: [newP, ...prev.policies] };
        ws = pushActivity(ws, { type: 'policy', message: `Created policy "${newP.name}."` });
        ws = pushAudit(ws, 'Created policy', newP.name);
        return ws;
      });
    },
    [pushActivity, pushAudit],
  );

  const updateSchedule: AppContextValue['updateSchedule'] = useCallback(
    (patch) => {
      setWorkspace((prev) => {
        if (!prev) return prev;
        let ws: Workspace = { ...prev, schedule: { ...prev.schedule, ...patch } };
        ws = pushAudit(ws, 'Updated verification schedule', 'Verification Schedule');
        return ws;
      });
    },
    [pushAudit],
  );

  const confirmCheckIn = useCallback(() => {
    setWorkspace((prev) => {
      if (!prev) return prev;
      const now = new Date();
      const days = prev.schedule.frequencyDays === 'custom' ? prev.schedule.customDays || 30 : parseInt(prev.schedule.frequencyDays, 10);
      const next = new Date(now);
      next.setDate(next.getDate() + days);
      let ws: Workspace = {
        ...prev,
        schedule: { ...prev.schedule, lastCheckIn: now.toISOString(), nextCheckIn: next.toISOString() },
      };
      ws = pushActivity(ws, { type: 'check-in', message: 'Check-in confirmed — active and well.' });
      ws = pushAudit(ws, 'Confirmed check-in', 'Verification Schedule');
      return ws;
    });
  }, [pushActivity, pushAudit]);

  const markNotificationRead = useCallback((id: string) => {
    setWorkspace((prev) => {
      if (!prev) return prev;
      const notifications = prev.notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
      return { ...prev, notifications };
    });
  }, []);

  const logActivity: AppContextValue['logActivity'] = useCallback(
    (entry) => {
      setWorkspace((prev) => (prev ? pushActivity(prev, entry) : prev));
    },
    [pushActivity],
  );

  const value = useMemo<AppContextValue>(
    () => ({
      session,
      setSession,
      workspace,
      enterDemo,
      createAccount,
      signIn,
      signOut,
      completeOnboarding,
      addAsset,
      addBeneficiary,
      addVerifier,
      addPolicy,
      updateSchedule,
      confirmCheckIn,
      markNotificationRead,
      logActivity,
    }),
    [
      session,
      workspace,
      enterDemo,
      createAccount,
      signIn,
      signOut,
      completeOnboarding,
      addAsset,
      addBeneficiary,
      addVerifier,
      addPolicy,
      updateSchedule,
      confirmCheckIn,
      markNotificationRead,
      logActivity,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
