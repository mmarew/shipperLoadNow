import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import styles from './OSMAutocomplete.style';
import Geolocation from 'react-native-geolocation-service';
import {
  NOMINATIM_REVERSE_URL,
  NOMINATIM_SEARCH_URL,
} from '../Constants/constant.url';
import errorHandler from '../../utils/errorHandler/errorHandler';
import axios from 'axios';
import ColorStyles from '../../GlobalStyles/Color.styles';

const OSMAutocomplete = ({
  onSelect,
  placeholder = 'Search',
  value,
  setValue,
  showCurrentLocationOption = true,
  onFocus,
}) => {
  // controll results and its updater
  const [updateResults, setUpdateResults] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentLocationLoading, setCurrentLocationLoading] = useState(false);
  const [selected, setSelected] = useState(false);
  //
  useEffect(() => {
    if (!updateResults) setResults([]);
  }, [, updateResults]);

  // useEffect(() => {
  //   if (updateResults == false) {
  //     setResults([]);
  //     return;
  //   }
  //   setSelected(false);

  //   const trimmed = value?.trim();
  //   if (!trimmed || trimmed.length < 3) {
  //     setResults([]);
  //     return;
  //   }

  //   const delay = setTimeout(async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch(
  //         `${NOMINATIM_SEARCH_URL}?q=${encodeURIComponent(
  //           trimmed,
  //         )}&format=json&addressdetails=10&limit=15&accept-language=en,am`,
  //       );
  //       const data = await response.json();
  //       const parsed = data.map(item => ({
  //         name: item.display_name,
  //         latitude: Number(item.lat),
  //         longitude: Number(item.lon),
  //         full: item,
  //       }));
  //       setResults(parsed);
  //     } catch (error) {
  //       console.error('Nominatim fetch error:', errorHandler(error));
  //       setResults([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }, 500);

  //   return () => clearTimeout(delay);
  // }, [value]);

  useEffect(() => {
    if (!updateResults) {
      setResults([]);
      return;
    }
    setSelected(false);

    const trimmed = value?.trim();
    if (!trimmed || trimmed.length < 3) {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await axios.get(NOMINATIM_SEARCH_URL, {
          params: {
            q: trimmed,
            format: 'json',
            addressdetails: 10,
            limit: 15,
            countrycodes: 'et', // Ethiopia only
            'accept-language': 'en,am',
          },
          headers: {
            'User-Agent': 'YourAppName/1.0 (mmarew1p@gmail.com)', // Required!
          },
        });
        const parsed = response.data.map(item => ({
          name: item.display_name,
          latitude: Number(item.lat),
          longitude: Number(item.lon),
          full: item,
        }));
        setResults(parsed);
      } catch (error) {
        console.error(
          'Nominatim error:',
          error.response?.data || error.message,
        );
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [value]);

  const handleSelect = async item => {
    if (selected) return;
    setSelected(true);

    if (item.isCurrentLocation) {
      // 🧹 IMMEDIATELY clear results and dismiss keyboard when user taps
      setResults([]);
      Keyboard.dismiss();

      try {
        setCurrentLocationLoading(true);

        // Geolocation.getCurrentPosition(
        //   async position => {
        //     const {latitude, longitude} = position.coords;

        //     try {
        //       const reverseResponse = await fetch(
        //         `${NOMINATIM_REVERSE_URL}?lat=${latitude}&lon=${longitude}&format=json&accept-language=en,am&countrycodes=et,dj`,
        //       );
        //       const reverseData = await reverseResponse.json();
        //       const address = reverseData.display_name || 'Current Location';

        //       setValue(address);
        //       onSelect({
        //         name: address,
        //         latitude,
        //         longitude,
        //         full: {latitude, longitude, address: reverseData},
        //       });
        //     } catch (reverseError) {
        //       console.error(
        //         'Reverse geocoding error:',
        //         errorHandler(reverseError),
        //       );
        //       setValue('Current Location');
        //       onSelect({
        //         name: 'Current Location',
        //         latitude,
        //         longitude,
        //         full: {latitude, longitude},
        //       });
        //     } finally {
        //       setCurrentLocationLoading(false);
        //     }
        //   },
        //   error => {
        //     console.error('Error getting location:', error);
        //     alert('Unable to fetch your current location.');
        //     setCurrentLocationLoading(false);
        //   },
        //   {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
        // );

        Geolocation.getCurrentPosition(
          async position => {
            const { latitude, longitude } = position.coords;

            try {
              const reverseResponse = await axios.get(NOMINATIM_REVERSE_URL, {
                params: {
                  lat: latitude,
                  lon: longitude,
                  format: 'json',
                  countrycodes: 'et,dj', // Ethiopia & Djibouti only
                  'accept-language': 'en,am',
                },
                headers: {
                  'User-Agent': 'YourAppName/1.0 (mmarew11@gmail.com)', // Required!
                },
              });

              const reverseData = reverseResponse.data;
              const address = reverseData.display_name || 'Current Location';

              setValue(address);
              onSelect({
                name: address,
                latitude,
                longitude,
                full: { latitude, longitude, address: reverseData },
              });
            } catch (reverseError) {
              console.error(
                'Reverse geocoding error:',
                errorHandler(reverseError),
              );
              setValue('Current Location');
              onSelect({
                name: 'Current Location',
                latitude,
                longitude,
                full: { latitude, longitude },
              });
            } finally {
              setCurrentLocationLoading(false);
            }
          },
          error => {
            console.error('Error getting location:', error);
            alert('Unable to fetch your current location.');
            setCurrentLocationLoading(false);
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
        );
      } catch (error) {
        console.error('Geolocation error:', error);
        setCurrentLocationLoading(false);
      }
      return; // already cleared everything
    }

    // 📌 NORMAL item selection (not location)
    setValue(item?.name);
    onSelect(item);

    setTimeout(() => {
      setResults([]);
    }, 100);

    Keyboard.dismiss();
  };

  const [displayResults, setDisplayResults] = useState([]);

  useEffect(() => {
    if (showCurrentLocationOption && results.length > 0) {
      setDisplayResults([
        { isCurrentLocation: true, name: '📍 Use My Current Location' },
        ...results,
      ]);
    } else {
      setDisplayResults(results);
    }
  }, [results, showCurrentLocationOption]);
  const handleChangeTexts = async value => {
    console.log('@handleChangeTexts value', value);
    setUpdateResults(true);
    setValue(value);
  };
  return (
    <View style={{ flex: 1 }}>
      <Autocomplete
        onFocus={onFocus}
        data={displayResults}
        value={value}
        onChangeText={value => handleChangeTexts(value)}
        placeholder={placeholder}
        listContainerStyle={styles.listContainerStyle}
        listStyle={styles.listStyle}
        inputContainerStyle={styles.inputContainerStyle}
        style={{ backgroundColor: ColorStyles.inputBackgroundColor }}
        flatListProps={{
          keyExtractor: (_, index) => index.toString(),
          keyboardShouldPersistTaps: 'handled',
          renderItem: ({ item }) => (
            <TouchableOpacity
              onPress={() => {
                handleSelect(item);
                // to cleare list of suggestion in auto completes
                setUpdateResults(false);
              }}
              style={[
                styles.item,
                item.isCurrentLocation && { backgroundColor: '#e0f7fa' },
              ]}
              disabled={currentLocationLoading && item.isCurrentLocation}
            >
              {item.isCurrentLocation ? (
                currentLocationLoading ? (
                  <ActivityIndicator
                    size="small"
                    color={ColorStyles.brandColor}
                  />
                ) : (
                  <Text style={{ fontWeight: 'bold' }}>{item?.name}</Text>
                )
              ) : (
                <Text>{item?.name}</Text>
              )}
            </TouchableOpacity>
          ),
        }}
      />

      {loading && (
        <View style={{ marginTop: 20, position: 'absolute' }}>
          <ActivityIndicator size="small" color={ColorStyles.brandColor} />
        </View>
      )}
    </View>
  );
};

export default OSMAutocomplete;
