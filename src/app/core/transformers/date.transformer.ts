import { Injectable } from '@angular/core';

import type { TuiValueTransformer } from '@taiga-ui/cdk';
import { TuiDay } from '@taiga-ui/cdk';

/**
 * Transforms dates between TuiDay and ISO string formats for form controls.
 *
 * @example
 * // In component providers:
 * providers: [
 *   {
 *     provide: TUI_DATE_VALUE_TRANSFORMER,
 *     useClass: CustomDateTransformer
 *   }
 * ]
 */
@Injectable()
export class CustomDateTransformer implements TuiValueTransformer<TuiDay | null, string | null> {
  /**
   * Converts ISO date string to TuiDay instance.
   * @param controlValue - ISO date string or null
   */
  fromControlValue(controlValue: string | null): TuiDay | null {
    if (!controlValue) {
      return null;
    }
    const date = new Date(controlValue);
    return TuiDay.fromLocalNativeDate(date);
  }

  /**
   * Converts TuiDay to ISO date string.
   * @param day - TuiDay instance or null
   */
  toControlValue(day: TuiDay | null): string | null {
    if (!day) {
      return null;
    }
    return day.toLocalNativeDate().toISOString();
  }
}
