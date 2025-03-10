import type { FormControl, FormGroup } from '@angular/forms';

import type { AutoParts } from '@delivery/delivery-details/types';

export type AutoPartsForm = FormGroup<{
  [K in keyof AutoParts]: FormControl<AutoParts[K]>;
}>;
