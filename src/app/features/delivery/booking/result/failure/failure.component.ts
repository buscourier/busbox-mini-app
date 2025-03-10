import { AsyncPipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import type { ApiError } from '@shared/types';

import { bookingFeature } from '@delivery/booking/store';

import type { Observable } from 'rxjs';

@Component({
  selector: 'app-failure',
  imports: [AsyncPipe],
  templateUrl: './failure.component.html',
  styleUrl: './failure.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FailureComponent implements OnInit {
  error$!: Observable<ApiError | null>;

  private store = inject(Store);

  ngOnInit(): void {
    this.error$ = this.store.select(bookingFeature.selectError);
  }
}
