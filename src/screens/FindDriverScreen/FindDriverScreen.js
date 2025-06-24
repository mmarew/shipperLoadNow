import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PickupAndDestinationDisplayer from '../../Components/PickUpAndDestination/PickupAndDestinationDisplayer';
import PassangerMap from '../../Components/PassangerMap/PassangerMap';
import EachVehicles from '../../Components/SelectListOfVehicles/EachVehicles';
import { useDispatch, useSelector } from 'react-redux';
import GlobalStyles from '../../GlobalStyles/GlobalStyles';
import errorHandler from '../../utils/errorHandler/errorHandler';
import HandleResponses from '../../utils/handleServerResponses/HandleResponses';
import {
  requestUsingPostMethod,
  requestUsingPutMethod,
} from '../../utils/handleRequestToServer/handleRequestToServer';
import { setModalVisible } from '../../Redux/slices/PassengerSlice';
import getUniQueIds from '../../utils/getUniqueIds/getUniQueIds';
import { findScreenDescription } from '../../utils/ScreenManager/ScreenList';
import ButtonNavigateToScreens from '../../Components/Buttons/ButtonNavigateToScreens/ButtonNavigateToScreens';
import CancelRequest from '../../Components/CancelRequest/CancelRequest';
import { ProgressBar } from 'react-native-paper';
import ShowShippableItems from '../../Components/ShowShippableItems/ShowShippableItems';
import BackArrow from '../../Components/BackArrow/BackArrow';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderBar from '../../Components/HeaderBar/HeaderBar';
/**
 * FindDriverScreen component handles the process of finding a driver for a passenger.
 * It manages the state and interactions related to the driver's search and request process.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.navigation - The navigation object provided by React Navigation.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @component
 *
 * @example
 * return (
 *   <FindDriverScreen navigation={navigation} />
 * )
 *
 * @function
 * @name FindDriverScreen
 *
 * @description
 * - Uses Redux hooks to dispatch actions and select state slices.
 * - Manages loading state and selected vehicle state.
 * - Handles the process of creating a new passenger request.
 * - Handles the scenario where there is no answer from the driver.
 * - Displays a loading indicator while searching for a driver.
 * - Renders the passenger map, vehicle selection, pickup and destination displayer, and find driver modal.
 */
const FindDriverScreen = ({ navigation, setShowComponent }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const passengerSlices = useSelector(state => state?.passengerSlices);
  const progressRef = useRef(0); // Track progress without causing re-renders
  const shippableItem = passengerSlices?.shippableItem;
  // console.log('@FindDriverScreen shippableItem', shippableItem);
  useEffect(() => {
    const interval = setInterval(() => {
      // Update progress in the ref without causing re-renders
      const newProgress =
        progressRef.current >= 1 ? 0 : progressRef.current + 0.1;
      progressRef.current = newProgress;

      // Manually trigger the component re-render by forcing a small state update or similar approach if needed
      // For demonstration purposes, we are just updating the ref here.
      // Usually, you'd need to trigger the render through other means, but useRef alone won't trigger a rerender
    }, 500);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  const passengerStatus = passengerSlices?.passengerStatus;
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  useEffect(() => {
    setSelectedVehicle(passengerSlices?.selectedVechelesType);
  }, [passengerSlices]);
  const originLocation = passengerSlices.originLocation,
    destination = passengerSlices.destination;
  const handleNoAnswerFromDriver = async () => {
    const vehicleTypeUniqueId =
      passengerSlices?.selectedVechelesType?.vehicleTypeUniqueId;
    // get driverRequestUniqueId and passengerRequestUniqueId
    const uniqueIds = getUniQueIds(passengerSlices);

    const passengerRequestUniqueId = uniqueIds?.passengerRequestUniqueId,
      driverRequestUniqueId = uniqueIds?.driverRequestUniqueId;

    if (!passengerRequestUniqueId || !driverRequestUniqueId) {
      return;
    }
    const data = { vehicle: { vehicleTypeUniqueId }, ...uniqueIds };

    if (passengerStatus != 2) return;

    try {
      // Construct the API endpoint and token
      const url = '/passenger/noAnswerFromDriver';

      requestUsingPutMethod({ url, data });
    } catch (error) {
      errorHandler(error);
    }
  };
  const createNewPassengerRequest = async () => {
    try {
      const requestData = {
        vehicle: passengerSlices?.selectedVechelesType,
        destination,
        originLocation,
        ...shippableItem,
      };
      console.log('@createNewPassengerRequest requestData', requestData);
      setIsLoading(true);
      const response = await requestUsingPostMethod({
        url: '/api/passengerRequest/createRequest',
        data: requestData, // Pass the requestData in the body
      });
      HandleResponses(response);
    } catch (error) {
      console.log('@createNewPassengerRequest error', error);
      dispatch(setModalVisible(false));
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };
  // if driver not respond in 40 second send no answer to backend code
  useEffect(() => {
    if (passengerStatus == 2)
      setTimeout(() => {
        handleNoAnswerFromDriver();
      }, 100000);
  }, [, passengerStatus]);

  if (isLoading)
    return (
      <View>
        <Text style={{ ...GlobalStyles.title, padding: 20 }}>
          Creating your request ....
        </Text>
        <ActivityIndicator size={'large'} />
      </View>
    );

  return (
    <ScrollView>
      <View style={{ marginTop: !passengerStatus ? 90 : 0 }}>
        {!passengerStatus && (
          <View style={{ paddingLeft: 20, paddingTop: 40 }}>
            <BackArrow
              showComponent={'List Of Vehicles'}
              description={'Confirm Selection'}
              setShowComponent={setShowComponent}
            />
          </View>
        )}
        {passengerStatus && <PassangerMap />}

        {passengerStatus === null ||
        passengerStatus === 1 ||
        passengerStatus === 2 ? (
          <View
            style={{
              paddingHorizontal: 20,
              ...GlobalStyles.bodyBasicBgColor,
              paddingBottom: 30,
              paddingTop: passengerStatus ? 30 : 0,
              borderTopStartRadius: 30,
              borderTopEndRadius: 30,
            }}
          >
            <Text style={GlobalStyles.title}>
              {findScreenDescription(passengerStatus)}
            </Text>
            {(passengerStatus === 1 || passengerStatus === 2) && (
              <View style={{ margin: 10 }}>
                <ProgressBar indeterminate color={'blue'} />
              </View>
            )}
            <EachVehicles
              setShowComponent={setShowComponent}
              originLocation={originLocation}
              destination={destination}
              navigation={navigation}
              item={selectedVehicle}
              selectedVehicle={selectedVehicle}
              setSelectedVehicle={setSelectedVehicle}
            />
            <PickupAndDestinationDisplayer
              showComponent={'Pick up and destination'}
              setShowComponent={setShowComponent}
              disableInnerTouchables={false}
              navigation={navigation}
              navigateTo={'Pick up and destination'}
              listOfJourneyPoints={[{ origin: originLocation, destination }]}
            />
            <ShowShippableItems />
            <CancelRequest
              navigation={navigation}
              setShowComponent={setShowComponent}
            />
            {!passengerStatus && (
              <TouchableOpacity
                onPress={createNewPassengerRequest}
                style={{ ...GlobalStyles.button, marginBottom: 50 }}
              >
                <Text style={GlobalStyles.buttonText}>confirm selection</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <ButtonNavigateToScreens />
        )}
      </View>
    </ScrollView>
  );
};
export default FindDriverScreen;
