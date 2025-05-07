import { InjectionToken } from '@angular/core';

import type { ValidationLimits } from '../config';

export const VALIDATION_LIMITS = new InjectionToken<ValidationLimits>('Validation limits');
