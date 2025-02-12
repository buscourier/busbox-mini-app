export const USER_VALIDATION_LIMITS = {
  LAST_NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 30,
  },
  FIRST_NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
  },
  MIDDLE_NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
  },
} as const;

export const USER_VALIDATION_MESSAGES = {
  required: 'Поле обязательно для заполнения',
  lastNamePattern: 'Допустимы только буквы кириллицы, цифры, пробелы и дефис',
  firstNamePattern: 'Допустимы только цифры, буквы, слеш и дефис',
  middleNamePattern: 'Допустимы только цифры',
  minlength: ({ requiredLength }: { requiredLength: number }) =>
    `Минимальная длина ${requiredLength} символа`,
  maxlength: ({ requiredLength }: { requiredLength: number }) =>
    `Максимальная длина ${requiredLength} символов`,
  max: ({ max }: { max: number }) => `Максимальное значение ${max}`,
} as const;
