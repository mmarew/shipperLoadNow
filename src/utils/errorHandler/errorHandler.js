// utils/errorHandler.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ErrorToast} from 'react-native-toast-message';
import {addPassengersToken} from '../../Redux/slices/PassengerSlice';
import store from '../../Redux/Store/Store';

const errorHandler = error => {
  let errorMessage = 'An unknown error occurred';

  // Handle network errors
  if (error.message && error.message === 'Network Error') {
    errorMessage = 'Network error! Please check your internet connection.';
  }

  // Handle timeout errors
  if (error.code && error.code === 'ECONNABORTED') {
    errorMessage = 'Request timed out. Please try again.';
  }

  // Handle API response errors
  if (error.response) {
    console.log('error.response.data', error.response.data);
    const {status, data} = error.response;
    const responseError = data.error;
    console.log('@responseError', responseError);
    if (status === 400) {
      errorMessage =
        responseError ||
        data.message ||
        'Bad Request. Please check your input.';
    } else if (status === 401) {
      errorMessage = responseError || 'Unauthorized. Please login again.';
    } else if (status === 403) {
      errorMessage =
        responseError ||
        'Forbidden. You do not have permission to access this resource.';
    } else if (status === 404) {
      errorMessage = responseError || 'Resource not found. Please try again.';
    } else if (status === 422) {
      errorMessage =
        responseError ||
        data.message ||
        'Validation error. Please check your input.';
    } else if (status === 500) {
      errorMessage =
        responseError || 'Internal server error. Please try again later.';
    } else {
      errorMessage = data.message || `Error: ${status}`;
    }
  }

  // Handle general JavaScript errors
  if (error instanceof ReferenceError) {
    errorMessage = `Reference Error: ${error.message}`;
  } else if (error instanceof TypeError) {
    errorMessage = `Type Error: ${error.message}`;
  } else if (error instanceof SyntaxError) {
    errorMessage = `Syntax Error: ${error.message}`;
  } else if (error instanceof RangeError) {
    errorMessage = `Range Error: ${error.message}`;
  } else if (error.message && !error.response) {
    errorMessage = error.message;
  }

  // Handle custom application errors
  if (error.customMessage) {
    errorMessage = error.customMessage;
  }

  // Handle unhandled promise rejections
  if (error.name === 'UnhandledPromiseRejectionWarning') {
    errorMessage = `Unhandled Promise Rejection: ${error.message}`;
  }

  // If server response is in the following list, logout of app and reload again
  const logOutData = [
    'Token verification failed',
    'User not found in the token',
    'jwt malformed',
    'Token not active',
    'Token expired',
    'Invalid token',
  ];
  const handleLogout = async () => {
    await AsyncStorage.clear();

    store.dispatch(addPassengersToken(null));
  };
  if (logOutData.some(message => errorMessage?.includes(message))) {
    console.log('@trying to logout');
    handleLogout();
    return errorMessage;
  }

  const nonToastMessages = [
    'Network Error',
    'You have already registered for a free trial once.',
    'No active driver requests found for this user',
    'Driver in inactive status',
    ...logOutData,
  ];

  // Don't show messages included in nonToastMessages and those that start with 'Network'
  if (
    !nonToastMessages?.includes(errorMessage) &&
    !errorMessage?.toLocaleLowerCase()?.startsWith('network')
  ) {
    ErrorToast('error', 'error', errorMessage);
  }

  return errorMessage;
};

export default errorHandler;
