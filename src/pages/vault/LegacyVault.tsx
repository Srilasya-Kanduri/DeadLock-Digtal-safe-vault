import React from 'react';
import { Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AnimatedCard, Badge, EmptyState, PageHeader } from '../../components/ui/primitives';

export const LegacyVault: React.FC = () => {
  const { workspace } = useApp();
  if (!workspace) return null;
  const { assets } = workspace;

  const byCategory = assets.reduce<Record<string, number>>((acc, a) => {
    acc[a.category] = (acc[a.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <PageHeader
        title="Legacy Vault"
        subtitle="An encrypted, read-only view of everything stored across your assets. Nothing here can be exported or decrypted from this screen."
      />

      {assets.length === 0 ? (
        <EmptyState title="Your vault is empty" body="Once you add assets, an encrypted summary of each will appear here." />
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {Object.entries(byCategory).map(([cat, count]) => (
              <AnimatedCard key={cat} className="p-4 text-center">
                <p className="text-xl font-semibold text-graphite-800">{count}</p>
                <p className="text-xs text-graphite-500 mt-0.5">{cat}</p>
              </AnimatedCard>
            ))}
          </div>

          <div className="space-y-2.5">
            {assets.map((a, i) => (
              <AnimatedCard key={a.id} delay={i * 0.02} className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center shrink-0">
                    <Lock size={15} className="text-graphite-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-graphite-800 truncate">{a.title}</p>
                    <p className="text-xs text-graphite-400">{a.category}</p>
                  </div>
                </div>
                <span className="text-graphite-300 tracking-widest text-sm shrink-0">
                  {a.encryptedNotes || '••••••••'}
                </span>
              </AnimatedCard>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
