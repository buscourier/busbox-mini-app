import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { CargoType, Order, OrderValidationState } from '@features/delivery/types';

import { OrderActions } from './store/actions';
import { deliveryDetailsFeature } from './store/feature';
import { DeliveryDetailsViewModel } from './store/selectors/view-model.types';

type OrderDataKeys = Exclude<keyof Order, 'id' | 'cargoType' | 'validation'>;

@Component({
  selector: 'app-delivery-details',
  imports: [],
  templateUrl: './delivery-details.component.html',
  styleUrl: './delivery-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryDetailsComponent implements OnInit {
  private store = inject(Store);
  protected readonly MAX_ORDERS = 4;

  vm$!: Observable<DeliveryDetailsViewModel>;

  ngOnInit(): void {
    this.vm$ = this.store.select(deliveryDetailsFeature.selectViewModel);
  }

  addOrder(): void {
    this.store.dispatch(OrderActions.add());
  }

  removeOrder(orderId: string): void {
    this.store.dispatch(OrderActions.remove({ orderId }));
  }

  setActiveOrder(orderId: string): void {
    this.store.dispatch(OrderActions.setActive({ orderId }));
  }

  setCargoType(orderId: string, cargoType: CargoType): void {
    this.store.dispatch(OrderActions.setCargoType({ orderId, cargoType }));
  }

  updateOrderData(orderId: string, type: OrderDataKeys, data: Order[OrderDataKeys]): void {
    this.store.dispatch(
      OrderActions.updateData({
        orderId,
        data: { [type]: data },
      }),
    );
  }

  updateOrderValidation(orderId: string, type: keyof OrderValidationState, isValid: boolean) {
    this.store.dispatch(
      OrderActions.updateValidation({
        orderId,
        validation: { [type]: isValid },
      }),
    );
  }
}
