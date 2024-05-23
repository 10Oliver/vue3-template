// @/utils/i18n-validators.js
import * as validators from '@vuelidate/validators';
import i18n from "@/utils/i18n"; // Asegúrate de importar tu instancia de i18n

// Importa la función para crear mensajes i18n
const { createI18nMessage } = validators;

// Crea tu instancia de mensaje i18n. Usado para vue-i18n@9
const withI18nMessage = createI18nMessage({ t: i18n.global.t.bind(i18n) });

// Envuelve cada validador con un mensaje traducido
export const required = withI18nMessage(validators.required);
export const email = withI18nMessage(validators.email, { withArguments: true });
export const minLength = withI18nMessage(validators.minLength, { withArguments: true });
export const maxLength = withI18nMessage(validators.maxLength, { withArguments: true });
export const minValue = withI18nMessage(validators.minValue, { withArguments: true });
export const maxValue = withI18nMessage(validators.maxValue, { withArguments: true });

// Agrega el validador requiredIf con su traducción correspondiente
export const requiredIf = withI18nMessage(validators.requiredIf, { withArguments: true });
