import type { AbstractControl, ValidationErrors } from '@angular/forms';

export function customMaxValidator(max: number, prefix: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value > max) {
      return { [`${prefix}Max`]: { max } };
    }
    return null;
  };
}
