import { AsyncPipe, JsonPipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiTextareaModule } from '@taiga-ui/legacy';
import type { Observable } from 'rxjs';

import { BookingFacade } from '../../booking.facade';
import type { ReviewView } from '../../types';

import { ReviewConfirmationComponent } from './review-confirmation';

@Component({
  selector: 'app-review',
  imports: [
    AsyncPipe,
    JsonPipe,
    TuiTextareaModule,
    ReactiveFormsModule,
    ReviewConfirmationComponent,
  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewComponent implements OnInit {
  review$!: Observable<ReviewView>;

  private readonly bookingFacade = inject(BookingFacade);

  ngOnInit(): void {
    this.review$ = this.bookingFacade.getReview();
  }
}
