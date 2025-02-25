export const FormStatus = {
  VALID: 'VALID',
  INVALID: 'INVALID',
  PENDING: 'PENDING',
  DISABLED: 'DISABLED',
};

export type FormStatus = (typeof FormStatus)[keyof typeof FormStatus];
