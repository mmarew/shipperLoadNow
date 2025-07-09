import { Appearance, StyleSheet } from 'react-native';
const lightTimeColors = {
    backgroundColor: '#F4F4F5',
    whiteColor: '#FFFFFF',
    whiteBGColor: '#fff',

    focused: '#F0F9FF',

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
    focused: '#0F0600',
    brandColor: '#075985',
    whiteColor: '#FFFFFF',
    errorColor: '#FF3B30',
    lablesColor: '#f9f9f9',
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

// theme.ts
export const lightTheme = {
  primary: '#0056B3',
  secondary: '#6C757D',
  background: '#FFFFFF',
  surface: '#F8F9FA',
  text: '#212529',
  error: '#DC3545',
  info: '#17A2B8',
  active: '#0056B3',
  focused: '#80bdff',
  disabled: '#CED4DA',
  success: '#198754',
};

export const darkTheme = {
  primary: '#1C3A6F',
  secondary: '#ADB5BD',
  background: '#0F172A',
  surface: '#1E293B',
  text: '#F8FAFC',
  error: '#FF6B6B',
  info: '#63C2D0',
  active: '#93C5FD',
  focused: '#3B82F6',
  disabled: '#475569',
  success: '#38B000',
};
