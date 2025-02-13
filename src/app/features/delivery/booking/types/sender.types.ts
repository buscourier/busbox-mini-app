export const SenderDocument = {
  PASSPORT: 'PASSPORT',
  DRIVER_LICENSE: 'DRIVER_LICENSE',
  OTHER: 'OTHER',
};

export type SenderDocument = (typeof SenderDocument)[keyof typeof SenderDocument];

export interface Sender {
  fullName: string;
  document: SenderDocument;
  documentNumber: string;
  phone: string;
}
