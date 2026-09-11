import React from 'react';
import { AnimatedCard, PageHeader } from '../../components/ui/primitives';

const faqs = [
  {
    q: 'What does DeadLock actually do?',
    a: 'DeadLock coordinates encrypted information, recovery instructions, trusted contacts, and verification workflows. It does not access, hack, or bypass any third-party service on your behalf.',
  },
  {
    q: 'How does verification work?',
    a: 'You choose trusted verifiers and a threshold, such as 2 of 3. If you miss scheduled check-ins, DeadLock notifies your verifiers, who confirm your status before any release begins.',
  },
  {
    q: 'What happens to my data if I never miss a check-in?',
    a: 'Nothing is released. Your assets remain encrypted and under your control for as long as you continue confirming your check-ins.',
  },
  {
    q: 'Can I change beneficiaries and assets later?',
    a: 'Yes. You can add, edit, or remove assets, beneficiaries, verifiers, and policies at any time from your workspace.',
  },
  {
    q: 'Is the demo workspace safe to explore?',
    a: 'Yes. The demo workspace uses fictional sample data for "Alex Morgan." Nothing you do there is saved or connected to a real account.',
  },
];

export const Help: React.FC = () => (
  <div>
    <PageHeader title="Help" subtitle="Answers to common questions about how DeadLock works." />
    <div className="space-y-3">
      {faqs.map((f, i) => (
        <AnimatedCard key={f.q} delay={i * 0.03} className="p-5">
          <p className="font-medium text-graphite-800 mb-1.5">{f.q}</p>
          <p className="text-sm text-graphite-500 leading-relaxed">{f.a}</p>
        </AnimatedCard>
      ))}
    </div>
  </div>
);
