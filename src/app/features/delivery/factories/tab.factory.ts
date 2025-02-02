import {
  PickupPointTab,
  PickupPointTabType,
} from '@features/delivery/common/components/pickup-point/types';
import { PICKUP_POINT_TAB_CONFIG } from '@features/delivery/common/components/pickup-point/constants/tab.const';

export class TabFactory {
  static createStartPointTabs(): PickupPointTab[] {
    return [
      {
        id: PickupPointTabType.OFFICE,
        ...PICKUP_POINT_TAB_CONFIG[PickupPointTabType.OFFICE],
        order: 1,
        isDefault: true,
      },
      {
        id: PickupPointTabType.COURIER,
        ...PICKUP_POINT_TAB_CONFIG[PickupPointTabType.COURIER],
        order: 2,
      },
    ];
  }

  // static createEndPointTabs(): EndPointTab[] {
  //   return [
  //     {
  //       id: EndPointTabType.OFFICE,
  //       ...END_POINT_TAB_CONFIG[EndPointTabType.OFFICE],
  //       order: 1,
  //       isDefault: true,
  //     },
  //     {
  //       id: EndPointTabType.COURIER,
  //       ...END_POINT_TAB_CONFIG[EndPointTabType.COURIER],
  //       order: 2,
  //     },
  //     {
  //       id: EndPointTabType.BUS,
  //       ...END_POINT_TAB_CONFIG[EndPointTabType.BUS],
  //       order: 3,
  //     },
  //   ];
  // }
}
