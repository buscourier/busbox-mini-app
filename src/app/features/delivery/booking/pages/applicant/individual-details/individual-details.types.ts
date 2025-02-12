import { FormControl, FormGroup } from '@angular/forms';

import { IndividualDetails } from '../../../types';

export type IndividualDetailsControls = FormGroup<{
  [K in keyof IndividualDetails]: FormControl<IndividualDetails[K]>;
}>;

export const IndividualRole = {
  SENDER: 'sender',
  RECIPIENT: 'recipient',
} as const;

// Type: 'sender' | 'recipient'
export type IndividualRole = (typeof IndividualRole)[keyof typeof IndividualRole];
