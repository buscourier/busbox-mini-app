import type { TranslocoService } from '@jsverse/transloco';
import type { TuiValidationError } from '@taiga-ui/cdk';

export function recipientValidationErrors(
  service: TranslocoService,
): Record<string, (context: never) => TuiValidationError | string> {
  return {
    required: () => service.translate('validation.required'),
    minlength: ({ requiredLength }: { requiredLength: number }) =>
      service.translate('validation.minlength', { requiredLength }),
    maxlength: ({ requiredLength }: { requiredLength: number }) =>
      service.translate('validation.maxlength', { requiredLength }),
    fullName: () => service.translate('user.validation.fullName'),
    phone: () => service.translate('contacts.validation.phone'),
  };
}
