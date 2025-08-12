import { Appearance, StyleSheet } from 'react-native';
import store from '../Redux/Store/Store';
const lightTimeColors = {
    backgroundColor: '#F4F4F5',
    whiteColor: '#FFFFFF',
    whiteBGColor: '#fff',
    autocompleteFocused: '#F0F9FF',
    focused: '#075985', //'#F8A67A',
    darkGray: '#2E2E2E80',
    brandColor: '#075985',
    inputLabelsColor: '#52525B',
    errorColor: '#FF3B30',
    labelsColor: '#27272A',
    borderColor: '#D4D4D8',
    textColor: '#27272A',
    lightSkyBlue: '#E0F2FE',
    mediumSkyBlue: '#E0F2FE',
    shadowColor: '#000',
    veryLightGray: '#f0f0f0',
    mediumGray: '#71717A',
    informationColor: '#4F4F4F',
    inputBackgroundColor: '#fff',
  },
  darkTimeColors = {
    mediumSkyBlue: '#E0F2FE',
    inputLabelsColor: '#fff',
    autocompleteFocused: '#0F0600',
    darkGray: '#D1D1D180',

    inputBackgroundColor: '#3D3D3D',
    backgroundColor: '#262626',
    whiteBGColor: '#181818', //black color
    termsColor: '#f9f9f9',
    focused: '#075985', // '#F8A67A',
    brandColor: '#075985',
    whiteColor: '#FFFFFF',
    errorColor: '#FF3B30',
    labelsColor: '#f9f9f9',
    borderColor: '#D4D4D8',
    textColor: '#f9f9f9',
    lightSkyBlue: '#8CBED6',
    shadowColor: '#000',
    veryLightGray: '#f0f0f0',
    // white gray color
    mediumGray: '#FFFFFF',
    informationColor: '#B0B0B0',
  };
// get if system is dark mode or light mode or null
const checkIfAppIsDarkMode = () => {
  const state = store.getState();
  const isDarkMode = state?.passengerSlices?.isDarkMode;
  const colorScheme = Appearance.getColorScheme();

  // return true;
  return isDarkMode === 'true' || colorScheme === 'dark';
};

// export const barStyles =
export const getAppsBarStyles = () => {
  return checkIfAppIsDarkMode() ? 'light-content' : 'dark-content';
};
const getAppsColorStyles = () => {
  const colorStyles = checkIfAppIsDarkMode() ? darkTimeColors : lightTimeColors;

  return StyleSheet.create({
    ...colorStyles,
  });
};
export default getAppsColorStyles;
