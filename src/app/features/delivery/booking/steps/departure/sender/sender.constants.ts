import type { SenderDocumentOption } from '../../../types';
import { SenderDocument } from '../../../types';

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
