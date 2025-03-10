import type { FormControl, FormGroup } from '@angular/forms';

import type { OtherCargo } from '@delivery/delivery-details/types';

export type OtherCargoForm = FormGroup<{
  [K in keyof OtherCargo]: FormControl<OtherCargo[K]>;
}>;
