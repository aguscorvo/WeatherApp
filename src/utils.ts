export const roundToOneDigitAfterComma = (floatNumber): number =>
  parseFloat((Math.round(floatNumber * 100) / 100).toFixed(1));

export const capitalizeFirstLetter = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);
