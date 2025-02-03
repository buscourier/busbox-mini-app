import { FormControl } from '@angular/forms';
import { Action } from '@ngrx/store';

export interface ResetConfig {
  control: FormControl;
  action: Action;
  cleanup?: () => void;
}
