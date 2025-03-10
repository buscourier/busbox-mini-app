import type { FormControl, FormGroup } from '@angular/forms';

import type { Sender } from '@delivery/booking/types';

export type SenderForm = FormGroup<{
  [K in keyof Sender]: FormControl<Sender[K]>;
}>;
