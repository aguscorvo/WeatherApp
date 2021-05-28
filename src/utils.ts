export const roundToOneDigitAfterComma = (floatNumber): number =>
  parseFloat((Math.round(floatNumber * 100) / 100).toFixed(1));
