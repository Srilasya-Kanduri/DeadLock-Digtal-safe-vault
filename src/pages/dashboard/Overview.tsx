import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Users, ShieldCheck, CalendarClock, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AnimatedCard, Badge, PageHeader, ProgressBar } from '../../components/ui/primitives';
import { Button } from '../../components/ui/Button';

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? 's' : ''} ago`;
}

function daysUntil(iso: string) {
  const diff = new Date(iso).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export const Overview: React.FC = () => {
  const { workspace } = useApp();
  if (!workspace) return null;

  const { assets, beneficiaries, verifiers, schedule, activity, profile } = workspace;

  const readiness = Math.round(
    ((assets.length > 0 ? 1 : 0) +
      (beneficiaries.length > 0 ? 1 : 0) +
      (verifiers.length >= 2 ? 1 : 0) +
      (assets.every((a) => a.beneficiaryId || assets.length === 0) ? 1 : 0)) *
      25,
  );

  const nextCheckInDays = daysUntil(schedule.nextCheckIn);

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${profile.name.split(' ')[0] || 'there'}`}
        subtitle="Here's the current state of your digital legacy."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <AnimatedCard delay={0} className="p-5">
          <p className="text-sm text-graphite-500 mb-1">Legacy readiness</p>
          <p className="text-2xl font-semibold text-graphite-800 mb-3">{readiness}%</p>
          <ProgressBar value={readiness} />
        </AnimatedCard>
        <AnimatedCard delay={0.05} className="p-5">
          <div className="flex items-center gap-2 text-graphite-500 mb-1">
            <Lock size={15} />
            <p className="text-sm">Assets protected</p>
          </div>
          <p className="text-2xl font-semibold text-graphite-800">{assets.length}</p>
        </AnimatedCard>
        <AnimatedCard delay={0.1} className="p-5">
          <div className="flex items-center gap-2 text-graphite-500 mb-1">
            <Users size={15} />
            <p className="text-sm">Beneficiaries</p>
          </div>
          <p className="text-2xl font-semibold text-graphite-800">{beneficiaries.length}</p>
        </AnimatedCard>
        <AnimatedCard delay={0.15} className="p-5">
          <div className="flex items-center gap-2 text-graphite-500 mb-1">
            <ShieldCheck size={15} />
            <p className="text-sm">Verifiers added</p>
          </div>
          <p className="text-2xl font-semibold text-graphite-800">{verifiers.length}</p>
        </AnimatedCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <AnimatedCard delay={0.2} className="p-6 lg:col-span-1">
          <div className="flex items-center gap-2 text-graphite-500 mb-3">
            <CalendarClock size={16} />
            <p className="text-sm font-medium">Upcoming check-in</p>
          </div>
          <p className="text-3xl font-semibold text-graphite-800 mb-1">
            {nextCheckInDays <= 0 ? 'Due now' : `${nextCheckInDays}d`}
          </p>
          <p className="text-sm text-graphite-500 mb-5">
            {new Date(schedule.nextCheckIn).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
          </p>
          <Link to="/app/schedule">
            <Button variant="secondary" size="md" className="w-full flex items-center justify-center gap-1.5">
              Manage schedule <ArrowRight size={15} />
            </Button>
          </Link>
        </AnimatedCard>

        <AnimatedCard delay={0.25} className="p-6 lg:col-span-2">
          <p className="text-sm font-medium text-graphite-500 mb-4">Recent activity</p>
          <div className="space-y-3.5">
            {activity.slice(0, 5).map((a) => (
              <div key={a.id} className="flex items-start justify-between gap-4 pb-3.5 border-b border-platinum-200 last:border-0 last:pb-0">
                <p className="text-sm text-graphite-700 leading-relaxed">{a.message}</p>
                <span className="text-xs text-graphite-400 whitespace-nowrap mt-0.5">{timeAgo(a.timestamp)}</span>
              </div>
            ))}
            {activity.length === 0 && <p className="text-sm text-graphite-400">No activity yet.</p>}
          </div>
        </AnimatedCard>
      </div>

      <AnimatedCard delay={0.3} className="p-6 mt-5">
        <p className="text-sm font-medium text-graphite-500 mb-4">Quick actions</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link to="/app/assets">
            <Button variant="secondary" className="w-full">Add asset</Button>
          </Link>
          <Link to="/app/beneficiaries">
            <Button variant="secondary" className="w-full">Add beneficiary</Button>
          </Link>
          <Link to="/app/verifiers">
            <Button variant="secondary" className="w-full">Add verifier</Button>
          </Link>
          <Link to="/app/schedule">
            <Button variant="secondary" className="w-full">Confirm check-in</Button>
          </Link>
        </div>
      </AnimatedCard>

      {workspace.isDemo && (
        <div className="mt-5">
          <Badge tone="steel">Demo workspace — changes here are not saved</Badge>
        </div>
      )}
    </div>
  );
};
