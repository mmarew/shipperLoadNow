import Toast from 'react-native-toast-message';

// Example function to show a success toast
const showSuccessToast = ({
  text1 = 'Success',
  text2 = '',
  visibilityTime = 4000,
  position = 'top',
}) => {
  Toast.show({
    type: 'success',
    text1,
    text2,
    visibilityTime,
    position,
  });
};

// Example function to show an error toast
const showErrorToast = ({
  text1 = 'error',
  text2 = 'error',
  visibilityTime = 4000,
  position = 'top',
}) => {
  Toast.show({
    type: 'error',
    text1,
    text2,
    visibilityTime,
    position,
  });
};
export {showSuccessToast, showErrorToast};
