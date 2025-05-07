import type { TranslocoService } from '@jsverse/transloco';
import type { TuiValidationError } from '@taiga-ui/cdk';

import { SenderDocument, type SenderDocumentOption } from '../../../types';

export const defaultDocument = {
  value: SenderDocument.PASSPORT,
  label: 'Паспорт',
};

export const senderDocuments: SenderDocumentOption[] = [
  defaultDocument,
  {
    value: SenderDocument.DRIVER_LICENSE,
    label: 'Водительское удостоверение',
  },
  {
    value: SenderDocument.OTHER,
    label: 'Другое',
  },
];

export function senderValidationErrors(
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
    'passport.number': () => service.translate('document.validation.passport'),
    'driverLicense.number': () => service.translate('document.validation.driverLicense'),
    'other.number': () => service.translate('document.validation.other'),
  };
}
