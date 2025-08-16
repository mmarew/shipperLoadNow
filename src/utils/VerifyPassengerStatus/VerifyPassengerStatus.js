import AsyncStorage from '@react-native-async-storage/async-storage';
import { addListOfCancellationReasons } from '../../Redux/slices/PassengerSlice';
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
    const getCancellationReasons = await requestUsingGetMethod({
      url: API_URLS?.GET_CANCELLATION_REASONS,
    });
    const listOfCancellationReasons = getCancellationReasons?.data;
    store.dispatch(addListOfCancellationReasons(listOfCancellationReasons));
    return userStatusData;
  } catch (error) {
    console.log('@verifyPassengerStatus error', error);
    errorHandler(error);
  }
};
export default verifyPassengerStatus;
