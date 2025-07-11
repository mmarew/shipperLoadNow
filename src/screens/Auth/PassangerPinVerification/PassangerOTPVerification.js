import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SmsRetriever from 'react-native-sms-retriever';
import { Alert } from 'react-native';
import GlobalStyles from '../../../GlobalStyles/GlobalStyles';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showSuccessToast } from '../../../utils/ToastDisplayer/toastDisplayer';
import TopView from '../TopView/TopView';
import errorHandler from '../../../utils/errorHandler/errorHandler';
import {
  requestUsingGetMethode,
  requestUsingPostMethod,
} from '../../../utils/handleRequestToServer/handleRequestToServer';
import { addPassengersToken } from '../../../Redux/slices/PassengerSlice';
import styles from './PassangerOTPVerification.css';
import RNRestart from 'react-native-restart';
import ColorStyles, { barStyles } from '../../../GlobalStyles/Color.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
const PassangerOTPVerification = ({ navigation }) => {
  const dispatch = useDispatch();
  const newPassenger = useSelector(
    state => state.passengerSlices.registrablePassenger,
  );
  const [otpFocus, setOtpFocus] = useState(new Array(6).fill(false));
  console.log('@otpFocus', otpFocus);
  const { userData } = newPassenger;
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

  // const startListeningForSms = async () => {
  //   try {
  //     await SmsRetriever.startSmsRetriever();
  //     const message = await SmsRetriever.startSmsRetriever(); // Waits for an SMS
  //     console.log('Received SMS:', message);

  //     // Extract OTP (Assuming OTP is 4-6 digits)
  //     const extractedOtp = message.match(/\b\d{4,6}\b/)?.[0];

  //     if (extractedOtp) {
  //       setOtp(extractedOtp);
  //       Alert.alert('OTP Received', `Your OTP is ${extractedOtp}`);
  //     }
  //   } catch (error) {
  //     console.log('Error reading SMS:', error);
  //   }
  // };

  const startListeningForSms = async () => {
    try {
      const registered = await SmsRetriever.startSmsRetriever();

      if (registered) {
        SmsRetriever.addSmsListener(event => {
          const message = event.message;
          console.log('Received SMS:', message);

          // Extract OTP (4 to 6 digit code)
          const extractedOtp = message.match(/\b\d{4,6}\b/)?.[0];

          if (extractedOtp) {
            setOtp(extractedOtp.split('')); // convert to array if needed
            Alert.alert('OTP Received', `Your OTP is ${extractedOtp}`);
          }

          // Always remove the listener after getting the SMS
          SmsRetriever.removeSmsListener();
        });
      }
    } catch (error) {
      console.log('Error reading SMS:', error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: ColorStyles.backgroundColor }}>
      <StatusBar
        barStyle={barStyles}
        backgroundColor={ColorStyles.backgroundColor}
      />
      <KeyboardAwareScrollView
        style={{ backgroundColor: ColorStyles.backgroundColor }}
        extraScrollHeight={150}
        enableOnAndroid={true}
      >
        <View style={{ position: 'absolute', top: 50, flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              marginLeft: 10,
            }}
            onPress={() => {
              navigation.navigate('Register');
            }}
          >
            <Ionicons
              name="arrow-back-outline"
              size={24}
              color={ColorStyles.whiteColor}
            />
            <Text style={{ color: ColorStyles.whiteColor }}>
              {'Back to Register '}
            </Text>
          </TouchableOpacity>
        </View>
        <TopView
          title="Verify OTP"
          description="Check your phone to verify your OTP"
        />
        <View style={styles.bottomSection}>
          <Text style={styles.infoText}>
            Code has been sent to{' '}
            <Text style={GlobalStyles.textLink}>+251********</Text>
          </Text>

          {/* OTP Input Boxes */}
          {/* using react native paper */}
          {/* <View style={styles.otpContainer}>
            {otp.map((value, index) => (
              <TextInput
                key={index}
                mode="outlined"
                value={value}
                maxLength={1}
                keyboardType="number-pad"
                ref={ref => (inputRefs.current[index] = ref)}
                contentStyle={{
                  ...GlobalStyles.inputContentstyle,
                  color: otp[index]
                    ? ColorStyles.whiteColor
                    : ColorStyles.textColor,
                  textAlign: 'center',
                  paddingHorizontal: 0,
                }}
                style={[
                  styles.otpInput,
                  otp[index] !== '' && {
                    backgroundColor: ColorStyles.brandColor,
                    color: ColorStyles.whiteColor,
                  },
                ]}
                outlineStyle={[
                  {
                    padding: 0, // Remove padding from outline
                    margin: 0,
                  },
                  GlobalStyles.inputsOutlineStyle,
                  otpFocus[index] ? { borderColor: ColorStyles.focused } : {},
                ]}
                activeOutlineColor={ColorStyles.focused}
                onFocus={() => {
                  const updatedFocus = new Array(6).fill(false);
                  updatedFocus[index] = true;
                  setOtpFocus(updatedFocus);
                }}
                onBlur={() => {
                  const updatedFocus = [...otpFocus];
                  updatedFocus[index] = false;
                  setOtpFocus(updatedFocus);
                }}
                onChangeText={val => handleOtpChange(val, index)}
                onKeyPress={({ nativeEvent }) => {
                  if (
                    nativeEvent.key === 'Backspace' ||
                    nativeEvent.key === 'Delete'
                  ) {
                    const newOtp = [...otp];
                    newOtp[index] = '';
                    setOtp(newOtp);

                    if (index > 0 && !value) {
                      inputRefs.current[index - 1].focus();
                    }
                  }
                }}
              />
            ))}
          </View> */}
          <View style={styles.otpContainer}>
            {otp.map((value, index) => (
              <TextInput
                key={index}
                value={value}
                maxLength={1}
                keyboardType="number-pad"
                ref={ref => (inputRefs.current[index] = ref)}
                style={[
                  styles.otpInput,
                  otp[index] !== '' && {
                    backgroundColor: ColorStyles.brandColor,
                    color: ColorStyles.whiteColor,
                  },
                  otpFocus[index] && {
                    borderColor: ColorStyles.focused,
                  },
                ]}
                onFocus={() => {
                  const updatedFocus = new Array(6).fill(false);
                  updatedFocus[index] = true;
                  setOtpFocus(updatedFocus);
                }}
                onBlur={() => {
                  const updatedFocus = [...otpFocus];
                  updatedFocus[index] = false;
                  setOtpFocus(updatedFocus);
                }}
                onChangeText={val => handleOtpChange(val, index)}
                onKeyPress={({ nativeEvent }) => {
                  if (
                    nativeEvent.key === 'Backspace' ||
                    nativeEvent.key === 'Delete'
                  ) {
                    const newOtp = [...otp];
                    newOtp[index] = '';
                    setOtp(newOtp);

                    if (index > 0 && !value) {
                      inputRefs.current[index - 1].focus();
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
                  <Text style={{ color: ColorStyles.textColor }}>
                    Don’t get the code?
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={resendOTP}>
                  <Text style={GlobalStyles.textLink}>Resend Code</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={GlobalStyles.button}
                onPress={handleVerification}
              >
                <Text style={GlobalStyles.buttonText}>Verify OTP</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default PassangerOTPVerification;
