import { StyleSheet } from 'react-native';
import ColorStyles from '../../GlobalStyles/Color.styles';

const styles = StyleSheet.create({
  vehicleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: ColorStyles.whiteBGColor,
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  selectedVehicle: {
    borderWidth: 2,
    borderColor: ColorStyles.borderColor,
    backgroundColor: ColorStyles.whiteBGColor,
  },
  vehicleImage: {
    width: 60,
    height: 60,
    // resizeMode: 'contain',
  },
  vehicleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: ColorStyles.textColor,
  },
  vehicleInfo: {
    flex: 1,
    paddingLeft: 10,
  },
  vehicleDescription: {
    fontSize: 14,
    color: ColorStyles.textColor,
  },
  vehiclePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007aff',
  },
});
export default styles;
