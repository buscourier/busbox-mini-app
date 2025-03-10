import type { FormControl, FormGroup } from '@angular/forms';

import type { ParcelItemDimensions } from '@delivery/delivery-details/types';

export type ParcelItemForm = FormGroup<{
  quantity: FormControl<number>;
  weight: FormControl<number>;
  dimensions: FormGroup<{
    [K in keyof ParcelItemDimensions]: FormControl<number>;
  }>;
}>;

export interface DimensionsError {
  error: boolean;
  diff: number;
}
