import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import GlobalStyles from '../../GlobalStyles/GlobalStyles.js';
import { useSelector } from 'react-redux';
import createStyles from './CancelRequest.styles.js';
const CancelRequest = ({ setShowComponent }) => {
  const styles = createStyles();

  const passengerSlices = useSelector(state => state?.passengerSlices);
  const passengerStatus = passengerSlices?.passengerStatus;
  const numberOfRequests = useRef(0);
  const cancelCurrentRequest = () => {
    setShowComponent('cancel request');
  };
  const [CancellationMessage, setCancellationMessage] = useState(null);
  useEffect(() => {
    if (passengerStatus == 1) {
      setCancellationMessage(
        numberOfRequests.current == 0
          ? 'Looking for a driver .... '
          : 'Looking for other driver ...... ',
      );
    } else if (passengerStatus == 2) {
      numberOfRequests.current++;
      setCancellationMessage('Requested for a driver and waiting its response');
    }
  }, [passengerStatus]);
  // if no passenger status no need of progress bar
  if (!passengerStatus) return;

  return (
    <View style={styles.container}>
      {/* <Text>{CancellationMessage}</Text> */}
      {/* <ActivityIndicator color={'#075985'} size={'large'} /> */}

      <TouchableOpacity
        style={{
          ...GlobalStyles.button,
          backgroundColor: '#EF4444',
          width: '100%',
        }}
        onPress={cancelCurrentRequest}
      >
        <Text style={GlobalStyles.buttonText}>Cancel request</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CancelRequest;
