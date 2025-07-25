import { StyleSheet } from 'react-native';
import fontFamily from '../../GlobalStyles/FontFamily';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
const createColorStyles = () => {
  const ColorStyles = getAppsColorStyles();
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      gap: 10,
      paddingVertical: 30,
      marginTop: 15,
      backgroundColor: ColorStyles.whiteBGColor,
      borderRadius: 20,
    },
    row: {
      flexDirection: 'row',
    },
    label: {
      fontSize: 16,
      color: ColorStyles.textColor,
      fontFamily: fontFamily.manropeRegular,
      fontStyle: 'normal',
      fontWeight: 'bold',
    },
    value: {
      color: ColorStyles.textColor,
      fontSize: 18,
      fontFamily: fontFamily.manropeRegular,
    },
  });
  return styles;
};
export default createColorStyles;
