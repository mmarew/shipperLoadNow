import {TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {ActivityIndicator, Text} from 'react-native-paper';
import styles from './WaitingForConfirmation.style';
import {ScrollView} from 'react-native-gesture-handler';
import GlobalStyles from '../../GlobalStyles/GlobalStyles';
import DiverCard from '../../Components/DriverInfo/DiverCard';
import {requestUsingPutMethod} from '../../utils/handleRequestToServer/handleRequestToServer';
import API_URLS from '../../Configs/URLConfigs';
import HandleResponses from '../../utils/handleServerResponses/HandleResponses';

const WaitingForConfirmation = () => {
  const passengerSlices = useSelector(state => state?.passengerSlices);
  const [isLoading, setIsLoading] = useState(false);
  const drivers = passengerSlices?.driver,
    passenger = passengerSlices?.passenger,
    decisions = passengerSlices?.decision;
  console.log('@WaitingForConfirmation drivers', drivers);
  const findDecisionOfDriver = driverRequestId => {
    return decisions?.find(
      decision => decision?.driverRequestId == driverRequestId,
    );
  };
  const acceptDriverRequest = async ({driverInfo, driverDecision}) => {
    try {
      const driverRequestUniqueId = driverInfo?.driver?.driverRequestUniqueId;
      const journeyDecisionUniqueId = driverDecision?.journeyDecisionUniqueId;
      const passengerRequestUniqueId = passenger?.passengerRequestUniqueId;
      const data = {
        driverRequestUniqueId,
        journeyDecisionUniqueId,
        passengerRequestUniqueId,
      };
      setIsLoading(true);
      const result = await requestUsingPutMethod({
        url: API_URLS.ACCEPT_PASSENGERS_REQUEST,
        data,
      });
      setIsLoading(false);
      console.log('@acceptDriverRequest result', result);
      HandleResponses(result);
    } catch (error) {
      console.log('@acceptDriverRequest error', error);
      setIsLoading(false);
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        {drivers?.map((driver, index) => {
          const eachDriver = driver.driver;
          if (eachDriver?.driverRequestId) {
            const driverDecision = findDecisionOfDriver(
              eachDriver?.driverRequestId,
            );
            const shippingCostByDriver = driverDecision?.shippingCostByDriver;
            return (
              <View key={index} style={{backgroundColor: 'white', padding: 10}}>
                <DiverCard driverInfo={driver} />
                {shippingCostByDriver && (
                  <Text style={styles.shipingCost}>
                    Driver cost :
                    {new Intl.NumberFormat('en-ET', {
                      style: 'currency',
                      currency: 'ETB',
                    }).format(shippingCostByDriver)}
                  </Text>
                )}
                {isLoading ? (
                  <ActivityIndicator />
                ) : (
                  <View
                    style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                    <TouchableOpacity
                      onPress={() =>
                        acceptDriverRequest({
                          driverInfo: driver,
                          driverDecision,
                        })
                      }
                      style={{...GlobalStyles.button}}>
                      <Text style={{...GlobalStyles.buttonText}}>Accept</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          }
        })}
      </View>
    </ScrollView>
  );
};

export default WaitingForConfirmation;
