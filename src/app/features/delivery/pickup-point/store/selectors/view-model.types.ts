import { PickupCity } from '@shared/types';
import { FormValidationState } from '@shared/types/form.types';

import {
  CitiesViewModel,
  CourierDetails,
  ErrorStatus,
  OfficesViewModel,
} from '@features/delivery/types';

import { PickupPointTab } from '../../types';

/**
 * View model for PickupPoint component.
 *
 * @example
 * ```typescript
 * @Component({
 *   template: `
 *     <ng-container *ngIf="vm$ | async as vm">
 *       <tui-combo-box
 *         [formControl]="city"
 *         [stringify]="'name' | tuiStringify"
 *       >
 *         Выберите город
 *         <tui-data-list-wrapper
 *           *tuiDataList
 *           [items]="vm.cities"
 *           [itemContent]="'name' | tuiStringify | tuiStringifyContent"
 *         />
 *       </tui-combo-box>
 *     </ng-container>
 *   `
 * })
 * export class PickupPointComponent {
 *   vm$: Observable<PickupPointViewModel>;
 * }
 * ```
 */
export interface PickupPointViewModel {
  cities: CitiesViewModel<PickupCity>;
  offices: OfficesViewModel;
  tabs: PickupPointTab[];
  activeTab: PickupPointTab | null;
  courierDetails: CourierDetails | null;
  departureDate: string | null;
  form: FormValidationState;
  error: ErrorStatus;
}
