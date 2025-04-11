import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TuiHintDirective } from '@taiga-ui/core';
import { TuiBadge } from '@taiga-ui/kit';

@Component({
  selector: 'app-limit-badge',
  imports: [TuiBadge, TuiHintDirective],
  templateUrl: './limit-badge.component.html',
  styleUrl: './limit-badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LimitBadgeComponent {
  @Input() value!: number;
  @Input() units = '';
  @Input() hintText = '';
}
