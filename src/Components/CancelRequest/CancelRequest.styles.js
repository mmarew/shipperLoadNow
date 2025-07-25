import { StyleSheet } from 'react-native';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
const createStyles = () => {
  const ColorStyles = getAppsColorStyles();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorStyles.whiteBGColor,
      marginTop: 10,
      padding: 10,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background color when modal is open
    },
    modalView: {
      position: 'absolute',
      bottom: 0,
      width: '90%',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    openButton: {
      backgroundColor: ColorStyles.borderColor,
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    closeButton: {
      backgroundColor: '#F194FF',
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      marginTop: 15,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });
  return styles;
};
export default createStyles;
