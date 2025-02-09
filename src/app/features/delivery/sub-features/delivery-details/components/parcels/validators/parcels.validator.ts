import { AbstractControl, FormArray, Validators } from '@angular/forms';

import { Parcel, ParcelsLimits } from '../../../types';

import { ParcelsErrors } from '../types';

export function parcelsValidator(limits: ParcelsLimits) {
  return function (control: AbstractControl): Validators | null {
    const parcels = control as FormArray;
    const errors: ParcelsErrors = {};

    if (parcels.length > limits.MAX_PARCELS) {
      errors.maxParcels = {
        max: limits.MAX_PARCELS,
        actual: parcels.length,
      };
    }

    const totalQuantity = parcels.controls.reduce((sum, control) => {
      const parcel = control.value as Parcel;
      return sum + parcel.quantity;
    }, 0);

    if (totalQuantity > limits.TOTAL_QUANTITY_MAX) {
      errors.totalQuantityMax = {
        max: limits.TOTAL_QUANTITY_MAX,
        actual: totalQuantity,
      };
    }

    const totalWeight = parcels.controls.reduce((sum, control) => {
      const parcel = control.value as Parcel;
      return sum + parcel.weight * parcel.quantity;
    }, 0);

    if (totalWeight > limits.TOTAL_WEIGHT_MAX) {
      errors.totalWeightMax = {
        max: limits.TOTAL_WEIGHT_MAX,
        actual: totalWeight,
      };
    }

    const totalDimensions = parcels.controls.reduce((sum, control) => {
      const parcel = control.value as Parcel;
      const { width, height, length } = parcel.dimensions;
      return sum + (width + height + length);
    }, 0);

    if (totalDimensions > limits.TOTAL_DIMENSIONS_MAX) {
      errors.totalDimensionsMax = {
        max: limits.TOTAL_DIMENSIONS_MAX,
        actual: totalDimensions,
      };
    }

    return Object.keys(errors).length ? errors : null;
  };
}
