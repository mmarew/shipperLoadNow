import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getRecentCompletedJourney } from '../PickUpAndDestination/recentData';
import ColorStyles from '../../GlobalStyles/Color.styles';
import IconAwesome from '../Common/CustomFontAwesome/IconAwesome';
import createStyles from './RecentSearches.styles';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
const RecentSearches = ({ onRecentSelect }) => {
  const styles = createStyles();
  const ColorStyles = getAppsColorStyles();
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
          onPress={() => {
            onRecentSelect(item);
          }}
        >
          <IconAwesome
            name={'map-marker'}
            color={ColorStyles.textColor}
            size={20}
          />
          {/* <Ionicons
            name="location-sharp"
            size={20}
            color={ColorStyles.brandColor}
            style={styles.iconLeft}
          /> */}
          <Text style={styles.recentSearchText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RecentSearches;
