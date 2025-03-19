import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { type Observable, of } from 'rxjs';

import { OrderSummaryActions } from './store';

@Injectable({
  providedIn: 'root',
})
export class OrderSummaryFacade {
  private readonly store = inject(Store);

  getViewModel(): Observable<unknown> {
    return of(null);
  }

  reset(): void {
    this.store.dispatch(OrderSummaryActions.resetState());
  }
}
