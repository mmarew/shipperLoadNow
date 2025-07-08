import { StyleSheet } from 'react-native';
import ColorStyles from '../../GlobalStyles/Color.styles';
import fontFamily from '../../GlobalStyles/FontFamily';

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    // backgroundColor: '#fff',
  },
  modalContainer: {
    backgroundColor: ColorStyles.backgroundColor,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    marginTop: 90,
  },
  indicator: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 10,
    marginVertical: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: ColorStyles.textColor,
    fontFamily: fontFamily.manropeRegular,
  },
  reasonButton: {
    width: '100%',
    padding: 15,
    backgroundColor: ColorStyles.whiteBGColor,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  reasonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: ColorStyles.whiteBGColor,
  },
  selectedReasonContainer: {
    borderColor: ColorStyles.borderColor,
    borderWidth: 2,
  },
  reasonText: {
    fontSize: 16,
    color: ColorStyles.textColor,
  },
});
export default styles;
