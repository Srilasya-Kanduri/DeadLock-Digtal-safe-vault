import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VaultEntranceProps {
  onComplete: () => void;
}

export const VaultEntrance: React.FC<VaultEntranceProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'idle' | 'opening' | 'done'>('idle');

  useEffect(() => {
    const t = setTimeout(() => setStage('opening'), 550);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (stage === 'opening') {
      const t = setTimeout(() => {
        setStage('done');
        onComplete();
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [stage, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F5F2EC]">
      {/* Two vault doors that slide apart */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-stone-100 to-stone-50 border-r border-platinum-300"
        animate={{ x: stage === 'opening' ? '-100%' : 0 }}
        transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-stone-100 to-stone-50 border-l border-platinum-300"
        animate={{ x: stage === 'opening' ? '100%' : 0 }}
        transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <motion.div
          className="w-20 h-20 rounded-full border-[3px] border-graphite-600 flex items-center justify-center"
          animate={{
            rotate: stage === 'opening' ? 120 : 0,
            opacity: stage === 'opening' ? 0 : 1,
            scale: stage === 'opening' ? 0.85 : 1,
          }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className="w-1.5 h-7 bg-graphite-600 rounded-full absolute -translate-y-3" />
          <div className="w-9 h-9 rounded-full border-2 border-graphite-600" />
        </motion.div>
        <AnimatePresence>
          {stage === 'idle' && (
            <motion.p
              className="text-graphite-500 text-sm tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              Unlocking a secure space
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
