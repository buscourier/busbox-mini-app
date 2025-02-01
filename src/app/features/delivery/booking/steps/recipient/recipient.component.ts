import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-recipient',
  imports: [],
  templateUrl: './recipient.component.html',
  styleUrl: './recipient.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipientComponent {}
