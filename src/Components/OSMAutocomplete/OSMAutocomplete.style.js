import { StyleSheet } from 'react-native';
import fontFamily from '../../GlobalStyles/FontFamily';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
const createStyles = () => {
  const ColorStyles = getAppsColorStyles();
  const styles = StyleSheet.create({
    listContainerStyle: {
      position: 'absolute',
      top: 60,
      left: 0,
      right: 0,
      width: '100%',
      backgroundColor: ColorStyles.whiteBGColor,
      maxHeight: 300,
    },
    item: {
      padding: 10,
      borderBottomColor: ColorStyles.borderColor,
      borderBottomWidth: 1,
    },
    inputContainerStyle: {
      borderWidth: 0,

      borderRadius: 0,

      backgroundColor: ColorStyles.inputBackgroundColor,
      width: '100%',
    },
    inputStyle: {
      backgroundColor: ColorStyles.inputBackgroundColor,
      color: ColorStyles.textColor,
    },
    errorText: {
      color: ColorStyles.errorColor,
      fontFamily: fontFamily.manropeRegular,
      fontSize: 12,
      position: 'absolute',
      zIndex: 100,
      top: 40,
      left: 40,
    },
    loadingIndicator: {
      position: 'absolute',
      top: 20,
      // left: 0,
      right: 50,
      // bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
    },
  });
  return styles;
};
export default createStyles;
