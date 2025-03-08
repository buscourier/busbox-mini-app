import { FormControl, FormGroup } from '@angular/forms';

import { Sender } from '../../../types';

export type SenderForm = FormGroup<{
  [K in keyof Sender]: FormControl<Sender[K]>;
}>;
