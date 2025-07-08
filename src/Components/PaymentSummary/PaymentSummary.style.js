import { StyleSheet } from 'react-native';
import ColorStyles from '../../GlobalStyles/Color.styles';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: ColorStyles.backgroundColor,
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoContainer: {
    flex: 1,
    padding: 5,
  },
  label: {
    fontSize: 14,
    color: ColorStyles.textColor,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  priceContainer: {
    backgroundColor: ColorStyles.whiteBGColor,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: ColorStyles.borderColor,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  doneButton: {
    backgroundColor: ColorStyles.brandColor,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
