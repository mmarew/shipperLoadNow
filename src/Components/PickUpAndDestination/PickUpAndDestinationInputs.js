import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
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
import OSMAutocomplete from '../OSMAutocomplete/OSMAutocomplete';
import RecentSearches from '../RecentSearches/RecentSearches';
import BackArrow from '../BackArrow/BackArrow';
import IconAwesome from '../Common/CustomFontAwesome/IconAwesome';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
import getAppsGlobalStyles from '../../GlobalStyles/AppsGlobalStyles';
import createStyles from './Styles';

const PickUpAndDestinationInputs = ({ navigation, setShowComponent }) => {
  const GlobalStyles = getAppsGlobalStyles();
  const styles = createStyles();
  const ColorStyles = getAppsColorStyles();
  const originInputRef = useRef(null);
  const destinationInputRef = useRef(null);
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

  const focusInput = useCallback(type => {
    if (type === 'origin') {
      originInputRef.current?.focus();
      setActiveInput('origin');
    } else {
      destinationInputRef.current?.focus();
      setActiveInput('destination');
    }
  }, []);

  const renderInputField = useCallback(
    (type, customStyles) => {
      const isOrigin = type === 'origin';
      const inputValue = isOrigin ? originInput : destinationInput;

      const clearIconTop = isOrigin ? 25 : 30;

      return (
        <View
          style={[
            styles.locationCard,
            { ...customStyles, height: 80 },
            GlobalStyles.reset,
          ]}
        >
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
            style={{
              position: 'relative',
            }}
          >
            <View
              style={{
                position: 'absolute',
                top: 43,
                left: 20,
              }}
            >
              <IconAwesome
                name="circle"
                color={ColorStyles.brandColor}
                size={10}
              />
            </View>
            <View style={{ paddingLeft: 40, paddingVertical: 15 }}>
              <Text style={styles.label}>{isOrigin ? 'From' : 'To'}</Text>
              <OSMAutocomplete
                refProps={isOrigin ? originInputRef : destinationInputRef}
                onSelect={handleLocationSelect(type)}
                placeholder={`Enter ${
                  isOrigin ? 'pickup' : 'destination'
                } location`}
                value={inputValue}
                setValue={isOrigin ? setOriginInput : setDestinationInput}
                onFocus={value => setActiveInput(value ? type : null)}
              />
            </View>
          </View>
        </View>
      );
    },
    [originInput, destinationInput, handleLocationSelect, handleClearLocation],
  );

  const renderContent = useMemo(() => {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, height: 250 }}>
          <BackArrow
            setShowComponent={setShowComponent}
            navigateTo="Home"
            description="Set Pickup"
          />
          <View
            style={{
              backgroundColor: ColorStyles.whiteBGColor,
              borderRadius: 10,
              ...GlobalStyles.reset,
            }}
          >
            {renderInputField('origin', {
              borderBottomWidth: 1,

              borderColor: ColorStyles.borderColor,
              ...GlobalStyles.reset,
              zIndex: 11,
              backgroundColor:
                activeInput === 'origin'
                  ? ColorStyles.autocompleteFocused
                  : 'transparent',
            })}

            {renderInputField('destination', {
              ...GlobalStyles.reset,
              zIndex: 10,
              marginTop: -20,
              marginBottom: -1,
              borderBottomRightRadius: 25,
              backgroundColor:
                activeInput === 'destination'
                  ? ColorStyles.autocompleteFocused
                  : 'transparent',
            })}
          </View>
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
