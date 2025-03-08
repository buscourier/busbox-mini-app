import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { USER_REGEX } from '@shared/regex';

export function fullNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    return control.value.match(USER_REGEX.FULL_NAME) ? null : { fullNamePattern: true };
  };
}

export function lastNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    return control.value.match(USER_REGEX.LAST_NAME) ? null : { lastNamePattern: true };
  };
}

export function firstNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    return control.value.match(USER_REGEX.FIRST_NAME) ? null : { firstNamePattern: true };
  };
}

export function middleNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    return control.value.match(USER_REGEX.MIDDLE_NAME) ? null : { middleNamePattern: true };
  };
}
