import { Applicant } from './applicant.types';

export type StepNumber = 1 | 2 | 3 | 4;

export interface Step {
  title: string;
  path: string;
  isValid: boolean;
}

export type StepView = Readonly<Step & { isActive: boolean }>;

export interface StepsData {
  applicant: Applicant | null;
}
