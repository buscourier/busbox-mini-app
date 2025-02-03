import { Office, PickupCity } from '@shared/types';
import { PickupPointTab } from '@features/delivery/common/components/pickup-point/types/tab.types';
import {
  CourierDetails,
  ErrorStatus,
  FormState,
  LoadingStatus,
  SelectionStatus,
} from '@features/delivery/types';

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
