import React from 'react';
import { Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AnimatedCard, EmptyState, PageHeader } from '../../components/ui/primitives';

export const Notifications: React.FC = () => {
  const { workspace, markNotificationRead } = useApp();
  if (!workspace) return null;
  const { notifications } = workspace;

  return (
    <div>
      <PageHeader title="Notifications" subtitle="Updates about your account, check-ins, and legacy activity." />

      {notifications.length === 0 ? (
        <EmptyState title="You're all caught up" body="New notifications about your account will appear here." />
      ) : (
        <div className="space-y-2.5">
          {notifications.map((n, i) => (
            <AnimatedCard
              key={n.id}
              delay={i * 0.03}
              className={`p-4 flex items-start gap-3 cursor-pointer ${!n.read ? 'border-steel-300' : ''}`}
              onClick={() => markNotificationRead(n.id)}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${!n.read ? 'bg-steel-50' : 'bg-stone-100'}`}>
                <Bell size={15} className={!n.read ? 'text-steel-600' : 'text-graphite-400'} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className={`text-sm ${!n.read ? 'font-semibold text-graphite-800' : 'font-medium text-graphite-600'}`}>{n.title}</p>
                  <span className="text-xs text-graphite-400 whitespace-nowrap">
                    {new Date(n.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <p className="text-sm text-graphite-500 mt-0.5 leading-relaxed">{n.body}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      )}
    </div>
  );
};
