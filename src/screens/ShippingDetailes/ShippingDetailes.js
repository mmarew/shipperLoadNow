// import React, { useEffect, useState } from 'react';
// import { View, TouchableOpacity, ScrollView, Pressable } from 'react-native';
// import { Text, TextInput } from 'react-native-paper';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { useDispatch, useSelector } from 'react-redux';

// import { updateShipableItem } from '../../Redux/slices/PassengerSlice';
// import BackArrow from '../../Components/BackArrow/BackArrow';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import createColorStyles from './ShippingDetailes.style';
// import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
// import getAppsGlobalStyles from '../../GlobalStyles/AppsGlobalStyles';

// export default function ShippingDetailes({ navigation, setShowComponent }) {
//   const GlobalStyles = getAppsGlobalStyles();
//   const ColorStyles = getAppsColorStyles();
//   const styles = createColorStyles();
//   const dispatch = useDispatch();
//   const { shippableItem } = useSelector(state => state.passengerSlices);
//   const [showDatePicker, setShowDatePicker] = useState({
//     shippingDate: false,
//     deliveryDate: false,
//   });

//   const [errors, setErrors] = useState({
//     itemName: '',
//     quantity: '',
//     shippingCost: '',
//     shippingDate: '',
//     deliveryDate: '',
//   });

//   const [inputsFocus, setInputsFocus] = useState({
//     itemName: false,
//     quantity: false,
//     shippingCost: false,
//     shippingDate: false,
//     deliveryDate: false,
//   });

//   useEffect(() => {
//     const updates = {};
//     if (!shippableItem?.shippingDate)
//       updates.shippingDate = new Date().toISOString();

//     if (!shippableItem?.deliveryDate)
//       updates.deliveryDate = new Date().toISOString();

//     if (Object.keys(updates).length > 0) {
//       dispatch(updateShipableItem(updates));
//     }
//   }, [shippableItem]);

//   const handleShowDatePickers = target => {
//     console.log('@handleShowDatePickers target', target);
//     setShowDatePicker(prev => ({
//       ...prev,
//       [`${target}Date`]: true,
//     }));
//   };

//   const validateInputs = () => {
//     let valid = true;
//     const name = shippableItem?.shippableItemName?.trim();
//     const qty = shippableItem?.shippableItemQtyInQuintal;
//     const cost = shippableItem?.shippingCost;
//     const shipDate = shippableItem?.shippingDate
//       ? new Date(shippableItem.shippingDate)
//       : null;
//     const destDate = shippableItem?.deliveryDate
//       ? new Date(shippableItem.deliveryDate)
//       : null;

//     const newErrors = {
//       itemName: '',
//       quantity: '',
//       shippingCost: '',
//       shippingDate: '',
//       deliveryDate: '',
//     };

//     if (!shipDate || isNaN(shipDate)) {
//       newErrors.shippingDate = 'Shipping date is required.';
//       valid = false;
//     }

//     if (!destDate || isNaN(destDate)) {
//       newErrors.deliveryDate = 'Destination date is required.';
//       valid = false;
//     }

//     if (!name) {
//       newErrors.itemName = 'Item name is required.';
//       valid = false;
//     }

//     if (!qty || isNaN(qty)) {
//       newErrors.quantity = 'Valid quantity is required.';
//       valid = false;
//     }

