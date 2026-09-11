import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/ui/Button';
import { Field, inputClass, ProgressBar } from '../../components/ui/primitives';

const steps = [
  'Personal Profile',
  'Add Digital Assets',
  'Assign Beneficiaries',
  'Assign Trusted Verifiers',
  'Configure Verification Schedule',
  'Review and Finish',
];

export const OnboardingFlow: React.FC = () => {
  const { workspace, completeOnboarding, addAsset, addBeneficiary, addVerifier, updateSchedule } = useApp();
  const [step, setStep] = useState(0);

  const [profile, setProfile] = useState({ name: workspace?.profile.name || '', phone: '' });
  const [assetTitle, setAssetTitle] = useState('');
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [beneficiaryEmail, setBeneficiaryEmail] = useState('');
  const [verifierName, setVerifierName] = useState('');
  const [verifierEmail, setVerifierEmail] = useState('');
  const [frequency, setFrequency] = useState<'7' | '14' | '30' | '60'>('30');

  const next = () => setStep((s) => Math.min(steps.length - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const finish = () => {
    if (assetTitle.trim()) {
      addAsset({
        title: assetTitle,
        description: '',
        category: 'Custom',
        priority: 'Standard',
        beneficiaryId: null,
        releaseConditions: 'Release upon verification.',
        encryptedNotes: '',
        attachments: [],
      });
    }
    if (beneficiaryName.trim()) {
      addBeneficiary({
        name: beneficiaryName,
        relationship: '',
        email: beneficiaryEmail,
        phone: '',
      });
    }
    if (verifierName.trim()) {
      addVerifier({
        name: verifierName,
        role: 'Friend',
        email: verifierEmail,
        phone: '',
      });
    }
    updateSchedule({ frequencyDays: frequency });
    completeOnboarding();
  };

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-graphite-800 tracking-tightest2 mb-1.5">Welcome to DeadLock</h1>
          <p className="text-graphite-500">Let's protect your digital legacy.</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2 text-sm text-graphite-500">
            <span>
              Step {step + 1} of {steps.length}
            </span>
            <span>{steps[step]}</span>
          </div>
          <ProgressBar value={((step + 1) / steps.length) * 100} />
        </div>

        <div className="bg-white/80 border border-platinum-200 rounded-2xl shadow-card p-7 min-h-[260px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 space-y-4"
            >
              {step === 0 && (
                <>
                  <Field label="Full name">
                    <input
                      className={inputClass}
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      placeholder="Jordan Casey"
                    />
                  </Field>
                  <Field label="Phone number" hint="Used for check-in reminders (optional).">
                    <input
                      className={inputClass}
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                    />
                  </Field>
                </>
              )}

              {step === 1 && (
                <Field label="Name your first digital asset" hint="You can add categories, notes, and more detail later.">
                  <input
                    className={inputClass}
                    value={assetTitle}
                    onChange={(e) => setAssetTitle(e.target.value)}
                    placeholder="e.g. Password manager vault"
                  />
                </Field>
              )}

              {step === 2 && (
                <>
                  <Field label="Beneficiary name">
                    <input
                      className={inputClass}
                      value={beneficiaryName}
                      onChange={(e) => setBeneficiaryName(e.target.value)}
                      placeholder="e.g. Sam Rivera"
                    />
                  </Field>
                  <Field label="Beneficiary email">
                    <input
                      className={inputClass}
                      value={beneficiaryEmail}
                      onChange={(e) => setBeneficiaryEmail(e.target.value)}
                      placeholder="sam@example.com"
                    />
                  </Field>
                </>
              )}

              {step === 3 && (
                <>
                  <Field label="Trusted verifier name" hint="Someone who can confirm your status if you become unreachable.">
                    <input
                      className={inputClass}
                      value={verifierName}
                      onChange={(e) => setVerifierName(e.target.value)}
                      placeholder="e.g. Taylor Chen"
                    />
                  </Field>
                  <Field label="Verifier email">
                    <input
                      className={inputClass}
                      value={verifierEmail}
                      onChange={(e) => setVerifierEmail(e.target.value)}
                      placeholder="taylor@example.com"
                    />
                  </Field>
                </>
              )}

              {step === 4 && (
                <Field label="How often should DeadLock ask you to confirm you're active?">
                  <div className="grid grid-cols-2 gap-2.5">
                    {(['7', '14', '30', '60'] as const).map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFrequency(f)}
                        className={`px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
                          frequency === f
                            ? 'border-steel-500 bg-steel-50 text-steel-600'
                            : 'border-platinum-300 text-graphite-600 hover:border-graphite-500'
                        }`}
                      >
                        Every {f} days
                      </button>
                    ))}
                  </div>
                </Field>
              )}

              {step === 5 && (
                <div className="space-y-3">
                  <p className="text-graphite-600 leading-relaxed">Here's what we'll set up for your workspace:</p>
                  <ul className="text-sm text-graphite-600 space-y-1.5">
                    <li>· Profile: {profile.name || 'Not set'}</li>
                    <li>· First asset: {assetTitle || 'Skipped — add later from My Assets'}</li>
                    <li>· Beneficiary: {beneficiaryName || 'Skipped — add later from Beneficiaries'}</li>
                    <li>· Verifier: {verifierName || 'Skipped — add later from Trusted Verifiers'}</li>
                    <li>· Check-in frequency: Every {frequency} days</li>
                  </ul>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between pt-6 mt-2">
            <Button variant="ghost" onClick={back} disabled={step === 0}>
              Back
            </Button>
            {step < steps.length - 1 ? (
              <Button onClick={next}>Continue</Button>
            ) : (
              <Button onClick={finish}>Finish setup</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
