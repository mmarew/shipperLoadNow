// CustomScreenManager.style
import { StyleSheet } from 'react-native';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
const createStyles = () => {
  const ColorStyles = getAppsColorStyles();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      position: 'relative',
      backgroundColor: ColorStyles.backgroundColor,
    },
  });

  return styles;
};
export default createStyles;
