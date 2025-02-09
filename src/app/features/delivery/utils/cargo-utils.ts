import {
  AutoPartsData,
  CargoDetails,
  DocumentsData,
  OtherCargoData,
  ParcelData,
} from '@features/delivery/types';

export function getDocuments(documents: DocumentsData | null): CargoDetails | null {
  return documents?.quantity
    ? {
        name: 'Документы',
        quantity: documents?.quantity,
      }
    : null;
}

export function getParcels(parcels: ParcelData | null): CargoDetails | null {
  return parcels?.items.length
    ? {
        name: 'Посылки',
        quantity: parcels?.items.length || 0,
      }
    : null;
}

export function getAutoParts(data: AutoPartsData | null): CargoDetails | null {
  return data?.item?.name && data.quantity
    ? {
        name: data?.item?.name || null,
        quantity: data?.quantity || 0,
      }
    : null;
}

export function getOtherCargo(data: OtherCargoData | null): CargoDetails | null {
  return data?.item?.name && data.quantity
    ? {
        name: data?.item?.name || null,
        quantity: data?.quantity || 0,
      }
    : null;
}
