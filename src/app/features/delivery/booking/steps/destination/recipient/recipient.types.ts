import { FormControl, FormGroup } from '@angular/forms';

import { Recipient } from '../../../types/recipient.types';

export type RecipientControls = FormGroup<{
  [K in keyof Recipient]: FormControl<Recipient[K]>;
}>;
