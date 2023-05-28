import * as Yup from "yup";
import { numericWord } from "@shared";

export const yup = (): typeof Yup => {
  Yup.setLocale({
    mixed: {
      required: "Это поле обязательно для заполнения",
    },
    string: {
      email: "Неверный формат email",
      length: ({ length }) => `Длина должна быть ${length} ${numericWord(length, ["символ", "символа", "символов"])}`,
      url: "Неверный формат URL",
      max: ({ max }) => `Максимальная длина - ${max} ${numericWord(max, ["символ", "символа", "символов"])}`,
      min: ({ min }) => `Минимальная длина - ${min} ${numericWord(min, ["символ", "символа", "символов"])}`,
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

