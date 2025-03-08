import type { FormControl, FormGroup } from '@angular/forms';

import type { Recipient } from '../../../types';

export type RecipientForm = FormGroup<{
  [K in keyof Recipient]: FormControl<Recipient[K]>;
}>;
