import type { FormControl, FormGroup } from '@angular/forms';

import type { ReviewConfirmation } from '../../../types';

export type ReviewConfirmationForm = FormGroup<{
  [K in keyof ReviewConfirmation]: FormControl<ReviewConfirmation[K]>;
}>;

export type ReviewConfirmationControlValues = {
  [K in keyof ReviewConfirmationForm['controls']]: ReviewConfirmationForm['controls'][K]['value'];
};
