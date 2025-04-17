import { AsyncPipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TuiIcon } from '@taiga-ui/core';
import { take, withLatestFrom } from 'rxjs';
import type { Observable } from 'rxjs';

import { PickupPointComponent, PickupPointFacade } from '@delivery/pickup-point';

import { BookingFacade } from '../../booking.facade';
import type { Departure, Sender, StepNumber } from '../../types';

import { SenderComponent } from './sender';

@Component({
  selector: 'app-departure',
  imports: [SenderComponent, PickupPointComponent, AsyncPipe, TuiIcon],
  templateUrl: './departure.component.html',
  styleUrl: './departure.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartureComponent implements OnInit {
  currentStep$!: Observable<StepNumber>;
  departure$!: Observable<Departure | null>;

  private isSenderValid = false;
  private isPickupPointValid = false;

  private readonly destroyRef = inject(DestroyRef);
  private readonly bookingFacade = inject(BookingFacade);
  private readonly pickupPointFacade = inject(PickupPointFacade);

  ngOnInit(): void {
    this.currentStep$ = this.bookingFacade.getCurrentStep();
    this.departure$ = this.bookingFacade.getDeparture();

    this.pickupPointFacade
      .getFormState()
      .pipe(withLatestFrom(this.currentStep$), takeUntilDestroyed(this.destroyRef))
      .subscribe(([formState]) => {
        this.isPickupPointValid = formState.valid;
        this.checkStepValidation();
      });
  }

  updateSender(data: Sender): void {
    this.bookingFacade.updateSender(data);
  }

  onSenderValidationChange(isValid: boolean): void {
    this.isSenderValid = isValid;
    this.checkStepValidation();
  }

  private checkStepValidation(): void {
    const isStepValid = this.isSenderValid && this.isPickupPointValid;

    this.currentStep$.pipe(take(1)).subscribe((currentStep) => {
      this.bookingFacade.updateStepValidation(isStepValid, currentStep);
    });
  }
}
