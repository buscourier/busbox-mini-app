import { animate, style, transition, trigger } from '@angular/animations';

export const cargoSwitchAnimation = trigger('cargoSwitch', [
  transition('* => *', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate(
      '300ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      style({ opacity: 1, transform: 'translateY(0)' }),
    ),
  ]),
]);
