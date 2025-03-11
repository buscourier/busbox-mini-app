import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { PHONE_REGEX } from '@shared/regex';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    return PHONE_REGEX.test(control.value) ? null : { phoneFormat: true };
  };
}
