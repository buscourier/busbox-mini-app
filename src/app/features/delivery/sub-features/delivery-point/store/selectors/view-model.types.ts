import { DeliveryCity, Office } from '@shared/types';

import {
  CourierDetails,
  ErrorStatus,
  FormState,
  LoadingStatus,
  SelectionStatus,
} from '@features/delivery/types';

import { DeliveryPointTab } from '../../types/tab.types';

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
  cities: DeliveryCity[];
  offices: Office[];
  courierDetails: CourierDetails | null;
  busPickup: boolean;
  tabs: DeliveryPointTab[];
  activeTab: DeliveryPointTab | null;
  selectionStatus: SelectionStatus<DeliveryCity>;
  loadingStatus: LoadingStatus;
  errorStatus: ErrorStatus;
  formState: FormState;
}
