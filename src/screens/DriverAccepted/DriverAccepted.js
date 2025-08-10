import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Button} from 'react-native';
import store from '../../Redux/Store/Store';
import {
  addGoBackTo,
  addPassengerStatus,
} from '../../Redux/slices/PassengerSlice';

const DriverAccepted = () => {
  const driver = useSelector(state => state?.passengerSlices?.driver);
  return (
    <View>
      <Text>Driver Name:- {driver?.fullName}</Text>
      <Text>Driver email:- {driver?.email}</Text>
      <Text>Driver Phone:- {driver?.phoneNumber}</Text>

      <Button
        title="cancel current request"
        onPress={() => {
          store.dispatch(addGoBackTo('accepted'));
          store.dispatch(addPassengerStatus('cancel request'));
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default DriverAccepted;
