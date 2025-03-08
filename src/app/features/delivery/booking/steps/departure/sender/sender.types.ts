import type { FormControl, FormGroup } from '@angular/forms';

import type { Sender } from '../../../types';

export type SenderForm = FormGroup<{
  [K in keyof Sender]: FormControl<Sender[K]>;
}>;
