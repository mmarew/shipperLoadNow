import { StyleSheet } from 'react-native';
import ColorStyles from '../../GlobalStyles/Color.styles';

const styles = StyleSheet.create({
  container: { margin: 10, padding: 10, marginTop: 90 },
  inputStyles: {
    backgroundColor: ColorStyles.inputBackgroundColor,
    height: 60,
    color: ColorStyles.textColor,
  },
  headerWrapper: { paddingTop: 30 },
  formWrapper: {
    padding: 10,
    gap: 10,
    backgroundColor: ColorStyles.whiteBGColor,
    paddingVertical: 20,
    marginBottom: 20,
  },
});
export default styles;
