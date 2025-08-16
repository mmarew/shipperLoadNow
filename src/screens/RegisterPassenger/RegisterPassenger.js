import React, { useState, useRef } from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  StatusBar,
  Animated,
  RefreshControl,
} from 'react-native';
import { useDispatch } from 'react-redux';
import TopView from '../Auth/TopView/TopView';
import errorHandler from '../../utils/errorHandler/errorHandler';
import { requestUsingPostMethod } from '../../utils/handleRequestToServer/handleRequestToServer';
import { setRegistrablePassenger } from '../../Redux/slices/PassengerSlice';
import { Text, TextInput } from 'react-native-paper';
import { handlePhoneChange } from '../../utils/Formatter/Formatter';
import { SafeAreaView } from 'react-native-safe-area-context';
import Reload from '../../Components/Reload/Reload';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { triggerShake } from '../../utils/Animations/ShakeAnim';
import ErrorText from '../../Components/ErrorText/ErrorText';
import IconAwesome from '../../Components/Common/CustomFontAwesome/IconAwesome';
import getAppsColorStyles, {
  getAppsBarStyles,
} from '../../GlobalStyles/AppsColorStyles';
import getAppsGlobalStyles from '../../GlobalStyles/AppsGlobalStyles';
import createStyles from './Style';

