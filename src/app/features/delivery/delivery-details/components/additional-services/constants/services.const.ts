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
