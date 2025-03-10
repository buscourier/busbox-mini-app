import { SenderDocument, type SenderDocumentOption } from '@delivery/booking/types';

export const defaultDocument = {
  value: SenderDocument.PASSPORT,
  label: 'Паспорт',
};

export const senderDocuments: SenderDocumentOption[] = [
  defaultDocument,
  {
    value: SenderDocument.DRIVER_LICENSE,
    label: 'Водительское удостоверение',
  },
  {
    value: SenderDocument.OTHER,
    label: 'Другое',
  },
];
