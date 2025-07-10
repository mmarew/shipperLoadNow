import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import PickupAndDestinationDisplayer from '../../Components/PickUpAndDestination/PickupAndDestinationDisplayer';
import PassangerMap from '../../Components/PassangerMap/PassangerMap';
import DriverInfo from '../../Components/DriverInfo/DriverInfo';
import { useSelector } from 'react-redux';
import styles from './IncomingDriver.style';
import { Text } from 'react-native-paper';
import GlobalStyles from '../../GlobalStyles/GlobalStyles';
import ShowShippableItems from '../../Components/ShowShippableItems/ShowShippableItems';
import ColorStyles from '../../GlobalStyles/Color.styles';
const Journey = ({ navigation, setShowComponent }) => {
  const passengerSlices = useSelector(state => state?.passengerSlices);
  const { destination, originLocation } = passengerSlices;
  const passengerStatus = passengerSlices?.passengerStatus;
  const listofJourneyStatus = passengerSlices?.listofJourneyStatus;
  const handleCancelRequest = async () => {
    setShowComponent('cancel request');
    // navigation.navigate('cancel request');
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <PassangerMap mapHeight={0.7} navigation={navigation} />
        <View
          style={{
            paddingHorizontal: 20,
            backgroundColor: ColorStyles.whiteBGColor,
            borderRadius: 20,
            gap: 10,
          }}
        >
          {(passengerStatus == listofJourneyStatus?.acceptedByDriver ||
            passengerStatus == listofJourneyStatus?.acceptedByPassenger ||
            passengerStatus == listofJourneyStatus?.journeyStarted) && (
            <>
              <DriverInfo navigation={navigation} />
              <View
                style={{ borderWidth: 1, borderColor: ColorStyles.borderColor }}
              >
                <ShowShippableItems />
              </View>
            </>
          )}
          <View
            style={{ borderWidth: 1, borderColor: ColorStyles.borderColor }}
          >
            <PickupAndDestinationDisplayer
              navigateTo="Pick up and destination"
              navigation={navigation}
              listOfJourneyPoints={[{ origin: originLocation, destination }]}
            />
          </View>

          {passengerStatus <= listofJourneyStatus?.acceptedByPassenger && (
            <TouchableOpacity
              onPress={handleCancelRequest}
              style={{
                ...GlobalStyles.button,
                backgroundColor: ColorStyles.errorColor,
              }}
            >
              <Text style={{ ...GlobalStyles.buttonText }}>Cancel Request</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Journey;
