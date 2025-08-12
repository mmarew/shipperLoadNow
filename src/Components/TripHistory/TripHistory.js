import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PickupAndDestinationDisplayer from '../PickUpAndDestination/PickupAndDestinationDisplayer';
import { requestUsingGetMethod } from '../../utils/handleRequestToServer/handleRequestToServer';
import Icon from 'react-native-vector-icons/Ionicons';

const TripHistory = ({ setVisibleDetail }) => {
  // api / user / getCompletedJourney;
  const [listOfJourneyPoints, setListOfJourneyPoints] = useState([]);
  const getCompletedJourney = async () => {
    const response = await requestUsingGetMethod({
      url: '/api/user/getCompletedJourney',
    });
    // console.log('@getCompletedJourney response', response.data);
    const data = [];
    response.data.map(item => {
      const origin = {
          requestTime: item.requestTime,
          latitude: item.originLatitude,
          longitude: item.originLongitude,
          description: item.originPlace,
        },
        destination = {
          latitude: item.destinationLatitude,
          longitude: item.destinationLongitude,
          description: item.destinationPlace,
        };
      data.push({ origin, destination });
    });
    setListOfJourneyPoints(data);
  };
  useEffect(() => {
    getCompletedJourney();
  }, []);
  return (
    <View style={{ padding: 10 }}>
      {/* back arrow to go back */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setVisibleDetail(null)}>
          <Icon name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Trip History</Text>
      </View>
      <PickupAndDestinationDisplayer
        listOfJourneyPoints={listOfJourneyPoints}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default TripHistory;
