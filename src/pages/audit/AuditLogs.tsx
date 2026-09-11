import React from 'react';
import { useApp } from '../../context/AppContext';
import { EmptyState, PageHeader } from '../../components/ui/primitives';

export const AuditLogs: React.FC = () => {
  const { workspace } = useApp();
  if (!workspace) return null;
  const { auditLog } = workspace;

  return (
    <div>
      <PageHeader title="Audit Logs" subtitle="A complete, unchangeable record of every action taken on your account." />

      {auditLog.length === 0 ? (
        <EmptyState title="No activity recorded yet" body="Actions you take will be logged here for transparency and security." />
      ) : (
        <div className="border border-platinum-200 rounded-2xl overflow-hidden bg-white/80">
          {auditLog.map((log, i) => (
            <div
              key={log.id}
              className={`flex items-center justify-between gap-4 px-5 py-4 ${i !== auditLog.length - 1 ? 'border-b border-platinum-200' : ''}`}
            >
              <div className="min-w-0">
                <p className="text-sm text-graphite-700">
                  <span className="font-medium">{log.actor}</span> · {log.action}
                </p>
                <p className="text-xs text-graphite-400 mt-0.5 truncate">{log.target} · {log.ipContext}</p>
              </div>
              <span className="text-xs text-graphite-400 whitespace-nowrap">
                {new Date(log.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
