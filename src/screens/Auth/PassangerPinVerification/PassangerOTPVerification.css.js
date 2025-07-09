import { StyleSheet } from 'react-native';
import ColorStyles from '../../../GlobalStyles/Color.styles';
import fontFamily from '../../../GlobalStyles/FontFamily';

const styles = StyleSheet.create({
  bottomSection: {
    paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 16,
    color: ColorStyles.textColor,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: fontFamily.manropeRegular,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  otpInput: {
    flex: 1,
    width: 30,
    height: 50,
    borderWidth: 1,
    borderColor: ColorStyles.borderColor,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: ColorStyles.whiteBGColor,
    color: ColorStyles.textColor,
  },
  resendText: {
    fontSize: 14,
    color: ColorStyles.textColor,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
});
export default styles;
