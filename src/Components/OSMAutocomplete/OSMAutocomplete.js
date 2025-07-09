// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ActivityIndicator,
//   Keyboard,
// } from 'react-native';
// import Autocomplete from 'react-native-autocomplete-input';
// import styles from './OSMAutocomplete.style';
// import Geolocation from 'react-native-geolocation-service';
// import {
//   NOMINATIM_REVERSE_URL,
//   NOMINATIM_SEARCH_URL,
// } from '../Constants/constant.url';
// import errorHandler from '../../utils/errorHandler/errorHandler';
// import axios from 'axios';
// import ColorStyles from '../../GlobalStyles/Color.styles';
// import { debounce } from 'lodash';

// const OSMAutocomplete = ({
//   onSelect,
//   placeholder = 'Search',
//   value,
//   setValue,
//   showCurrentLocationOption = true,
//   onFocus,
// }) => {
//   // controll results and its updater
//   const [updateResults, setUpdateResults] = useState(false);
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentLocationLoading, setCurrentLocationLoading] = useState(false);
//   const [selected, setSelected] = useState(false);
//   const [errors, setErrors] = useState(false);
//   //

//   useEffect(() => {
//     if (!updateResults) {
//       setResults([]);
//       return;
//     }
//     setSelected(false);

//     const trimmed = value?.trim();
//     if (!trimmed || trimmed.length < 3) {
//       setResults([]);
//       setErrors('type at least 3 characters to search');
//       return;
//     }

//     const debouncedSearch = debounce(async () => {
//       setLoading(true);
//       setErrors(null);
//       try {
//         const response = await axios.get(NOMINATIM_SEARCH_URL, {
//           params: {
//             q: trimmed,
//             format: 'json',
//             addressdetails: 10,
//             limit: 15,
//             countrycodes: 'et', // Ethiopia only
//             'accept-language': 'en,am',
//           },
//           headers: {
//             'User-Agent': 'YourAppName/1.0 (mmarew1p@gmail.com)', // Required!
//           },
//         });

//         const parsed = response.data.map(item => ({
//           name: item.display_name,
//           latitude: Number(item.lat),
//           longitude: Number(item.lon),
//           full: item,
//         }));
//         setResults(parsed);
//         if (parsed.length === 0) {
//           console.log('No results found');
//           // You can also display a message to the user here
//           setErrors('No results found');
//         }
//       } catch (error) {
//         setErrors(errorHandler(error));
//         console.error(
//           'Nominatim error:',
//           error.response?.data || error.message,
//         );
//         setResults([]);
//       } finally {
//         setLoading(false);
//       }
//     }, 500);

//     // Call it in your useEffect
//     debouncedSearch(trimmed);
//   }, [value]);

//   const handleSelect = async item => {
//     if (selected) return;
//     setSelected(true);

//     if (item.isCurrentLocation) {
//       // 🧹 IMMEDIATELY clear results and dismiss keyboard when user taps
//       setResults([]);
//       Keyboard.dismiss();

//       try {
//         setCurrentLocationLoading(true);

//         Geolocation.getCurrentPosition(
//           async position => {
//             const { latitude, longitude } = position.coords;

//             try {
//               const reverseResponse = await axios.get(NOMINATIM_REVERSE_URL, {
//                 params: {
//                   lat: latitude,
//                   lon: longitude,
//                   format: 'json',
//                   countrycodes: 'et,dj', // Ethiopia & Djibouti only
//                   'accept-language': 'en,am',
//                 },
//                 headers: {
//                   'User-Agent': 'YourAppName/1.0 (mmarew11@gmail.com)', // Required!
//                 },
//               });

//               const reverseData = reverseResponse.data;
//               const address = reverseData.display_name || 'Current Location';

//               setValue(address);
//               onSelect({
//                 name: address,
//                 latitude,
//                 longitude,
//                 full: { latitude, longitude, address: reverseData },
//               });
//             } catch (reverseError) {
//               console.error(
//                 'Reverse geocoding error:',
//                 errorHandler(reverseError),
//               );
//               setValue('Current Location');
//               onSelect({
//                 name: 'Current Location',
//                 latitude,
//                 longitude,
//                 full: { latitude, longitude },
//               });
//             } finally {
//               setCurrentLocationLoading(false);
//             }
//           },
//           error => {
//             console.error('Error getting location:', error);
//             alert('Unable to fetch your current location.');
//             setCurrentLocationLoading(false);
//           },
//           { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
//         );
//       } catch (error) {
//         console.error('Geolocation error:', error);
//         setCurrentLocationLoading(false);
//       }
//       return; // already cleared everything
//     }

