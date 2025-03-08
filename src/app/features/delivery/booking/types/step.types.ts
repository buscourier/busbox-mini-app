import type { Applicant } from './applicant.types';
import type { Departure } from './departure.types';
import type { Destination } from './destination.types';
import type { Review } from './review.types';

export type StepNumber = 1 | 2 | 3 | 4;

export interface Step {
  title: string;
  path: string;
  isValid: boolean;
}

export type StepView = Readonly<Step & { isActive: boolean; isCompleted: boolean }>;

export interface StepsData {
  applicant: Applicant | null;
  departure: Departure | null;
  destination: Destination | null;
  review: Review;
}
