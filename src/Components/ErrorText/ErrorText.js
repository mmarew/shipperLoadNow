import React from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import ColorStyles from '../../GlobalStyles/Color.styles';
import fontFamily from '../../GlobalStyles/FontFamily';
const ErrorText = ({ error, shakeAnim }) => {
  if (!error) return null;

  return (
    <Animated.View
      style={[
        styles.errorContainer,
        { transform: [{ translateX: shakeAnim }] },
      ]}
    >
      <Text style={styles.errorText}>{error}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    marginTop: 5,
    marginBottom: 10,
  },
  errorText: {
    textAlign: 'center',
    alignItems: 'center',
    color: ColorStyles.errorColor,
    fontSize: 16,
    fontFamily: fontFamily.manropeRegular,
  },
});

export default ErrorText;
