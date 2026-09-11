import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { VaultEntrance } from './components/vault/VaultEntrance';
import { AuthPage } from './pages/auth/AuthPage';
import { OnboardingFlow } from './pages/onboarding/OnboardingFlow';
import { AppLayout } from './components/layout/AppLayout';
import { Overview } from './pages/dashboard/Overview';
import { MyAssets } from './pages/assets/MyAssets';
import { Beneficiaries } from './pages/beneficiaries/Beneficiaries';
import { TrustedVerifiers } from './pages/verifiers/TrustedVerifiers';
import { LegacyPolicies } from './pages/policies/LegacyPolicies';
import { LegacyVault } from './pages/vault/LegacyVault';
import { VerificationSchedule } from './pages/schedule/VerificationSchedule';
import { Operations } from './pages/operations/Operations';
import { AuditLogs } from './pages/audit/AuditLogs';
import { Notifications } from './pages/notifications/Notifications';
import { Settings } from './pages/settings/Settings';
import { Help } from './pages/help/Help';

const Gate: React.FC = () => {
  const { session, setSession, workspace } = useApp();
  const [entranceDone, setEntranceDone] = useState(false);

  if (session === 'entrance' && !entranceDone) {
    return <VaultEntrance onComplete={() => { setEntranceDone(true); setSession('auth'); }} />;
  }

  if (session === 'auth' || !workspace) {
    return <AuthPage />;
  }

  if (session === 'onboarding' && !workspace.onboardingComplete) {
    return <OnboardingFlow />;
  }

  return (
    <Routes>
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<Overview />} />
        <Route path="assets" element={<MyAssets />} />
        <Route path="beneficiaries" element={<Beneficiaries />} />
        <Route path="verifiers" element={<TrustedVerifiers />} />
        <Route path="policies" element={<LegacyPolicies />} />
        <Route path="vault" element={<LegacyVault />} />
        <Route path="schedule" element={<VerificationSchedule />} />
        <Route path="operations" element={<Operations />} />
        <Route path="audit" element={<AuditLogs />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
      </Route>
      <Route path="*" element={<Navigate to="/app/overview" replace />} />
    </Routes>
  );
};

const App: React.FC = () => (
  <AppProvider>
    <BrowserRouter>
      <Gate />
    </BrowserRouter>
  </AppProvider>
);

export default App;
