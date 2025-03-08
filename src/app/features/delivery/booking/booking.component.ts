import { AsyncPipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { take } from 'rxjs';

import { Store } from '@ngrx/store';

import { TuiButton } from '@taiga-ui/core';

import { DeliveryLayoutService } from '@features/delivery/services';

import { StepperComponent } from './stepper/stepper.component';
import { BookingActions } from './store/actions';
import { bookingFeature } from './store/feature';
import type { BookingViewModel } from './store/selectors/view-model.types';
import type { StepNumber } from './types';

import type { Observable } from 'rxjs';

@Component({
  selector: 'app-booking',
  imports: [RouterOutlet, TuiButton, AsyncPipe, StepperComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingComponent implements OnInit {
  vm$!: Observable<BookingViewModel>;
  isMainLayout$!: Observable<boolean>;

  private store = inject(Store);
  private router = inject(Router);
  private layoutService = inject(DeliveryLayoutService);

  ngOnInit(): void {
    this.vm$ = this.store.select(bookingFeature.selectViewModel);
    this.isMainLayout$ = this.layoutService.getIsMainLayout();

    this.store.dispatch(BookingActions.init());
  }

  goNextStep(nextStep: StepNumber | null): void {
    if (nextStep) {
      this.navigateToStep(nextStep);
    }
  }

  goPrevStep(prevStep: StepNumber | null): void {
    if (prevStep) {
      this.navigateToStep(prevStep);
    }
  }

  navigateToStep(step: StepNumber): void {
    this.store.dispatch(BookingActions.navigateToStep({ stepNumber: step }));

    this.store
      .select(bookingFeature.selectStepPath(step))
      .pipe(take(1))
      .subscribe((path) => {
        this.router.navigate(['/delivery/booking', path]);
      });
  }

  submitOrder() {
    this.store.dispatch(BookingActions.submitOrder());
  }
}
