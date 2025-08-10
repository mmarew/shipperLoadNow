import React, {useState} from 'react';
import {
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import GlobalStyles from '../../GlobalStyles/GlobalStyles';
import TopView from '../Auth/TopView/TopView';
import errorHandler from '../../utils/errorHandler/errorHandler';
import {requestUsingPostMethod} from '../../utils/handleRequestToServer/handleRequestToServer';
import {setRegistrablePassenger} from '../../Redux/slices/PassengerSlice';
import {Checkbox, Text, TextInput} from 'react-native-paper';
import styles from './Style';
import {handlePhoneChange} from '../../utils/Formatter/Formatter';

const RegisterPassenger = ({navigation}) => {
  const dispatch = useDispatch();

  // State Management
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneCode, setPhoneCode] = useState('+251');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
    setErrors({phoneCode: phoneCodeError, phoneNumber: phoneNumberError});
    return !phoneCodeError && !phoneNumberError;
  };

  // Register Function
  const handleRegister = async () => {
    if (!validateForm()) return;

    if (!termsAccepted) {
      errorHandler(
        new Error('You need to accept the terms and conditions to proceed.'),
      );
      // showErrorToast({
      //   text1: 'Terms and Conditions',
      //   text2: 'You need to accept the terms and conditions to proceed.',
      // });
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
        dispatch(setRegistrablePassenger({userData}));
        navigation.navigate('OTP', {userData});
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

  return (
    <ScrollView style={GlobalStyles.container}>
      <TopView
        title="Submit Phone Number"
        description="Enter your phone number to activate the app"
      />

      <View style={styles.bottomSection}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <TextInput
            mode="outlined"
            label="Code"
            value={phoneCode}
            onChangeText={setPhoneCode}
            keyboardType="phone-pad"
            error={!!errors.phoneCode}
            style={{marginRight: 10}}
          />
          {/* Phone Number Input */}
          <TextInput
            style={{flex: 1}}
            mode="outlined"
            label="Phone Number"
            value={phoneNumber}
            onChangeText={newText =>
              handlePhoneChange(newText, setPhoneNumber, phoneNumber)
            }
            // onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            error={!!errors.phoneNumber}
          />
        </View>
        {errors.phoneCode && (
          <Text style={GlobalStyles.errorText}>{errors.phoneCode}</Text>
        )}
        {errors.phoneNumber && (
          <Text style={GlobalStyles.errorText}>{errors.phoneNumber}</Text>
        )}

        {/* Terms Checkbox */}
        <View style={GlobalStyles.checkboxContainer}>
          <Checkbox
            status={termsAccepted ? 'checked' : 'unchecked'}
            onPress={() => setTermsAccepted(!termsAccepted)}
            value={termsAccepted}
            style={GlobalStyles.checkboxBox}
          />
          <Text style={styles.termsText}>
            By tapping Sign Up, you have read and agree to the
            <Text
              onPress={() => navigation.navigate('Terms And Services')}
              style={GlobalStyles.textLink}>
              Terms and Services
            </Text>
          </Text>
        </View>

        {/* Register Button */}
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <TouchableOpacity
            style={GlobalStyles.button}
            onPress={handleRegister}>
            <Text style={GlobalStyles.buttonText}>
              Submit your Phone Number
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default RegisterPassenger;
