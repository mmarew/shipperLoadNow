import React, { useEffect, useState } from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import styles from './DriverInfo.style';
import { useSelector } from 'react-redux';
import GlobalStyles from '../../GlobalStyles/GlobalStyles';
import store from '../../Redux/Store/Store';
import { setModalVisible } from '../../Redux/slices/PassengerSlice';
import getDistanceAndETA from '../../utils/GetDistanceAndETA/getDistanceAndETA';
import DiverCard from './DiverCard';
import ColorStyles from '../../GlobalStyles/Color.styles';
const DriverInfo = ({}) => {
  const passengerSlices = useSelector(state => state.passengerSlices);
  const listofJourneyStatus = passengerSlices?.listofJourneyStatus;
  const passengerStatus = passengerSlices?.passengerStatus;
  const passenger = passengerSlices?.passenger;
  const driverInfo = passengerSlices?.driver?.[0];
  const journeyRoutePoints = passengerSlices?.journeyRoutePoints;
  let lastRoutePoint = journeyRoutePoints?.[journeyRoutePoints?.length - 1];

  console.log('@DriverInfo journeyRoutePoints', journeyRoutePoints);
  const driver = driverInfo?.driver;
  const vehicleOfDriver = driverInfo?.vehicleOfDriver;
  const driverCoords = {
      latitude: lastRoutePoint?.latitude
        ? Number(lastRoutePoint?.latitude)
        : null,
      longitude: lastRoutePoint?.longitude
        ? Number(lastRoutePoint?.longitude)
        : null,
    },
    passengerOriginCoords = {
      latitude: Number(passenger?.originLatitude),
      longitude: Number(passenger?.originLongitude),
    },
    passengerDestinationCoords = {
      latitude: Number(passenger?.destinationLatitude),
      longitude: Number(passenger?.destinationLongitude),
    };
  // console.log('@passengerDestinationCoords', passengerDestinationCoords);
  const [distanceAndETA, setDistanceAndETA] = useState(null);
  // console.log('@distanceAndETA', distanceAndETA);
  const duration = distanceAndETA?.duration;
  const distance = distanceAndETA?.distance;
  useEffect(() => {
    console.log(
      '@driverCoords',
      driverCoords,
      '\n@passengerDestinationCoords',
      passengerDestinationCoords,
    );
    // return;
    const fetchDestanceAndTime = async () => {
      const data = await getDistanceAndETA({
        destinationCoords:
          passengerStatus <= listofJourneyStatus.acceptedByPassenger
            ? passengerOriginCoords
            : passengerDestinationCoords,
        standingCoords: driverCoords,
      });
      console.log('@fetchDestanceAndTime data', data);
      setDistanceAndETA(data);
    };
    if (
      driverCoords.latitude &&
      driverCoords.longitude &&
      passengerDestinationCoords.latitude &&
      passengerDestinationCoords.longitude
    )
      fetchDestanceAndTime();
  }, [driverCoords.latitude, driverCoords.longitude]);

  const cancelCurrentRequest = () => {
    store.dispatch(setModalVisible(false));
  };
  const handleCall = () => {
    if (driver.phoneNumber) {
      Linking.openURL(`tel:${driver.phoneNumber}`);
    } else {
      console.warn('Phone number is not available');
    }
  };

  return (
    <View style={styles.driverInfoContainer}>
      {/*   Driver heading to location text */}
      {!driverInfo ? (
        <Text style={{ ...styles.headingText, ...GlobalStyles.errorText }}>
          No driver found
        </Text>
      ) : (
        <>
          <View style={styles.journeyInfoWrapper}>
            {passengerStatus == listofJourneyStatus.acceptedByPassenger ? (
              <>
                <Text style={styles.headingText}>
                  Driver is heading to your location....
                </Text>
                <Text style={styles.arrivalText}>
                  Driver will arrive in{' '}
                  {duration ? duration : ' a couple of minutes '}
                </Text>
              </>
            ) : (
              <View>
                <Text style={styles.headingText}>Heading to destination </Text>
                <Text style={styles.timeDisplayer}>
                  Estimated time of arrival : {duration}
                </Text>
                <Text style={styles.timeDisplayer}>
                  Estimated distance :{distance}
                </Text>
              </View>
            )}
            <Text style={styles.vehicleInfoText}>
              {vehicleOfDriver?.vehicleTypeName}, {vehicleOfDriver?.color} -
              {vehicleOfDriver?.licensePlate}
            </Text>
          </View>
          {/* Driver card */}
          <DiverCard driverInfo={driverInfo} />
          {passengerStatus == listofJourneyStatus.acceptedByDriver && (
            <TouchableOpacity
              style={{
                ...GlobalStyles.button,
                backgroundColor: ColorStyles.red,
              }}
              onPress={cancelCurrentRequest}
            >
              <Text style={GlobalStyles.buttonText}>Cancel request</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

export default DriverInfo;
