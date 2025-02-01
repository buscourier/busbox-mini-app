import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sender',
  imports: [],
  templateUrl: './sender.component.html',
  styleUrl: './sender.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SenderComponent {}
