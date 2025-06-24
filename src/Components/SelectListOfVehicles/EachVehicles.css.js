import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  vehicleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  selectedVehicle: {
    borderWidth: 2,
    borderColor: '#132e47',
    backgroundColor: '#E0F2FE',
  },
  vehicleImage: {
    width: 60,
    height: 60,
    // resizeMode: 'contain',
  },
  vehicleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  vehicleInfo: {
    flex: 1,
    paddingLeft: 10,
  },
  vehicleDescription: {
    fontSize: 14,
    color: '#666',
  },
  vehiclePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007aff',
  },
});
export default styles;
