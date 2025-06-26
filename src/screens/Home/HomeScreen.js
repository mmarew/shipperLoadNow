import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PassangerMap from '../../Components/PassangerMap/PassangerMap';
import PickupAndDestinationDisplayer from '../../Components/PickUpAndDestination/PickupAndDestinationDisplayer';
import styles from './HomeScreen.style';
import GlobalStyles from '../../GlobalStyles/GlobalStyles';
import { useSelector } from 'react-redux';
import PickUpAndDestinationInputs from '../../Components/PickUpAndDestination/PickUpAndDestinationInputs';
import ShippingDetailes from '../ShippingDetailes/ShippingDetailes';
import SelectListOfVechels from '../../Components/SelectListOfVehicles/ListOfVechels';
import FindDriverScreen from '../FindDriverScreen/FindDriverScreen';
import CancelRequestModal from '../../screens/CancelRequest/CancelRequest';
import WaitingForConfirmation from '../WaitingForConfirmation/WaitingForConfirmation';
import Journey from '../Journey/Journey';
import StrightLine from '../../assets/icons/StrightLine.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderBar from '../../Components/HeaderBar/HeaderBar';
const HomeScreen = ({ navigation }) => {
  const passengerSlices = useSelector(state => state?.passengerSlices);
  const passengerStatus = passengerSlices?.passengerStatus;
  const { destination, originLocation } = passengerSlices;
  const [showComponent, setShowComponent] = useState();
  const listofJourneyStatus = passengerSlices?.listofJourneyStatus;
  console.log('@HomeScreen passengerStatus', passengerStatus);
  // return <Text>it is home </Text>;
  // if passenger dosent have any request
  if (passengerStatus === null) {
    if (showComponent == 'Pick up and destination') {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <HeaderBar navigation={navigation} />
          <StatusBar barStyle="dark-content" backgroundColor="white" />
          <PickUpAndDestinationInputs setShowComponent={setShowComponent} />
        </SafeAreaView>
      );
    } else if (showComponent === 'Shipping Detailes') {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <HeaderBar navigation={navigation} />
          <StatusBar barStyle="dark-content" backgroundColor="white" />
          <ShippingDetailes setShowComponent={setShowComponent} />
        </SafeAreaView>
      );
    } else if (showComponent === 'List Of Vehicles') {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <HeaderBar navigation={navigation} />
          <StatusBar barStyle="dark-content" backgroundColor="white" />
          <SelectListOfVechels
            navigation={navigation}
            setShowComponent={setShowComponent}
          />
        </SafeAreaView>
      );
    } else if (showComponent == 'Find Driver') {
      return (
        <FindDriverScreen
          navigation={navigation}
          setShowComponent={setShowComponent}
        />
      );
    } else {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <HeaderBar navigation={navigation} />
          <StatusBar barStyle="dark-content" backgroundColor="white" />

          <PassangerMap navigation={navigation} mapHeight={0.63} />

          {/* Bottom Container */}
          <View
            style={{
              ...styles.bottomContainer,
              ...GlobalStyles.bodyBasicBgColor,
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                paddingBottom: 20,
                paddingTop: 10,
              }}
            >
              <StrightLine width={100} />
            </View>

            {passengerStatus == null && (
              <Text
                style={{
                  ...GlobalStyles.title,
                  // marginBottom: 20,
                  paddingLeft: 15,
                }}
              >
                Where would you like to travel?
              </Text>
            )}
            <TouchableOpacity
              onPress={() => setShowComponent('Pick up and destination')}
            >
              <PickupAndDestinationDisplayer
                disableInnerTouchables={true}
                navigation={navigation}
                listOfJourneyPoints={[{ origin: originLocation, destination }]}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }
  } else if (
    passengerStatus == listofJourneyStatus?.waiting ||
    passengerStatus == listofJourneyStatus?.requested
  ) {
    if (showComponent == 'cancel request') {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <HeaderBar navigation={navigation} />
          <StatusBar barStyle="dark-content" backgroundColor="white" />
          <CancelRequestModal
            setShowComponent={setShowComponent}
            navigation={navigation}
          />
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderBar navigation={navigation} />
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <FindDriverScreen
          setShowComponent={setShowComponent}
          navigation={navigation}
        />
      </SafeAreaView>
    );
  } else if (passengerStatus == listofJourneyStatus?.acceptedByDriver) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderBar navigation={navigation} />
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <WaitingForConfirmation />
      </SafeAreaView>
    );
  } else if (
    passengerStatus == listofJourneyStatus?.acceptedByPassenger ||
    passengerStatus == listofJourneyStatus?.journeyStarted
  ) {
    if (showComponent == 'cancel request') {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <HeaderBar navigation={navigation} />
          <StatusBar barStyle="dark-content" backgroundColor="white" />
          <CancelRequestModal
            setShowComponent={setShowComponent}
            navigation={navigation}
          />
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderBar navigation={navigation} />
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        <Journey setShowComponent={setShowComponent} navigation={navigation} />
      </SafeAreaView>
    );
  }
};

export default HomeScreen;
