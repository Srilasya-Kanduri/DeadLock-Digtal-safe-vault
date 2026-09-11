import React from 'react';
import { useApp } from '../../context/AppContext';
import { AnimatedCard, Badge, PageHeader } from '../../components/ui/primitives';

export const Operations: React.FC = () => {
  const { workspace } = useApp();
  if (!workspace) return null;
  const { operations, verifiers } = workspace;

  return (
    <div>
      <PageHeader
        title="Operations"
        subtitle="The status of any active verification workflow. This begins automatically if scheduled check-ins are missed."
      />

      <AnimatedCard className="p-6 mb-6">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm text-graphite-500">Current status</p>
          <Badge tone={operations.status === 'Idle' ? 'neutral' : 'pending'}>{operations.status}</Badge>
        </div>
        <p className="text-graphite-600 leading-relaxed mt-3">{operations.notes}</p>
      </AnimatedCard>

      {operations.verifierApprovals.length > 0 && (
        <AnimatedCard delay={0.05} className="p-6">
          <p className="font-medium text-graphite-700 mb-4">Verifier approvals</p>
          <div className="space-y-3">
            {operations.verifierApprovals.map((approval) => {
              const verifier = verifiers.find((v) => v.id === approval.verifierId);
              if (!verifier) return null;
              return (
                <div key={approval.verifierId} className="flex items-center justify-between py-2 border-b border-platinum-200 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-graphite-700">{verifier.name}</p>
                    <p className="text-xs text-graphite-400">{verifier.role}</p>
                  </div>
                  <Badge tone={approval.approved ? 'verified' : 'neutral'}>
                    {approval.approved ? 'Approved' : 'Awaiting response'}
                  </Badge>
                </div>
              );
            })}
          </div>
        </AnimatedCard>
      )}
    </div>
  );
};
