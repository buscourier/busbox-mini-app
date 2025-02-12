import { BaseTab } from '@shared/types';

import { ApplicantType } from '../../types/applicant.types';

export const ApplicantTabs: BaseTab<ApplicantType>[] = [
  {
    id: ApplicantType.INDIVIDUAL,
    name: 'Физ. лицо',
  },
  {
    id: ApplicantType.LEGAL,
    name: 'Юр. лицо',
  },
];
