import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { DocumentRegex } from '../regex/document.regex';

export function passportValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    return control.value.match(DocumentRegex.PASSPORT) ? null : { passportPattern: true };
  };
}

export function driverLicenseValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    return control.value.match(DocumentRegex.DRIVER_LICENSE)
      ? null
      : { driverLicensePattern: true };
  };
}
