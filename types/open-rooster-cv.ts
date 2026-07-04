// TypeScript types mirroring the open.rooster.cv/0.1 JSON Schema.
// These describe the shape of a conforming payload. Most fields are optional
// because the protocol keeps the required surface intentionally small.

export type ResumeDate = string; // YYYY | YYYY-MM | YYYY-MM-DD

export type ContactType =
  | 'email'
  | 'phone'
  | 'website'
  | 'portfolio'
  | 'professional_network'
  | 'other';

export type LinkType =
  | 'website'
  | 'portfolio'
  | 'professional_network'
  | 'publication'
  | 'project'
  | 'other';

export type EmploymentType =
  | 'full_time'
  | 'part_time'
  | 'contract'
  | 'temporary'
  | 'internship'
  | 'apprenticeship'
  | 'volunteer'
  | 'self_employed'
  | 'other';

export type Proficiency = 'beginner' | 'working' | 'advanced' | 'expert';

export type LanguageProficiency =
  | 'elementary'
  | 'limited_working'
  | 'professional_working'
  | 'full_professional'
  | 'native_or_bilingual';

export type RemotePreference = 'onsite' | 'hybrid' | 'remote' | 'flexible';

export type TravelWillingness = 'none' | 'limited' | 'moderate' | 'extensive';

export type CompensationPeriod = 'hour' | 'day' | 'week' | 'month' | 'year';

export type ConsentPurpose =
  | 'job_application'
  | 'talent_pool'
  | 'referral'
  | 'profile_import'
  | 'other';

export type RetentionPolicy =
  | 'until_hiring_decision'
  | 'fixed_period'
  | 'legal_requirement'
  | 'applicant_controlled'
  | 'unspecified';

export type ProvenanceSource =
  | 'applicant'
  | 'issuer'
  | 'employer'
  | 'platform'
  | 'inferred';

export interface Provenance {
  source: ProvenanceSource;
  verifiedBy?: string;
  verificationUrl?: string;
  lastVerifiedAt?: string;
  note?: string;
}

export interface ContactMethod {
  type: ContactType;
  value: string;
  label?: string;
  preferred?: boolean;
}

export interface ResumeLink {
  url: string;
  label?: string;
  type?: LinkType;
}

export interface ResumeLocation {
  city?: string;
  region?: string;
  country?: string; // ISO 3166-1 alpha-2
  remote?: boolean;
}

export interface Identity {
  displayName: string;
  givenName?: string;
  familyName?: string;
  pronunciation?: string;
  contact: ContactMethod[];
  location?: ResumeLocation;
  links?: ResumeLink[];
}

export interface Summary {
  headline?: string;
  text?: string;
  objective?: string;
  provenance?: Provenance;
}

export interface Metric {
  name: string;
  value: string;
  unit?: string;
}

export interface Achievement {
  description: string;
  metrics?: Metric[];
  evidence?: ResumeLink[];
}

export interface WorkRole {
  employer: string;
  title: string;
  employmentType?: EmploymentType;
  location?: ResumeLocation;
  startDate: ResumeDate;
  endDate?: ResumeDate | null;
  current?: boolean;
  responsibilities?: string[];
  achievements?: Achievement[];
  skillsUsed?: string[];
  provenance?: Provenance;
}

export interface EducationRecord {
  institution: string;
  credential?: string;
  fieldOfStudy?: string;
  startDate?: ResumeDate;
  endDate?: ResumeDate;
  honors?: string[];
  coursework?: string[];
  verificationUrl?: string;
  provenance?: Provenance;
}

export interface Skill {
  name: string;
  category?: string;
  proficiency?: Proficiency;
  yearsExperience?: number;
  lastUsed?: ResumeDate;
  evidence?: ResumeLink[];
  provenance?: Provenance;
}

export interface Credential {
  name: string;
  issuer: string;
  credentialId?: string;
  issueDate?: ResumeDate;
  expiryDate?: ResumeDate;
  verificationUrl?: string;
  provenance?: Provenance;
}

export interface Project {
  title: string;
  role?: string;
  description?: string;
  outcomes?: string[];
  startDate?: ResumeDate;
  endDate?: ResumeDate;
  links?: ResumeLink[];
  skillsUsed?: string[];
  provenance?: Provenance;
}

export interface ResumeLanguage {
  name: string;
  proficiency?: LanguageProficiency;
}

export interface Compensation {
  amount: number;
  currency: string; // ISO 4217
  period: CompensationPeriod;
  note?: string;
}

export interface Preferences {
  desiredRoles?: string[];
  employmentTypes?: EmploymentType[];
  locations?: ResumeLocation[];
  remotePreference?: RemotePreference;
  travelWillingness?: TravelWillingness;
  availability?: ResumeDate;
  compensationExpectation?: Compensation;
}

export interface Profile {
  id: string;
  identity: Identity;
  summary?: Summary;
  work?: WorkRole[];
  education?: EducationRecord[];
  skills?: Skill[];
  credentials?: Credential[];
  projects?: Project[];
  languages?: ResumeLanguage[];
  preferences?: Preferences;
}

export type QuestionAnswerValue = string | number | boolean | null;

export interface QuestionAnswer {
  id?: string;
  question: string;
  answer: QuestionAnswerValue;
  answeredAt?: string;
}

export interface Attestation {
  statement: string;
  accepted: boolean;
  acceptedAt?: string;
}

export interface Application {
  employer?: string;
  jobRequisitionId?: string;
  jobTitle?: string;
  appliedAt?: string;
  tailoredSummary?: string;
  availability?: ResumeDate;
  workAuthorization?: QuestionAnswer[];
  screeningAnswers?: QuestionAnswer[];
  attestations?: Attestation[];
  renderedResumeUrl?: string;
}

export interface Retention {
  policy?: RetentionPolicy;
  deleteAfter?: string; // YYYY-MM-DD
  note?: string;
}

export interface Revocation {
  url?: string;
  email?: string;
  instructions?: string;
}

export interface Consent {
  purpose: ConsentPurpose;
  scope: string[];
  grantedAt?: string;
  retention?: Retention;
  revocation?: Revocation;
}

export interface Metadata {
  createdAt: string;
  updatedAt?: string;
  language: string; // BCP 47-style tag
  sourceSystem?: string;
  schemaUrl?: string;
  payloadHash?: string;
  signature?: Record<string, unknown>;
}

export interface ProtocolInfo {
  name: 'open.rooster.cv';
  version: '0.1';
  extensions?: string[];
}

export interface ResumeDocument {
  protocol: ProtocolInfo;
  profile: Profile;
  application: Application;
  consent: Consent;
  metadata: Metadata;
  extensions?: Record<string, unknown>;
}