//     // 📌 NORMAL item selection (not location)
//     setValue(item?.name);
//     onSelect(item);

//     setTimeout(() => {
//       setResults([]);
//     }, 100);

//     Keyboard.dismiss();
//   };

//   // const [displayResults, setDisplayResults] = useState([]);

//   // useEffect(() => {
//   //   if (showCurrentLocationOption && results.length > 0) {
//   //     setDisplayResults([
//   //       { isCurrentLocation: true, name: '📍 Use My Current Location' },
//   //       ...results,
//   //     ]);
//   //   } else {
//   //     setDisplayResults(results);
//   //   }
//   // }, [results, showCurrentLocationOption]);

//   // Optimized - use useMemo
//   const displayResults = useMemo(() => {
//     return showCurrentLocationOption && results.length > 0
//       ? [
//           { isCurrentLocation: true, name: '📍 Use My Current Location' },
//           ...results,
//         ]
//       : results;
//   }, [results, showCurrentLocationOption]);

//   const handleChangeTexts = async value => {
//     console.log('@handleChangeTexts value', value);
//     setUpdateResults(true);
//     setValue(value);
//   };
//   return (
//     <View style={{ flex: 1 }}>
//       <Autocomplete
//         onFocus={onFocus}
//         data={displayResults}
//         value={value}
//         onChangeText={value => handleChangeTexts(value)}
//         placeholder={placeholder}
//         listContainerStyle={styles.listContainerStyle}
//         listStyle={styles.listStyle}
//         inputContainerStyle={styles.inputContainerStyle}
//         style={{
//           backgroundColor: ColorStyles.inputBackgroundColor,
//           color: ColorStyles.textColor,
//         }}
//         flatListProps={{
//           keyExtractor: (_, index) => index.toString(),
//           keyboardShouldPersistTaps: 'handled',
//           renderItem: ({ item }) => (
//             <TouchableOpacity
//               onPress={() => {
//                 handleSelect(item);
//                 // to cleare list of suggestion in auto completes
//                 setUpdateResults(false);
//               }}
//               style={[
//                 styles.item,
//                 item.isCurrentLocation && { backgroundColor: '#e0f7fa' },
//               ]}
//               disabled={currentLocationLoading && item.isCurrentLocation}
//             >
//               {item.isCurrentLocation ? (
//                 currentLocationLoading ? (
//                   <ActivityIndicator
//                     size="small"
//                     color={ColorStyles.brandColor}
//                   />
//                 ) : (
//                   <Text style={{ fontWeight: 'bold' }}>{item?.name}</Text>
//                 )
//               ) : (
//                 <Text>{item?.name}</Text>
//               )}
//             </TouchableOpacity>
//           ),
//         }}
//       />
//       {errors && (
//         <Text
//           style={{
//             color: 'red',
//             position: 'absolute',
//             top: 70,
//             zIndex: 100,
//             paddingLeft: 40,
//           }}
//         >
//           {errors}
//         </Text>
//       )}
//       {loading && (
//         <View style={{ marginTop: 20, position: 'absolute', right: 40 }}>
//           <ActivityIndicator
//             size="small"
//             color={ColorStyles.textColor}
//             style={{ transform: [{ scale: 2.0 }] }} // Scale up the spinner
//           />
//         </View>
//       )}
//     </View>
//   );
// };

// export default OSMAutocomplete;

import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
import { debounce } from 'lodash';

