import { AsyncPipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import type { Observable } from 'rxjs';

import { BookingFacade } from '../../booking.facade';
import type { BookingResult } from '../../types';

@Component({
  selector: 'app-success',
  imports: [AsyncPipe],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessComponent implements OnInit {
  bookingResult$!: Observable<BookingResult | null>;

  private readonly bookingFacade = inject(BookingFacade);

  ngOnInit(): void {
    this.bookingResult$ = this.bookingFacade.getBookingResult();
  }
}
