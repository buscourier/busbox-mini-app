import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Observable } from 'rxjs';

import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { DeliveryLayoutService } from './services';

@Component({
  selector: 'app-delivery',
  imports: [RouterOutlet, OrderSummaryComponent, AsyncPipe],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryComponent implements OnInit {
  isMainLayout$!: Observable<boolean>;

  private layoutService = inject(DeliveryLayoutService);

  ngOnInit(): void {
    this.isMainLayout$ = this.layoutService.getIsMainLayout();
  }
}
