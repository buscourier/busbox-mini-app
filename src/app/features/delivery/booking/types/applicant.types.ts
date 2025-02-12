import { Individual } from './individual.types';

export const ApplicantType = {
  INDIVIDUAL: 'INDIVIDUAL',
  LEGAL: 'LEGAL',
} as const;

// Type: 'individual' | 'legal'
export type ApplicantType = (typeof ApplicantType)[keyof typeof ApplicantType];

export interface Applicant {
  applicantType?: ApplicantType;
  individual?: Individual;
  // legal: Legal | null;
}
