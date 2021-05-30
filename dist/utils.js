export const roundToOneDigitAfterComma = (floatNumber) => parseFloat((Math.round(floatNumber * 100) / 100).toFixed(1));
export const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);
