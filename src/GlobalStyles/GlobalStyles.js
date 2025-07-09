import { StyleSheet } from 'react-native';
import ColorStyles from './Color.styles';
import fontFamily from './FontFamily';

const GlobalStyles = StyleSheet.create({
  container: {
    backgroundColor: ColorStyles.backgroundColor,
    overflow: 'scroll',
    paddingBottom: 90,
    flex: 1,
  },
  // Input fields styling
  input: {
    height: 50,
    borderColor: ColorStyles.borderColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: ColorStyles.inputBackgroundColor,
    fontSize: 16,
    marginBottom: 15,
  },

  // Label styling
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: ColorStyles.lablesColor,
    marginBottom: 5,
  },
  focusedInputLabel: {
    color: ColorStyles.focused,
  },

  // Button styling
  button: {
    backgroundColor: ColorStyles.brandColor,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
    paddingHorizontal: 7,
    flexGrow: 1,
  },

  buttonText: {
    color: ColorStyles.whiteColor,
    fontSize: 18,
    fontWeight: '600',
  },

  // Checkbox styling
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingRight: 15,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderColor: ColorStyles.borderColor,
    borderWidth: 11,
    marginRight: 10,
    paddingRight: 5,
    backgroundColor: ColorStyles.whiteBGColor, // Default background color
  },
  checkboxChecked: {
    backgroundColor: ColorStyles.backgroundColor,
  },

  // Error Text styling
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  textLink: {
    color: ColorStyles.brandColor,
    fontWeight: 'bold',
    cursor: 'pointer',
  },

  title: {
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    color: ColorStyles.textColor,
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 19,
  },

  bodyWhiteBackgroundColor: { backgroundColor: ColorStyles.whiteBGColor },

  inputContentstyle: {
    fontFamily: fontFamily.manropeRegular,
    color: ColorStyles.textColor,
    fontSize: 16,
  },
  errorText: {
    color: ColorStyles.errorColor,
    fontFamily: fontFamily.manropeRegular,
    fontSize: 16,
  },
  inputLable: {
    color: ColorStyles.lablesColor,
    fontFamily: fontFamily.manropeRegular,
    fontSize: 16,
  },
  inputsOutlineStyle: {
    borderWidth: 2,
    borderColor: ColorStyles.borderColor,
    borderStyle: 'solid',
  },
  inputStyles: {
    fontFamily: fontFamily.manropeRegular,
    color: ColorStyles.textColor,
    backgroundColor: ColorStyles.whiteBGColor,
  },
});

export default GlobalStyles;
