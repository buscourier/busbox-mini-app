import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PickupPointComponent } from '@delivery/foundation/pickup-point';

@Component({
  selector: 'app-calculator',
  imports: [PickupPointComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent {}
