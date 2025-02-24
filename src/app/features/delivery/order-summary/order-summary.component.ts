import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { TuiButton, TuiLoader } from '@taiga-ui/core';

import { DeliveryLayoutService } from '../services/delivery-layout.service';
import { DeliveryActions } from '../store/actions';
import { selectOrderSummaryViewModel } from './store/selectors/view-model.selector';
import { OrderSummaryViewModel } from './store/selectors/view-model.types';

@Component({
  selector: 'app-order-summary',
  imports: [TuiLoader, JsonPipe, AsyncPipe, TuiButton, RouterLink],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderSummaryComponent implements OnInit {
  vm$!: Observable<OrderSummaryViewModel>;
  isCalculatorLayout$!: Observable<boolean>;

  private store = inject(Store);
  private deliveryLayoutService = inject(DeliveryLayoutService);

  ngOnInit(): void {
    this.vm$ = this.store.select(selectOrderSummaryViewModel);
    this.isCalculatorLayout$ = this.deliveryLayoutService.getIsCalculatorLayout();
  }

  resetDelivery() {
    this.store.dispatch(DeliveryActions.resetDelivery());
  }
}
