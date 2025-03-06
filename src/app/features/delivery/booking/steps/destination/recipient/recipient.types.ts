import { FormControl, FormGroup } from '@angular/forms';

import { Recipient } from '../../../types';

export type RecipientControls = FormGroup<{
  [K in keyof Recipient]: FormControl<Recipient[K]>;
}>;
