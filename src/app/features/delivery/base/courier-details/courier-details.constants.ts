import type { TranslocoService } from '@jsverse/transloco';
import type { TuiValidationError } from '@taiga-ui/cdk';

import type { PreferredTimeSlot } from '@shared/types';

export const PREFERRED_COURIER_TIME: PreferredTimeSlot[] = [
  {
    id: '8:00-14:00',
    label: '8:00 - 14:00',
  },
  {
    id: '14:00-18:00',
    label: '14:00 - 18:00',
  },
];

export function courierValidationErrors(
  service: TranslocoService,
): Record<string, (context: never) => TuiValidationError | string> {
  return {
    required: () => service.translate('validation.required'),
    minlength: ({ requiredLength }: { requiredLength: number }) =>
      service.translate('validation.minlength', { requiredLength }),
    maxlength: ({ requiredLength }: { requiredLength: number }) =>
      service.translate('validation.maxlength', { requiredLength }),
    street: () => service.translate('address.validation.street'),
    building: () => service.translate('address.validation.building'),
    apartment: () => service.translate('address.validation.apartment'),
  };
}
