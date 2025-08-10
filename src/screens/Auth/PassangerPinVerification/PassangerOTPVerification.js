import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  TextInput,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import GlobalStyles from '../../../GlobalStyles/GlobalStyles';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showSuccessToast} from '../../../utils/ToastDisplayer/toastDisplayer';
import TopView from '../TopView/TopView';
import errorHandler from '../../../utils/errorHandler/errorHandler';
import {
  requestUsingGetMethode,
  requestUsingPostMethod,
} from '../../../utils/handleRequestToServer/handleRequestToServer';
import {addPassengersToken} from '../../../Redux/slices/PassengerSlice';
import styles from './PassangerOTPVerification.css';
import RNRestart from 'react-native-restart';

const PassangerOTPVerification = ({}) => {
  const dispatch = useDispatch();
  const newPassenger = useSelector(
    state => state.passengerSlices.registrablePassenger,
  );
  const {userData} = newPassenger;
  const phoneNumber = userData?.phoneNumber;

  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [isLoading, setIsLoading] = useState(false);

  // Create an array of refs for each OTP input field
  const inputRefs = useRef([]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically move to the next input if a value is entered and it's not the last input
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const validateOTP = () => {
    const OTP = otp.join('');
    if (OTP.length !== 6) {
      errorHandler(new Error('Please enter a valid 6-digit OTP.'));
      return false;
    }
    return true;
  };

  const handleVerification = async () => {
    const OTP = otp.join('');
    if (!phoneNumber || !OTP) {
      errorHandler('Verification Failed', 'Please fill out all fields.');
      return;
    }

    if (!validateOTP()) return;

    setIsLoading(true);
    try {
      const response = await requestUsingGetMethode({
        url: '/api/user/verifyUserByOTP',
        params: {
          phoneNumber: phoneNumber,
          OTP: OTP,
          roleId: 1,
        },
      });

      if (response.message === 'success') {
        const passengersToken = response?.token;
        if (!passengersToken) throw Error('Unable to set passenger identity.');

        await AsyncStorage.setItem('passengersToken', passengersToken);
        dispatch(addPassengersToken(passengersToken));

        showSuccessToast(
          'Verification Successful',
          'Passenger OTP verified successfully.',
        );
        RNRestart?.restart();
      } else {
        errorHandler(response.data.error || 'Verification Failed');
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    try {
      setOtp(new Array(6).fill(''));
      setIsLoading(true);
      const response = await requestUsingPostMethod({
        url: '/api/user/createUser',
        data: userData,
      });
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    startListeningForSms();
  }, []);

  const startListeningForSms = async () => {
    try {
      await SmsRetriever.startSmsRetriever();
      const message = await SmsRetriever.startSmsRetriever(); // Waits for an SMS
      console.log('Received SMS:', message);

      // Extract OTP (Assuming OTP is 4-6 digits)
      const extractedOtp = message.match(/\b\d{4,6}\b/)?.[0];

      if (extractedOtp) {
        setOtp(extractedOtp);
        Alert.alert('OTP Received', `Your OTP is ${extractedOtp}`);
      }
    } catch (error) {
      console.log('Error reading SMS:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={GlobalStyles.container}>
      <TopView
        title="Verify OTP"
        description="Check your phone to verify your OTP"
      />

      <View style={styles.bottomSection}>
        <Text style={styles.infoText}>
          Code has been sent to
          <Text style={GlobalStyles.textLink}>+251********</Text>
        </Text>

        {/* OTP Input Boxes */}

        <View style={styles.otpContainer}>
          {otp.map((value, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              value={value}
              ref={ref => (inputRefs.current[index] = ref)} // Assign each TextInput a ref
              onChangeText={val => handleOtpChange(val, index)}
              onKeyPress={({nativeEvent}) => {
                if (
                  nativeEvent.key === 'Backspace' ||
                  nativeEvent.key === 'Delete'
                ) {
                  const newOtp = [...otp];
                  newOtp[index] = ''; // Clear the current input
                  setOtp(newOtp);

                  if (index > 0 && !value) {
                    inputRefs.current[index - 1].focus(); // Move to the previous input on backspace/delete if empty
                  }
                }
              }}
            />
          ))}
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color="#075985" />
        ) : (
          <View>
            <View style={styles.resendText}>
              <TouchableOpacity>
                <Text>Don’t get the code?</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={resendOTP}>
                <Text style={GlobalStyles.textLink}>Resend Code</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={GlobalStyles.button}
              onPress={handleVerification}>
              <Text style={GlobalStyles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default PassangerOTPVerification;
