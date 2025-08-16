// import {View, Text, Button} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import PassengerMap from '../../Components/PassengerMap/PassengerMap';
// import Styles from './Style';
// import styles from './Style';
// import {useSelector} from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const JournyProcess = ({navigation}) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const webSocket = useSelector(state => state.webSocket);
//   const isConnected = webSocket?.isConnected;
//   const driverInfo = webSocket?.driver;
//   const getToken = async () => {
//     const PassengersToken = await AsyncStorage.getItem('PassengersToken');
//   };
//   useEffect(() => {
//     getToken();
//   }, []);

//   useEffect(() => {
//     if (isConnected) {
//       handleSendMessage();
//       setIsLoading(false);
//       return;
//     }
//     setIsLoading(false);
//   }, [isConnected]);

//   const handleSendMessage = () => {
//     sendMessage(JSON.stringify(driverInfo));
//   };

//   return (
//     <View style={Styles.processWrapper}>
//       <View style={styles.mapContainer}>
//         <PassengerMap />
//       </View>
//       <View style={styles?.infoContainer}>
//         {isLoading ? (
//           <Text>Looking for driver...</Text>
//         ) : (
//           <View>
//             <Text>Driver Name: {driverInfo?.fullName}</Text>
//             <Text>Phone Number: {driverInfo?.phoneNumber}</Text>
//             <Text>Vehicle Type: {driverInfo?.vecheleType}</Text>
//             <View>
//               {/* <Button onPress={cancelCurrentRequest} title="Cancel" /> */}
//             </View>
//           </View>
//         )}
//       </View>
//     </View>
//   );
// };

// export default JournyProcess;
