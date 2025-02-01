import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-review',
  imports: [],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewComponent {}
