import React from 'react';
import {Polyline} from 'react-native-maps';
import {Text} from 'react-native-paper';

const RenderOSMDirections = ({
  routeCoords,
  color = 'blue',
  strokeWidth = 4,
}) => {
  if (!routeCoords || routeCoords.length === 0) {
    return <Text>No data</Text>;
  }

  return (
    <Polyline
      coordinates={routeCoords}
      strokeColor={color}
      strokeWidth={strokeWidth}
    />
  );
};

export default RenderOSMDirections;
