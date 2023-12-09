import { TransformFnParams } from 'class-transformer';

export const StringToDateConvert = (value: string): Date | null => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
};

export const StringToDateTransformer = (
  params: TransformFnParams,
): Date | null => StringToDateConvert(params.value);

export const StringToNumberConvert = (value: string): number | null => {
  const result = Number(value);
  if (Number.isNaN(result)) {
    return NaN;
  }
  return result;
};

export const StringToNumberTransformer = (
  params: TransformFnParams,
): number | null => StringToNumberConvert(params.value);

export const StringToPhoneConvert = (
  value: string | undefined,
): string | null => {
  if (!value) {
    return null;
  }

  try {
    return value.replace(/[^\d]/g, '');
  } catch (e) {
    return null;
  }
};

export const StringToPhoneTransformer = (
  params: TransformFnParams,
): string | null => StringToPhoneConvert(params.value);

export const StringToRegexConvert = (
  value: string | undefined,
): RegExp | null => {
  if (!value) {
    return null;
  }

  try {
    return new RegExp(value, 'i');
  } catch (e) {
    return null;
  }
};

export const StringToRegexTransformer = (
  params: TransformFnParams,
): RegExp | null => StringToRegexConvert(params.value);