//     if (cost === '' || isNaN(cost)) {
//       newErrors.shippingCost = 'Shipping cost is required.';
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleSubmit = () => {
//     if (validateInputs()) {
//       navigation.navigate('List Of Vehicles');
//     }
//   };

//   return (
//     <KeyboardAwareScrollView
//       extraScrollHeight={150}
//       enableOnAndroid={true}
//       contentContainerStyle={styles.scrollContainer}
//     >
//       <ScrollView keyboardShouldPersistTaps="handled">
//         <View style={styles.container}>
//           <View style={styles.headerWrapper}>
//             <BackArrow
//               showComponent="Pick up and destination"
//               setShowComponent={setShowComponent}
//               navigateTo={'Pick up and destination'}
//               description={'Shipping Detailes'}
//             />
//           </View>
//           <View style={styles.formWrapper}>
//             <Pressable onPress={() => handleShowDatePickers('shipping')}>
//               <View
//                 style={[
//                   styles.fakeInput,
//                   inputsFocus.shippingDate && {
//                     borderColor: ColorStyles.focused,
//                   },
//                 ]}
//               >
//                 <Text style={styles.label}>Shipping Date *</Text>
//                 <Text style={styles.inputText}>
//                   {shippableItem?.shippingDate
//                     ? new Date(shippableItem.shippingDate).toDateString()
//                     : 'Select Date'}
//                 </Text>
//               </View>
//             </Pressable>

//             {/* DateTime Pickers */}
//             {showDatePicker.shippingDate && (
//               <DateTimePicker
//                 mode="date"
//                 value={
//                   shippableItem?.shippingDate
//                     ? new Date(shippableItem.shippingDate)
//                     : new Date() // Default to current date
//                 }
//                 display="inline"
//                 onChange={(event, date) => {
//                   if (date) {
//                     dispatch(
//                       updateShipableItem({ shippingDate: date.toISOString() }),
//                     ); // Ensure proper state update
//                     setShowDatePicker({
//                       shippingDate: false,
//                       deliveryDate: false,
//                     });
//                   }
//                 }}
//               />
//             )}

//             {errors.shippingDate && (
//               <Text style={{ color: ColorStyles.errorColor }}>
//                 {errors.shippingDate}
//               </Text>
//             )}

//             {/* Destination Date */}
//             {/* import { Pressable, View, Text, StyleSheet } from 'react-native'; */}

//             <Pressable onPress={() => handleShowDatePickers('delivery')}>
//               <View
//                 style={[
//                   styles.fakeInput,
//                   inputsFocus.deliveryDate && {
//                     borderColor: ColorStyles.focused,
//                   },
//                 ]}
//               >
//                 <Text
//                   style={[
//                     styles.label,
//                     inputsFocus.deliveryDate && { color: ColorStyles.focused },
//                   ]}
//                 >
//                   Delivery Date *
//                 </Text>
//                 <Text style={styles.inputText}>
//                   {shippableItem?.deliveryDate
//                     ? new Date(shippableItem.deliveryDate).toDateString()
//                     : 'Select Date'}
//                 </Text>
//               </View>
//             </Pressable>

//             {errors.deliveryDate && (
//               <Text style={{ color: ColorStyles.errorColor }}>
//                 {errors.deliveryDate}
//               </Text>
//             )}

//             {showDatePicker.deliveryDate && (
//               <DateTimePicker
//                 mode="date"
//                 value={
//                   shippableItem?.deliveryDate
//                     ? new Date(shippableItem.deliveryDate)
//                     : new Date()
//                 }
//                 display="inline"
//                 onChange={(e, date) => {
//                   console.log('@onChange date', date?.toISOString());
//                   setShowDatePicker({
//                     shippingDate: false,
//                     deliveryDate: false,
//                   });
//                   if (date) {
//                     dispatch(
//                       updateShipableItem({ deliveryDate: date.toISOString() }),
//                     );
//                     setErrors(prev => ({ ...prev, deliveryDate: '' }));
//                   }
//                 }}
//               />
//             )}

//             {/* Item Name */}
//             <TextInput
//               outlineStyle={[
//                 GlobalStyles.inputsOutlineStyle,
//                 inputsFocus.itemName
//                   ? { borderColor: ColorStyles.focused }
//                   : {},
//               ]}
//               activeOutlineColor={ColorStyles.brandColor}
//               label={
//                 <Text
//                   style={[
//                     GlobalStyles.inputLable,
//                     inputsFocus.itemName ? { color: ColorStyles.focused } : {},
//                   ]}
//                 >
//                   Items Name *
//                 </Text>
//               }
//               onBlur={() =>
//                 setInputsFocus(prev => ({ ...prev, itemName: false }))
//               }
//               onFocus={() => {
//                 console.log('@inputsFocus', inputsFocus);
//                 setInputsFocus(prev => ({ ...prev, itemName: true }));
//               }}
//               contentStyle={GlobalStyles.inputContentstyle}
//               mode="outlined"
//               style={styles.inputStyles}
//               value={shippableItem?.shippableItemName || ''}
//               onChangeText={text =>
//                 dispatch(updateShipableItem({ shippableItemName: text.trim() }))
//               }
//               // label="Item Name *"
//             />
//             {errors.itemName && (
//               <Text style={{ color: ColorStyles.errorColor }}>
//                 {errors?.itemName}
//               </Text>
//             )}
//             {/* qty */}
//             <TextInput
//               outlineStyle={[
//                 GlobalStyles.inputsOutlineStyle,
//                 inputsFocus.quantity
//                   ? { borderColor: ColorStyles.focused }
//                   : {},
//               ]}
//               activeOutlineColor={ColorStyles.focused}
//               label={
//                 <Text
//                   style={[
//                     GlobalStyles.inputLable,
//                     inputsFocus.quantity ? { color: ColorStyles.focused } : {},
//                   ]}
//                 >
//                   Quantity
//                 </Text>
//               }
//               onBlur={() =>
//                 setInputsFocus(prev => ({ ...prev, quantity: false }))
//               }
//               onFocus={() =>
//                 setInputsFocus(prev => ({ ...prev, quantity: true }))
//               }
//               contentStyle={GlobalStyles.inputContentstyle}
//               mode="outlined"
//               style={styles.inputStyles}
//               keyboardType="numeric"
//               value={shippableItem?.shippableItemQtyInQuintal?.toString() ?? ''}
//               onChangeText={text => {
//                 console.log('@text text', text);
//                 if (isNaN(text)) {
//                   setErrors(prev => ({
//                     ...prev,
//                     quantity: 'Valid quantity is required.',
//                   }));
//                 } else {
//                   dispatch(
//                     updateShipableItem({
//                       shippableItemQtyInQuintal:
//                         text === '' ? '' : Number(text),
//                     }),
//                   );
//                   setErrors(prev => ({ ...prev, quantity: '' }));
//                 }
//               }}
//               // label="Quantity in Quintal *"
//             />
//             {errors.quantity && (
//               <Text style={{ color: ColorStyles.errorColor }}>
//                 {errors.quantity}
//               </Text>
//             )}
//             {/* Shipping Cost */}
//             <TextInput
//               outlineStyle={[
//                 GlobalStyles.inputsOutlineStyle,
//                 inputsFocus.shippingCost
//                   ? { borderColor: ColorStyles.focused }
//                   : {},
//               ]}
//               activeOutlineColor={ColorStyles.focused}
//               label={
//                 <Text
//                   style={[
//                     GlobalStyles.inputLable,
//                     inputsFocus.shippingCost
//                       ? { color: ColorStyles.focused }
//                       : {},
//                   ]}
//                 >
//                   Shipping Cost
//                 </Text>
//               }
//               onBlur={() =>
//                 setInputsFocus(prev => ({ ...prev, shippingCost: false }))
//               }
//               onFocus={() =>
//                 setInputsFocus(prev => ({ ...prev, shippingCost: true }))
//               }
//               contentStyle={GlobalStyles.inputContentstyle}
//               mode="outlined"
//               style={styles.inputStyles}
//               value={shippableItem?.shippingCost?.toString() ?? ''}
//               onChangeText={text => {
//                 dispatch(
//                   updateShipableItem({
//                     shippingCost: text === '' ? '' : Number(text),
//                   }),
//                 );
//                 setErrors(prev => ({ ...prev, shippingCost: '' }));
//               }}
//               keyboardType="numeric"
//             />
//             {errors.shippingCost && (
//               <Text style={{ color: ColorStyles.errorColor }}>
//                 {errors.shippingCost}
//               </Text>
//             )}

//             {/* Submit Button */}
//             {shippableItem?.shippableItemName &&
//               shippableItem?.shippableItemQtyInQuintal &&
//               shippableItem?.shippingCost &&
//               shippableItem?.shippingDate &&
//               shippableItem?.deliveryDate && (
//                 <TouchableOpacity
//                   onPress={() => {
//                     setShowComponent('List Of Vehicles');
//                   }}
//                   style={GlobalStyles.button}
//                 >
//                   <Text style={GlobalStyles.buttonText}>
//                     {'Select Vehicle Types'}
//                   </Text>
//                 </TouchableOpacity>
//               )}
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAwareScrollView>
//   );
// }
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { updateShipableItem } from '../../Redux/slices/PassengerSlice';
import BackArrow from '../../Components/BackArrow/BackArrow';
import createColorStyles from './ShippingDetailes.style';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
import getAppsGlobalStyles from '../../GlobalStyles/AppsGlobalStyles';
import { useColorScheme } from 'react-native';

export default function ShippingDetailes({ navigation, setShowComponent }) {
  const colorScheme = useColorScheme(); // 'light' or 'dark'

  const GlobalStyles = getAppsGlobalStyles();
  const ColorStyles = getAppsColorStyles();
  const styles = createColorStyles();
  const dispatch = useDispatch();

  const [allFieldsAreFullFieled, setAllFieldsAreFullFieled] = useState(false);
  const { shippableItem } = useSelector(state => state.passengerSlices);

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

  const [inputsFocus, setInputsFocus] = useState({
    itemName: false,
    quantity: false,
    shippingCost: false,
    shippingDate: false,
    deliveryDate: false,
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
      dispatch(updateShipableItem({ [`${type}Date`]: date.toISOString() }));
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
              description="Shipping Detailes"
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
                      updateShipableItem({ [key]: text === '' ? '' : value }),
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
