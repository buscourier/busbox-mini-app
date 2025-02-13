import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Observable, withLatestFrom } from 'rxjs';

import { Store } from '@ngrx/store';

import { PickupPointComponent } from '@features/delivery/pickup-point/pickup-point.component';
import { pickupPointFeature } from '@features/delivery/pickup-point/store';

import { BookingActions } from '../../store/actions';
import { bookingFeature } from '../../store/feature';
import { Sender, StepNumber } from '../../types';
import { Departure } from '../../types/departure.types';

import { IndividualComponent } from '../applicant/individual/individual.component';
import { SenderComponent } from './sender/sender.component';

@Component({
  selector: 'app-departure',
  imports: [SenderComponent, PickupPointComponent, IndividualComponent, AsyncPipe],
  templateUrl: './departure.component.html',
  styleUrl: './departure.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartureComponent implements OnInit {
  currentStep$!: Observable<StepNumber>;
  departure$!: Observable<Departure | null>;

  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.currentStep$ = this.store.select(bookingFeature.selectCurrentStep);
    this.departure$ = this.store.select(bookingFeature.selectDeparture);

    this.store
      .select(pickupPointFeature.selectFormState)
      .pipe(withLatestFrom(this.currentStep$), takeUntilDestroyed(this.destroyRef))
      .subscribe(([formState, currentStep]) =>
        this.updateStepValidation(formState.isValid, currentStep),
      );
  }

  updateSender(data: Sender): void {
    this.store.dispatch(BookingActions.updateSenderData({ data }));
  }

  updateStepValidation(isValid: boolean, step: StepNumber): void {
    this.store.dispatch(
      BookingActions.updateStepValidation({
        step,
        isValid,
      }),
    );
  }
}
