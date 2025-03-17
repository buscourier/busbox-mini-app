import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import type { Observable } from 'rxjs';

import { deliveryDetailsFeature } from '@delivery/delivery-details/store/feature';
import type { DeliveryDetailsViewModel } from '@delivery/delivery-details/store/selectors';

@Injectable({
  providedIn: 'root',
})
export class DeliveryDetailsFacade {
  private readonly store = inject(Store);

  getViewModel(): Observable<DeliveryDetailsViewModel> {
    return this.store.select(deliveryDetailsFeature.selectViewModel);
  }

  isActiveOrderValid(): Observable<boolean> {
    return this.store.select(deliveryDetailsFeature.selectIsActiveOrderValid);
  }
}
