import axios from 'axios';
import {osrmUrl} from '../../Components/Constants/constant.url';

// Helper function to format distance (meters to km)
const formatDistance = meters => {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
};

// Helper function to format duration (seconds to minutes/hours)
const formatDuration = seconds => {
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins} mins`;
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return `${hours}h ${remainingMins}m`;
};

const isValidCoordinate = coord => {
  return (
    coord &&
    typeof coord.latitude === 'number' &&
    typeof coord.longitude === 'number' &&
    !isNaN(coord.latitude) &&
    !isNaN(coord.longitude) &&
    Math.abs(coord.latitude) <= 90 &&
    Math.abs(coord.longitude) <= 180
  );
};

const getDistanceAndETA = async ({standingCoords, destinationCoords}) => {
  // Validate input coordinates
  if (!isValidCoordinate(standingCoords)) {
    console.error('Invalid standing coordinates:', standingCoords);
    return {distance: 'N/A', duration: 'N/A'};
  }

  if (!isValidCoordinate(destinationCoords)) {
    console.error('Invalid destination coordinates:', destinationCoords);
    return {distance: 'N/A', duration: 'N/A'};
  }

  try {
    if (!osrmUrl || typeof osrmUrl !== 'string') {
      throw new Error('OSRM URL is not properly configured');
    }

    const coordsString = `${standingCoords.longitude},${standingCoords.latitude};${destinationCoords.longitude},${destinationCoords.latitude}`;
    const url = `${osrmUrl}/route/v1/driving/${coordsString}?overview=false&geometries=polyline&steps=false`;

    const response = await axios.get(url, {
      timeout: 5000,
      validateStatus: status => status >= 200 && status < 500,
    });

    // Handle API errors
    if (response.status === 400) {
      console.error('OSRM API 400 Error:', response.data);
      return {distance: 'N/A', duration: 'N/A'};
    }

    // Check for valid response structure
    if (!response?.data?.routes?.[0]) {
      console.error('Invalid OSRM response structure:', response.data);
      return {distance: 'N/A', duration: 'N/A'};
    }

    const route = response.data.routes[0];

    // Extract raw values (in meters and seconds)
    const distanceMeters = route.distance; // 481827.5 in your example
    const durationSeconds = route.duration; // 28542.6 in your example

    // Format the values
    return {
      distance: formatDistance(distanceMeters),
      duration: formatDuration(durationSeconds),
      rawDistance: distanceMeters, // Optional: keep raw value
      rawDuration: durationSeconds, // Optional: keep raw value
    };
  } catch (error) {
    console.error('Error fetching distance and ETA:', error.message);
    return {distance: 'N/A', duration: 'N/A'};
  }
};

export default getDistanceAndETA;
