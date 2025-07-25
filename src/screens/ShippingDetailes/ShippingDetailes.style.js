import { StyleSheet } from 'react-native';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
const createColorStyles = () => {
  const ColorStyles = getAppsColorStyles();
  const styles = StyleSheet.create({
    container: { margin: 10, padding: 10, marginTop: 90 },
    inputStyles: {
      backgroundColor: ColorStyles.inputBackgroundColor,
      height: 60,
      color: ColorStyles.textColor,
    },
    headerWrapper: { paddingTop: 30 },
    formWrapper: {
      padding: 10,
      gap: 10,
      backgroundColor: ColorStyles.whiteBGColor,
      paddingVertical: 20,
      marginBottom: 20,
    },
    inputWrapper: {
      backgroundColor: ColorStyles.whiteBGColor,
      padding: 10,
      gap: 10,
      marginBottom: 20,
      // marginTop: 500,
      zIndex: 90000,
    },
    fakeInput: {
      borderWidth: 2,
      borderRadius: 4,
      borderColor: ColorStyles.borderColor,
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: ColorStyles.whiteBGColor,
      marginVertical: 8,
      height: 60,
    },
    label: {
      fontSize: 12,
      color: ColorStyles.lablesColor,
      top: -9,
      left: 10,
      backgroundColor: ColorStyles.whiteBGColor,
      position: 'absolute',
      paddingLeft: 5,
    },
    inputText: {
      top: 10,
      fontSize: 16,
      color: ColorStyles.textColor,
    },
  });
  return styles;
};
export default createColorStyles;
