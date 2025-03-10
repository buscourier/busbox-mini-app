export const ADDRESS_VALIDATION_LIMITS = {
  STREET: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 30,
  },
  BUILDING: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 10,
  },
  APARTMENT: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 3,
  },
} as const;

export const ADDRESS_VALIDATION_MESSAGES = {
  required: 'Поле обязательно для заполнения',
  streetPattern: 'Допустимы только буквы кириллицы, цифры, пробелы и дефис',
  buildingPattern: 'Допустимы только цифры, буквы, слеш и дефис',
  apartmentPattern: 'Допустимы только цифры',
  minlength: ({ requiredLength }: { requiredLength: number }) =>
    `Минимальная длина ${requiredLength} символа`,
  maxlength: ({ requiredLength }: { requiredLength: number }) =>
    `Максимальная длина ${requiredLength} символов`,
  max: ({ max }: { max: number }) => `Максимальное значение ${max}`,
} as const;
