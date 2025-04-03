import { InjectionToken } from '@angular/core';

// eslint-disable-next-line import/no-internal-modules
import type { ValidationLimits, ValidationMessages } from '../config/validation';

export const VALIDATION_LIMITS = new InjectionToken<ValidationLimits>('Validation limits');
export const VALIDATION_MESSAGES = new InjectionToken<ValidationMessages>('Validation messages');
