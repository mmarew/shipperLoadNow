import React, { useState } from 'react';
import {
  RefreshControl,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PassangerMap from '../../Components/PassangerMap/PassangerMap';
import PickupAndDestinationDisplayer from '../../Components/PickUpAndDestination/PickupAndDestinationDisplayer';
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
import ColorStyles, { barStyles } from '../../GlobalStyles/Color.styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Reload from '../../Components/Reload/Reload';
import styles from './HomeScreen.style';
const HomeScreen = ({ navigation }) => {
  const passengerSlices = useSelector(state => state?.passengerSlices);
  const passengerStatus = passengerSlices?.passengerStatus;
  const { destination, originLocation } = passengerSlices;
  const [showComponent, setShowComponent] = useState();
  const listofJourneyStatus = passengerSlices?.listofJourneyStatus;
  console.log('@HomeScreen passengerStatus', passengerStatus);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => setRefreshing(true);

  if (refreshing) return <Reload waitConfirmation={false} />;

  // if passenger dosent have any request
  if (passengerStatus === null) {
    if (showComponent == 'Pick up and destination') {
      return <PickUpAndDestinationInputs setShowComponent={setShowComponent} />;
    } else if (showComponent === 'Shipping Detailes') {
      return <ShippingDetailes setShowComponent={setShowComponent} />;
    } else if (showComponent === 'List Of Vehicles') {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          {/* <HeaderBar navigation={navigation} /> */}
          <StatusBar
            barStyle={barStyles}
            backgroundColor={ColorStyles.backgroundColor}
          />
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
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: ColorStyles.backgroundColor,
          }}
        >
          {/* <HeaderBar navigation={navigation} /> */}
          <StatusBar
            barStyle={barStyles}
            backgroundColor={ColorStyles.backgroundColor}
          />

          <PassangerMap navigation={navigation} mapHeight={0.8} />

          {/* Bottom Container */}
          <View style={styles.bottomContainer}>
            <View style={styles.strightLineWrapper}>
              <StrightLine width={100} />
            </View>

            {passengerStatus == null && (
              <Text
                style={{
                  ...GlobalStyles.title,
                  // marginBottom: 20,
                  padding: 15,
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
          {/* <HeaderBar navigation={navigation} /> */}
          <StatusBar
            barStyle={barStyles}
            backgroundColor={ColorStyles.backgroundColor}
          />
          <CancelRequestModal
            setShowComponent={setShowComponent}
            navigation={navigation}
          />
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* <HeaderBar navigation={navigation} /> */}
        <KeyboardAwareScrollView
          extraScrollHeight={150}
          enableOnAndroid={true}
          style={GlobalStyles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <StatusBar
            barStyle={barStyles}
            backgroundColor={ColorStyles.backgroundColor}
          />
          <FindDriverScreen
            setShowComponent={setShowComponent}
            navigation={navigation}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  } else if (passengerStatus == listofJourneyStatus?.acceptedByDriver) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* <HeaderBar navigation={navigation} /> */}
        <StatusBar
          barStyle={barStyles}
          backgroundColor={ColorStyles.backgroundColor}
        />
        <KeyboardAwareScrollView
          extraScrollHeight={150}
          enableOnAndroid={true}
          style={GlobalStyles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <WaitingForConfirmation />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  } else if (
    passengerStatus == listofJourneyStatus?.acceptedByPassenger ||
    passengerStatus == listofJourneyStatus?.journeyStarted
  ) {
    if (showComponent == 'cancel request') {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          {/* <HeaderBar navigation={navigation} /> */}
          <StatusBar
            barStyle={barStyles}
            backgroundColor={ColorStyles.backgroundColor}
          />
          <CancelRequestModal
            setShowComponent={setShowComponent}
            navigation={navigation}
          />
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: ColorStyles.backgroundColor }}
      >
        {/* <HeaderBar navigation={navigation} /> */}
        <KeyboardAwareScrollView
          extraScrollHeight={150}
          enableOnAndroid={true}
          style={GlobalStyles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <StatusBar
            barStyle={barStyles}
            backgroundColor={ColorStyles.backgroundColor}
          />

          <Journey
            setShowComponent={setShowComponent}
            navigation={navigation}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
};

export default HomeScreen;
