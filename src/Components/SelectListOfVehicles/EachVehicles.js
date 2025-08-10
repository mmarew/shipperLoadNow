import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native';
import API_URL_AXIOS from '../../services/AxiosServices';
import {useSelector} from 'react-redux';
import {
  calculateEstimatedMoney,
  formatETB,
} from '../../utils/Calculate/Calculate';
import {SvgUri} from 'react-native-svg';
import styles from './EachVehicles.css';
import {showErrorToast} from '../../utils/ToastDisplayer/toastDisplayer';
import {findScreenDescription} from '../../utils/ScreenManager/ScreenList';
const EachVehicles = ({
  setShowComponent,
  originLocation,
  destination,
  item,
  selectedVehicle,
  setSelectedVehicle,
  navigation,
}) => {
  const [estimatedMoney, setEstimatedMoney] = useState(0);
  useEffect(() => {
    const getMoneyData = async () => {
      const money = await calculateEstimatedMoney({
        tarrifRateForVehicleType: item,
        standingCoords: originLocation,
        destinationCoords: destination,
      });
      setEstimatedMoney(money);
    };
    if (item && originLocation && destination) getMoneyData();
  }, [item, originLocation, destination]);

  const selectVehicles = () => {
    setShowComponent('List Of Vehicles');
    // if (navigation) return navigation.navigate('List Of Vehicles');
    const newSelectedVehicle = {...item}; // create a new object to ensure different reference
    setSelectedVehicle(newSelectedVehicle);
  };

  const passengerSlices = useSelector(state => state?.passengerSlices);
  const passengerStatus = passengerSlices?.passengerStatus;
  const nochangeOnPress = () => {
    showErrorToast({
      text1: 'error',
      text2: `you can't select vehicle again while you are ${findScreenDescription(
        passengerStatus,
      )}`,
    });
  };
  return (
    <TouchableOpacity
      key={item?.vehicleTypeName}
      onPress={passengerStatus == null ? selectVehicles : nochangeOnPress}
      style={[
        styles.vehicleItem,
        selectedVehicle?.vehicleTypeName === item?.vehicleTypeName
          ? styles.selectedVehicle
          : null,
      ]}>
      {/* const iconName=item?.vehicleTypeIconName */}
      {!item?.vehicleTypeIconName?.endsWith('.svg') ? (
        <Image
          source={{
            uri: `${API_URL_AXIOS}/uploads/${item?.vehicleTypeIconName}`,
          }}
          style={styles.vehicleImage}
        />
      ) : (
        <SvgUri
          uri={`${API_URL_AXIOS}/uploads/${item?.vehicleTypeIconName}`}
          width={50} // Set desired width
          height={50} // Set desired height
        />
      )}
      <View style={styles.vehicleInfo}>
        <Text style={styles.vehicleTitle}>{item?.vehicleTypeName}</Text>
        <Text style={styles.vehicleDescription}>
          Best for items up to {item?.carryingCapacity}
        </Text>
      </View>
      {/* {originLocation && destination && (
        <Text style={styles.vehiclePrice}>{formatETB(estimatedMoney)} </Text>
      )} */}
    </TouchableOpacity>
  );
};

export default EachVehicles;
