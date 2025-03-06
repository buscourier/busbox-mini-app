import { FormControl, FormGroup } from '@angular/forms';

import { DimensionsGroup } from '../../../types';

export type ParcelItemForm = FormGroup<{
  quantity: FormControl<number>;
  weight: FormControl<number>;
  dimensions: FormGroup<{
    [K in keyof DimensionsGroup]: FormControl<number>;
  }>;
}>;

export interface DimensionsError {
  error: boolean;
  diff: number;
}
