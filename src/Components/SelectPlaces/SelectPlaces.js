// import React, {useEffect, useState} from 'react';
// import {Button, View} from 'react-native';
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// import {useDispatch, useSelector} from 'react-redux';
// import styles from './Styles';

// import {GOOGLE_API_KEY} from '@env';
// import store from '../../Redux/Store/Store';
// import {updatePassengerStatus} from '../../Redux/slices/PassengerSlice';

// const SelectPlaces = ({navigation}) => {
//   const dispatch = useDispatch();
//   const passengerData = useSelector(state => state.passenger);
//   const {originLocation, destination} = passengerData;
//   const [originInputText, setOriginInputText] = useState(
//     originLocation?.description || '',
//   );
//   const [destinationInputText, setDestinationInputText] = useState(
//     destination?.description || '',
//   );

//   useEffect(() => {
//     if (originLocation?.description) {
//       setOriginInputText(originLocation.description);
//     }
//   }, [originLocation]);

//   useEffect(() => {
//     if (destination?.description) {
//       setDestinationInputText(destination.description);
//     }
//   }, [destination]);

//   const handleLocationSelect = (data, details, isOrigin = true) => {
//     const {description} = data || {};
//     if (details?.geometry?.location) {
//       const {lat, lng} = details.geometry.location;
//       const locationData = {
//         latitude: lat,
//         longitude: lng,
//         description,
//       };
//       if (isOrigin) {
//         dispatch(addOriginLocation(locationData));
//         setOriginInputText(description); // Update input text with selected place
//       } else {
//         dispatch(addDestinationLocation(locationData));
//         setDestinationInputText(description); // Update input text with selected place
//       }
//     }
//   };

//   const handleOriginTextChange = text => {
//     setOriginInputText(text);
//   };

//   const handleDestinationTextChange = text => {
//     setDestinationInputText(text);
//     if (originLocation?.description) {
//       setOriginInputText(originLocation.description);
//     }
//   };

//   useEffect(() => {
//     setDestinationInputText('');
//   }, []);

//   return (
//     <View style={styles.container}>
//       <GooglePlacesAutocomplete
//         suppressDefaultStyles={true}
//         placeholder="Your origin?"
//         query={{key: GOOGLE_API_KEY, language: 'en'}}
//         styles={{...styles.placesAutocomplete, ...styles.originAutoComplete}}
//         fetchDetails={true}
//         enableHighAccuracyLocation={true}
//         nearbyPlacesAPI="GooglePlacesSearch"
//         debounce={300}
//         textInputProps={{
//           onChangeText: handleOriginTextChange,
//           value: originInputText, // Use the input text state
//         }}
//         onPress={(data, details) => {
//           handleLocationSelect(data, details, true);
//         }}
//       />

//       <GooglePlacesAutocomplete
//         suppressDefaultStyles={true}
//         placeholder="Search your destination .... ?"
//         query={{key: GOOGLE_API_KEY, language: 'en'}}
//         styles={{
//           ...styles.placesAutocomplete,
//           ...styles.destinationAutoComplete,
//         }}
//         fetchDetails={true}
//         enableHighAccuracyLocation={true}
//         nearbyPlacesAPI="GooglePlacesSearch"
//         debounce={300}
//         textInputProps={{
//           onChangeText: handleDestinationTextChange,
//           value: destinationInputText, // Use the input text state
//         }}
//         onPress={(data, details) => {
//           handleLocationSelect(data, details, false);
//         }}
//       />
//       {(!destination || !originLocation) && (
//         <View style={styles.buttonContainer}>
//           <Button
//             style={styles.buttonBack}
//             title="Back To Home"
//             onPress={() => store.dispatch(updatePassengerStatus(null))} // Handle navigation
//           />
//         </View>
//       )}
//     </View>
//   );
// };

// export default SelectPlaces;
