import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { ApiError } from '@shared/types';

import { bookingFeature } from '../../store/feature';

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
