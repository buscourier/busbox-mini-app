import type { TranslocoService } from '@jsverse/transloco';
import type { TuiValidationError } from '@taiga-ui/cdk';

import type { ParcelsLimitError } from './parcels.types';

export function parcelsValidationErrors(
  service: TranslocoService,
): Record<string, (context: never) => TuiValidationError | string> {
  return {
    maxItems: (context: ParcelsLimitError) =>
      service.translate('deliveryDetails.parcels.validation.maxItems', { max: context.max }),
    totalQuantityMax: (context: ParcelsLimitError) =>
      service.translate(`deliveryDetails.parcels.validation.totalQuantityMax`, {
        max: context.max,
        actual: context.actual,
      }),
    totalWeightMax: (context: ParcelsLimitError) =>
      service.translate(`deliveryDetails.parcels.validation.totalWeightMax`, {
        max: context.max,
        actual: context.actual,
      }),
  };
}
