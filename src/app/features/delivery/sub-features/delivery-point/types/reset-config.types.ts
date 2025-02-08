import { FormControl } from '@angular/forms';

import { Action } from '@ngrx/store';

export interface ResetConfig {
  controls: FormControl[];
  actions: Action[];
  cleanup?: () => void;
}
