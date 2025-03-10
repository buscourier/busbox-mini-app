import type { FormControl, FormGroup } from '@angular/forms';

import type { Recipient } from '@delivery/booking/types';

export type RecipientForm = FormGroup<{
  [K in keyof Recipient]: FormControl<Recipient[K]>;
}>;
