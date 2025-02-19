import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { BookingResult } from '@features/delivery/types';

import { bookingFeature } from '../store/feature';

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
