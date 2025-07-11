import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import styles from './PaymentSummary.style';
import ColorStyles from '../../GlobalStyles/Color.styles';
import store from '../../Redux/Store/Store';
import { setSelectedScreen } from '../../Redux/slices/PassengerSlice';
import verifyPassengerStatus from '../../utils/VerifyPassengerStatus/VerifyPassengerStatus';
import { ActivityIndicator } from 'react-native-paper';

const PaymentSummary = () => {
  const passengerSlices = useSelector(state => state.passengerSlices);
  const driver = passengerSlices?.driver;
  const vehicleOfDriver = driver?.vehicle;
  const decision = passengerSlices?.decision;
  const tax = 0;
  const fare = decision?.shippingCostByDriver;
  const [isLoading, setIsLoading] = useState(false);
  if (!fare)
    return (
      <View style={styles.container}>
        <Text style={{ color: ColorStyles.errorColor }}>
          No payment data found{' '}
        </Text>
      </View>
    );
  if (isLoading) return <ActivityIndicator size="large" color="#6200ee" />;

  return (
    <View style={styles.container}>
      {/* Ride and Payment Info */}
      <View style={styles.rowContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Ride</Text>
          <Text style={styles.value}>{vehicleOfDriver?.vehicleTypeName}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Payment Method</Text>
          <Text style={styles.value}>On Cash</Text>
        </View>
      </View>

      {/* Trip Fare, Tax, Total Paid */}
      <View style={styles.priceContainer}>
        <View style={styles.priceRow}>
          <Text style={styles.label}>Trip Fare</Text>
          <Text style={styles.value}>{fare} ETB</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.label}>Tax</Text>
          <Text style={styles.value}>{tax} ETB</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.label}>Total Paid</Text>
          <Text style={styles.value}>{tax + Number(fare)} ETB</Text>
        </View>
      </View>

      {/* Cancel Request Button */}
      <TouchableOpacity
        onPress={async () => {
          setIsLoading(true);
          await verifyPassengerStatus();
          store.dispatch(setSelectedScreen('Home'));
          setIsLoading(false);
        }}
        style={styles.doneButton}
      >
        <Text style={styles.cancelButtonText}>Done </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentSummary;
