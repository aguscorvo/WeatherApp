import Swal from 'sweetalert2';
import {
  compareBtn,
  locationInput,
  setBtnActive,
  setBtnInactive,
} from './main';

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
  if (screenWidth < 720)
    if (weatherNodeCounter < 2) return true;
    else return false;
  // tablet
  if (screenWidth >= 720 && screenWidth < 1110) {
    if (weatherNodeCounter < 1) return true;
    else return false;
  }
  //desktop
  if (screenWidth >= 1110 && screenWidth < 1365) {
    if (weatherNodeCounter < 2) return true;
    else return false;
  }
  if (screenWidth >= 1365 && screenWidth < 1980) {
    if (weatherNodeCounter < 3) return true;
    else return false;
  }
  if (screenWidth >= 1980) {
    if (weatherNodeCounter < 4) return true;
    else return false;
  }
};

export const deleteValue = () => (locationInput.value = '');

export const sweetAlertError = (message: string) =>
  Swal.fire('Oops...', message, 'error');

export const sweetAlertWarning = (message: string) =>
  Swal.fire('Warning', message, 'warning');

export const sweetAlertSettings = (comparisonEnabled: boolean) => {
  var weatherComparison: string;
  if (comparisonEnabled) {
    weatherComparison =
      '<h4>Weather comparison enabled<input type="checkbox" id="comparison-cb" checked/></h4><p/>';
  } else {
    weatherComparison =
      '<h4>Weather comparison enabled<input type="checkbox" id="comparison-cb"/></h4><p/>';
  }
  Swal.fire({
    title: 'Settings',
    html:
      weatherComparison +
      `<h4>Show weather automatically<input type="checkbox" id="show-automatically-cb" /></h4>`,
    confirmButtonText: 'confirmar',
    preConfirm: (comparisonEnabled: boolean) => {
      let comparison: HTMLInputElement =
        Swal.getPopup().querySelector('#comparison-cb');
      let show: HTMLInputElement = Swal.getPopup().querySelector(
        '#show-automatically-cb'
      );
      let comparisonBoolean: boolean = comparison.checked;
      let showBoolean: boolean = show.checked;
      console.log(
        'comparison = ' + comparisonBoolean + ' show = ' + showBoolean
      );
      return { comparisonBoolean: comparisonBoolean, showBoolean: showBoolean };
    },
  }).then(result => {
    if (result.value.comparisonBoolean) {
      setBtnActive(compareBtn);
    } else {
      setBtnInactive(compareBtn);
    }
    // Prescricao.usoCigarro = result.value.cigarro;
  });
};
