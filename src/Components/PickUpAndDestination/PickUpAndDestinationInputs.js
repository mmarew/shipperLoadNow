import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import {
  addDestinationLocation,
  addOriginLocation,
} from '../../Redux/slices/PassengerSlice';
import styles from './Styles';
import OSMAutocomplete from '../OSMAutocomplete/OSMAutocomplete';
import ButtonNavigateToScreens from '../Buttons/ButtonNavigateToScreens/ButtonNavigateToScreens';
import GlobalStyles from '../../GlobalStyles/GlobalStyles';
import RecentSearches from '../RecentSearches/RecentSearches';
import BackArrow from '../BackArrow/BackArrow';
import ColorStyles from '../../GlobalStyles/Color.styles';

const PickUpAndDestinationInputs = ({ navigation, setShowComponent }) => {
  const dispatch = useDispatch();
  const passengerSlices = useSelector(state => state.passengerSlices);
  const { originLocation, destination, passengerStatus } = passengerSlices;
  const [activeInput, setActiveInput] = useState(null);

  const [originInput, setOriginInput] = useState(
    originLocation?.description || '',
  );
  const [destinationInput, setDestinationInput] = useState(
    destination?.description || '',
  );

  useEffect(() => {
    setOriginInput(originLocation?.description || '');
    setDestinationInput(destination?.description || '');
  }, [originLocation, destination]);

  const handleOriginSelect = location => {
    setOriginInput(location.name);
    dispatch(
      addOriginLocation({
        latitude: location.latitude,
        longitude: location.longitude,
        description: location.name,
      }),
    );
  };

  const handleDestinationSelect = location => {
    setDestinationInput(location.name);
    dispatch(
      addDestinationLocation({
        latitude: location.latitude,
        longitude: location.longitude,
        description: location.name,
      }),
    );
  };

  const handleClearOrigin = () => {
    setOriginInput('');
    dispatch(addOriginLocation(null));
  };

  const handleClearDestination = () => {
    setDestinationInput('');
    dispatch(addDestinationLocation(null));
  };
  const handleRecentSelect = location => {
    console.log(
      '@location ==========> ',
      location,
      '\nactiveInput ======>',
      activeInput,
    );
    if (activeInput === 'origin') {
      setOriginInput(location.name);
      dispatch(
        addOriginLocation({
          latitude: Number(location.latitude),
          longitude: Number(location.longitude),
          description: location.name,
        }),
      );
    } else if (activeInput === 'destination') {
      setDestinationInput(location.name);
      dispatch(
        addDestinationLocation({
          latitude: Number(location.latitude),
          longitude: Number(location.longitude),
          description: location.name,
        }),
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, top: 90, backgroundColor: ColorStyles.backgroundColor }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          {/* Scrollable Content */}
          <FlatList
            data={[{ key: 'content' }]} // Dummy data
            renderItem={() => (
              <View style={{ flex: 1 }}>
                {passengerStatus === null ? (
                  <View style={styles.container}>
                    <View style={{ flex: 1, height: 220 }}>
                      {/* Header */}
                      <BackArrow
                        setShowComponent={setShowComponent}
                        navigateTo={'Home'}
                        description={'Set Pickup'}
                      />
                      {/* ORIGIN INPUT */}
                      <View style={styles.locationCard}>
                        <Text style={styles.label}>From</Text>
                        <View style={styles.cardInputRow}>
                          <Ionicons
                            name="location-sharp"
                            size={20}
                            color="#3498db"
                            style={styles.iconLeft}
                          />
                        </View>
                      </View>

                      {originInput !== '' && (
                        <TouchableOpacity
                          style={styles.clearIcon}
                          onPress={handleClearOrigin}
                        >
                          <Ionicons
                            name="close-circle"
                            size={20}
                            color="#999"
                          />
                        </TouchableOpacity>
                      )}

                      <View style={styles.autocompleteWrapper}>
                        <OSMAutocomplete
                          onSelect={handleOriginSelect}
                          placeholder="Enter pickup location"
                          value={originInput}
                          setValue={setOriginInput}
                          onFocus={() => setActiveInput('origin')} // ✅ Set active input
                        />
                      </View>

                      {/* DESTINATION INPUT */}
                      <View
                        style={{ ...styles.locationCard, top: 160, zIndex: 9 }}
                      >
                        <Text style={styles.label}>To</Text>
                        <View style={styles.cardInputRow}>
                          <Ionicons
                            name="location-sharp"
                            size={20}
                            color="#3498db"
                            style={styles.iconLeft}
                          />
                        </View>
                      </View>

                      {destinationInput !== '' && (
                        <TouchableOpacity
                          onPress={handleClearDestination}
                          style={{ ...styles.clearIcon, top: 160 }}
                        >
                          <Ionicons
                            name="close-circle"
                            size={20}
                            color="#999"
                          />
                        </TouchableOpacity>
                      )}

                      <View
                        style={{
                          ...styles.autocompleteWrapper,
                          zIndex: 8,
                          position: 'absolute',
                          top: 140,
                          width: '100%',
                        }}
                      >
                        <OSMAutocomplete
                          onSelect={handleDestinationSelect}
                          placeholder="Enter destination"
                          value={destinationInput}
                          setValue={setDestinationInput}
                          onFocus={() => setActiveInput('destination')} // ✅ Set active input
                          borderStyles={{
                            borderBottomEndRadius: 20,
                            borderBottomStartRadius: 10,
                          }}
                        />
                      </View>
                    </View>

                    {/* RECENT SEARCHES */}

                    <RecentSearches onRecentSelect={handleRecentSelect} />
                  </View>
                ) : (
                  <ButtonNavigateToScreens />
                )}
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 140 }} // Space for button
            keyboardShouldPersistTaps="handled"
          />

          {/* Fixed Bottom Button */}
          {originInput && destinationInput && (
            <View
              style={{
                position: 'absolute',
                bottom: 5,
                left: 20,
                right: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setShowComponent('Shipping Detailes');
                  console.log('@click on button');
                }}
                style={{
                  ...GlobalStyles.button,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ ...GlobalStyles.buttonText }}>Next</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default PickUpAndDestinationInputs;
