import { StyleSheet } from 'react-native';
// import ColorStyles from '../../GlobalStyles/Color.styles';
import GlobalStyles from '../../GlobalStyles/GlobalStyles';
import fontFamily from '../../GlobalStyles/FontFamily';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
const ColorStyles = getAppsColorStyles();
const styles = StyleSheet.create({
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 20,
    backgroundColor: ColorStyles.backgroundColor,
    flex: 1,
  },
  textInputStyle: { ...GlobalStyles.inputStyles },

  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderColor: ColorStyles.borderColor,
    borderWidth: 1,
    marginRight: 10,
  },
  checkboxBox: {
    flex: 1,
  },
  checkboxChecked: {
    backgroundColor: ColorStyles.brandColor,
  },
  termsText: {
    flex: 1,
    fontSize: 16,
    color: ColorStyles.informationColor,
    lineHeight: 23,
    fontFamily: fontFamily.manropeRegular,
  },
  termsLink: {
    color: ColorStyles.brandColor,
    textDecorationLine: 'underline',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
export default styles;
