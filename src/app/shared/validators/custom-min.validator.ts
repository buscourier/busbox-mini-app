import { AbstractControl, ValidationErrors } from '@angular/forms';

export function customMinValidator(min: number, prefix: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value < min) {
      return { [`${prefix}Min`]: { min } };
    }
    return null;
  };
}
