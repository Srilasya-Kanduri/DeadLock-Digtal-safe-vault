export type AssetCategory =
  | 'Passwords'
  | 'Cloud Storage'
  | 'Photos'
  | 'Videos'
  | 'Crypto Wallets'
  | 'Recovery Phrases'
  | 'Business Documents'
  | 'Social Media'
  | 'Subscriptions'
  | 'Banking Instructions'
  | 'Insurance'
  | 'Custom';

export type Priority = 'Low' | 'Standard' | 'High' | 'Critical';

export interface DigitalAsset {
  id: string;
  title: string;
  description: string;
  category: AssetCategory;
  priority: Priority;
  beneficiaryId: string | null;
  releaseConditions: string;
  encryptedNotes: string;
  attachments: string[];
  createdAt: string;
}

export type VerificationStatus = 'Verified' | 'Pending' | 'Unverified';

export interface Beneficiary {
  id: string;
  name: string;
  relationship: string;
  email: string;
  phone: string;
  verificationStatus: VerificationStatus;
  assignedAssetIds: string[];
}

export type VerifierRole = 'Spouse' | 'Sibling' | 'Friend' | 'Lawyer' | 'Doctor' | 'Other';

export interface TrustedVerifier {
  id: string;
  name: string;
  role: VerifierRole;
  email: string;
  phone: string;
  status: VerificationStatus;
}

export type ThresholdRule = '2-of-3' | '3-of-5' | '4-of-7' | 'custom';

export interface LegacyPolicy {
  id: string;
  name: string;
  description: string;
  thresholdRule: ThresholdRule;
  linkedAssetIds: string[];
  active: boolean;
}

export type CheckInFrequency = '7' | '14' | '30' | '60' | 'custom';

export interface VerificationScheduleConfig {
  frequencyDays: CheckInFrequency;
  customDays?: number;
  notifyEmail: boolean;
  notifySms: boolean;
  notifyPush: boolean;
  lastCheckIn: string;
  nextCheckIn: string;
}

export interface ActivityEntry {
  id: string;
  type: 'check-in' | 'asset' | 'beneficiary' | 'verifier' | 'policy' | 'system' | 'operation';
  message: string;
  timestamp: string;
}

export interface AuditLogEntry {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
  ipContext: string;
}

export type OperationStatus = 'Idle' | 'Awaiting Verification' | 'In Progress' | 'Completed';

export interface OperationRecord {
  id: string;
  status: OperationStatus;
  startedAt: string | null;
  verifierApprovals: { verifierId: string; approved: boolean }[];
  notes: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  timezone: string;
}

export interface Workspace {
  isDemo: boolean;
  profile: UserProfile;
  assets: DigitalAsset[];
  beneficiaries: Beneficiary[];
  verifiers: TrustedVerifier[];
  policies: LegacyPolicy[];
  schedule: VerificationScheduleConfig;
  activity: ActivityEntry[];
  auditLog: AuditLogEntry[];
  operations: OperationRecord;
  notifications: NotificationItem[];
  onboardingComplete: boolean;
}
