import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import polyline from '@mapbox/polyline';

import styles from './PassangersMap.style';
import RenderOSMDirections from '../../screens/FindDriverScreen/RenderOSMDirections';
import {
  height,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  mapType,
} from '../Constants/constant.utils';
import { osrmUrl } from '../Constants/constant.url';
import { requestUsingGetMethode } from '../../utils/handleRequestToServer/handleRequestToServer';
import {
  setRegion,
  updateJourneyRoutePoints,
} from '../../Redux/slices/PassengerSlice';
import store from '../../Redux/Store/Store';

const PassangerMap = ({ mapHeight, navigation }) => {
  const passengerSlices = useSelector(state => state?.passengerSlices);
  const listofJourneyStatus = passengerSlices?.listofJourneyStatus;
  const {
    originLocation: origin,
    destination,
    currentLocation,
    passengerStatus,
    driver,
    journey,
    journeyRoutePoints,
    region,
  } = passengerSlices;

  const [isMapReady, setIsMapReady] = useState(false);
  const driverInfo = driver?.[0]?.driver;

  const driverLocationData = {
    latitude: driverInfo?.originLatitude,
    longitude: driverInfo?.originLongitude,
  };
  const [completedRouteCoords, setCompletedRouteCoords] = useState([]); // Red
  const [remainingRouteCoords, setRemainingRouteCoords] = useState([]); // Blue
  const journeyUniqueId = journey?.[0]?.journeyUniqueId;
  // list of coordinates saved in database which are a pints where driver has gone

  // Convert string coordinates to numbers and format for Polyline
  const routeCoordinates =
    journeyRoutePoints?.map(point => ({
      latitude: parseFloat(point.latitude),
      longitude: parseFloat(point.longitude),
    })) || [];
  const [lastJourneyRoutePoints, setLastJourneyRoutePoints] = useState(null);
  const getJourneyRoutePoints = async () => {
    try {
      const url = `/api/journeyRoutePoints/journeyUniqueId/${journeyUniqueId}`;
      const result = await requestUsingGetMethode({ url });
      const data = result?.data;
      store.dispatch(updateJourneyRoutePoints(data));
      const lastData = data[data?.length - 1];
      setLastJourneyRoutePoints({
        ...lastData,
        latitude: Number(lastData?.latitude),
        longitude: Number(lastData?.longitude),
      });
    } catch (error) {
      console.log('@getJourneyRoutePoints error', error);
    }
  };

  // the distance between driver and passenger
  const [
    driverAndPassengerLocationRouteCoords,
    setDriverAndPassengerLocationRouteCoords,
  ] = useState([]);
  // Reusable function to fetch route from OSRM
  const fetchRoute = async (startPoint, endPoint, setRouteState) => {
    if (
      !startPoint?.latitude ||
      !startPoint?.longitude ||
      !endPoint?.latitude ||
      !endPoint?.longitude
    )
      return;

    const coords = `${startPoint.longitude},${startPoint.latitude};${endPoint.longitude},${endPoint.latitude}`;
    const url = `${osrmUrl}/route/v1/driving/${coords}?overview=full&geometries=polyline`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const geometry = data?.routes?.[0]?.geometry;
      if (!geometry) throw new Error('No geometry found.');

      const decoded = polyline.decode(geometry);
      const formattedCoords = decoded.map(([lat, lon]) => ({
        latitude: lat,
        longitude: lon,
      }));

      setRouteState(formattedCoords);
    } catch (error) {
      console.error('@fetchRoute error:', error);
    }
  };

  useEffect(() => {
    getJourneyRoutePoints();
    const intervalId = setInterval(getJourneyRoutePoints, 5 * 60 * 1000); // 5 minutes
    return () => clearInterval(intervalId);
  }, []);

  // Fetch both routes when status is active
  useEffect(() => {
    if (
      passengerStatus == listofJourneyStatus?.journeyStarted //5
    ) {
      if (origin && currentLocation)
        fetchRoute(origin, currentLocation, setCompletedRouteCoords); // blu Line
      if (lastJourneyRoutePoints && destination)
        fetchRoute(
          lastJourneyRoutePoints,
          destination,
          setRemainingRouteCoords,
        ); // red Line
    }
    if (
      passengerStatus == listofJourneyStatus?.acceptedByPassenger //4
    ) {
      fetchRoute(
        currentLocation,
        driverLocationData,
        setDriverAndPassengerLocationRouteCoords,
      );
    }
  }, [origin, currentLocation, destination, passengerStatus]);

  useEffect(() => {
    if (
      passengerStatus >= listofJourneyStatus?.journeyStarted &&
      lastJourneyRoutePoints?.latitude &&
      lastJourneyRoutePoints?.longitude
    ) {
      setRegion({
        latitude: Number(lastJourneyRoutePoints.latitude),
        longitude: Number(lastJourneyRoutePoints.longitude),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    } else if (
      (!passengerStatus ||
        passengerStatus < listofJourneyStatus?.journeyStarted) &&
      currentLocation?.latitude &&
      currentLocation?.longitude
    ) {
      setRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    }
  }, [currentLocation, lastJourneyRoutePoints]);

  useEffect(() => {
    console.log('@origin', origin);
  }, [origin]);
  const safeMapHeight = Math.max(height * (mapHeight || 0.5), 300);
  console.log('@safeMapHeight', safeMapHeight);
  return (
    <View style={{ flex: 1 }}>
      <MapView
        mapType={mapType}
        // customMapStyle={customMapStyle}
        style={[
          styles.map,
          {
            height: safeMapHeight, // Math.max(height * (mapHeight || 0.5), 300), // height * (mapHeight || 0.5),
            marginBottom: -30,
            height: safeMapHeight,
          },
        ]}
        region={region}
        showsUserLocation
        followsUserLocation
        onMapReady={() => setIsMapReady(true)}
      >
        {/* Origin Marker */}
        {origin?.latitude && origin?.longitude && (
          <Marker
            coordinate={{
              latitude: origin.latitude,
              longitude: origin.longitude,
            }}
            title="Starting Point"
            description={origin.description}
          />
        )}

        {/* Current Location Marker */}
        {currentLocation?.latitude && currentLocation?.longitude && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="Current Location"
          />
        )}

        {/* Destination Marker */}
        {destination?.latitude && destination?.longitude && (
          <Marker
            coordinate={{
              latitude: destination.latitude,
              longitude: destination.longitude,
            }}
            title="Destination"
            description={destination.description}
          />
        )}
        {/* driverAndPassengerLocationRouteCoords */}
        {passengerStatus == listofJourneyStatus?.acceptedByPassenger &&
          isMapReady &&
          driverAndPassengerLocationRouteCoords.length > 0 &&
          driverAndPassengerLocationRouteCoords?.length > 0 && (
            <RenderOSMDirections
              routeCoords={driverAndPassengerLocationRouteCoords}
              color="red"
            />
          )}

        {/* Render Completed Journey (blue) */}
        {passengerStatus >= listofJourneyStatus?.journeyStarted &&
          isMapReady &&
          completedRouteCoords?.length > 0 &&
          routeCoordinates?.length > 0 && (
            <RenderOSMDirections routeCoords={routeCoordinates} color="blue" />
          )}

        {/* Render Remaining Journey (red) */}
        {passengerStatus >= listofJourneyStatus?.journeyStarted &&
          isMapReady &&
          remainingRouteCoords?.length > 0 &&
          remainingRouteCoords?.length > 0 && (
            <RenderOSMDirections
              routeCoords={remainingRouteCoords}
              color="red"
            />
          )}
      </MapView>

      {!isMapReady && (
        <ActivityIndicator
          style={styles.loadingIndicator}
          size="large"
          color="#0000ff"
        />
      )}
    </View>
  );
};
export default React.memo(PassangerMap);
