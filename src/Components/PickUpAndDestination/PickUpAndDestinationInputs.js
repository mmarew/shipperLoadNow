import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import {
  addDestinationLocation,
  addOriginLocation,
} from '../../Redux/slices/PassengerSlice';
import styles from './Styles';
import OSMAutocomplete from '../OSMAutocomplete/OSMAutocomplete';
import GlobalStyles from '../../GlobalStyles/GlobalStyles';
import RecentSearches from '../RecentSearches/RecentSearches';
import BackArrow from '../BackArrow/BackArrow';
import ColorStyles from '../../GlobalStyles/Color.styles';
import IconAwesome from '../Common/CustomFontAwesome/IconAwesome';

const PickUpAndDestinationInputs = ({ navigation, setShowComponent }) => {
  const dispatch = useDispatch();
  const { originLocation, destination, passengerStatus } = useSelector(
    state => state.passengerSlices,
  );
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

  const handleLocationSelect = useCallback(
    type => location => {
      const action =
        type === 'origin' ? addOriginLocation : addDestinationLocation;
      const setInput = type === 'origin' ? setOriginInput : setDestinationInput;

      setInput(location.name);
      dispatch(
        action({
          latitude: location.latitude,
          longitude: location.longitude,
          description: location.name,
        }),
      );
    },
    [dispatch],
  );

  const handleClearLocation = useCallback(
    type => () => {
      const action =
        type === 'origin' ? addOriginLocation : addDestinationLocation;
      const setInput = type === 'origin' ? setOriginInput : setDestinationInput;

      setInput('');
      dispatch(action(null));
    },
    [dispatch],
  );

  const handleRecentSelect = useCallback(
    location => {
      if (!activeInput) return;

      const action =
        activeInput === 'origin' ? addOriginLocation : addDestinationLocation;
      const setInput =
        activeInput === 'origin' ? setOriginInput : setDestinationInput;

      setInput(location.name);
      dispatch(
        action({
          latitude: Number(location.latitude),
          longitude: Number(location.longitude),
          description: location.name,
        }),
      );
    },
    [activeInput, dispatch],
  );

  const handleNextPress = useCallback(() => {
    setShowComponent('Shipping Detailes');
  }, [setShowComponent]);

  const renderInputField = useCallback(
    type => {
      const isOrigin = type === 'origin';
      const inputValue = isOrigin ? originInput : destinationInput;
      const topPosition = isOrigin ? 20 : 100;
      const clearIconTop = isOrigin ? 20 : 100;
      const zIndex = isOrigin ? 9010 : 900;

      return (
        <View>
          <View style={[styles.locationCard, { top: topPosition, zIndex }]}>
            <Text style={styles.label}>{isOrigin ? 'From' : 'To'}</Text>
            <View style={styles.cardInputRow}>
              <IconAwesome
                name="map-marker"
                color={ColorStyles.brandColor}
                size={20}
              />
            </View>
          </View>

          {inputValue !== '' && (
            <TouchableOpacity
              onPress={handleClearLocation(type)}
              style={[styles.clearIcon, { top: clearIconTop }]}
            >
              <IconAwesome
                name="times-circle"
                color={ColorStyles.brandColor}
                size={20}
              />
            </TouchableOpacity>
          )}

          <View
            style={
              isOrigin
                ? styles.pickupInputContainer
                : styles.destinationInputContainer
            }
          >
            <OSMAutocomplete
              onSelect={handleLocationSelect(type)}
              placeholder={`Enter ${
                isOrigin ? 'pickup' : 'destination'
              } location`}
              value={inputValue}
              setValue={isOrigin ? setOriginInput : setDestinationInput}
              onFocus={() => setActiveInput(type)}
              borderStyles={
                !isOrigin
                  ? {
                      borderBottomEndRadius: 20,
                      borderBottomStartRadius: 10,
                    }
                  : undefined
              }
            />
          </View>
        </View>
      );
    },
    [originInput, destinationInput, handleLocationSelect, handleClearLocation],
  );

  const renderContent = useMemo(() => {
    // if (passengerStatus !== null) {
    //   return <ButtonNavigateToScreens />;
    // }

    return (
      <View style={styles.container}>
        <View style={{ flex: 1, height: 220 }}>
          <BackArrow
            setShowComponent={setShowComponent}
            navigateTo="Home"
            description="Set Pickup"
          />
          {renderInputField('origin')}
          {renderInputField('destination')}
        </View>
        <RecentSearches onRecentSelect={handleRecentSelect} />
      </View>
    );
  }, [passengerStatus, renderInputField, handleRecentSelect, setShowComponent]);

  const nextButton = useMemo(() => {
    if (!originInput || !destinationInput) return null;

    return (
      <View
        style={{
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 75 : 10,
          left: 20,
          right: 20,
        }}
      >
        <TouchableOpacity
          onPress={handleNextPress}
          style={{
            ...GlobalStyles.button,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={GlobalStyles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }, [originInput, destinationInput, handleNextPress]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, top: 90, backgroundColor: ColorStyles.backgroundColor }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={[{ key: 'content' }]}
            renderItem={() => <View style={{ flex: 1 }}>{renderContent}</View>}
            contentContainerStyle={{ paddingBottom: 140 }}
            keyboardShouldPersistTaps="handled"
          />
          {nextButton}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default React.memo(PickUpAndDestinationInputs);
