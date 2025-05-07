import type { BaseTab } from '@shared/types';

import { ApplicantType } from '../../types';

export const ApplicantTabs: BaseTab<ApplicantType>[] = [
  {
    id: ApplicantType.INDIVIDUAL,
    name: 'user.types.individual',
  },
  {
    id: ApplicantType.LEGAL,
    name: 'user.types.legal',
  },
];
