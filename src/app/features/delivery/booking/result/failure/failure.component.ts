import { AsyncPipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import type { Observable } from 'rxjs';

import type { ApiError } from '@shared/types';

import { BookingFacade } from '../../booking.facade';

@Component({
  selector: 'app-failure',
  imports: [AsyncPipe],
  templateUrl: './failure.component.html',
  styleUrl: './failure.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FailureComponent implements OnInit {
  error$!: Observable<ApiError | null>;

  private readonly bookingFacade = inject(BookingFacade);

  ngOnInit(): void {
    this.error$ = this.bookingFacade.getBookingError();
  }
}
