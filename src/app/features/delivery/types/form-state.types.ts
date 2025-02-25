import { FormStatus } from '@shared/types/form.types';

export interface FormState {
  isValid: boolean;
  status: FormStatus;
  pristine: boolean;
  touched: boolean;
  dirty: boolean;
}