const RegisterPassenger = ({ navigation }) => {
  const styles = createStyles();
  const GlobalStyles = getAppsGlobalStyles();
  const ColorStyles = getAppsColorStyles();
  const barStyles = getAppsBarStyles();
  const dispatch = useDispatch();
  const shakeAnim = useRef(new Animated.Value(0)).current;

  // State Management
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneCode, setPhoneCode] = useState('+251');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({
    phoneCode: null,
    phoneNumber: null,
    termsAccepted: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => setRefreshing(true);
  const [inputsFocus, setInputsFocus] = useState({
    codeFocus: false,
    phoneFocus: false,
  });

  // Validation Logic
  const validatePhoneCode = code => {
    if (!code) return 'Phone code is required';
    if (!/^\+\d{1,3}$/.test(code)) return 'Invalid phone code format';
    return null;
  };

  const validatePhoneNumber = number => {
    if (!number) return 'Phone number is required';
    if (!/^\d{9}$/.test(number)) return 'Invalid phone number format';
    return null;
  };

  // Form Validation
  const validateForm = () => {
    const phoneCodeError = validatePhoneCode(phoneCode);

    const phoneNumberError = validatePhoneNumber(
      phoneNumber.replace(/\D/g, ''),
    );
    triggerShake(shakeAnim);

    setErrors({ phoneCode: phoneCodeError, phoneNumber: phoneNumberError });
    return !phoneCodeError && !phoneNumberError;
  };

  // Register Function
  const handleRegister = async () => {
    if (!validateForm()) return;

    if (!termsAccepted) {
      setErrors(prev => ({
        ...prev,
        termsAccepted: 'Terms and conditions not accepted',
      }));
      errorHandler(
        new Error('You need to accept the terms and conditions to proceed.'),
      );

      return;
    }

    setIsLoading(true);
    const userData = {
      phoneNumber: phoneCode + phoneNumber.replace(/\D/g, ''),
      roleId: 1,
      statusId: 1,
    };
    console.log('userData', userData);

    try {
      const response = await requestUsingPostMethod({
        url: '/api/user/createUser',
        data: userData,
      });

      if (response.message === 'success') {
        dispatch(setRegistrablePassenger({ userData }));
        navigation.navigate('OTP', { userData });
      } else {
        errorHandler(
          new Error(response.data || 'An error occurred. Please try again.'),
        );
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };
  if (refreshing) return <Reload waitConfirmation={false} />;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: ColorStyles.backgroundColor }}
    >
      <StatusBar
        barStyle={barStyles}
        backgroundColor={ColorStyles.backgroundColor}
      />
      <KeyboardAwareScrollView
        extraScrollHeight={150}
        enableOnAndroid={true}
        style={GlobalStyles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <TopView
          title="Submit Phone Number"
          description="Enter your phone number to activate the app"
        />

        <View style={[styles.bottomSection]}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
            }}
          >
            <TextInput
              outlineStyle={[
                GlobalStyles.inputsOutlineStyle,
                inputsFocus.codeFocus
                  ? { borderColor: ColorStyles.focused }
                  : {},
              ]}
              activeOutlineColor={ColorStyles.brandColor}
              label={
                <Text
                  style={[
                    GlobalStyles.inputLable,
                    inputsFocus.codeFocus
                      ? { color: ColorStyles.textColor }
                      : {},
                  ]}
                >
                  code
                </Text>
              }
              onBlur={() =>
                setInputsFocus({ codeFocus: false, phoneFocus: false })
              }
              onFocus={() =>
                setInputsFocus({ codeFocus: true, phoneFocus: false })
              }
              mode="outlined"
              value={phoneCode}
              onChangeText={setPhoneCode}
              keyboardType="phone-pad"
              error={!!errors.phoneCode}
              style={styles.textInputStyle}
              contentStyle={GlobalStyles.inputContentstyle}
            />
            {/* Phone Number Input */}
            <TextInput
              onBlur={() =>
                setInputsFocus({ codeFocus: false, phoneFocus: false })
              }
              onFocus={() =>
                setInputsFocus({ codeFocus: false, phoneFocus: true })
              }
              contentStyle={GlobalStyles.inputContentstyle}
              outlineStyle={[
                GlobalStyles.inputsOutlineStyle,
                inputsFocus.phoneFocus
                  ? { borderColor: ColorStyles.focused }
                  : {},
              ]}
              activeOutlineColor={ColorStyles.brandColor}
              style={{ ...styles.textInputStyle, flex: 0.99 }}
              mode="outlined"
              label={
                <Text
                  style={[
                    GlobalStyles.inputLable,

                    inputsFocus.phoneFocus
                      ? { color: ColorStyles.textColor }
                      : {},
                  ]}
                >
                  Phone Number *
                </Text>
              }
              value={phoneNumber}
              onChangeText={newText => {
                setErrors(prev => ({ ...prev, phoneNumber: null }));
                handlePhoneChange(newText, setPhoneNumber, phoneNumber);
              }}
              keyboardType="phone-pad"
              error={!!errors.phoneNumber}
            />
          </View>
          {errors.phoneCode && (
            <ErrorText error={errors.phoneCode} shakeAnim={shakeAnim} />
          )}
          {errors.phoneNumber && (
            <ErrorText error={errors.phoneNumber} shakeAnim={shakeAnim} />
          )}

          {/* Terms Checkbox */}
          <View style={GlobalStyles.checkboxContainer}>
            <TouchableOpacity
              style={{ display: 'flex', flexDirection: 'row', gap: 10 }}
              onPress={() => setTermsAccepted(!termsAccepted)}
            >
              <View
                style={{
                  position: 'relative',
                  width: 30,
                  height: 30,
                  borderWidth: 2,
                  borderColor: termsAccepted
                    ? ColorStyles.backgroundColor
                    : ColorStyles.borderColor,
                  borderRadius: 6, // optional
                  backgroundColor: ColorStyles.whiteColor,
                }}
              >
                <View style={{ position: 'absolute', top: -3, left: 0 }}>
                  <IconAwesome
                    style={{ alignSelf: 'center', marginTop: -12 }}
                    color={
                      termsAccepted
                        ? ColorStyles.focused
                        : ColorStyles.whiteColor
                    }
                    size={32}
                    name={termsAccepted ? 'check-square' : 'square'}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <Text style={styles.termsText}>
              By tapping Sign Up, you have read and agree to the {''}
              <Text
                onPress={() => navigation.navigate('Terms And Services')}
                style={GlobalStyles.textLink}
              >
                Terms and Services
              </Text>
            </Text>
          </View>
          {errors.termsAccepted && (
            <ErrorText error={errors.termsAccepted} shakeAnim={shakeAnim} />
          )}

          {/* Register Button */}
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <TouchableOpacity
              style={GlobalStyles.button}
              onPress={handleRegister}
            >
              <Text style={GlobalStyles.buttonText}>
                Submit your Phone Number
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default RegisterPassenger;
