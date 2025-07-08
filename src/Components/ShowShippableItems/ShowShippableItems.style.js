import { StyleSheet } from 'react-native';
import ColorStyles from '../../GlobalStyles/Color.styles';
import fontFamily from '../../GlobalStyles/FontFamily';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 10,
    paddingVertical: 20,
    marginTop: 15,
    backgroundColor: ColorStyles.whiteBGColor,
    borderRadius: 20,
  },
  row: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: ColorStyles.textColor,
    fontFamily: fontFamily.manropeRegular,
  },
  value: {
    color: ColorStyles.textColor,
    fontSize: 16,
    fontFamily: fontFamily.manropeRegular,
  },
});
export default styles;
