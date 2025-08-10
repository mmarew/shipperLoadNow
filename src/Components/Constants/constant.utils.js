import { Dimensions } from 'react-native';
import { MAP_TYPES } from 'react-native-maps';

const mapType = MAP_TYPES.STANDARD; // 'standard';
const { height, width } = Dimensions.get('window');
const LATITUDE_DELTA = 0.01422;
const LONGITUDE_DELTA = (LATITUDE_DELTA * width) / height;
const defaultRegion = {
  latitude: 9.0082186,
  longitude: 38.8679954,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};
export {
  height,
  width,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  mapType,
  defaultRegion,
};
