import {View, Text, Linking, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './DriverInfo.style';
import API_URL_AXIOS from '../../services/AxiosServices';
import Ionicons from 'react-native-vector-icons/Ionicons'; // For the call icon
import {createDateFormatter} from '../../utils/Formatter/Formatter';

const DiverCard = ({driverInfo}) => {
  //   const passengerSlices = useSelector(state => state.passengerSlices);
  //   const driverInfo = passengerSlices?.driver;
  const driver = driverInfo?.driver;
  const createdAt = driver?.createdAt;
  const handleCall = () => {
    if (driver.phoneNumber) {
      Linking.openURL(`tel:${driver.phoneNumber}`);
    } else {
      console.warn('Phone number is not available');
    }
  };
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardProfileContainer}>
        <Image
          source={{
            uri: `${API_URL_AXIOS}/uploads/${driver?.driverProfilePhoto}`,
            // You can replace this with your driver's image URI
          }}
          style={styles.avatar}
        />
        <View style={styles.driverInfo}>
          <Text style={styles.driverName}>{driver?.fullName}</Text>
          <Text> Member since {createDateFormatter()(createdAt)}</Text>
        </View>

        {/* Call button */}
        <TouchableOpacity onPress={handleCall} style={styles.callButton}>
          <Ionicons name="call-outline" size={24} color="#0ea5e9" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DiverCard;
