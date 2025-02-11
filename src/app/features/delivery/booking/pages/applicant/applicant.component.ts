import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IndividualDetailsComponent } from './individual-details/individual-details.component';

@Component({
  selector: 'app-applicant',
  imports: [IndividualDetailsComponent],
  templateUrl: './applicant.component.html',
  styleUrl: './applicant.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicantComponent {}
