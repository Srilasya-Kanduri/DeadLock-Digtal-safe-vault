import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Chrome } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/ui/Button';
import { Field, inputClass } from '../../components/ui/primitives';

type Mode = 'landing' | 'create' | 'signin' | 'forgot';

export const AuthPage: React.FC = () => {
  const { createAccount, signIn, enterDemo } = useApp();
  const [mode, setMode] = useState<Mode>('landing');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas px-6">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center text-center mb-9">
          <div className="w-14 h-14 rounded-2xl bg-graphite-700 flex items-center justify-center mb-5">
            <div className="w-5 h-5 rounded-full border-[2.5px] border-canvas" />
          </div>
          <h1 className="text-[1.9rem] font-semibold text-graphite-800 tracking-tightest2 mb-2">
            Protect your digital legacy.
          </h1>
          <p className="text-graphite-500 leading-relaxed max-w-sm">
            Organize your digital assets, define your beneficiaries, and control how your legacy is securely passed
            on.
          </p>
        </div>

        {mode === 'landing' && (
          <div className="space-y-3">
            <Button variant="secondary" size="lg" className="w-full flex items-center justify-center gap-2.5" onClick={() => signIn('demo.user@example.com')}>
              <Chrome size={18} />
              Continue with Google
            </Button>
            <Button variant="primary" size="lg" className="w-full" onClick={() => setMode('create')}>
              Create Account
            </Button>
            <Button variant="secondary" size="lg" className="w-full" onClick={() => setMode('signin')}>
              Sign In
            </Button>
            <button
              onClick={() => setMode('forgot')}
              className="w-full text-center text-sm text-graphite-500 hover:text-graphite-700 transition-colors pt-1"
            >
              Forgot Password
            </button>

            <div className="pt-6 mt-6 border-t border-platinum-200 text-center">
              <p className="text-sm text-graphite-500 mb-3">Want to explore before creating an account?</p>
              <Button variant="subtle" size="md" className="w-full" onClick={enterDemo}>
                Explore Demo Workspace
              </Button>
            </div>
          </div>
        )}

        {mode === 'create' && (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              createAccount(name || 'You', email || 'you@example.com');
            }}
          >
            <Field label="Full name">
              <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="Jordan Casey" required />
            </Field>
            <Field label="Email">
              <input
                className={inputClass}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </Field>
            <Field label="Password">
              <input
                className={inputClass}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                required
              />
            </Field>
            <Button type="submit" size="lg" className="w-full">
              Create Account
            </Button>
            <button type="button" onClick={() => setMode('landing')} className="w-full text-center text-sm text-graphite-500 hover:text-graphite-700 pt-1">
              Back
            </button>
          </form>
        )}

        {mode === 'signin' && (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              signIn(email || 'you@example.com');
            }}
          >
            <Field label="Email">
              <input
                className={inputClass}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </Field>
            <Field label="Password">
              <input
                className={inputClass}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
              />
            </Field>
            <Button type="submit" size="lg" className="w-full">
              Sign In
            </Button>
            <button type="button" onClick={() => setMode('landing')} className="w-full text-center text-sm text-graphite-500 hover:text-graphite-700 pt-1">
              Back
            </button>
          </form>
        )}

        {mode === 'forgot' && (
          <div className="space-y-4">
            {!sent ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-4"
              >
                <Field label="Email" hint="We'll send a secure link to reset your password.">
                  <input
                    className={inputClass}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </Field>
                <Button type="submit" size="lg" className="w-full">
                  Send Reset Link
                </Button>
              </form>
            ) : (
              <div className="text-center py-4">
                <p className="text-graphite-700 font-medium mb-1">Check your inbox</p>
                <p className="text-graphite-500 text-sm">We sent a password reset link to {email}.</p>
              </div>
            )}
            <button onClick={() => setMode('landing')} className="w-full text-center text-sm text-graphite-500 hover:text-graphite-700 pt-1">
              Back
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
