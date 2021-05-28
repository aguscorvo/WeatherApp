export const roundToOneDigitAfterComma = (floatNumber) => parseFloat((Math.round(floatNumber * 100) / 100).toFixed(1));
