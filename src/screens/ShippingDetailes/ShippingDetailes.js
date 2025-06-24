import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch, useSelector} from 'react-redux';

import styles from './ShippingDetailes.style';
import GlobalStyles from '../../GlobalStyles/GlobalStyles';
import {updateShipableItem} from '../../Redux/slices/PassengerSlice';
import BackArrow from '../../Components/BackArrow/BackArrow';

export default function ShippingDetailes({navigation, setShowComponent}) {
  const dispatch = useDispatch();
  const {shippableItem} = useSelector(state => state.passengerSlices);
  const [showDatePicker, setShowDatePicker] = useState({
    shippingDate: false,
    deliveryDate: false,
  });

  const [errors, setErrors] = useState({
    itemName: '',
    quantity: '',
    shippingCost: '',
    shippingDate: '',
    deliveryDate: '',
  });

  useEffect(() => {
    const updates = {};
    if (!shippableItem?.shippingDate)
      updates.shippingDate = new Date().toISOString();

    if (!shippableItem?.deliveryDate)
      updates.deliveryDate = new Date().toISOString();

    if (Object.keys(updates).length > 0) {
      dispatch(updateShipableItem(updates));
    }
  }, [shippableItem]);

  const handleShowDatePickers = target => {
    setShowDatePicker(prev => ({
      ...prev,
      [`${target}Date`]: true,
    }));
  };

  const validateInputs = () => {
    let valid = true;
    const name = shippableItem?.shippableItemName?.trim();
    const qty = shippableItem?.shippableItemQtyInQuintal;
    const cost = shippableItem?.shippingCost;
    const shipDate = shippableItem?.shippingDate
      ? new Date(shippableItem.shippingDate)
      : null;
    const destDate = shippableItem?.deliveryDate
      ? new Date(shippableItem.deliveryDate)
      : null;

    const newErrors = {
      itemName: '',
      quantity: '',
      shippingCost: '',
      shippingDate: '',
      deliveryDate: '',
    };

    if (!shipDate || isNaN(shipDate)) {
      newErrors.shippingDate = 'Shipping date is required.';
      valid = false;
    }

    if (!destDate || isNaN(destDate)) {
      newErrors.deliveryDate = 'Destination date is required.';
      valid = false;
    }

    if (!name) {
      newErrors.itemName = 'Item name is required.';
      valid = false;
    }

    if (!qty || isNaN(qty)) {
      newErrors.quantity = 'Valid quantity is required.';
      valid = false;
    }

    if (cost === '' || isNaN(cost)) {
      newErrors.shippingCost = 'Shipping cost is required.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      navigation.navigate('List Of Vehicles');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.headerWrapper}>
            <BackArrow
              showComponent="Pick up and destination"
              setShowComponent={setShowComponent}
              navigateTo={'Pick up and destination'}
              description={'Shipping Detailes'}
            />
          </View>
          <View style={styles.formWrapper}>
            {/* Shipping Date */}
            <TouchableOpacity onPress={() => handleShowDatePickers('shipping')}>
              <TextInput
                mode="outlined"
                style={styles.inputStyles}
                label="Select Shipping Date *"
                value={
                  shippableItem?.shippingDate
                    ? new Date(shippableItem.shippingDate).toDateString()
                    : ''
                }
                showSoftInputOnFocus={false}
                editable={false}
              />
            </TouchableOpacity>
            {errors.shippingDate && (
              <Text style={{color: 'red'}}>{errors.shippingDate}</Text>
            )}

            {/* Destination Date */}
            <TouchableOpacity onPress={() => handleShowDatePickers('delivery')}>
              <TextInput
                mode="outlined"
                style={styles.inputStyles}
                label="Select Delivery Date *"
                value={
                  shippableItem?.deliveryDate
                    ? new Date(shippableItem.deliveryDate).toDateString()
                    : ''
                }
                showSoftInputOnFocus={false}
                editable={false}
              />
            </TouchableOpacity>
            {errors.deliveryDate && (
              <Text style={{color: 'red'}}>{errors.deliveryDate}</Text>
            )}

            {/* DateTime Pickers */}
            {showDatePicker.shippingDate && (
              <DateTimePicker
                mode="date"
                value={
                  shippableItem?.shippingDate
                    ? new Date(shippableItem.shippingDate)
                    : new Date() // Default to current date
                }
                display="default"
                onChange={(event, date) => {
                  if (date) {
                    dispatch(
                      updateShipableItem({shippingDate: date.toISOString()}),
                    ); // Ensure proper state update
                    setShowDatePicker({
                      shippingDate: false,
                      deliveryDate: false,
                    });
                  }
                }}
              />
            )}
            {showDatePicker.deliveryDate && (
              <DateTimePicker
                mode="date"
                value={
                  shippableItem?.deliveryDate
                    ? new Date(shippableItem.deliveryDate)
                    : new Date()
                }
                display="default"
                onChange={(e, date) => {
                  console.log('@onChange date', date?.toISOString());
                  setShowDatePicker({
                    shippingDate: false,
                    deliveryDate: false,
                  });
                  if (date) {
                    dispatch(
                      updateShipableItem({deliveryDate: date.toISOString()}),
                    );
                    setErrors(prev => ({...prev, deliveryDate: ''}));
                  }
                }}
              />
            )}

            {/* Item Name */}
            <TextInput
              mode="outlined"
              style={styles.inputStyles}
              value={shippableItem?.shippableItemName || ''}
              onChangeText={text =>
                dispatch(updateShipableItem({shippableItemName: text.trim()}))
              }
              label="Item Name *"
            />
            {errors.itemName && (
              <Text style={{color: 'red'}}>{errors?.itemName}</Text>
            )}
            {/* qty */}
            <TextInput
              mode="outlined"
              style={styles.inputStyles}
              keyboardType="numeric"
              value={shippableItem?.shippableItemQtyInQuintal?.toString() ?? ''}
              onChangeText={text => {
                if (text === '' || isNaN(text)) {
                  setErrors(prev => ({
                    ...prev,
                    quantity: 'Valid quantity is required.',
                  }));
                } else {
                  dispatch(
                    updateShipableItem({
                      shippableItemQtyInQuintal:
                        text === '' ? '' : Number(text),
                    }),
                  );
                  setErrors(prev => ({...prev, quantity: ''}));
                }
              }}
              label="Quantity in Quintal *"
            />
            {errors.quantity && (
              <Text style={{color: 'red'}}>{errors.quantity}</Text>
            )}
            {/* Shipping Cost */}
            <TextInput
              mode="outlined"
              style={styles.inputStyles}
              value={shippableItem?.shippingCost?.toString() ?? ''}
              onChangeText={text => {
                dispatch(
                  updateShipableItem({
                    shippingCost: text === '' ? '' : Number(text),
                  }),
                );
                setErrors(prev => ({...prev, shippingCost: ''}));
              }}
              keyboardType="numeric"
              label="Shipping Cost in ETB *"
            />
            {errors.shippingCost && (
              <Text style={{color: 'red'}}>{errors.shippingCost}</Text>
            )}

            {/* Submit Button */}
            {shippableItem?.shippableItemName &&
              shippableItem?.shippableItemQtyInQuintal &&
              shippableItem?.shippingCost &&
              shippableItem?.shippingDate &&
              shippableItem?.deliveryDate && (
                <TouchableOpacity
                  onPress={() => {
                    // handleSubmit();
                    setShowComponent('List Of Vehicles');
                  }}
                  style={GlobalStyles.button}>
                  <Text style={GlobalStyles.buttonText}>
                    {'Select Vehicle Types'}
                  </Text>
                </TouchableOpacity>
              )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
