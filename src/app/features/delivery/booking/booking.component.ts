import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { Observable, take } from 'rxjs';

import { Store } from '@ngrx/store';

import { TuiButton } from '@taiga-ui/core';

import { StepperComponent } from './stepper/stepper.component';
import { BookingActions } from './store/actions';
import { bookingFeature } from './store/feature';
import { selectBookingRequest } from './store/selectors/booking-request.selector';
import { BookingViewModel } from './store/selectors/view-model.types';
import { StepNumber } from './types';

@Component({
  selector: 'app-booking',
  imports: [RouterOutlet, TuiButton, AsyncPipe, StepperComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingComponent implements OnInit {
  vm$!: Observable<BookingViewModel>;
  // bookingRequest!: Observable<unknown>;

  store = inject(Store);
  router = inject(Router);

  ngOnInit(): void {
    this.vm$ = this.store.select(bookingFeature.selectViewModel);
    this.store.dispatch(BookingActions.init());

    //test
    // eslint-disable-next-line @ngrx/no-store-subscription
    this.store.select(selectBookingRequest).subscribe((request) => {
      console.log('booking request', request);
    });
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
}
