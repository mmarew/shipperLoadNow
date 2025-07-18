import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ColorStyles from '../../../GlobalStyles/Color.styles';

const CustomCheckbox = ({ checked, onToggle, label }) => {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.container}>
      <FontAwesome
        name={checked ? 'check-square' : 'square-o'}
        size={22}
        color={checked ? ColorStyles.focused : ColorStyles.brandColor}
      />
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: ColorStyles.textColor,
  },
});

export default CustomCheckbox;
