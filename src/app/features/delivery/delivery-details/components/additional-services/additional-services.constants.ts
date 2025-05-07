import type { TranslocoService } from '@jsverse/transloco';
import type { TuiValidationError } from '@taiga-ui/cdk';

export const MONETARY_SERVICES = ['insurance', 'recipientPayment'] as const;
export const SMS_SERVICES = ['extendedSms', 'senderSms'] as const;

export const AdditionalServiceId = {
  ROOT: '3',
  INSURANCE: '1',
} as const;

export const AdditionalServiceName = {
  EXTENDED_SMS: 'Расширенная СМС',
  SENDER_SMS: 'СМС отправителю',
  RECIPIENT_PAYMENT: 'Оплата получателем',
} as const;

export const INSURANCE_THRESHOLD_AMOUNT = 15000;
export const INSURANCE_MAX_AMOUNT = 30000;
export const INSURANCE_MIN_AMOUNT = 100;
export const RECIPIENT_PAYMENT_MAX_AMOUNT = 1;
export const RECIPIENT_PAYMENT_MIN_AMOUNT = 1;

export function servicesValidationErrors(
  service: TranslocoService,
): Record<string, (context: never) => TuiValidationError | string> {
  return {
    required: () => service.translate('validation.required'),
    phone: () => service.translate('contacts.validation.phone'),
    min: () => service.translate('deliveryDetails.additionalServices.validation.min'),
  };
}
