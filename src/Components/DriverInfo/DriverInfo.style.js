import { StyleSheet } from 'react-native';
import fontFamily from '../../GlobalStyles/FontFamily';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
const createStyles = () => {
  const ColorStyles = getAppsColorStyles();
  const styles = StyleSheet.create({
    headingText: {
      // paddingTop: 10,
      // paddingBottom: 15,
      color: ColorStyles.textColor,
      fontFamily: fontFamily.manropeRegular,
      fontSize: 18,
      textAlign: 'center',
      justifyContent: 'center',
    },
    timeDisplayer: {
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 18,
      color: ColorStyles.textColor,
      fontFamily: fontFamily.manropeRegular,
      textAlign: 'center',
      justifyContent: 'center',
    },
    arrivalText: {
      color: ColorStyles.textColor,
      fontFamily: fontFamily.manropeRegular,
      fontSize: 12,
      textAlign: 'center',
      justifyContent: 'center',
    },
    vehicleInfoText: {
      color: ColorStyles.textColor,
      fontFamily: fontFamily.manropeRegular,
      fontSize: 16,
      textAlign: 'center',
      justifyContent: 'center',
    },
    journeyInfoWrapper: {
      paddingLeft: 30,
      borderRadius: 20,
      paddingTop: 20,
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderColor: ColorStyles.borderColor,
    },

    cardContainer: {
      justifyContent: 'center',
    },
    cardProfileContainer: { flexDirection: 'row', alignItems: 'center' },
    shipingCost: { paddingLeft: 10 },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 50,
      margin: 10,
    },
    driverInfo: {
      flex: 1,
      // paddingBottom: 20,
    },
    driverName: {
      fontSize: 20,
      color: ColorStyles.textColor,
    },
    memberSince: {
      color: ColorStyles.textColor,
    },
    deliveryInfo: {
      fontSize: 12,
      color: ColorStyles.informationColor,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    ratingText: {
      marginLeft: 5,
      fontSize: 12,
      color: ColorStyles.textColor,
    },
    callButton: {
      backgroundColor: ColorStyles.backgroundColor,
      padding: 8,
      borderRadius: 25,
    },
    driverInfoContainer: {
      width: '100%',
      padding: 10,
      backgroundColor: ColorStyles.whiteBGColor,
      borderRadius: 20,
    },
  });
  return styles;
};
export default createStyles;
