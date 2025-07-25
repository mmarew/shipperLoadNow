import { StyleSheet } from 'react-native';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
const createStyles = () => {
  const ColorStyles = getAppsColorStyles();
  const styles = StyleSheet.create({
    vehicleItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: ColorStyles.whiteBGColor,
      borderRadius: 10,
      padding: 15,
      marginVertical: 5,
    },
    selectedVehicle: {
      borderWidth: 2,
      borderColor: ColorStyles.borderColor,
      backgroundColor: ColorStyles.lightSkyBlue,
    },
    vehicleImage: {
      width: 60,
      height: 60,
      resizeMode: 'contain',
    },
    vehicleTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: ColorStyles.textColor,
    },
    vehicleInfo: {
      flex: 1,
      paddingLeft: 10,
    },
    vehicleDescription: {
      fontSize: 14,
      color: ColorStyles.textColor,
    },
    vehiclePrice: {
      fontSize: 16,
      fontWeight: 'bold',
      color: ColorStyles.textColor,
    },
  });
  return styles;
};
export default createStyles;
