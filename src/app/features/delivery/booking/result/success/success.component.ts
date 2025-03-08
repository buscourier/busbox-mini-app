import { AsyncPipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import type { BookingResult } from '@features/delivery/types';

import { bookingFeature } from '../../store/feature';

import type { Observable } from 'rxjs';

@Component({
  selector: 'app-success',
  imports: [AsyncPipe],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessComponent implements OnInit {
  bookingResult$!: Observable<BookingResult | null>;

  private store = inject(Store);

  ngOnInit(): void {
    this.bookingResult$ = this.store.select(bookingFeature.selectBookingResult);
  }
}
