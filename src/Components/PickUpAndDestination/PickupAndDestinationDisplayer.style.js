import { StyleSheet } from 'react-native';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
const createStyles = () => {
  const ColorStyles = getAppsColorStyles();
  const styles = StyleSheet.create({
    container: {},
    pickAndDestination: {
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      padding: 20,
      // ...GlobalStyles.bodyWhiteBackgroundColor,
      backgroundColor: ColorStyles.backgroundColor,
    },
    pickUp: {
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      borderBottomWidth: 1,
      borderBottomColor: ColorStyles.borderColor,
      backgroundColor: ColorStyles.whiteBGColor,
    },
    destination: {
      backgroundColor: ColorStyles.whiteBGColor,

      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    textPickupAndDestination: {
      fontSize: 16,
      color: ColorStyles.textColor,
    },
    textPickupAndDestinationLabels: {
      fontSize: 12,
      fontWeight: '500',
      // marginBottom: 5,
      color: ColorStyles.inputLablesColor,
    },
  });

  return styles;
};
export default createStyles;
