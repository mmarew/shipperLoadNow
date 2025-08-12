import AsyncStorage from '@react-native-async-storage/async-storage';
import { addListOfCancilationReasons } from '../../Redux/slices/PassengerSlice';
import store from '../../Redux/Store/Store';
import errorHandler from '../errorHandler/errorHandler';
import { requestUsingGetMethod } from '../handleRequestToServer/handleRequestToServer';
import API_URLS from '../../Configs/URLConfigs';
import HandleResponses from '../handleServerResponses/HandleResponses';

const verifyPassengerStatus = async () => {
  try {
    const token = await AsyncStorage.getItem('passengersToken');

    if (!token || token == 'null') return;

    const userStatusData = await requestUsingGetMethod({
      url: API_URLS?.VERIFY_PASSENGER_STATUS,
    });
    HandleResponses(userStatusData);
    const getCancilationReasons = await requestUsingGetMethod({
      url: API_URLS?.GET_CANCELLATION_REASONS,
    });
    const listOfCancilationReasons = getCancilationReasons?.data;
    store.dispatch(addListOfCancilationReasons(listOfCancilationReasons));
    return userStatusData;
  } catch (error) {
    console.log('@verifyPassengerStatus error', error);
    errorHandler(error);
  }
};
export default verifyPassengerStatus;
