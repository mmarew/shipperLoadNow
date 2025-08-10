import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL_AXIOS from '../../services/AxiosServices';
import errorHandler from '../errorHandler/errorHandler';

const requestUsingGetMethode = async ({url, params}) => {
  const token = await AsyncStorage.getItem('passengersToken');
  const response = await axios.get(`${API_URL_AXIOS}${url}`, {
    params, // Params passed here
    headers: {Authorization: `Bearer ${token}`}, // Headers passed in the same object
    timeout: 100000,
  });
  return response.data;
};

// POST request
const requestUsingPostMethod = async ({url, data}) => {
  const token = await AsyncStorage.getItem('passengersToken');
  const response = await axios.post(`${API_URL_AXIOS}${url}`, data, {
    headers: {Authorization: `Bearer ${token}`},
  });
  return response.data;
};

// PUT request
const requestUsingPutMethod = async ({url, data}) => {
  try {
    console.log('url ======> ', url, ' data  =======> ', data);
    const token = await AsyncStorage.getItem('passengersToken');
    const response = await axios.put(`${API_URL_AXIOS}${url}`, data, {
      headers: {Authorization: `Bearer ${token}`},
    });
    console.log('in requestUsingPutMethod =======> ', response.data);
    return response.data;
  } catch (error) {
    errorHandler(error);
    console.log('@requestUsingPutMethod error is ', error);
  }
};

// DELETE request
const requestUsingDeleteMethod = async ({url}) => {
  const token = await AsyncStorage.getItem('passengersToken');
  const response = await axios.delete(`${API_URL_AXIOS}${url}`, {
    headers: {Authorization: `Bearer ${token}`},
  });
  console.log('in requestUsingDeleteMethod =======> ', response.data);
  return response.data;
};

export {
  requestUsingGetMethode,
  requestUsingPostMethod,
  requestUsingPutMethod,
  requestUsingDeleteMethod,
};
