// export const IndividualRole = {
//   SENDER: 'sender',
//   RECIPIENT: 'recipient',
// } as const;
//

import { IndividualRole } from './individual.types';

export const individualRoles = [
  {
    value: IndividualRole.SENDER,
    label: 'Отправитель',
  },
  {
    value: IndividualRole.RECIPIENT,
    label: 'Получатель',
  },
];
