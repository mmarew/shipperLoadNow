import { StyleSheet } from 'react-native';
import ColorStyles from '../../../GlobalStyles/Color.styles';

const styles = StyleSheet.create({
  bottomSection: { paddingHorizontal: 20 },
  infoText: {
    fontSize: 14,
    color: ColorStyles.textColor,
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: ColorStyles.borderColor,
    borderRadius: 8,
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
