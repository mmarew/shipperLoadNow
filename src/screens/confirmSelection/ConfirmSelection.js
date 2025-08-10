// import React, {useState, useEffect} from 'react';
// import {Button, Text, View} from 'react-native';
// import {useSelector, useDispatch} from 'react-redux';
// import {ActivityIndicator} from 'react-native-paper';
// import {
//   addGoBackTo,
//   addPassengerStatus,
// } from '../../Redux/slices/webSocketSlice';
// import styles from './Style';
// import errorHandler from '../../utils/errorHandler/errorHandler';
// import {sendRequestToDriver} from '../FindDriverScreen/FindDriverScreen';
// import store from '../../Redux/Store/Store';

// const ConfirmSelection = ({navigation}) => {
//   const dispatch = useDispatch();
//   const passengerStatus = useSelector(state => state.webSocket.passengerStatus);
//   const passengerState = useSelector(state => state.passenger);
//   const webSocketState = useSelector(state => state.webSocket);
//   const [isLoading, setIsLoading] = useState(false);
//   const {destination, user, Vehicle, originLocation} = passengerState;
//   const [findDriver, setFindDriver] = useState(false);
//   const driver = webSocketState?.driver;

//   const handleFindDriver = () => {
//     try {
//       if (!Vehicle || !destination || !originLocation) {
//         throw new Error('Please select places and vehicles');
//       }
//       setFindDriver(false);
//       setIsLoading(false);
//       setTimeout(() => {
//         setIsLoading(true);
//         setFindDriver(true);
//         sendRequestToDriver(passengerState, setFindDriver, setIsLoading);
//       }, 0);
//     } catch (error) {
//       setFindDriver(false);
//       setIsLoading(false);
//       errorHandler(error);
//     }
//   };

//   useEffect(() => {
//     if (driver && passengerStatus === 'journey started') {
//       setIsLoading(false);
//       navigate('Journey Process'); // You need to import the navigate function or use the navigation prop
//     }
//   }, [driver]);

//   return (
//     <View style={styles.container}>
//       <Text>
//         Dear {user?.data?.passengerFullName}, please confirm your journey
//         selection
//       </Text>
//       <Text>Standing at: {originLocation?.description}</Text>
//       <Text>Destination: {destination?.description}</Text>
//       <Text>
//         Vehicle: {Vehicle?.vehicleTypeName} with a capacity of
//         {Vehicle?.carryingCapacity}
//       </Text>

//       {findDriver
//         ? null
//         : passengerStatus === 'Confirm Selection' && (
//             <View style={styles.buttonWrapper}>
//               <Button onPress={handleFindDriver} title="Confirm Selection" />
//               <Button
//                 title="Back to Selection"
//                 onPress={() =>
//                   dispatch(addPassengerStatus('Select places and Vehicles'))
//                 }
//               />
//             </View>
//           )}

//       {isLoading && (
//         <View style={styles.activityBar}>
//           <ActivityIndicator size="small" />
//         </View>
//       )}

//       {(passengerStatus === 'requested' || passengerStatus === 'waiting') && (
//         <View>
//           <Text>Please wait, we are looking for a driver....</Text>
//           <Button
//             onPress={() => {
//               dispatch(addGoBackTo(passengerStatus));
//               dispatch(addPassengerStatus('cancel request'));
//             }}
//             title="Cancel Request"
//           />
//         </View>
//       )}
//     </View>
//   );
// };

// export default ConfirmSelection;
