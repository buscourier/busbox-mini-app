import { inject, InjectionToken } from '@angular/core';
import type { AbstractControl, ValidatorFn } from '@angular/forms';
import { Validators } from '@angular/forms';

import type { FieldConfig, ValidationLimits } from '@core/config';
import { VALIDATION_LIMITS } from '@core/tokens';

/**
 * Creates a pattern validator that checks if a value matches the regular expression
 * @param pattern Regular expression for validation
 * @param errorKey Validation error key
 * @returns Validator with specified condition and error key
 */
export function createPatternValidator(pattern: RegExp, errorKey: string): ValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) return null;
    return pattern.test(control.value) ? null : { [errorKey]: true };
  };
}

/**
 * Injection token that provides a factory for generating form validators
 * based on validation limits.
 * The factory creates a set of validators for a specific entity field using
 * centralized validation rules.
 *
 * Usage example:
 * ```typescript
 * const fieldValidators = inject(FIELD_VALIDATORS_FACTORY);
 *
 * form = fb.group({
 *   firstName: ['', validatorsFactory.getValidators('user', 'firstName')],
 *   street: ['', validatorsFactory.getValidators('address', 'street', false)]
 * });
 * ```
 */
export const FIELD_VALIDATORS_FACTORY = new InjectionToken<{
  getValidators: <
    T extends keyof ValidationLimits,
    K extends keyof ValidationLimits[T],
    P extends string | undefined = undefined,
  >(
    entityType: T,
    fieldName: K,
    propertyName?: P,
    isRequired?: boolean,
  ) => ValidatorFn[];
}>('Field validators factory', {
  factory: () => {
    const limits = inject<ValidationLimits>(VALIDATION_LIMITS);

    const getFieldConfig = <
      T extends keyof ValidationLimits,
      K extends keyof ValidationLimits[T],
      P extends string | undefined,
    >(
      entityType: T,
      fieldName: K,
      propertyName?: P,
    ) => {
      const entity = limits[entityType];
      if (!entity) throw new Error(`Entity "${String(entityType)}" is missing in ValidationLimits`);

      if (propertyName) {
        const group = entity[fieldName] as Record<string, FieldConfig> | undefined;
        if (!group)
          throw new Error(
            `Field "${String(fieldName)}" is missing in ValidationLimits["${String(entityType)}"]`,
          );

        const field = group[propertyName];
        if (!field)
          throw new Error(
            `Property "${String(propertyName)}" is missing in ValidationLimits["${String(entityType)}"]["${String(fieldName)}"]`,
          );

        return { field, errorKey: `${String(fieldName)}.${String(propertyName)}` };
      }

      const field = entity[fieldName] as FieldConfig | undefined;
      if (!field)
        throw new Error(
          `Field "${String(fieldName)}" is missing in ValidationLimits["${String(entityType)}"]`,
        );

      return { field, errorKey: String(fieldName) };
    };

    return {
      getValidators: <
        T extends keyof ValidationLimits,
        K extends keyof ValidationLimits[T],
        P extends string | undefined,
      >(
        entityType: T,
        fieldName: K,
        propertyName?: P,
        isRequired = true,
      ): ValidatorFn[] => {
        const { field, errorKey } = getFieldConfig(entityType, fieldName, propertyName);

        return [
          isRequired ? Validators.required : null,
          field.minLength !== undefined ? Validators.minLength(field.minLength) : null,
          field.maxLength !== undefined ? Validators.maxLength(field.maxLength) : null,
          field.pattern ? createPatternValidator(field.pattern, errorKey) : null,
        ].filter(Boolean) as ValidatorFn[];
      },
    };
  },
});
