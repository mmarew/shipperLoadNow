import {Animated} from 'react-native';

// Shaking error animation for errorWrapper/errorText

const triggerShake = shakeAnim => {
  shakeAnim.setValue(0);
  Animated.sequence([
    Animated.timing(shakeAnim, {
      toValue: 10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnim, {
      toValue: -10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnim, {
      toValue: 6,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnim, {
      toValue: -6,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnim, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }),
  ]).start();
};
export {triggerShake};
