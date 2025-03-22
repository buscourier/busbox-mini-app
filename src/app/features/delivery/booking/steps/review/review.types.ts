import type { FormControl, FormGroup } from '@angular/forms';

import type { Review } from '../../types';

export type ReviewForm = FormGroup<{
  [K in keyof Review]: FormControl<Review[K]>;
}>;

export type ReviewControlValues = {
  [K in keyof ReviewForm['controls']]: ReviewForm['controls'][K]['value'];
};
