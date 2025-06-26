import { useState, useEffect } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import {
  PERMISSIONS,
  check,
  request,
  openSettings,
  RESULTS,
} from 'react-native-permissions';
import {
  updateCurrentLocation,
  addOriginLocation,
} from '../../Redux/slices/PassengerSlice';
import { showErrorToast } from '../../utils/ToastDisplayer/toastDisplayer';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';

const CheckLocationServices = () => {
  const dispatch = useDispatch();
  const passengerSlices = useSelector(state => state?.passengerSlices);
  const originLocation = passengerSlices?.originLocation;
  const isLoading = passengerSlices?.isLoading;
  const passengerStatus = passengerSlices?.passengerStatus;
  const listofJourneyStatus = passengerSlices?.listofJourneyStatus;

  const [locationEnabled, setLocationEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const showToast = (type, title, message) => {
    showErrorToast(type, title, message);
  };

  const checkLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (result === RESULTS.GRANTED) {
          checkLocationServices();
        } else if (result === RESULTS.DENIED) {
          const requestResult = await request(
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          );
          if (requestResult === RESULTS.GRANTED) {
            checkLocationServices();
          } else {
            showToast(
              'error',
              'Permission Denied',
              'Location permission denied',
            );
          }
        } else if (result === RESULTS.BLOCKED) {
          showToast(
            'error',
            'Permission Blocked',
            'Please enable location permission in settings',
          );
          openSettings();
        }
      } else if (Platform.OS === 'ios') {
        const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (result === RESULTS.GRANTED) {
          checkLocationServices();
        } else if (result === RESULTS.DENIED) {
          const requestResult = await request(
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          );
          if (requestResult === RESULTS.GRANTED) {
            checkLocationServices();
          } else {
            showToast(
              'error',
              'Permission Denied',
              'Location permission denied',
            );
          }
        } else if (result === RESULTS.BLOCKED) {
          showToast(
            'error',
            'Permission Blocked',
            'Please enable location permission in settings',
          );
          openSettings();
        }
      }
    } catch (error) {
      showToast('error', 'Error', 'Error checking location permission');
    }
  };

  const setLocations = ({ latitude, longitude, description }) => {
    dispatch(updateCurrentLocation({ latitude, longitude, description }));

    // Only update origin location if it hasn't been set yet
    if (
      !originLocation &&
      (!passengerStatus ||
        passengerStatus < listofJourneyStatus?.journeyStarted)
    ) {
      dispatch(addOriginLocation({ latitude, longitude, description }));
    }
  };
  const getPlaceDetails = async (latitude, longitude) => {
    try {
      if (!latitude || !longitude) return;

      // Use Nominatim instead of OSRM for reverse geocoding
      const nominatimUrl = 'https://nominatim.openstreetmap.org/reverse';
      const url = `${nominatimUrl}?lat=${latitude}&lon=${longitude}&format=json`;

      console.log('@getPlaceDetails URL:', url);

      const response = await axios.get(url, {
        headers: {
          'Accept-Language': 'en',
          'User-Agent': 'YourAppName/1.0 (loadNow11@gmail.com)', // Required by Nominatim
        },
      });
      const x = {
        address: {
          'ISO3166-2-lvl4': 'ET-AA',
          country: 'Ethiopia',
          country_code: 'et',
          county: 'Bole',
          postcode: '7898',
          state: 'Addis Ababa',
          state_district: 'Addis Ababa',
        },
        addresstype: 'road',
        boundingbox: ['9.0068278', '9.0082186', '38.8679954', '38.8703752'],
        class: 'highway',
        display_name: 'Bole, Addis Ababa, 7898, Ethiopia',
        importance: 0.05340483482108793,
        lat: '9.0069064',
        licence:
          'Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright',
        lon: '38.8681319',
        name: '',
        osm_id: 583090606,
        osm_type: 'way',
        place_id: 38617846,
        place_rank: 26,
        type: 'residential',
      };
      const data = response?.data;
      console.log('Nominatim Response:', data); // Debug response

      const address = data?.address;
      const description =
        data?.display_name ||
        [address?.county, address?.state, address?.country]
          .filter(Boolean)
          .join(', '); // Safely join fields

      const currentLocation = {
        latitude,
        longitude,
        description: description || 'Unknown location',
      };

      setLocations(currentLocation);
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };
  const checkLocationServices = () => {
    const watchId = Geolocation.watchPosition(
      async position => {
        setLocationEnabled(true);
        const { latitude, longitude } = position?.coords;
        setLocations({ latitude, longitude, description: '' });
        await getPlaceDetails(latitude, longitude);
      },
      error => {
        setLocationEnabled(false);
        if (error.code === 1) {
          showToast('error', 'Permission Denied', 'Location permission denied');
        } else {
          showToast(
            'error',
            'Location Disabled',
            'Location services are disabled',
          );
          setErrorMessage(error.message);
        }
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 1000,
        interval: 50000,
        fastestInterval: 20000,
      },
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  };

  useEffect(() => {
    checkLocationPermission();
  }, []);

  return (
    isLoading &&
    !locationEnabled && (
      <View>
        {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
        <Button title="Check Again" onPress={checkLocationPermission} />
      </View>
    )
  );
};

export default CheckLocationServices;
