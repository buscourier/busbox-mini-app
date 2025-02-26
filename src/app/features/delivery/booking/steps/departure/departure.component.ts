import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Observable, take, withLatestFrom } from 'rxjs';

import { Store } from '@ngrx/store';

import { PickupPointComponent } from '@features/delivery/pickup-point/pickup-point.component';
import { pickupPointFeature } from '@features/delivery/pickup-point/store';

import { BookingActions } from '../../store/actions';
import { bookingFeature } from '../../store/feature';
import { Sender, StepNumber } from '../../types';
import { Departure } from '../../types/departure.types';

import { SenderComponent } from './sender/sender.component';

@Component({
  selector: 'app-departure',
  imports: [SenderComponent, PickupPointComponent, AsyncPipe],
  templateUrl: './departure.component.html',
  styleUrl: './departure.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartureComponent implements OnInit {
  currentStep$!: Observable<StepNumber>;
  departure$!: Observable<Departure | null>;

  private isSenderValid = false;
  private isPickupPointValid = false;

  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.currentStep$ = this.store.select(bookingFeature.selectCurrentStep);
    this.departure$ = this.store.select(bookingFeature.selectDeparture);

    this.store
      .select(pickupPointFeature.selectFormState)
      .pipe(withLatestFrom(this.currentStep$), takeUntilDestroyed(this.destroyRef))
      .subscribe(([formState]) => {
        this.isPickupPointValid = formState.valid;
        this.checkStepValidation();
      });
  }

  updateSender(data: Sender): void {
    this.store.dispatch(BookingActions.updateSenderData({ data }));
  }

  onSenderValidationChange(isValid: boolean): void {
    this.isSenderValid = isValid;
    this.checkStepValidation();
  }

  private checkStepValidation(): void {
    const isStepValid = this.isSenderValid && this.isPickupPointValid;

    this.currentStep$.pipe(take(1)).subscribe((currentStep) => {
      this.store.dispatch(
        BookingActions.updateStepValidation({
          step: currentStep,
          isValid: isStepValid,
        }),
      );
    });
  }
}
