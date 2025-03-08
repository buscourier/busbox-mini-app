import { FormControl, FormGroup } from '@angular/forms';

import { Recipient } from '../../../types';

export type RecipientForm = FormGroup<{
  [K in keyof Recipient]: FormControl<Recipient[K]>;
}>;
