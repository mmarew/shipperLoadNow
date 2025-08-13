import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getRecentCompletedJourney } from '../PickUpAndDestination/recentData';
import ColorStyles from '../../GlobalStyles/Color.styles';
import IconAwesome from '../Common/CustomFontAwesome/IconAwesome';
import createStyles from './RecentSearches.styles';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';
import PropTypes from 'prop-types';

const RecentSearches = ({ onRecentSelect }) => {
  const styles = createStyles();
  const ColorStyles = getAppsColorStyles();
  const [recentData, setRecentData] = useState([]);
  const fetchRecentData = async () => {
    const fetchedRecentData = await getRecentCompletedJourney();

    const placeSet = new Set();
    const recentDataList = [];
    console.log('@fetchedRecentData', fetchedRecentData);
    fetchedRecentData?.forEach(data => {
      // passengerRequestUniqueId is used to ensure uniqueness and used as value to key in the map rendering
      const places = [
        {
          passengerRequestUniqueId: data?.passengerRequestUniqueId,
          name: data?.destinationPlace,
          latitude: data?.destinationLatitude,
          longitude: data?.destinationLongitude,
        },
        // passengerRequestUniqueId + 1 is used to ensure uniqueness for the origin place and to differentiate it from the destination place
        {
          passengerRequestUniqueId: data?.passengerRequestUniqueId + 1,
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
  // validate the onRecentSelect prop
  if (typeof onRecentSelect !== 'function') {
    console.error('onRecentSelect prop must be a function');
    return null;
  }
  console.log('@recentData', recentData);
  return (
    <View style={styles.recentSearchesContainer}>
      <Text style={styles.recentSearchesTitle}>Recent Searches</Text>
      {recentData.length > 0 ? (
        <View
          style={{
            flex: 1,
            backgroundColor: ColorStyles.whiteBGColor,
            borderRadius: 20,
            paddingVertical: 10,
          }}
        >
          {recentData.map(item => (
            <TouchableOpacity
              key={item?.passengerRequestUniqueId}
              style={styles.recentSearchItem}
              onPress={() => {
                onRecentSelect(item);
              }}
            >
              <IconAwesome
                name={'map-marker'}
                color={ColorStyles.brandColor}
                size={20}
              />

              <Text style={styles.recentSearchText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View>
          <Text style={styles.recentSearchesTitle}>
            No recent searches found
          </Text>
        </View>
      )}
    </View>
  );
};
RecentSearches.propTypes = {
  onRecentSelect: PropTypes.func.isRequired,
};
export default RecentSearches;
