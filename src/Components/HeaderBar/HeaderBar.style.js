import { Platform, StyleSheet } from 'react-native';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
const createStyles = () => {
  const ColorStyles = getAppsColorStyles();
  const styles = StyleSheet.create({
    headerContainer: {
      position: 'absolute',
      top: Platform.OS === 'ios' ? '8%' : '6%', // Adjust as needed for your layout
      left: '2%',
      zIndex: 10,
      borderRadius: 22,
    },
    headerButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: ColorStyles.brandColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
    hamburger: {
      width: 24,
      height: 18,
      justifyContent: 'space-between',
    },
    hamburgerLine: {
      height: 2,
      width: '100%',
      backgroundColor: 'white',
      borderRadius: 2,
    },
  });
  return styles;
};
export default createStyles;
