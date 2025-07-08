import { StyleSheet } from 'react-native';
import { height } from '../Constants/constant.utils';
import ColorStyles from '../../GlobalStyles/Color.styles';
import fontFamily from '../../GlobalStyles/FontFamily';

const styles = StyleSheet.create({
  listContainerStyle: {
    borderWidth: 10,
    borderColor: 'transparent',

    maxHeight: height - 300,
    zIndex: 100,
    backgroundColor: 'white',
    minHeight: 'fit-content',
    paddingTop: 10,
    borderWidth: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    position: 'absolute',
    top: 90,

    width: '100%',
    overflow: 'scroll',
  },
  item: {
    padding: 10,
    borderBottomColor: '#ccc',
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
