export const SenderDocument = {
  PASSPORT: 'PASSPORT',
  DRIVER_LICENSE: 'DRIVER_LICENSE',
  OTHER: 'OTHER',
};

export type SenderDocument = (typeof SenderDocument)[keyof typeof SenderDocument];

export interface SenderDocumentOption {
  value: SenderDocument;
  label: string;
}

export interface Sender {
  fullName: string;
  document: SenderDocumentOption;
  documentNumber: string;
  phone: string;
}
