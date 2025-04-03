export interface ValidationMessages {
  user: {
    fullName: string;
    firstName: string;
    lastName: string;
    middleName: string;
  };
  address: {
    street: string;
    building: string;
    apartment: string;
  };
  required: string;
  email: string;
  phone: string;
  document: {
    passport: {
      number: string;
    };
    driverLicense: {
      number: string;
    };
    other: {
      number: string;
    };
  };
  minlength: (context: { requiredLength: number }) => string;
  maxlength: (context: { requiredLength: number }) => string;
}

export const DEFAULT_VALIDATION_MESSAGES: ValidationMessages = {
  user: {
    fullName: 'ФИО может содержать только буквы, пробелы и дефис',
    firstName: 'Имя может содержать только буквы, пробелы и дефис',
    lastName: 'Фамилия может содержать только буквы, пробелы и дефис',
    middleName: 'Отчество может содержать только буквы, пробелы и дефис',
  },
  address: {
    street: 'Улица может содержать только буквы кириллицы, цифры, пробелы и дефис',
    building: 'Дом может содержатьтолько цифры, буквы, слеш и дефис',
    apartment: 'Кв./офис может содержатьтолько цифры, буквы, слеш и дефис',
  },
  required: 'Поле обязательно для заполнения',
  minlength: ({ requiredLength }) => `Минимальная длина ${requiredLength} символа`,
  maxlength: ({ requiredLength }) => `Максимальная длина ${requiredLength} символов`,
  email: 'Некорректный формат email',
  phone: `Номер телефона указан некорректно !!`,
  document: {
    passport: {
      number: `Номер паспорта указан некорректно`,
    },
    driverLicense: {
      number: `Номер водительского удостоверения указан некорректно`,
    },
    other: {
      number: 'Номер может содержатьтолько цифры, буквы, слеш и дефис',
    },
  },
};
