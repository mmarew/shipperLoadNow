// import React, {useEffect} from 'react';
// import {ScrollView, Text, View} from 'react-native';
// import PassangerMap from '../../Components/PassangerMap/PassangerMap';
// import PickupAndDestinationDisplayer from '../../Components/PickUpAndDestination/PickupAndDestinationDisplayer';
// import styles from './HomeScreen.style';
// import GlobalStyles from '../../GlobalStyles/GlobalStyles';
// import {useSelector} from 'react-redux';
// import ButtonSelectCar from '../../Components/Buttons/SelectCar/ButoonSelectCar';
// import ButtonNavigateToScreens from '../../Components/Buttons/ButtonNavigateToScreens/ButtonNavigateToScreens';
// const HomeScreen = ({navigation}) => {
//   const passengerSlices = useSelector(state => state?.passengerSlices);
//   const {destination, originLocation, selectedVechelesType} = passengerSlices;
//   const passengerStatus = passengerSlices?.passengerStatus;

//   return (
//     <ScrollView>
//       <PassangerMap mapHeight={0.46} />

//       {/* Bottom Container */}
//       <View style={styles.bottomContainer}>
//         <Text style={GlobalStyles.title}>Where would you like to travel?</Text>
//         <PickupAndDestinationDisplayer
//           navigateTo="Pick up and destination"
//           navigation={navigation}
//           listOfJourneyPoints={[{origin: originLocation, destination}]}
//         />
//         {/* Select Car Button */}
//         {passengerStatus === null ? (
//           <ButtonSelectCar navigation={navigation} />
//         ) : (
//           <ButtonNavigateToScreens />
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// export default HomeScreen;
