import { View, Text } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ShowShippableItems.style';
import { formatShortDate } from '../../utils/Formatter/Formatter';

const ShowShippableItems = () => {
  const passengerSlices = useSelector(state => state.passengerSlices);
  const passenger = passengerSlices?.passenger;
  const shippableItem = passengerSlices?.shippableItem;
  const decision = passengerSlices?.decision?.[0];
  const journeyStatusId = passenger?.journeyStatusId;
  const listofJourneyStatus = passengerSlices?.listofJourneyStatus;

  return (
    <View style={{ ...styles.container }}>
      <View style={styles.row}>
        <Text style={styles.label}>Item Name : </Text>
        <Text style={styles.value}>
          {passenger?.shippableItemName || shippableItem?.shippableItemName}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>QTY In Quintal : </Text>
        <Text style={styles.value}>
          {passenger?.shippableItemQtyInQuintal ||
            shippableItem?.shippableItemQtyInQuintal}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Cost : </Text>
        <Text style={styles.value}>
          {
            !journeyStatusId //journeyStatusId is null or undefined in case of waiting in this case set passengers given shipping cost which is found in shippableItem
              ? shippableItem?.shippingCost
              : journeyStatusId < listofJourneyStatus?.acceptedByDriver // here journeyStatusId is 1 or 2  and shippingCost is found in passenger
              ? passenger?.shippingCost
              : decision?.shippingCostByDriver //her driver accepted request and seted it own price
          }
          {/* {passenger?.shippingCost || shippableItem?.shippingCost} */}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Shipping Date : </Text>
        <Text style={styles.value}>
          {formatShortDate(
            passenger?.shippingDate || shippableItem?.shippingDate,
          )}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Delivery Date : </Text>
        <Text style={styles.value}>
          {formatShortDate(
            passenger?.deliveryDate || shippableItem?.deliveryDate,
          )}
        </Text>
      </View>
    </View>
  );
};

export default ShowShippableItems;
