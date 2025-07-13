// import React, {useCallback, useEffect, useState} from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItemList,
// } from '@react-navigation/drawer';
// import {
//   ActivityIndicator,
//   View,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useDispatch, useSelector} from 'react-redux';
// import {Text} from 'react-native-paper';

// // Screens
// import RegisterPassenger from '../screens/RegisterPassenger/RegisterPassenger';
// import HomeScreen from '../screens/Home/HomeScreen';
// import DriversPinVerification from '../screens/Auth/PassangerPinVerification/PassangerOTPVerification';
// import Logout from '../screens/Logout/Logout';
// import ErrorPage from '../screens/ErrorPage/ErrorPage';
// import TripHistory from '../screens/JourneyHistory/JourneyHistory';
// import SettingsScreen from '../screens/Settings/SettingsScreen';
// import Reload from '../Components/Reload/Reload';
// import TermsAndServicesScreen from '../screens/TermsAndServicesScreen/TermsAndServicesScreen';

// // Components
// import CheckLocationServices from '../Components/CheckLocationServices/CheckLocationServices';

// // Utils & Services
// import {setTopLevelNavigator} from '../services/navigationService';
// import {requestUsingGetMethode} from '../utils/handleRequestToServer/handleRequestToServer';
// import errorHandler from '../utils/errorHandler/errorHandler';
// import HandleResponses from '../utils/handleServerResponses/HandleResponses';
// import findScreenByPassengerStatus, {
//   navigateToScreen,
// } from '../utils/ScreenManager/ScreenList';
// import API_URLS from '../Configs/URLConfigs';
// import {
//   disconnectSocket,
//   initSocket,
//   listenToEvent,
// } from '../utils/Socket/socketService';
// import {isJSON, trimText} from '../utils/Formatter/Formatter';
// import verifyPassengerStatus from '../utils/VerifyPassengerStatus/VerifyPassengerStatus';

// // Redux
// import store from '../Redux/Store/Store';
// import {
//   addListOfVehiclesType,
//   addPassengerStatus,
//   addPassengersToken,
//   addSelectedVechelesType,
//   updateConnectionStatus,
//   updateListofJourneyStatus,
// } from '../Redux/slices/PassengerSlice';
// import API_URL_AXIOS from '../services/AxiosServices';

// const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

