import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from 'react-native-paper';

// Screens
import RegisterPassenger from '../screens/RegisterPassenger/RegisterPassenger';
import DriversPinVerification from '../screens/Auth/PassengerPinVerification/PassengerOTPVerification';
import ErrorPage from '../screens/ErrorPage/ErrorPage';
import TermsAndServicesScreen from '../screens/TermsAndServicesScreen/TermsAndServicesScreen';

// Components
import CheckLocationServices from '../Components/CheckLocationServices/CheckLocationServices';

// Utils & Services
import { setTopLevelNavigator } from '../services/navigationService';
import { requestUsingGetMethod } from '../utils/handleRequestToServer/handleRequestToServer';
import errorHandler from '../utils/errorHandler/errorHandler';
import HandleResponses from '../utils/handleServerResponses/HandleResponses';
import findScreenByPassengerStatus from '../utils/ScreenManager/ScreenList';
import API_URLS from '../Configs/URLConfigs';
import {
  disconnectSocket,
  initSocket,
  listenToEvent,
} from '../utils/Socket/socketService';
import { isJSON } from '../utils/Formatter/Formatter';
import verifyPassengerStatus from '../utils/VerifyPassengerStatus/VerifyPassengerStatus';

// Redux
import store from '../Redux/Store/Store';
import {
  addListOfVehiclesType,
  addPassengerStatus,
  addPassengersToken,
  addSelectedVechelesType,
  updateConnectionStatus,
  updateCurrentLocationOfDriver,
  updateIsDarkMode,
  updatelistOfJourneyStatus,
} from '../Redux/slices/PassengerSlice';

