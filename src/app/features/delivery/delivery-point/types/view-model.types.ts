import type { DeliveryCity, FormValidationState } from '@shared/types';

import type {
  CitiesViewModel,
  CourierDetails,
  ErrorStatus,
  OfficesViewModel,
} from '@delivery/types';

import type { DeliveryPointTab } from './tab.types';

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
