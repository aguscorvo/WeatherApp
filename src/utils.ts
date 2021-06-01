export const roundToOneDigitAfterComma = (floatNumber): number =>
  parseFloat((Math.round(floatNumber * 100) / 100).toFixed(1));

export const capitalizeFirstLetter = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

export const getScreenWidth = (): number => screen.width;

export const spaceAvailable = (
  weatherNodeCounter: number,
  screenWidth: number
): boolean => {
  //mobile
  if (screenWidth < 720) return true;
  // tablet
  if (screenWidth >= 720 && screenWidth < 1050) {
    if (weatherNodeCounter < 1) return true;
    else return false;
  }
  //desktop
  if (screenWidth >= 1050 && screenWidth < 1350) {
    if (weatherNodeCounter < 2) return true;
    else return false;
  }
  if (screenWidth >= 1350 && screenWidth < 1650) {
    if (weatherNodeCounter < 3) return true;
    else return false;
  }
  if (screenWidth >= 1650 && screenWidth < 1920) {
    if (weatherNodeCounter < 4) return true;
    else return false;
  }
  if (screenWidth >= 1920) {
    if (weatherNodeCounter < 5) return true;
    else return false;
  }
};
