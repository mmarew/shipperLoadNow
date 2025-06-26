import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Text } from 'react-native-paper';
import GlobalStyles from '../../GlobalStyles/GlobalStyles';
import { addPassengersToken } from '../../Redux/slices/PassengerSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderBar from '../../Components/HeaderBar/HeaderBar';

const Logout = ({ navigation }) => {
  const dispatch = useDispatch();
  const clearAsyncStorage = async () => {
    await AsyncStorage.clear();

    dispatch(addPassengersToken(null));
  };

  return (
    <SafeAreaView>
      <HeaderBar navigation={navigation} />
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={{ marginTop: 100, padding: 20 }}>
        <TouchableOpacity
          style={{ ...GlobalStyles.button, borderRadius: 50 }}
          onPress={clearAsyncStorage}
        >
          <Text style={{ ...GlobalStyles.buttonText }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Logout;
