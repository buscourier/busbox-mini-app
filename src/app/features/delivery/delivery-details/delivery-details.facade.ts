import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import type { Observable } from 'rxjs';

import type { OrderDataKeys } from './delivery-details.types';
import { OrderActions } from './store/actions';
import { deliveryDetailsFeature } from './store/feature';
import type { DeliveryDetailsViewModel } from './store/selectors';
import type { CargoType, Order, OrderValidationState } from './types';

@Injectable({
  providedIn: 'root',
})
export class DeliveryDetailsFacade {
  private readonly store = inject(Store);

  getViewModel(): Observable<DeliveryDetailsViewModel> {
    return this.store.select(deliveryDetailsFeature.selectViewModel);
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

  isActiveOrderValid(): Observable<boolean> {
    return this.store.select(deliveryDetailsFeature.selectIsActiveOrderValid);
  }
}
