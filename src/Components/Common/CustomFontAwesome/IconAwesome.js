import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ColorStyles from '../../../GlobalStyles/Color.styles';

const CustomCheckbox = ({ checked, onToggle, label, name, color, size }) => {
  return (
    // <TouchableOpacity onPress={onToggle} style={styles.container}>
    <FontAwesome name={name} size={size} color={color} />
    // {label && <Text style={styles.label}>{label}</Text>}
    // </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 2,
    marginRight: 10,
    borderColor: ColorStyles.borderColor,
  },
  label: {
    fontSize: 16,
    color: ColorStyles.textColor,
  },
});

export default CustomCheckbox;
