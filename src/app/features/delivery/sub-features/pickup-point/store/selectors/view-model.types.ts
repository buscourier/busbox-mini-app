import { Office, PickupCity } from '@shared/types';

import {
  CourierDetails,
  ErrorStatus,
  FormState,
  LoadingStatus,
  SelectionStatus,
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
  cities: PickupCity[];
  offices: Office[];
  tabs: PickupPointTab[];
  activeTab: PickupPointTab | null;
  selectionStatus: SelectionStatus<PickupCity>;
  courierDetails: CourierDetails | null;
  departureDate: string | null;
  loadingStatus: LoadingStatus;
  errorStatus: ErrorStatus;
  formState: FormState;
}
