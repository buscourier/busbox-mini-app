import { AsyncPipe, JsonPipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { TuiResponsiveDialogService } from '@taiga-ui/addon-mobile';
import { TuiButton, TuiLoader } from '@taiga-ui/core';
import { TUI_CONFIRM, type TuiConfirmData } from '@taiga-ui/kit';
import { type Observable, of, switchMap } from 'rxjs';

import { DeliveryLayoutService } from '@delivery/services';
import { DeliveryActions } from '@delivery/store';

import { DeliverySummaryFacade } from './delivery-summary.facade';
import type { DeliverySummaryViewModel } from './types';

@Component({
  selector: 'app-delivery-summary',
  imports: [AsyncPipe, TuiLoader, JsonPipe, RouterLink, TuiButton],
  templateUrl: './delivery-summary.component.html',
  styleUrl: './delivery-summary.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliverySummaryComponent implements OnInit {
  vm$!: Observable<DeliverySummaryViewModel>;
  isCalculatorLayout$!: Observable<boolean>;

  private store = inject(Store);
  private deliveryLayoutService = inject(DeliveryLayoutService);
  private readonly dialogs = inject(TuiResponsiveDialogService);
  private readonly deliverySummaryFacade = inject(DeliverySummaryFacade);

  ngOnInit(): void {
    this.vm$ = this.deliverySummaryFacade.getViewModel();
    this.isCalculatorLayout$ = this.deliveryLayoutService.getIsCalculatorLayout();
  }

  protected onReset(): void {
    const data: TuiConfirmData = {
      content: 'Вся информация о заказе будет удалена!',
      yes: 'Да',
      no: 'Нет',
    };

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Вы уверены?',
        size: 's',
        data,
      })
      .pipe(
        switchMap((response) => {
          if (response) {
            this.store.dispatch(DeliveryActions.resetDelivery());
          }

          return of(response);
        }),
      )
      .subscribe();
  }
}
