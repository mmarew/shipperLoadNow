import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { updateShippableItem } from '../../Redux/slices/PassengerSlice';
import BackArrow from '../../Components/BackArrow/BackArrow';
import createColorStyles from './ShippingDetails.style';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
import getAppsGlobalStyles from '../../GlobalStyles/AppsGlobalStyles';
import { useColorScheme } from 'react-native';

export default function ShippingDetails({ navigation, setShowComponent }) {
  const colorScheme = useColorScheme(); // 'light' or 'dark'

  const GlobalStyles = getAppsGlobalStyles();
  const ColorStyles = getAppsColorStyles();
  const styles = createColorStyles();
  const dispatch = useDispatch();

  const { shippableItem } = useSelector(state => state.passengerSlices);
  console.log('@shippableItem', shippableItem);
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
    numberOfVehicles: '',
  });

  const [inputsFocus, setInputsFocus] = useState({
    itemName: false,
    quantity: false,
    shippingCost: false,
    shippingDate: false,
    deliveryDate: false,
    numberOfVehicles: false,
  });

  useEffect(() => {
    const updates = {};
    if (!shippableItem?.shippingDate)
      updates.shippingDate = new Date().toISOString();
    if (!shippableItem?.deliveryDate)
      updates.deliveryDate = new Date().toISOString();
    if (Object.keys(updates).length > 0) {
      dispatch(updateShippableItem(updates));
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
    const shippableItemName = shippableItem?.shippableItemName?.trim();
    const shippableItemQtyInQuintal = shippableItem?.shippableItemQtyInQuintal;
    const shippingCost = shippableItem?.shippingCost;
    const shippingDate = shippableItem?.shippingDate
      ? new Date(shippableItem.shippingDate)
      : null;
    const deliveryDate = shippableItem?.deliveryDate
      ? new Date(shippableItem.deliveryDate)
      : null;

    const newErrors = {
      shippableItemName: '',

      shippableItemQtyInQuintal: '',
      shippingCost: '',
      shippingDate: '',
      deliveryDate: '',
      numberOfVehicles: '',
    };

    if (!shippingDate || isNaN(shippingDate)) {
      newErrors.shippingDate = 'Shipping date is required.';
      valid = false;
    }

    if (!deliveryDate || isNaN(deliveryDate)) {
      newErrors.deliveryDate = 'Destination date is required.';
      valid = false;
    }

    if (!shippableItemName) {
      newErrors.shippableItemName = 'Item name is required.';
      valid = false;
    }

    if (!shippableItemQtyInQuintal || isNaN(shippableItemQtyInQuintal)) {
      newErrors.shippableItemQtyInQuintal = 'Valid quantity is required.';
      valid = false;
    }

    if (shippingCost === '' || isNaN(shippingCost)) {
      newErrors.shippingCost = 'Shipping cost is required.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleDateChange = (type, date) => {
    if (date) {
      dispatch(updateShippableItem({ [`${type}Date`]: date.toISOString() }));
      setShowDatePicker({ shippingDate: false, deliveryDate: false });
      setErrors(prev => ({ ...prev, [`${type}Date`]: '' }));
    }
  };
  const handleValidationAndGoToNext = () => {
    const valid = validateInputs();
    if (valid) setShowComponent('List Of Vehicles');
  };
  return (
    <KeyboardAwareScrollView
      extraScrollHeight={150}
      enableOnAndroid
      contentContainerStyle={styles.scrollContainer}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.headerWrapper}>
            <BackArrow
              showComponent="Pick up and destination"
              setShowComponent={setShowComponent}
              navigateTo="Pick up and destination"
              description="Shipping Details"
            />
          </View>

          <View style={styles.formWrapper}>
            {['shipping', 'delivery'].map(type => (
              <React.Fragment key={type}>
                <Pressable onPress={() => handleShowDatePickers(type)}>
                  <View
                    style={[
                      styles.fakeInput,
                      inputsFocus[`${type}Date`] && {
                        borderColor: ColorStyles.focused,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.label,
                        inputsFocus[`${type}Date`] && {
                          color: ColorStyles.focused,
                        },
                      ]}
                    >
                      {type === 'shipping'
                        ? 'Shipping Date *'
                        : 'Delivery Date *'}
                    </Text>
                    <Text style={styles.inputText}>
                      {shippableItem?.[`${type}Date`]
                        ? new Date(shippableItem[`${type}Date`]).toDateString()
                        : 'Select Date'}
                    </Text>
                  </View>
                </Pressable>

                {showDatePicker[`${type}Date`] && (
                  <DateTimePicker
                    themeVariant={colorScheme} // 'light' or 'dark'
                    textColor={ColorStyles.textColor} // iOS only
                    style={{
                      backgroundColor:
                        colorScheme === 'dark'
                          ? ColorStyles.darkBGColor
                          : ColorStyles.whiteBGColor,
                    }}
                    mode="date"
                    value={
                      shippableItem?.[`${type}Date`]
                        ? new Date(shippableItem[`${type}Date`])
                        : new Date()
                    }
                    display="inline"
                    onChange={(event, date) => handleDateChange(type, date)}
                  />
                )}

                {errors[`${type}Date`] && (
                  <Text style={{ color: ColorStyles.errorColor }}>
                    {errors[`${type}Date`]}
                  </Text>
                )}
              </React.Fragment>
            ))}

            {[
              { key: 'shippableItemName', label: 'Items Name *' },
              {
                key: 'shippableItemQtyInQuintal',
                label: 'Quantity',
                keyboardType: 'numeric',
              },
              {
                key: 'shippingCost',
                label: 'Shipping Cost',
                keyboardType: 'numeric',
              },
              {
                key: 'numberOfVehicles',
                label: 'Number of Vehicles',
                keyboardType: 'numeric',
              },
            ].map(({ key, label, keyboardType }) => (
              <React.Fragment key={key}>
                <TextInput
                  outlineStyle={[
                    GlobalStyles.inputsOutlineStyle,
                    inputsFocus[key]
                      ? { borderColor: ColorStyles.focused }
                      : {},
                  ]}
                  activeOutlineColor={ColorStyles.brandColor}
                  label={
                    <Text
                      style={[
                        GlobalStyles.inputLable,
                        inputsFocus[key] ? { color: ColorStyles.focused } : {},
                      ]}
                    >
                      {label}
                    </Text>
                  }
                  onBlur={() =>
                    setInputsFocus(prev => ({ ...prev, [key]: false }))
                  }
                  onFocus={() =>
                    setInputsFocus(prev => ({ ...prev, [key]: true }))
                  }
                  contentStyle={GlobalStyles.inputContentstyle}
                  mode="outlined"
                  style={styles.inputStyles}
                  keyboardType={keyboardType}
                  value={shippableItem?.[key]?.toString() ?? ''}
                  onChangeText={text => {
                    const value = keyboardType ? Number(text) : text.trim();
                    dispatch(
                      updateShippableItem({ [key]: text === '' ? '' : value }),
                    );
                    setErrors(prev => ({ ...prev, [key]: '' }));
                  }}
                />
                {errors[key] && (
                  <Text style={{ color: ColorStyles.errorColor }}>
                    {errors[key]}
                  </Text>
                )}
              </React.Fragment>
            ))}

            <TouchableOpacity
              onPress={handleValidationAndGoToNext}
              style={GlobalStyles.button}
            >
              <Text style={GlobalStyles.buttonText}>Select Vehicle Types</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}
