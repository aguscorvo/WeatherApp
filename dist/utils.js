// import Swal from 'sweetalert2';
import {
  compareBtn,
  locationInput,
  setBtnActive,
  setBtnInactive,
  setShowActive,
  setShowInactive,
} from './main.js';
export const roundToOneDigitAfterComma = floatNumber =>
  parseFloat((Math.round(floatNumber * 100) / 100).toFixed(1));
export const capitalizeFirstLetter = word =>
  word.charAt(0).toUpperCase() + word.slice(1);
export const getScreenWidth = () => screen.width;
export const spaceAvailable = (weatherNodeCounter, screenWidth) => {
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
export const sweetAlertError = message =>
  Swal.fire({
    heightAuto: false,
    title: 'Oops...',
    text: message,
    icon: 'error',
    showCloseButton: true,
  });
export const sweetAlertWarning = message =>
  Swal.fire({
    heightAuto: false,
    title: 'Warning',
    text: message,
    icon: 'warning',
    showCloseButton: true,
  });
export const sweetAlertInfo = message =>
  Swal.fire({
    heightAuto: false,
    text: message,
    icon: 'info',
    showCloseButton: true,
  });
export const sweetAlertSettings = (comparisonEnabled, showAuto) => {
  var weatherComparison;
  var weatherAuto;
  if (comparisonEnabled) {
    if (getScreenWidth() >= 720 && getScreenWidth() < 1050) {
      weatherComparison =
        '<h4>Weather comparison enabled<input type="checkbox" id="comparison-cb" checked disabled/></h4><p/>';
    } else {
      weatherComparison =
        '<h4>Weather comparison enabled<input type="checkbox" id="comparison-cb" checked/></h4><p/>';
    }
  } else {
    if (getScreenWidth() >= 720 && getScreenWidth() < 1050) {
      weatherComparison =
        '<h4>Weather comparison enabled<input type="checkbox" id="comparison-cb" disabled/></h4><p/>';
    } else {
      weatherComparison =
        '<h4>Weather comparison enabled<input type="checkbox" id="comparison-cb"/></h4><p/>';
    }
  }
  if (showAuto) {
    weatherAuto =
      '<h4>Show weather automatically<input type="checkbox" id="show-automatically-cb" checked/></h4>';
  } else {
    weatherAuto =
      '<h4>Show weather automatically<input type="checkbox" id="show-automatically-cb" /></h4>';
  }
  Swal.fire({
    heightAuto: false,
    title: 'Settings',
    html: weatherComparison + weatherAuto,
    confirmButtonText: 'OK',
    showCloseButton: true,
    preConfirm: comparisonEnabled => {
      let comparison = Swal.getPopup().querySelector('#comparison-cb');
      let show = Swal.getPopup().querySelector('#show-automatically-cb');
      let comparisonBoolean = comparison.checked;
      let showBoolean = show.checked;
      console.log(
        'comparison = ' + comparisonBoolean + ' show = ' + showBoolean
      );
      return { comparisonBoolean: comparisonBoolean, showBoolean: showBoolean };
    },
  }).then(result => {
    if (result.isConfirmed) {
      if (result.value.comparisonBoolean) {
        setBtnActive(compareBtn);
      } else {
        setBtnInactive(compareBtn);
      }
      if (result.value.showBoolean) {
        setShowActive();
      } else {
        setShowInactive();
      }
    }
  });
};
