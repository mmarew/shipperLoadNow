import { StyleSheet } from 'react-native';
import ColorStyles from '../../GlobalStyles/Color.styles';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: ColorStyles.backgroundColor,
    paddingBottom: 30,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    gap: 10,
  },
  shippableItemContainer: {
    backgroundColor: ColorStyles.whiteBGColor,
    marginTop: 5,
    borderRadius: 20,
    padding: 10,

    paddingTop: 0,
  },
});
export default styles;
