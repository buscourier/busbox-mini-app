import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { ADDRESS_REGEX } from '@shared/regex';

export function streetValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    return control.value.match(ADDRESS_REGEX.STREET_NAME) ? null : { streetPattern: true };
  };
}

export function buildingValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    return control.value.match(ADDRESS_REGEX.BUILDING_NUMBER) ? null : { buildingPattern: true };
  };
}

export function apartmentValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    return control.value.match(ADDRESS_REGEX.APARTMENT_NUMBER) ? null : { apartmentPattern: true };
  };
}
