import { AsyncPipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import type { Observable } from 'rxjs';

import { DeliverySummaryComponent } from '@delivery/delivery-summary';

import { DeliveryLayoutService } from './services';

@Component({
  selector: 'app-delivery',
  imports: [RouterOutlet, AsyncPipe, DeliverySummaryComponent],
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
