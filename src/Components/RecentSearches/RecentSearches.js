import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './RecentSearches.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getRecentCompletedJourney } from '../PickUpAndDestination/recentData';
import { trimText } from '../../utils/Formatter/Formatter';
import ColorStyles from '../../GlobalStyles/Color.styles';
const RecentSearches = ({ onRecentSelect }) => {
  const [recentData, setRecentData] = useState([]);
  const fetchRecentData = async () => {
    const fetchedRecentData = await getRecentCompletedJourney();

    const placeSet = new Set();
    const recentDataList = [];

    fetchedRecentData?.forEach(data => {
      const places = [
        {
          name: data?.destinationPlace,
          latitude: data?.destinationLatitude,
          longitude: data?.destinationLongitude,
        },
        {
          name: data?.originPlace,
          latitude: data?.originLatitude,
          longitude: data?.originLongitude,
        },
      ];

      places.forEach(place => {
        const key = `${place.name}|${place.latitude}|${place.longitude}`;
        if (!placeSet.has(key)) {
          placeSet.add(key);
          recentDataList.push(place);
        }
      });
    });

    setRecentData(recentDataList);
  };

  useEffect(() => {
    fetchRecentData();
  }, []);

  return (
    <View style={styles.recentSearchesContainer}>
      <Text style={styles.recentSearchesTitle}>Recent Searches</Text>
      {recentData.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.recentSearchItem}
          onPress={() => onRecentSelect(item)}
        >
          <Ionicons
            name="location-sharp"
            size={20}
            color={ColorStyles.brandColor}
            style={styles.iconLeft}
          />
          {/* <Ionicons name="location-outline" size={20} color="#3498db" /> */}
          <Text style={styles.recentSearchText}>
            {trimText({ text: item.name, size: 50 })}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RecentSearches;
