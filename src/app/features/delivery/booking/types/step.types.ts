import { Applicant } from './applicant.types';
import { Departure } from './departure.types';
import { Destination } from './destination.types';
import { Review } from './review.types';

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
