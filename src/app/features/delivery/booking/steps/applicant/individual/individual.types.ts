import type { FormControl, FormGroup } from '@angular/forms';

import type { Individual } from '@delivery/booking/types';

export type IndividualForm = FormGroup<{
  [K in keyof Individual]: FormControl<Individual[K]>;
}>;

export const IndividualRole = {
  SENDER: 'sender',
  RECIPIENT: 'recipient',
} as const;

// Type: 'sender' | 'recipient'
export type IndividualRole = (typeof IndividualRole)[keyof typeof IndividualRole];
