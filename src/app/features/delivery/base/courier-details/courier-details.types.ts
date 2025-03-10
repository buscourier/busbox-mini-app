import type { FormControl, FormGroup } from '@angular/forms';

import type { CourierDetails } from '@delivery/types';

export type CourierDetailsForm = FormGroup<{
  [K in keyof CourierDetails]: FormControl<CourierDetails[K]>;
}>;
