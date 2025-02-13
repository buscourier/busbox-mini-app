import { SenderDocument } from '../../../types';

export const senderDocuments = [
  {
    value: SenderDocument.PASSPORT,
    label: 'Паспорт',
  },
  {
    value: SenderDocument.DRIVER_LICENSE,
    label: 'Водительское удостоверение',
  },
  {
    value: SenderDocument.OTHER,
    label: 'Другое',
  },
];
