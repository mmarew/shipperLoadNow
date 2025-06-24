import {StyleSheet} from 'react-native';
import GlobalStyles from '../../GlobalStyles/GlobalStyles';

const styles = StyleSheet.create({
  container: {},
  pickAndDestination: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    padding: 20,
    ...GlobalStyles.bodyWhiteBackgroundColor,
  },
  pickUp: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomWidth: 4,
    borderBottomColor: '#f8f8f9',
  },
  destination: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  textPickupAndDestination: {
    fontSize: 16,
    color: '#333',
  },
});
export default styles;
