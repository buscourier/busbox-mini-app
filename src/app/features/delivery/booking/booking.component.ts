import { AsyncPipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideTranslocoScope, TranslocoPipe } from '@jsverse/transloco';
import { TuiButton } from '@taiga-ui/core';
import type { Observable } from 'rxjs';

import { DeliveryLayoutService } from '@delivery/services';

import { BookingFacade } from './booking.facade';
import { StepperComponent } from './stepper';
import { type StepNumber, type BookingViewModel, type Applicant, ApplicantType } from './types';

@Component({
  selector: 'app-booking',
  imports: [RouterOutlet, TuiButton, AsyncPipe, StepperComponent, TranslocoPipe],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
  providers: [
    provideTranslocoScope(
      {
        scope: 'features/delivery/booking',
        alias: 'booking',
      },
      {
        scope: 'entities/user',
        alias: 'user',
      },
      {
        scope: 'entities/contacts',
        alias: 'contacts',
      },
      {
        scope: 'entities/document',
        alias: 'document',
      },
    ),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingComponent implements OnInit {
  vm$!: Observable<BookingViewModel>;
  isMainLayout$!: Observable<boolean>;
  applicant$!: Observable<Applicant | null>;

  private layoutService = inject(DeliveryLayoutService);
  private bookingFacade = inject(BookingFacade);

  ngOnInit(): void {
    this.vm$ = this.bookingFacade.getViewModel();
    this.isMainLayout$ = this.layoutService.getIsMainLayout();
    this.applicant$ = this.bookingFacade.getApplicant();

    this.bookingFacade.init();
  }

  goNextStep(nextStep: StepNumber | null): void {
    if (nextStep) {
      this.bookingFacade.navigateToStep(nextStep);
    }
  }

  goPrevStep(prevStep: StepNumber | null): void {
    if (prevStep) {
      this.bookingFacade.navigateToStep(prevStep);
    }
  }

  submitOrder(): void {
    this.bookingFacade.submitOrder();
  }

  protected readonly ApplicantType = ApplicantType;
}
