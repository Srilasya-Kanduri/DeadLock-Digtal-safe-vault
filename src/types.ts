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

export type VerifierRole =
  | 'Spouse'
  | 'Sibling'
  | 'Friend'
  | 'Lawyer'
  | 'Doctor'
  | 'Other';

export type VerificationStatus = 'Verified' | 'Pending' | 'Unverified';

export type ThresholdRule = '2-of-3' | '3-of-5' | '4-of-7' | 'custom';

export type CheckInFrequency = '7' | '14' | '30' | '60' | 'custom';

export type ActivityType =
  | 'asset'
  | 'beneficiary'
  | 'verifier'
  | 'policy'
  | 'check-in'
  | 'system';

export type OperationStatus = 'Idle' | 'Pending' | 'Active' | 'Completed' | 'Failed';

export interface Profile {
  name: string;
  email: string;
  phone: string;
  timezone: string;
}

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

export interface Beneficiary {
  id: string;
  name: string;
  relationship: string;
  email: string;
  phone: string;
  verificationStatus: VerificationStatus;
  assignedAssetIds: string[];
}

export interface TrustedVerifier {
  id: string;
  name: string;
  role: VerifierRole;
  email: string;
  phone: string;
  status: VerificationStatus;
}

export interface LegacyPolicy {
  id: string;
  name: string;
  description: string;
  thresholdRule: ThresholdRule;
  linkedAssetIds: string[];
  active: boolean;
}

export interface VerificationSchedule {
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
  type: ActivityType;
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

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
}

export interface VerifierApproval {
  verifierId: string;
  approved: boolean;
}

export interface Operations {
  status: OperationStatus;
  startedAt: string | null;
  verifierApprovals: VerifierApproval[];
  notes: string;
}

export interface Workspace {
  isDemo: boolean;
  profile: Profile;
  assets: DigitalAsset[];
  beneficiaries: Beneficiary[];
  verifiers: TrustedVerifier[];
  policies: LegacyPolicy[];
  schedule: VerificationSchedule;
  activity: ActivityEntry[];
  auditLog: AuditLogEntry[];
  operations: Operations;
  notifications: NotificationItem[];
  onboardingComplete: boolean;
}
