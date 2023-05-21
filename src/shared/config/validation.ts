import * as Yup from "yup";

export const validator = (): typeof Yup => {
  Yup.setLocale({
    mixed: {
      required: "Это поле обязательно для заполнения",
    },
    string: {
      email: "Неверный формат email",
      length: ({ length }) => `Длина должна быть ${length} символов`,
      url: "Неверный формат URL",
      max: ({ max }) => `Максимальная длина - ${max} символов`,
      min: ({ min }) => `Минимальная длина - ${min} символов`,
    },
    number: {
      min: ({ min }) => `Минимальное значение - ${min}`,
      max: ({ max }) => `Максимальное значение - ${max}`,
    },
    array: {
      min: ({ min }) => `Минимальное количество элементов - ${min}`,
      max: ({ max }) => `Максимальное количество элементов - ${max}`,
    },
  });

  return Yup;
};

