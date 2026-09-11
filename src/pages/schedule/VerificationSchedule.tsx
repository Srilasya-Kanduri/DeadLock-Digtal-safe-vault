import React from 'react';
import { CalendarClock, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AnimatedCard, PageHeader } from '../../components/ui/primitives';
import { Button } from '../../components/ui/Button';
import { CheckInFrequency } from '../../types';

const frequencies: { value: CheckInFrequency; label: string }[] = [
  { value: '7', label: 'Every 7 days' },
  { value: '14', label: 'Every 14 days' },
  { value: '30', label: 'Every 30 days' },
  { value: '60', label: 'Every 60 days' },
  { value: 'custom', label: 'Custom' },
];

export const VerificationSchedule: React.FC = () => {
  const { workspace, updateSchedule, confirmCheckIn } = useApp();
  if (!workspace) return null;
  const { schedule } = workspace;

  const nextDate = new Date(schedule.nextCheckIn);
  const daysLeft = Math.ceil((nextDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <div>
      <PageHeader
        title="Verification Schedule"
        subtitle="Choose how often DeadLock asks you to confirm you're active. Missed check-ins begin the verification workflow."
      />

      <AnimatedCard className="p-6 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-steel-50 flex items-center justify-center">
              <CalendarClock size={19} className="text-steel-600" />
            </div>
            <div>
              <p className="text-sm text-graphite-500">Next check-in</p>
              <p className="font-semibold text-graphite-800">
                {nextDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                {daysLeft <= 0 ? ' — due now' : ` · ${daysLeft} days away`}
              </p>
            </div>
          </div>
          <Button onClick={confirmCheckIn} className="flex items-center gap-1.5">
            <Check size={16} /> Confirm I'm active
          </Button>
        </div>
      </AnimatedCard>

      <AnimatedCard delay={0.05} className="p-6 mb-6">
        <p className="font-medium text-graphite-700 mb-4">Check-in frequency</p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {frequencies.map((f) => (
            <button
              key={f.value}
              onClick={() => updateSchedule({ frequencyDays: f.value })}
              className={`px-3.5 py-3 rounded-xl border text-sm font-medium transition-colors ${
                schedule.frequencyDays === f.value
                  ? 'border-steel-500 bg-steel-50 text-steel-600'
                  : 'border-platinum-300 text-graphite-600 hover:border-graphite-500'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </AnimatedCard>

      <AnimatedCard delay={0.1} className="p-6">
        <p className="font-medium text-graphite-700 mb-4">Notification preferences</p>
        <div className="space-y-3">
          {([
            ['notifyEmail', 'Email'],
            ['notifySms', 'SMS (placeholder)'],
            ['notifyPush', 'Push notification (placeholder)'],
          ] as const).map(([key, label]) => (
            <label key={key} className="flex items-center justify-between py-1">
              <span className="text-sm text-graphite-600">{label}</span>
              <input
                type="checkbox"
                checked={schedule[key]}
                onChange={(e) => updateSchedule({ [key]: e.target.checked } as any)}
                className="w-4 h-4 accent-[#5C7A8E]"
              />
            </label>
          ))}
        </div>
      </AnimatedCard>
    </div>
  );
};
