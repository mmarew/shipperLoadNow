import { StyleSheet } from 'react-native';
import ColorStyles from '../../GlobalStyles/Color.styles';
import fontFamily from '../../GlobalStyles/FontFamily';

const styles = StyleSheet.create({
  listContainerStyle: {
    position: 'absolute',
    top: 90,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: ColorStyles.whiteBGColor,
    maxHeight: 300,
  },
  item: {
    padding: 10,
    borderBottomColor: ColorStyles.borderColor,
    borderBottomWidth: 1,
  },
  listStyle: { border: 'none' },
  inputContainerStyle: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,

    borderRadius: 0,

    paddingLeft: 40,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: ColorStyles.inputBackgroundColor,
    width: '100%',
  },
  inputStyle: {
    backgroundColor: ColorStyles.inputBackgroundColor,
    color: ColorStyles.textColor,
    padding: 0,
    margin: 0,
  },
  errorText: {
    color: ColorStyles.errorColor,
    fontFamily: fontFamily.manropeRegular,
    fontSize: 12,
    position: 'absolute',
    zIndex: 100,
    top: 70,
    left: 40,
  },
  loadingIndicator: {
    position: 'absolute',
    top: 20,
    // left: 0,
    right: 50,
    // bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
});
export default styles;
