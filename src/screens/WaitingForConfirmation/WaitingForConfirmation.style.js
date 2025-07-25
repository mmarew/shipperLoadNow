import { StyleSheet } from 'react-native';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
const createStyles = () => {
  const ColorStyles = getAppsColorStyles();
  const styles = StyleSheet.create({
    container: {
      padding: 10,
      margin: 10,
      flex: 1,
      marginTop: 100,
      // backgroundColor: ColorStyles.whiteBGColor,
    },
    shipingCost: { paddingLeft: 70, color: ColorStyles.textColor },
  });
  return styles;
};
export default createStyles;
