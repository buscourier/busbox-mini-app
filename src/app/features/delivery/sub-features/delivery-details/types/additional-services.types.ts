interface BaseServiceData {
  readonly serviceId: string;
  readonly displayName: string;
  readonly price: string;
}

interface MonetaryServiceData extends BaseServiceData {
  readonly amount: number;
}

interface SmsServiceData extends BaseServiceData {
  readonly phone: string;
}

export interface AdditionalServicesData {
  readonly insurance: MonetaryServiceData | null;
  readonly recipientPayment: MonetaryServiceData | null;
  readonly extendedSms: SmsServiceData | null;
  readonly senderSms: SmsServiceData | null;
}
