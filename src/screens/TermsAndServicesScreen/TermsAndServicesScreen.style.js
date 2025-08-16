import { StyleSheet } from 'react-native';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
const createStyles = () => {
  const ColorStyles = getAppsColorStyles();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: ColorStyles.backgroundColor,
    },
    scrollContainer: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    contentContainer: {
      marginBottom: 100,
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    subHeading: {
      color: ColorStyles.textColor,
      fontSize: 18,
      fontWeight: '600',
      marginVertical: 10,
    },
    text: {
      fontSize: 14,
      lineHeight: 22,
      color: ColorStyles.textColor,
    },
    agreeButton: {
      backgroundColor: ColorStyles.brandColor,
      padding: 15,
      alignItems: 'center',
      margin: 20,
      borderRadius: 5,
    },
    agreeButtonText: {
      color: ColorStyles.whiteColor,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  return styles;
};
export default createStyles;
