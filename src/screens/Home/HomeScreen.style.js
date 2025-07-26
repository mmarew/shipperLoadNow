import { StyleSheet } from 'react-native';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
// import ColorStyles from '../../GlobalStyles/Color.styles';
const createStyles = () => {
  const ColorStyles = getAppsColorStyles();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    mapContainer: {
      flex: 0.5,
    },
    bottomContainer: {
      padding: 20,

      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      // paddingBottom: 40,
      backgroundColor: ColorStyles.backgroundColor,
      height: 280,
    },

    infoContainer: {
      flex: 0.3, // 30% of the container height
      backgroundColor: ColorStyles.whiteBGColor,
      padding: 25,
      flexDirection: 'column',
    },

    buttonContainer: {
      marginTop: 50,
    },
    strightLineWrapper: {
      // flex: 1,
      alignItems: 'center',
      // paddingBottom: 20,
      paddingTop: 20,
    },
  });
  return styles;
};

export default createStyles;
