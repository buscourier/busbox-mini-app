import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideTranslocoScope, TranslocoPipe } from '@jsverse/transloco';

import { DeliveryDetailsComponent } from '@delivery/delivery-details';
import { DeliveryPointComponent } from '@delivery/delivery-point';
import { PickupPointComponent } from '@delivery/pickup-point';

@Component({
  selector: 'app-calculator',
  imports: [PickupPointComponent, DeliveryPointComponent, DeliveryDetailsComponent, TranslocoPipe],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  providers: [
    provideTranslocoScope({
      scope: 'features/delivery/calculator',
      alias: 'calculator',
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent {}
