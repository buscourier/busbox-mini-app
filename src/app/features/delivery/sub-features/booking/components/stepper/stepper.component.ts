import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { StepView } from '../../types';

@Component({
  selector: 'app-stepper',
  imports: [],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent {
  @Input({ required: true }) steps!: StepView[] | null;
}
