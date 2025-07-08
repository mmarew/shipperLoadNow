import { Appearance, StyleSheet } from 'react-native';
const lightTimeColors = {
    backgroundColor: '#F4F4F5',
    whiteColor: '#FFFFFF',
    whiteBGColor: '#fff',
    termsColor: '#4F4F4F',
    brandColor: '#075985',

    errorColor: '#FF3B30',
    lablesColor: '#27272A',
    borderColor: '#D4D4D8',
    textColor: '#27272A',
    lightSkyBlue: '#E0F2FE',
    shadowColor: '#000',
    veryLightGray: '#f0f0f0',
    mediumGray: '#71717A',
    informationColor: '#4F4F4F',
    inputBackgroundColor: '#fff',
  },
  darkTimeColors = {
    inputBackgroundColor: '#3D3D3D',
    backgroundColor: '#262626',
    whiteBGColor: '#181818', //black color
    termsColor: '#f9f9f9',
    brandColor: '#075985',
    whiteColor: '#fff',
    errorColor: '#FF3B30',
    lablesColor: '#f9f9f9',
    borderColor: '#D4D4D8',
    textColor: '#f9f9f9',
    lightSkyBlue: '#8CBED6',
    shadowColor: '#000',
    veryLightGray: '#f0f0f0',
    // white gray color
    mediumGray: '#fff',
  };
// get if system is dark mode or light mode or null
const isDarkMode = () => {
  const colorScheme = Appearance.getColorScheme();
  return colorScheme === 'dark';
};

console.log('@isDarkMode', isDarkMode());
const colorStyles = isDarkMode() ? darkTimeColors : lightTimeColors;
export default StyleSheet.create({
  ...colorStyles,
});
export const barStyles = isDarkMode() ? 'light-content' : 'dark-content';
