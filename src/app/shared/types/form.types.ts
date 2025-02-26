export const FormControlStatus = {
  VALID: 'VALID',
  INVALID: 'INVALID',
  PENDING: 'PENDING',
  DISABLED: 'DISABLED',
};

export type FormControlStatus = (typeof FormControlStatus)[keyof typeof FormControlStatus];

export interface FormState {
  status: FormControlStatus;
  pristine: boolean;
  touched: boolean;
  dirty: boolean;
}

export interface FormControlValidationStatus {
  valid: boolean;
  invalid: boolean;
  disabled: boolean;
  pending: boolean;
}

export interface FormValidationState extends FormControlValidationStatus {
  pristine: boolean;
  touched: boolean;
  dirty: boolean;
}