const OSMAutocomplete = ({
  onSelect,
  placeholder = 'Search',
  value,
  setValue,
  showCurrentLocationOption = true,
  onFocus,
}) => {
  const [results, setResults] = useState([]);
  const [loadingState, setLoadingState] = useState({
    search: false,
    currentLocation: false,
  });
  const [focusOnInput, setFocusOnInput] = useState(false);
  const [selected, setSelected] = useState(false);
  const [errors, setErrors] = useState(null);

  const displayResults = useMemo(() => {
    return showCurrentLocationOption && results.length > 0
      ? [
          { isCurrentLocation: true, name: '📍 Use My Current Location' },
          ...results,
        ]
      : results;
  }, [results, showCurrentLocationOption]);

  const handleError = useCallback((error, context) => {
    const message = errorHandler(error);
    console.error(`${context} error:`, message);
    setErrors(message);
    if (context === 'search') {
      setResults([]);
    }
  }, []);

  const handleCurrentLocation = useCallback(async () => {
    setLoadingState(prev => ({ ...prev, currentLocation: true }));
    setResults([]);
    Keyboard.dismiss();

    try {
      const position = await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 1000,
        });
      });

      const { latitude, longitude } = position.coords;

      try {
        const reverseResponse = await axios.get(NOMINATIM_REVERSE_URL, {
          params: {
            lat: latitude,
            lon: longitude,
            format: 'json',
            countrycodes: 'et,dj',
            'accept-language': 'en,am',
          },
          headers: {
            'User-Agent': 'YourAppName/1.0 (mmarew11@gmail.com)',
          },
        });

        const name = reverseResponse.data.display_name || 'Current Location';
        setValue(name);
        onSelect({
          name,
          latitude,
          longitude,
          full: { latitude, longitude, address: reverseResponse.data },
        });
      } catch (reverseError) {
        setValue('Current Location');
        onSelect({
          name: 'Current Location',
          latitude,
          longitude,
          full: { latitude, longitude },
        });
      }
    } catch (error) {
      handleError(error, 'geolocation');
    } finally {
      setLoadingState(prev => ({ ...prev, currentLocation: false }));
    }
  }, [onSelect, setValue, handleError]);

  const handleSelect = useCallback(
    async item => {
      console.log('@handleSelect item:', item);
      if (selected) return;
      setSelected(true);

      if (item.isCurrentLocation) {
        await handleCurrentLocation();
        return;
      }

      setValue(item?.name);
      onSelect(item);
      setResults([]);
      Keyboard.dismiss();
    },
    [selected, handleCurrentLocation, onSelect, setValue],
  );

  const searchLocations = useCallback(
    async query => {
      setLoadingState(prev => ({ ...prev, search: true }));
      setErrors(null);

      try {
        const response = await axios.get(NOMINATIM_SEARCH_URL, {
          params: {
            q: query,
            format: 'json',
            addressdetails: 10,
            limit: 15,
            countrycodes: 'et',
            'accept-language': 'en,am',
          },
          headers: {
            'User-Agent': 'YourAppName/1.0 (mmarew1p@gmail.com)',
          },
        });

        const parsed = response.data.map(item => ({
          name: item.display_name,
          latitude: Number(item.lat),
          longitude: Number(item.lon),
          full: item,
        }));

        setResults(parsed);
        if (parsed.length === 0) {
          setErrors('No results found');
        }
      } catch (error) {
        handleError(error, 'search');
      } finally {
        setLoadingState(prev => ({ ...prev, search: false }));
      }
    },
    [handleError],
  );

  const debouncedSearch = useMemo(
    () => debounce(searchLocations, 500),
    [searchLocations],
  );

  const handleChangeTexts = useCallback(
    text => {
      setValue(text);
      const trimmed = text.trim();

      if (!trimmed || trimmed.length < 3) {
        setResults([]);
        setErrors('Type at least 3 characters to search');
        return;
      }
      setSelected(false);
      debouncedSearch(trimmed);
    },
    [debouncedSearch, setValue],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <View style={{ flex: 1 }}>
      <Autocomplete
        onFocus={() => {
          setFocusOnInput(true);
          onFocus();
        }}
        onBlur={() => setFocusOnInput(false)}
        data={displayResults}
        value={value}
        onChangeText={handleChangeTexts}
        placeholder={placeholder}
        listContainerStyle={styles.listContainerStyle}
        listStyle={styles.listStyle}
        inputContainerStyle={[
          styles.inputContainerStyle,
          focusOnInput && { backgroundColor: ColorStyles.autocompleteFocused },
        ]}
        style={[
          styles.inputStyle,
          focusOnInput && { backgroundColor: ColorStyles.autocompleteFocused },
        ]}
        flatListProps={{
          keyExtractor: (item, index) =>
            `${item.isCurrentLocation ? 'current' : item.name}-${index}`,
          keyboardShouldPersistTaps: 'always',
          initialNumToRender: 5,
          maxToRenderPerBatch: 5,
          windowSize: 5,
          renderItem: ({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              style={[
                styles.item,
                item.isCurrentLocation && { backgroundColor: '#e0f7fa' },
              ]}
              disabled={loadingState.currentLocation && item.isCurrentLocation}
            >
              {item.isCurrentLocation ? (
                loadingState.currentLocation ? (
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
      {errors && <Text style={styles.errorText}>{errors}</Text>}
      {loadingState.search && (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator
            size="small"
            color={ColorStyles.textColor}
            style={{ transform: [{ scale: 2.0 }] }}
          />
        </View>
      )}
    </View>
  );
};

export default OSMAutocomplete;
