import { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import GlobalStyles from '../../GlobalStyles/GlobalStyles';
import store from '../../Redux/Store/Store';
import { addSelectedVechelesType } from '../../Redux/slices/PassengerSlice';
import EachVehicles from './EachVehicles';
import ButtonNavigateToScreens from '../Buttons/ButtonNavigateToScreens/ButtonNavigateToScreens';
import BackArrow from '../BackArrow/BackArrow';
import getAppsGlobalStyles from '../../GlobalStyles/AppsGlobalStyles';
function SelectListOfVechels({ navigation, setShowComponent }) {
  const GlobalStyles = getAppsGlobalStyles();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const passengerSlices = useSelector(state => state?.passengerSlices);
  const passengerStatus = passengerSlices?.passengerStatus;
  const originLocation = passengerSlices?.originLocation,
    destination = passengerSlices?.destination;

  // update selectedVehicle in redux
  useEffect(() => {
    store.dispatch(addSelectedVechelesType(selectedVehicle));
  }, [selectedVehicle]);
  const listOfVehiclesType = passengerSlices?.listOfVehiclesType;
  console.log('@listOfVehiclesType', listOfVehiclesType);
  useEffect(() => {
    if (listOfVehiclesType) setSelectedVehicle(listOfVehiclesType?.at(0));
  }, [listOfVehiclesType]);
  const selectDestinationAndOrigin = () => {
    navigation.navigate('Pick up and destination');
  };

  const renderItem = ({ item, index }) => {
    return (
      <EachVehicles
        originLocation={originLocation}
        destination={destination}
        navigation={null}
        key={index}
        item={item}
        selectedVehicle={selectedVehicle}
        setSelectedVehicle={setSelectedVehicle}
      />
    );
  };

  if (listOfVehiclesType?.length == 0 || !listOfVehiclesType)
    return (
      <View
        style={{
          paddingTop: '120',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={GlobalStyles.errorText}>
          Sorry no Vehicle types are found
        </Text>
      </View>
    );

  return (
    <ScrollView>
      <View style={{ ...GlobalStyles.container, marginTop: 90 }}>
        <View style={{ padding: 20 }}>
          <BackArrow
            showComponent={'Shipping Detailes'}
            setShowComponent={setShowComponent}
            navigateTo="Shipping Detailes"
            description={'Select vehicle types'}
          />
          {listOfVehiclesType?.map((item, index) =>
            renderItem({ item, index }),
          )}

          {!(originLocation || destination) ? (
            <TouchableOpacity
              onPress={selectDestinationAndOrigin}
              style={GlobalStyles.button}
            >
              <Text style={GlobalStyles.buttonText}>
                select destination and origin
              </Text>
            </TouchableOpacity>
          ) : passengerStatus == null ? (
            <TouchableOpacity
              style={GlobalStyles.button}
              onPress={() => {
                setShowComponent('Find Driver');
                // navigation.navigate('Find Driver');
              }}
            >
              <Text style={GlobalStyles.buttonText}>Find Driver</Text>
            </TouchableOpacity>
          ) : (
            <ButtonNavigateToScreens />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

export default SelectListOfVechels;
