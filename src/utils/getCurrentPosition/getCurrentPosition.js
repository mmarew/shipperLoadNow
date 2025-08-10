import errorHandler from '../errorHandler/errorHandler';
import requestLocationPermission from '../requestLocationPermission/requestLocationPermission';
import Geolocation from 'react-native-geolocation-service';

const getCurrentPosition = async () => {
  const hasLocationPermission = await requestLocationPermission();
  if (!hasLocationPermission) return;

  Geolocation.getCurrentPosition(
    async position => {
      const { latitude, longitude } = position.coords;
      // const region = {
      //   latitude,
      //   longitude,
      //   latitudeDelta: 0.0922,
      //   longitudeDelta: 0.0421,
      // };
      // setRegion(region);

      try {
        const response = await Geocoder.from(latitude, longitude);
        const address = response?.results[0]?.formatted_address;
        dispatch(
          addCurrentLocation({ latitude, longitude, description: address }),
        );
      } catch (error) {
        errorHandler(error);
      }
    },
    error => {
      errorHandler(error);
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 },
  );
};

export default getCurrentPosition;