// const CustomDrawerContent = props => {
//   const {savedProfileImage, ...rest} = props;
//   return (
//     <DrawerContentScrollView
//       {...rest}
//       contentContainerStyle={styles.drawerContainer}>
//       <View style={styles.drawerHeader}>
//         <View
//           style={{
//             alignItems: 'flex-end',
//           }}>
//           <TouchableOpacity
//             style={{
//               width: 50,
//               height: 50,
//               borderRadius: 50,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}
//             onPress={() => props.navigation.closeDrawer()}>
//             <Text style={{fontSize: 30, fontWeight: 'bold', color: '#075985'}}>
//               ✕
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {savedProfileImage?.attachedDocumentName && (
//           <View
//             style={{
//               alignItems: 'center',
//               justifyContent: 'flex-start',
//               flexDirection: 'row',
//             }}>
//             <Image
//               source={{
//                 uri: `${API_URL_AXIOS}/uploads/${savedProfileImage.attachedDocumentName}`,
//               }}
//               style={{height: 90, width: 90, borderRadius: 45}}
//             />
//             <View style={{flexDirection: 'column', marginLeft: 20}}>
//               <Text
//                 style={{
//                   fontSize: 20,
//                   color: '#111111',
//                   fontFamily: 'Manrope',
//                   fontStyle: 'bold',
//                 }}>
//                 {trimText({text: 'Marew Masresha Abate', size: 18})}
//               </Text>
//               <Text
//                 style={{
//                   color: '#71717A',
//                   fontWeight: '500',
//                   fontFamily: 'Manrope',
//                   fontSize: 14,
//                 }}>
//                 Passenger
//               </Text>
//             </View>
//           </View>
//         )}
//       </View>

//       <DrawerItemList
//         {...rest}
//         activeTintColor="#6200ee"
//         inactiveTintColor="#333"
//         labelStyle={styles.drawerLabel}
//       />
//     </DrawerContentScrollView>
//   );
// };

// const AppNavigator = () => {
//   const dispatch = useDispatch();
//   const passengerSlices = useSelector(state => state?.passengerSlices);
//   const passengersToken = passengerSlices?.passengersToken;
//   const passengerStatus = passengerSlices?.passengerStatus;

//   const [isLoading, setIsLoading] = useState(true);
//   const [errors, setErrors] = useState(null);
//   const [initialRoute, setInitialRoute] = useState(undefined);
//   const [savedProfileImage, setSavedProfileImage] = useState(null);

//   const getListofJourneyStatus = async () => {
//     try {
//       const url = API_URLS.GET_LIST_OF_JOURNEY_STATUS;
//       const resuts = await requestUsingGetMethode({url});
//       dispatch(updateListofJourneyStatus(resuts.data));
//     } catch (error) {
//       console.log('@getListofStatus error', error);
//     }
//   };

//   const testConnections = async () => {
//     try {
//       console.log('@testing Connections.....');
//       const httpConnection = await requestUsingGetMethode({url: ''});

//       if (httpConnection?.message === 'Server is running') {
//         await getListofJourneyStatus();
//         dispatch(updateConnectionStatus({isHTTPConnected: true}));
//         await testToken();
//       } else {
//         setErrors('Unable to connect to the server. Please try again later.');
//         dispatch(updateConnectionStatus({isHTTPConnected: false}));
//       }
//     } catch (error) {
//       console.log('@testConnections error', error);
//       dispatch(updateConnectionStatus({isHTTPConnected: false}));
//       setErrors('Unable to connect to the server. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const testToken = async () => {
//     const token = await AsyncStorage.getItem('passengersToken');
//     if (!token) {
//       dispatch(addPassengersToken(null));
//       setInitialRoute('Register');
//       setIsLoading(false);
//       dispatch(addPassengerStatus(undefined));
//     } else {
//       dispatch(addPassengersToken(token));
//       await fetchData(token);
//     }
//   };

//   const fetchData = async token => {
//     try {
//       if (token) {
//         await setupSocket();
//         const userStatusData = await verifyPassengerStatus();
//         const initialScreen = findScreenByPassengerStatus(
//           userStatusData?.status,
//         );
//         setInitialRoute(initialScreen);
//         await getVehicleTypes(token);
//       } else {
//         await AsyncStorage.clear();
//         dispatch(addPassengersToken(null));
//       }
//     } catch (error) {
//       console.error('Error during initialization:', error);
//       errorHandler(error);
//     }
//   };
//   const fetchProfileImage = useCallback(async () => {
//     try {
//       setIsLoading(false);
//       // setIsLoading(true);
//       const response = await requestUsingGetMethode({
//         url: '/api/admin/attachedDocumentsByUser/self',
//       });
//       const profilePhoto = response?.data?.find(
//         doc => doc?.uploadedDocumentName === 'profilePhoto',
//       );
//       setSavedProfileImage(profilePhoto);
//     } catch (error) {
//       console.error('Error fetching profile image:', errorHandler(error));
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);
//   useEffect(() => {
//     testConnections();
//     fetchProfileImage();
//   }, []);

//   const setupSocket = async () => {
//     try {
//       await initSocket();
//       console.log('@initSocket completed');

//       listenToEvent('messages', newMessage => {
//         console.log('@listenToEvent newMessage', newMessage);
//         if (isJSON(newMessage)) {
//           const parsedMessage = JSON.parse(newMessage);

//           if (
//             parsedMessage?.data ===
//             'Socket connection established for user passenger'
//           ) {
//             verifyPassengerStatus(passengersToken);
//           } else {
//             HandleResponses(parsedMessage);
//           }
//         } else {
//           console.log('Received non-JSON message:', newMessage);
//         }
//       });
//     } catch (error) {
//       console.log('@useEffect error:', error);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       disconnectSocket();
//     };
//   }, []);

//   const getVehicleTypes = async () => {
//     try {
//       const vecheleTypeAndTarrif = await requestUsingGetMethode({
//         url: API_URLS.GET_VEHICLES_TARRIF_RATES,
//       });
//       store.dispatch(addListOfVehiclesType(vecheleTypeAndTarrif.data));
//     } catch (error) {
//       errorHandler(error);
//     }
//   };

//   const passenger = passengerSlices?.passenger;
//   const listOfVehiclesType = passengerSlices?.listOfVehiclesType;
//   const connectionToBackEnd = passengerSlices?.connectionToBackEnd;

//   useEffect(() => {
//     const selecteVehicleTypeUniqueId = passenger?.vehicleTypeUniqueId;
//     if (selecteVehicleTypeUniqueId) {
//       const selectedVehicles = listOfVehiclesType?.find(
//         vehicle => vehicle?.vehicleTypeUniqueId == selecteVehicleTypeUniqueId,
//       );
//       store.dispatch(addSelectedVechelesType(selectedVehicles));
//     }
//   }, [passenger, listOfVehiclesType]);

//   useEffect(() => {
//     if (passengerStatus !== undefined) navigateToScreen({passengerStatus});
//   }, [passengerStatus]);

//   useEffect(() => {
//     let callToBackendViaInterval = null;
//     let attemptCount = 0;
//     let currentInterval = 2000;

//     const isWSConnected = connectionToBackEnd?.isWSConnected;

//     const verifyWithBackoff = () => {
//       verifyPassengerStatus();
//       attemptCount++;

//       if (attemptCount % 5 === 0) {
//         currentInterval += 500;
//         if (callToBackendViaInterval) {
//           clearInterval(callToBackendViaInterval);
//           callToBackendViaInterval = setInterval(
//             verifyWithBackoff,
//             currentInterval,
//           );
//         }
//       }
//     };

//     if (!isWSConnected) {
//       callToBackendViaInterval = setInterval(
//         verifyWithBackoff,
//         currentInterval,
//       );
//     } else {
//       verifyPassengerStatus();
//       if (callToBackendViaInterval) {
//         clearInterval(callToBackendViaInterval);
//         attemptCount = 0;
//         currentInterval = 2000;
//       }
//     }

//     return () => {
//       if (callToBackendViaInterval) {
//         clearInterval(callToBackendViaInterval);
//       }
//     };
//   }, [connectionToBackEnd?.isWSConnected]);

//   if (errors) {
//     return (
//       <View style={styles.fullScreen}>
//         <ErrorPage route={{params: {errors: errors || 'Connection error'}}} />
//       </View>
//     );
//   }

//   if (
//     isLoading ||
//     passengersToken === undefined ||
//     initialRoute === undefined
//   ) {
//     return (
//       <View style={styles.loadingContainer}>
//         <View style={styles.loadingContent}>
//           <ActivityIndicator size="large" color="#6200ee" />
//           <Text style={styles.loadingText}>Loading application...</Text>
//         </View>
//       </View>
//     );
//   }

//   if (connectionToBackEnd?.isHTTPConnected === false) {
//     return (
//       <View style={styles.fullScreen}>
//         <ErrorPage
//           route={{
//             params: {
//               errors:
//                 'Unable to connect to server. Please check your internet connection.',
//             },
//           }}
//         />
//       </View>
//     );
//   }

//   if (passengerStatus === undefined && passengersToken) {
//     return (
//       <View style={styles.loadingContainer}>
//         <View style={styles.loadingContent}>
//           <ActivityIndicator size="large" color="#6200ee" />
//           <Text style={styles.loadingText}>Verifying your session...</Text>
//         </View>
//       </View>
//     );
//   }

//   const renderDrawerScreens = () => (
//     <>
//       <Drawer.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{drawerLabel: 'Home', title: 'Home'}}
//       />

//       <Drawer.Screen
//         name="Trip History"
//         component={TripHistory}
//         options={{drawerLabel: 'Trip History', title: 'Your Trips'}}
//       />
//       <Drawer.Screen
//         name="Settings"
//         component={SettingsScreen}
//         options={{drawerLabel: 'Settings', title: 'Settings'}}
//       />
//       <Drawer.Screen
//         name="Reload"
//         component={Reload}
//         options={{drawerLabel: 'Reload', title: 'Reload App'}}
//       />
//       <Drawer.Screen
//         name="Logout"
//         component={Logout}
//         options={{drawerLabel: 'Logout', title: 'Logout'}}
//       />
//     </>
//   );

//   const renderStackScreens = () => (
//     <>
//       <Stack.Screen
//         name="Register"
//         component={RegisterPassenger}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="error"
//         component={ErrorPage}
//         options={{title: 'Error'}}
//         initialParams={{errors}}
//       />
//       <Stack.Screen
//         name="OTP"
//         component={DriversPinVerification}
//         options={{title: 'Verification'}}
//       />
//       <Stack.Screen
//         name="Terms And Services"
//         component={TermsAndServicesScreen}
//         options={{title: 'Terms and Conditions'}}
//       />
//     </>
//   );

//   return (
//     <View style={styles.container}>
//       <NavigationContainer
//         ref={navigatorRef => setTopLevelNavigator(navigatorRef)}
//         theme={{
//           colors: {
//             background: '#f5f5f5',
//           },
//         }}>
//         {passengersToken ? (
//           <Drawer.Navigator
//             initialRouteName={initialRoute}
//             drawerContent={props => (
//               <CustomDrawerContent
//                 {...props}
//                 savedProfileImage={savedProfileImage}
//               />
//             )}
//             screenOptions={{
//               headerShown: false,
//               drawerStyle: styles.drawerStyle,
//               drawerActiveBackgroundColor: '#E0F2FE',
//               drawerActiveTintColor: '#000',
//               drawerInactiveTintColor: '#333',
//               headerStyle: {backgroundColor: '#075985'},
//               headerTintColor: '#fff',
//               headerTitleStyle: {fontWeight: 'bold'},
//             }}>
//             {renderDrawerScreens()}
//           </Drawer.Navigator>
//         ) : (
//           <Stack.Navigator
//             initialRouteName={initialRoute}
//             screenOptions={{
//               headerStyle: {backgroundColor: '#075985'},
//               headerTintColor: '#fff',
//               headerTitleStyle: {fontWeight: 'bold'},
//               cardStyle: {backgroundColor: '#fff'},
//             }}>
//             {renderStackScreens()}
//           </Stack.Navigator>
//         )}
//       </NavigationContainer>
//       <CheckLocationServices />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   fullScreen: {
//     flex: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   loadingContent: {
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: 16,
//     fontSize: 16,
//     color: '#333',
//   },
//   drawerContainer: {
//     flex: 1,
//     width: '100%',
//   },
//   drawerStyle: {
//     width: '90%',
//     backgroundColor: '#fff',
//     paddingHorizontal: 10,
//   },
//   drawerHeader: {
//     borderBottomWidth: 0.5,
//     borderBottomColor: 'black',
//     // height: 300,
//     borderStyle: 'solid',
//     // backgroundColor: 'red',
//     paddingBottom: 20,
//     marginHorizontal: 10,
//     marginBottom: 20,
//   },
//   drawerHeaderText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   drawerLabel: {
//     marginLeft: -15,
//     fontSize: 16,
//   },
// });

// export default AppNavigator;

import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from 'react-native-paper';

// Screens
import RegisterPassenger from '../screens/RegisterPassenger/RegisterPassenger';
import DriversPinVerification from '../screens/Auth/PassangerPinVerification/PassangerOTPVerification';
import ErrorPage from '../screens/ErrorPage/ErrorPage';
import TermsAndServicesScreen from '../screens/TermsAndServicesScreen/TermsAndServicesScreen';

// Components
import CheckLocationServices from '../Components/CheckLocationServices/CheckLocationServices';

// Utils & Services
import { setTopLevelNavigator } from '../services/navigationService';
import { requestUsingGetMethode } from '../utils/handleRequestToServer/handleRequestToServer';
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
  addDriver,
  addListOfVehiclesType,
  addPassengerStatus,
  addPassengersToken,
  addSelectedVechelesType,
  updateConnectionStatus,
  updateCurrentLocationOfDriver,
  updateListofJourneyStatus,
} from '../Redux/slices/PassengerSlice';

// Styles
import { styles, navigationStyles } from './AppNavigator.css';
import CustomScreenManager from '../screens/CustomScreenManager/CustomScreenManager';
import ColorStyles from '../GlobalStyles/Color.styles';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();
  const passengerSlices = useSelector(state => state?.passengerSlices);
  const passengersToken = passengerSlices?.passengersToken;
  const passengerStatus = passengerSlices?.passengerStatus;

  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [initialRoute, setInitialRoute] = useState(undefined);
  const [savedProfileImage, setSavedProfileImage] = useState(null);

  const getListofJourneyStatus = async () => {
    try {
      const url = API_URLS.GET_LIST_OF_JOURNEY_STATUS;
      const resuts = await requestUsingGetMethode({ url });
      dispatch(updateListofJourneyStatus(resuts.data));
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
      const httpConnection = await requestUsingGetMethode({ url: '' });

      if (httpConnection?.message === 'Server is running') {
        await getListofJourneyStatus();
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
      const response = await requestUsingGetMethode({
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
      const vecheleTypeAndTarrif = await requestUsingGetMethode({
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
          <ActivityIndicator size="large" color="#6200ee" />
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
