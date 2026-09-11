import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutGrid,
  Lock,
  Users,
  ShieldCheck,
  FileStack,
  Archive,
  CalendarClock,
  Activity,
  ScrollText,
  Bell,
  Settings as SettingsIcon,
  HelpCircle,
  LogOut,
  Compass,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const navItems = [
  { to: '/app/overview', label: 'Overview', icon: LayoutGrid },
  { to: '/app/assets', label: 'My Assets', icon: Lock },
  { to: '/app/beneficiaries', label: 'Beneficiaries', icon: Users },
  { to: '/app/verifiers', label: 'Trusted Verifiers', icon: ShieldCheck },
  { to: '/app/policies', label: 'Legacy Policies', icon: FileStack },
  { to: '/app/vault', label: 'Legacy Vault', icon: Archive },
  { to: '/app/schedule', label: 'Verification Schedule', icon: CalendarClock },
  { to: '/app/operations', label: 'Operations', icon: Activity },
  { to: '/app/audit', label: 'Audit Logs', icon: ScrollText },
  { to: '/app/notifications', label: 'Notifications', icon: Bell },
  { to: '/app/settings', label: 'Settings', icon: SettingsIcon },
  { to: '/app/help', label: 'Help', icon: HelpCircle },
];

export const Sidebar: React.FC = () => {
  const { workspace, enterDemo, signOut } = useApp();

  return (
    <aside className="w-[248px] shrink-0 h-screen sticky top-0 flex flex-col border-r border-platinum-200 bg-[#F7F4EF]">
      <div className="px-6 pt-7 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-graphite-700 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full border-2 border-canvas" />
          </div>
          <span className="text-[1.05rem] font-semibold text-graphite-800 tracking-tightest2">DeadLock</span>
        </div>
        {workspace?.isDemo && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-steel-50 text-steel-600 text-xs font-medium">
            Demo workspace
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 space-y-0.5">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[0.9rem] transition-colors ${
                isActive
                  ? 'bg-white text-graphite-800 shadow-card font-medium'
                  : 'text-graphite-500 hover:bg-white/70 hover:text-graphite-700'
              }`
            }
          >
            <Icon size={17} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-6 pt-3 border-t border-platinum-200 space-y-0.5">
        {!workspace?.isDemo && (
          <button
            onClick={enterDemo}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[0.9rem] text-graphite-500 hover:bg-white/70 hover:text-graphite-700 transition-colors"
          >
            <Compass size={17} />
            Explore Demo Workspace
          </button>
        )}
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[0.9rem] text-graphite-500 hover:bg-white/70 hover:text-graphite-700 transition-colors"
        >
          <LogOut size={17} />
          Log out
        </button>
      </div>
    </aside>
  );
};
