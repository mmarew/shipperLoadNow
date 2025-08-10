import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox'; // Import CheckBox component
import GlobalStyles from '../../GlobalStyles/GlobalStyles';
import styles from './Styles';
import {useDispatch, useSelector} from 'react-redux';
import errorHandler from '../../utils/errorHandler/errorHandler';
import HandleResponses from '../../utils/handleServerResponses/HandleResponses';
import {requestUsingPutMethod} from '../../utils/handleRequestToServer/handleRequestToServer';
import {
  addDestinationLocation,
  addOriginLocation,
  addPassengerStatus,
  setModalVisible,
} from '../../Redux/slices/PassengerSlice';
import {showErrorToast} from '../../utils/ToastDisplayer/toastDisplayer';
import getUniQueIds from '../../utils/getUniqueIds/getUniQueIds';
import ButtonNavigateToScreens from '../../Components/Buttons/ButtonNavigateToScreens/ButtonNavigateToScreens';

const CancelRequestModal = ({navigation}) => {
  const [selectedReason, setSelectedReason] = useState(null);
  const [isChecked, setIsChecked] = useState({}); // State for managing checkboxes
  const passengerSlices = useSelector(state => state?.passengerSlices);
  let listOfCancilationReasons = passengerSlices?.listOfCancilationReasons;
  const dispatch = useDispatch();
  const passengerStatus = passengerSlices?.passengerStatus;
  console.log('@CancelRequestModal passengerStatus', passengerStatus);
  const handleReasonSelect = reason => {
    setSelectedReason(reason);
    const updatedChecked = {
      [reason.cancellationReason]: !isChecked[reason.cancellationReason],
    };
    setIsChecked(updatedChecked);
  };

  const handleCancelPress = async () => {
    try {
      if (!selectedReason) {
        throw new Error('Please select a reason');
      }

      const data = {
        ...getUniQueIds(passengerSlices),
        ...selectedReason,
      };

      setIsLoading(true);

      const results = await requestUsingPutMethod({
        url: '/api/passengerRequest/cancelPassengerRequest/self',
        data,
      });

      HandleResponses(results);

      dispatch(addPassengerStatus(null));
      // clear detination and origin location
      dispatch(addOriginLocation(null));
      dispatch(addDestinationLocation(null));
    } catch (error) {
      const errorMessage = errorHandler(error);
      if (errorMessage == 'No active requests found for this user') {
        dispatch(addPassengerStatus(null));
        dispatch(addOriginLocation(null));
        dispatch(addDestinationLocation(null));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopCancilation = () => {
    dispatch(setModalVisible(true));
    navigation.navigate('Find Driver');
  };

  useEffect(() => {
    getUniQueIds();
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <ScrollView>
      {!passengerStatus ? (
        <View>
          <ButtonNavigateToScreens />
        </View>
      ) : (
        <SafeAreaView style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.indicator} />

            <Text style={styles.modalTitle}>
              Why you need to cancel your request?
            </Text>
            {/* <PickupAndDestinationDisplayer /> */}
            {listOfCancilationReasons?.map((reason, index) => (
              <Pressable
                key={index}
                onPress={() => handleReasonSelect(reason)}
                style={[
                  styles.reasonContainer,
                  styles.reasonButton,
                  selectedReason?.cancilationReasonType ===
                    reason?.cancilationReasonType &&
                    styles.selectedReasonContainer,
                ]}>
                <CheckBox
                  value={isChecked[reason.cancellationReason] || false} // Use the checkbox state
                  onValueChange={() => handleReasonSelect(reason)}
                  tintColors={{true: '#075985', false: '#8b8b8b'}}
                />
                <Text style={styles.reasonText}>
                  {reason?.cancellationReason}
                </Text>
              </Pressable>
            ))}

            {!isLoading ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 10,
                }}>
                <TouchableOpacity
                  style={{...GlobalStyles.button}}
                  onPress={handleStopCancilation}>
                  <Text
                    style={{
                      ...GlobalStyles.buttonText,
                    }}>
                    Stop
                  </Text>
                </TouchableOpacity>
                {selectedReason ? (
                  <TouchableOpacity
                    style={{...GlobalStyles.button, backgroundColor: 'red'}}
                    onPress={handleCancelPress}>
                    <Text style={{...GlobalStyles.buttonText}}>Confirm</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      showErrorToast({text2: 'Cancelation reason is required'})
                    }
                    style={{
                      ...GlobalStyles.button,
                      backgroundColor: '#626f72',
                    }}>
                    <Text style={{...GlobalStyles.buttonText}}>Confirm</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <ActivityIndicator color={'#075985'} size={'large'} />
            )}
          </View>
        </SafeAreaView>
      )}
    </ScrollView>
  );
};

export default CancelRequestModal;
