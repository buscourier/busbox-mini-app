import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { TuiLoader } from '@taiga-ui/core';

import { selectOrderSummaryViewModel } from './store/selectors/view-model.selector';
import { OrderSummaryViewModel } from './store/selectors/view-model.types';

@Component({
  selector: 'app-order-summary',
  imports: [TuiLoader, JsonPipe, AsyncPipe],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderSummaryComponent implements OnInit {
  vm$!: Observable<OrderSummaryViewModel>;

  store = inject(Store);

  ngOnInit(): void {
    this.vm$ = this.store.select(selectOrderSummaryViewModel);
  }
}
