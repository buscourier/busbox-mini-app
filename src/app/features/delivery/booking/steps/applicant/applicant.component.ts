import { AsyncPipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { TuiButton } from '@taiga-ui/core';

import { BookingActions } from '../../store/actions';
import { bookingFeature } from '../../store/feature';
import type { Applicant, Individual, StepNumber } from '../../types';
import { ApplicantType } from '../../types';

import { ApplicantTabs } from './applicant.constants';
import { IndividualComponent } from './individual/individual.component';

import type { Observable } from 'rxjs';

@Component({
  selector: 'app-applicant',
  imports: [AsyncPipe, IndividualComponent, TuiButton],
  templateUrl: './applicant.component.html',
  styleUrl: './applicant.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicantComponent implements OnInit {
  currentStep$!: Observable<StepNumber>;
  applicant$!: Observable<Applicant | null>;

  protected readonly ApplicantType = ApplicantType;
  protected readonly tabs = ApplicantTabs;

  store = inject(Store);

  ngOnInit(): void {
    this.currentStep$ = this.store.select(bookingFeature.selectCurrentStep);
    this.applicant$ = this.store.select(bookingFeature.selectApplicant);
  }

  updateIndividual(data: Individual): void {
    this.store.dispatch(BookingActions.updateIndividualData({ data }));
  }

  updateApplicantType(applicantType: ApplicantType): void {
    this.store.dispatch(BookingActions.setApplicantType({ applicantType }));
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
