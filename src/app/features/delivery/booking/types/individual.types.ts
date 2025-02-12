// export const INDIVIDUAL_ROLE = {
//   SENDER: 'SENDER',
//   RECIPIENT: 'RECIPIENT',
// } as const;
//
// export type Role = 'sender' | 'recipient';

export type IndividualRole = 'sender' | 'recipient';

export interface Individual {
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  phone: string;
  role: string;
}
