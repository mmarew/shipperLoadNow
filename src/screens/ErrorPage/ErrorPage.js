import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import GlobalStyles from '../../GlobalStyles/GlobalStyles';
import {navigate} from '../../services/navigationService';
import RNRestart from 'react-native-restart';
import TopView from '../Auth/TopView/TopView';

const ErrorPage = ({route}) => {
  console.log('route', route);
  const {errors} = route.params || {}; // Destructure errors from route.params

  const handleReload = () => {
    RNRestart?.restart();
  };

  console.log('@NotFound errors', errors);

  if (errors === 'Unauthorized. Please login again.') {
    navigate('Logout');
    return null;
  }

  return (
    <>
      <TopView
        title={'Errors'}
        description={'Errors on functionalty of connections'}
      />
      <View
        style={{
          ...GlobalStyles.container,
          padding: 20,
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
        }}>
        <Text style={{fontSize: 20, textAlign: 'center', color: 'red'}}>
          {errors}
        </Text>
        <TouchableOpacity onPress={handleReload} style={GlobalStyles.button}>
          <Text style={GlobalStyles.buttonText}>Reload</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ErrorPage;
