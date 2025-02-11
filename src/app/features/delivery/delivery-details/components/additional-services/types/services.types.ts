import { FormControl } from '@angular/forms';

import { MONETARY_SERVICES, SMS_SERVICES } from '../constants';

export type SmsServiceType = (typeof SMS_SERVICES)[number];
export type MonetaryServiceType = (typeof MONETARY_SERVICES)[number];

export type ServiceName = 'insurance' | 'extendedSms' | 'senderSms' | 'recipientPayment';
export type ValueType = 'amount' | 'phone';

interface BaseService {
  enabled: FormControl<boolean | null>;
  serviceId: FormControl<string | null>;
}

export interface MonetaryService extends BaseService {
  amount: FormControl<number | null>;
}

export interface SmsService extends BaseService {
  phone: FormControl<string | null>;
}

export interface ServicesGroup {
  insurance?: Partial<{
    enabled: boolean | null;
    amount: number | null;
    serviceId: string | null;
  }>;
  recipientPayment?: Partial<{
    enabled: boolean | null;
    amount: number | null;
    serviceId: string | null;
  }>;
  extendedSms?: Partial<{
    enabled: boolean | null;
    phone: string | null;
    serviceId: string | null;
  }>;
  senderSms?: Partial<{
    enabled: boolean | null;
    phone: string | null;
    serviceId: string | null;
  }>;
}
