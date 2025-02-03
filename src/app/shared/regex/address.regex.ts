export const ADDRESS_REGEX = {
  STREET_NAME: /^[а-яА-Я\s\d-]+$/,
  BUILDING_NUMBER: /^[\d\w/-]+$/,
  APARTMENT_NUMBER: /^\d+$/,
} as const;
