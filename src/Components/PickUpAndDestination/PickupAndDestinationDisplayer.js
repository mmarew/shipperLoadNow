import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import IconAwesome from '../Common/CustomFontAwesome/IconAwesome';
import createStyles from './PickupAndDestinationDisplayer.style';
import getAppsColorStyles from '../../GlobalStyles/AppsColorStyles';

const PickupAndDestinationDisplayer = ({
  setShowComponent,
  showComponent,
  listOfJourneyPoints = [],
  disableInnerTouchables = false,
}) => {
  const ColorStyles = getAppsColorStyles();
  const styles = createStyles();
  const navigateToChoosePlaces = ({ focus }) => {
    if (!showComponent) return;
    if (typeof setShowComponent === 'function') setShowComponent(showComponent);
  };

  const renderPoint = ({ type, label, description, onPress }) => {
    const content = (
      <View
        style={{
          ...styles.pickAndDestination,
          ...(type === 'origin' ? styles.pickUp : styles.destination),
        }}
      >
        <IconAwesome name="circle" size={10} color="dodgerblue" />
        <View>
          <Text style={styles.textPickupAndDestinationLabels}>{label}</Text>
          <Text style={styles.textPickupAndDestination}>
            {description || `Set ${label.toLowerCase()}`}
          </Text>
        </View>
      </View>
    );

    return disableInnerTouchables ? (
      <View>{content}</View>
    ) : (
      <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {listOfJourneyPoints.map((points, index) => {
        const { origin, destination } = points;

        return (
          <View key={index}>
            {origin?.shippingDate && (
              <Text
                style={{
                  margin: 20,
                  marginBottom: 10,
                  color: ColorStyles.textColor,
                }}
              >
                {formatDate(origin.shippingDate)}
              </Text>
            )}

            {renderPoint({
              type: 'origin',
              label: 'From',
              description: origin?.description,
              onPress: () =>
                navigateToChoosePlaces({ focus: 'focus on pick up' }),
            })}

            {renderPoint({
              type: 'destination',
              label: 'To',
              description: destination?.description,
              onPress: () =>
                navigateToChoosePlaces({ focus: 'focus on destination' }),
            })}
          </View>
        );
      })}
    </View>
  );
};

const formatDate = dateString => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export default PickupAndDestinationDisplayer;
