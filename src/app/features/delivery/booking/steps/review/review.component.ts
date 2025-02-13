import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { selectReviewModel } from './selectors/review.selector';
import { ReviewModel } from './types/review.types';

@Component({
  selector: 'app-review',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewComponent implements OnInit {
  review$!: Observable<ReviewModel>;

  private readonly store = inject(Store);

  ngOnInit(): void {
    this.review$ = this.store.select(selectReviewModel);
  }
}
