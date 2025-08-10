import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import findScreenByPassengerStatus, {
  findScreenDescription,
  navigateToScreen,
} from '../../../utils/ScreenManager/ScreenList';
import {useSelector} from 'react-redux';
import GlobalStyles from '../../../GlobalStyles/GlobalStyles';
import {Text} from 'react-native-paper';

const ButtonNavigateToScreens = () => {
  const passengerSlices = useSelector(state => state?.passengerSlices);
  const passengerStatus = passengerSlices?.passengerStatus;
  return (
    <View style={{marginTop: 20, padding: 20}}>
      <Text style={GlobalStyles.title}>
        {findScreenDescription(passengerStatus)}
      </Text>
      <TouchableOpacity
        onPress={() => navigateToScreen({passengerStatus})}
        style={GlobalStyles.button}>
        <Text style={GlobalStyles.buttonText}>
          Navigate To {findScreenByPassengerStatus(passengerStatus)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonNavigateToScreens;
