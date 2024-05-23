import { createI18n } from "vue-i18n";

// locales/messages.js
const messages = {
  en: {
    validations: {
      requiredIf: "This field is required.",
      required: "This field is required.",
      minLength: "The field must have at least {{count}} characters.",
      maxLength: "The field cannot exceed {{count}} characters.",
      email: "Please enter a valid email address.",
      minValue: "The min value is {min}",
      maxValue: "The max value is {max}",
    },
  },
  es: {
    validations: {
      requiredIf: "Este campo es obligatorio.",
      required: "Este campo es obligatorio.",
      minLength: "El campo debe tener al menos {min} caracteres.",
      maxLength: "El campo no puede exceder {max} caracteres.",
      email: "Dirección de correo inválida.",
      minValue: "El valor mínimo es de {min}",
      maxValue: "El valor máximo es de {max}",
    },
  },
};

const i18n = createI18n({
  locale: "es",
  messages,
});

export default i18n;
