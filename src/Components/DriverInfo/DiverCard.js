import { View, Text, Linking, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import API_URL_AXIOS from '../../services/AxiosServices';
import Ionicons from 'react-native-vector-icons/Ionicons'; // For the call icon
import { createDateFormatter } from '../../utils/Formatter/Formatter';
import ColorStyles from '../../GlobalStyles/Color.styles';
import createColorStyles from './DriverInfo.style';

const DiverCard = ({ driverInfo }) => {
  const styles = createColorStyles();

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
          <Text style={styles.memberSince}>
            {' '}
            Member since {createDateFormatter()(createdAt)}
          </Text>
        </View>

        {/* Call button */}
        <TouchableOpacity onPress={handleCall} style={styles.callButton}>
          <Ionicons
            name="call-outline"
            size={27}
            color={ColorStyles.brandColor}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DiverCard;
