# DeadLock — Digital Legacy Coordination Platform

A complete rebuild of DeadLock: a calm, premium, Apple/Stripe/Linear-inspired product for organizing digital assets and coordinating how they're released to beneficiaries after death or incapacitation. DeadLock never accesses, hacks, or bypasses any third-party account — it coordinates encrypted information, trusted contacts, and verification workflows that the user fully controls.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## What's inside

- **Vault entrance** — a minimal, realistic vault-opening transition before the authentication screen.
- **Authentication** — Continue with Google, Create Account, Sign In, Forgot Password, and a clearly separated "Explore Demo Workspace" path.
- **Demo workspace** — loads fictional data for "Alex Morgan" so people can explore every feature before creating an account. Always opt-in, never the default. A visible "Demo workspace" badge appears in the sidebar and on the dashboard.
- **Real accounts** — creating an account or signing in gives an empty workspace and a 6-step onboarding flow (Personal Profile → Add Digital Assets → Assign Beneficiaries → Assign Trusted Verifiers → Configure Verification Schedule → Review and Finish).
- **Full workspace** — Overview, My Assets, Beneficiaries, Trusted Verifiers, Legacy Policies, Legacy Vault, Verification Schedule, Operations, Audit Logs, Notifications, Settings, and Help, all sharing one consistent design system.
- **State** — held in React context (`src/context/AppContext.tsx`) for this hackathon build. Adding assets, beneficiaries, verifiers, and policies, confirming check-ins, and reading notifications all update real in-memory state and write to the activity feed and audit log. There is no backend in this build — wiring it to one (e.g. your own API) is the natural next step.

## Design system

- **Type**: Manrope only, with weight and spacing doing the work of hierarchy — no second typeface.
- **Color**: warm white / stone / platinum / graphite, with a single muted steel-blue accent used sparingly for active and informational states. No neon, no cyberpunk, no black backgrounds — the interface is meant to feel like a premium OS settings app, not a hacker dashboard.
- **Motion**: Framer Motion throughout — page transitions, card entrances, and the vault-opening sequence — kept subtle and consistent rather than flashy.

## Project structure

```
src/
  components/
    layout/     Sidebar, AppLayout
    ui/         Button, Card, Modal, Badge, ProgressBar, Field, etc.
    vault/      VaultEntrance
  context/      AppContext (session + workspace state)
  data/         demoWorkspace.ts (Alex Morgan), emptyWorkspace.ts (real users)
  pages/        one folder per sidebar destination
  types/        shared TypeScript types
  App.tsx       session state machine + routing
  main.tsx      entry point
```

## Notes for the hackathon judges / next steps

- Swap `AppContext`'s in-memory state for real persistence (a database + encryption-at-rest for asset contents) before handling real user data.
- `signIn` and `Continue with Google` are simulated for the demo; wire them to real OAuth and a backend session before shipping.
- The Operations/verification workflow is modeled but not automated — a real deployment would need a scheduled job that checks for missed check-ins and notifies verifiers.
