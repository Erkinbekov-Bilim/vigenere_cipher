import type { IValidateData } from '../types/cipher/cipher.type.js';

export const validateData = (
  reqData: IValidateData,
  data: IValidateData,
): boolean => {
  let isValidate = false;
  const dataKeys = Object.keys(data);

  for (const key of dataKeys) {
    isValidate = Object.hasOwn(reqData, key);

    if (!isValidate) {
      return isValidate;
    }
  }

  return isValidate;
};
