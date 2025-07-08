import { StyleSheet } from 'react-native';
import ColorStyles from '../../GlobalStyles/Color.styles';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    flex: 1,
    marginTop: 100,
    // backgroundColor: ColorStyles.whiteBGColor,
  },
  shipingCost: { paddingLeft: 70, color: ColorStyles.textColor },
});
export default styles;
