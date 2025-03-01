import { DeliveryCity } from '@shared/types';
import { FormValidationState } from '@shared/types/form.types';

import {
  CitiesViewModel,
  CourierDetails,
  ErrorStatus,
  OfficesViewModel,
} from '@features/delivery/types';

import { DeliveryPointTab } from '../../types';

/**
 * Usage example:
 * ```typescript
 * @Component({
 *   template: `
 *     <ng-container *ngIf="vm$ | async as vm">
 *       <app-city-selector
 *         [cities]="vm.cities"
 *         [loading]="vm.loadingStatus.isCitiesLoading"
 *         [error]="vm.errorStatus.citiesError">
 *       </app-city-selector>
 *     </ng-container>
 *   `
 * })
 * export class DeliveryPointComponent {
 *   vm$: Observable<DeliveryPointViewModel>;
 * }
 * ```
 */

export interface DeliveryPointViewModel {
  cities: CitiesViewModel<DeliveryCity>;
  offices: OfficesViewModel;
  tabs: DeliveryPointTab[];
  activeTab: DeliveryPointTab | null;
  courierDetails: CourierDetails | null;
  busPickup: boolean;
  form: FormValidationState;
  error: ErrorStatus;
}
