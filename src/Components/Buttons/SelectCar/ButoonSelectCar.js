import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import GlobalStyles from '../../../GlobalStyles/GlobalStyles';

const ButtonSelectCar = ({ navigation }) => {
  const handleSelectCar = () => {};
  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity
        style={{ ...GlobalStyles.button, marginHorizontal: 5, width: '100%' }}
        onPress={handleSelectCar}
      >
        <Text style={GlobalStyles.buttonText}>Select Car</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonSelectCar;
