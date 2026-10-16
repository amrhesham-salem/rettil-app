/**
 * Converts Western Arabic numerals (0-9) to Eastern Arabic numerals (٠-٩).
 * Used throughout the app for RTL Arabic number display.
 */
const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'] as const;

export const toArabicDigits = (num: number | string): string =>
  num.toString().replace(/[0-9]/g, (d) => ARABIC_DIGITS[+d]);


export const formatDateTime = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
};