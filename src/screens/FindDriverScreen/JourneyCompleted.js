// import React from 'react';
// import {View, Text} from 'react-native';
// import {useSelector} from 'react-redux';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import PaymentSummary from '../../Components/PaymentSummary/PaymentSummary';

// const CurrentScreen = () => (
//   <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//     <Text>Current Journey</Text>
//   </View>
// );

// const HistoryScreen = () => (
//   <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//     <Text>Journey History</Text>
//   </View>
// );

// const Tab = createBottomTabNavigator();

// const JourneyCompleted = () => {
//   const passengerSlices = useSelector(state => state.passengerSlices);
//   const passengerStatus = passengerSlices?.passengerStatus;
//   const listOfJourneyStatus = passengerSlices?.listOfJourneyStatus;
//   console.log('@JourneyCompleted listOfJourneyStatus', listOfJourneyStatus);
//   return (
//     <View style={{flex: 1, backgroundColor: 'red'}}>
//       {passengerStatus === listOfJourneyStatus?.journeyCompleted ? (
//         <PaymentSummary />
//       ) : (
//         // <NavigationContainer>
//         <Tab.Navigator screenOptions={{headerShown: false}}>
//           <Tab.Screen name="Current" component={CurrentScreen} />
//           <Tab.Screen name="History" component={HistoryScreen} />
//         </Tab.Navigator>
//         // </NavigationContainer>
//       )}
//     </View>
//   );
// };

// export default JourneyCompleted;