// Styles
import { createStyles, navigationStyles } from './AppNavigator.css';
import CustomScreenManager from '../screens/CustomScreenManager/CustomScreenManager';
import getAppsColorStyles from '../GlobalStyles/AppsColorStyles';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const ColorStyles = getAppsColorStyles();
  const styles = createStyles();
  const dispatch = useDispatch();
  const passengerSlices = useSelector(state => state?.passengerSlices);
  const passengersToken = passengerSlices?.passengersToken;
  const passengerStatus = passengerSlices?.passengerStatus;

  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [initialRoute, setInitialRoute] = useState(undefined);
  const [savedProfileImage, setSavedProfileImage] = useState(null);

  const getlistOfJourneyStatus = async () => {
    try {
      const url = API_URLS.GET_LIST_OF_JOURNEY_STATUS;
      const resuts = await requestUsingGetMethod({ url });
      dispatch(updatelistOfJourneyStatus(resuts.data));
    } catch (error) {
      console.log('@getListofStatus error', error);
    }
  };

  // Retry logic for testConnections with maximum retries
  const MAX_RETRIES = 25;
  const RETRY_DELAY = 2000; // ms

  const testConnections = async (retryCount = 0) => {
    try {
      console.log('@testing Connections..... Attempt:', retryCount + 1);
      const httpConnection = await requestUsingGetMethod({ url: '' });

      if (httpConnection?.message === 'Server is running') {
        await getlistOfJourneyStatus();
        dispatch(updateConnectionStatus({ isHTTPConnected: true }));
        await testToken();
      } else {
        throw new Error(
          'Unable to connect to the server. Please try again later.',
        );
      }
    } catch (error) {
      console.log('@testConnections error', error);
      dispatch(updateConnectionStatus({ isHTTPConnected: false }));
      if (retryCount < MAX_RETRIES - 1) {
        setTimeout(() => testConnections(retryCount + 1), RETRY_DELAY);
      } else {
        setErrors('Unable to connect to the server. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentDarkMode = async () => {
    const previousDarkMode = await AsyncStorage.getItem('isDarkMode');
    console.log('@handleDarkModeToggle previousDarkMode', previousDarkMode);
    let newDarkMode = 'true';
    console.log('@previousDarkMode', previousDarkMode);
    if (previousDarkMode === 'false' || !previousDarkMode) {
      newDarkMode = 'false';
    }
    dispatch(updateIsDarkMode(newDarkMode));

    return newDarkMode;
  };
  useEffect(() => {
    getCurrentDarkMode();
  }, []);

  const testToken = async () => {
    const token = await AsyncStorage.getItem('passengersToken');
    console.log('@testToken token', token);
    if (!token) {
      dispatch(addPassengersToken(null));
      setInitialRoute('Register');
      setIsLoading(false);
      dispatch(addPassengerStatus(undefined));
    } else {
      dispatch(addPassengersToken(token));
      await fetchData(token);
    }
  };

  const fetchData = async token => {
    try {
      if (token) {
        await setupSocket();
        const userStatusData = await verifyPassengerStatus();
        const initialScreen = findScreenByPassengerStatus(
          userStatusData?.status,
        );
        setInitialRoute(initialScreen);
        await getVehicleTypes(token);
      } else {
        await AsyncStorage.clear();
        dispatch(addPassengersToken(null));
      }
    } catch (error) {
      console.error('Error during initialization:', error);
      errorHandler(error);
    }
  };

  const fetchProfileImage = useCallback(async () => {
    try {
      setIsLoading(false);
      const response = await requestUsingGetMethod({
        url: '/api/admin/attachedDocumentsByUser/self',
      });
      const profilePhoto = response?.data?.find(
        doc => doc?.uploadedDocumentName === 'profilePhoto',
      );
      setSavedProfileImage(profilePhoto);
    } catch (error) {
      console.error('Error fetching profile image:', errorHandler(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    testConnections();
    fetchProfileImage();
  }, []);

  const setupSocket = async () => {
    try {
      await initSocket();

      listenToEvent('messages', newMessage => {
        if (isJSON(newMessage)) {
          const parsedMessage = JSON.parse(newMessage);
          console.log('@listenToEvent parsedMessage', parsedMessage);
          if (
            parsedMessage?.data ===
            'Socket connection established for user passenger'
          ) {
            verifyPassengerStatus(passengersToken);
          } else if (
            parsedMessage?.messageType?.message === 'update drivers location'
          ) {
            console.log('@parsedMessage?.driver', parsedMessage?.driver);
            store.dispatch(
              updateCurrentLocationOfDriver(parsedMessage?.driver),
            );
          } else {
            HandleResponses(parsedMessage);
          }
        } else {
          console.log('Received non-JSON message:', newMessage);
        }
      });
    } catch (error) {
      console.log('@useEffect error:', error);
    }
  };

  useEffect(() => {
    return () => {
      disconnectSocket();
    };
  }, []);

  const getVehicleTypes = async () => {
    try {
      const vecheleTypeAndTarrif = await requestUsingGetMethod({
        url: API_URLS.GET_VEHICLE_TYPES,
      });
      store.dispatch(addListOfVehiclesType(vecheleTypeAndTarrif.data));
    } catch (error) {
      errorHandler(error);
    }
  };

  const passenger = passengerSlices?.passenger;
  const listOfVehiclesType = passengerSlices?.listOfVehiclesType;
  const connectionToBackEnd = passengerSlices?.connectionToBackEnd;

  useEffect(() => {
    const selecteVehicleTypeUniqueId = passenger?.vehicleTypeUniqueId;
    if (selecteVehicleTypeUniqueId) {
      const selectedVehicles = listOfVehiclesType?.find(
        vehicle => vehicle?.vehicleTypeUniqueId == selecteVehicleTypeUniqueId,
      );
      store.dispatch(addSelectedVechelesType(selectedVehicles));
    }
  }, [passenger, listOfVehiclesType]);

  useEffect(() => {
    let callToBackendViaInterval = null;
    let attemptCount = 0;
    let currentInterval = 2000;

    const isWSConnected = connectionToBackEnd?.isWSConnected;

    const verifyWithBackoff = () => {
      verifyPassengerStatus();
      attemptCount++;

      if (attemptCount % 5 === 0) {
        currentInterval += 500;
        if (callToBackendViaInterval) {
          clearInterval(callToBackendViaInterval);
          callToBackendViaInterval = setInterval(
            verifyWithBackoff,
            currentInterval,
          );
        }
      }
    };

    if (!isWSConnected) {
      callToBackendViaInterval = setInterval(
        verifyWithBackoff,
        currentInterval,
      );
    } else {
      verifyPassengerStatus();
      if (callToBackendViaInterval) {
        clearInterval(callToBackendViaInterval);
        attemptCount = 0;
        currentInterval = 2000;
      }
    }

    return () => {
      if (callToBackendViaInterval) {
        clearInterval(callToBackendViaInterval);
      }
    };
  }, [connectionToBackEnd?.isWSConnected]);
  if (errors) {
    return (
      <View style={styles.fullScreen}>
        <ErrorPage
          route={{ params: { errors: errors || 'Connection error' } }}
        />
      </View>
    );
  }

  if (
    isLoading ||
    passengersToken === undefined ||
    initialRoute === undefined
  ) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingContent}>
          <ActivityIndicator size="large" color="#6200ee" />
          <Text style={styles.loadingText}>Loading application...</Text>
        </View>
      </View>
    );
  }

  if (connectionToBackEnd?.isHTTPConnected === false) {
    return (
      <View style={styles.fullScreen}>
        <ErrorPage
          route={{
            params: {
              errors:
                'Unable to connect to server. Please check your internet connection.',
            },
          }}
        />
      </View>
    );
  }

  if (passengerStatus === undefined && passengersToken) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingContent}>
          <ActivityIndicator size="large" color={ColorStyles.brandColor} />
          <Text style={styles.loadingText}>Verifying your session...</Text>
        </View>
      </View>
    );
  }

  const renderStackScreens = () => (
    <>
      <Stack.Screen
        name="Register"
        component={RegisterPassenger}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="error"
        component={ErrorPage}
        options={{ title: 'Error' }}
        initialParams={{ errors }}
      />
      <Stack.Screen
        name="OTP"
        component={DriversPinVerification}
        options={{
          title: 'Verification',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Terms And Services"
        component={TermsAndServicesScreen}
        options={{ title: 'Terms and Conditions' }}
      />
    </>
  );
  // return

  return (
    <View style={styles.container}>
      {/* <Text> it is here in app</Text>; */}
      <NavigationContainer
        ref={navigatorRef => setTopLevelNavigator(navigatorRef)}
        theme={{
          colors: {
            background: ColorStyles.backgroundColor,
          },
        }}
      >
        {passengersToken ? (
          <CustomScreenManager savedProfileImage={savedProfileImage} />
        ) : (
          <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
              ...navigationStyles.header,
              cardStyle: { backgroundColor: ColorStyles.backgroundColor },
            }}
          >
            {renderStackScreens()}
          </Stack.Navigator>
        )}
      </NavigationContainer>
      <CheckLocationServices />
    </View>
  );
};

export default AppNavigator;
