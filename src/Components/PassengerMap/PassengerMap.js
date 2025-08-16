import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import polyline from '@mapbox/polyline';

import styles from './PassengersMap.style';
import RenderOSMDirections from '../../screens/FindDriverScreen/RenderOSMDirections';
import {
  height,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  mapType,
} from '../Constants/constant.utils';
import { osrmUrl } from '../Constants/constant.url';
import { requestUsingGetMethod } from '../../utils/handleRequestToServer/handleRequestToServer';
import {
  setRegion,
  updateJourneyRoutePoints,
} from '../../Redux/slices/PassengerSlice';
import store from '../../Redux/Store/Store';
import API_URLS from '../../Configs/URLConfigs';

const PassengerMap = ({ mapHeight }) => {
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
    currentLocationOfDriver,
  } = passengerSlices;
  console.log('@currentLocationOfDriver', currentLocationOfDriver);

  const [isMapReady, setIsMapReady] = useState(false);
  const driverInfo = driver?.[0]?.driver;

  const driverLocationData = {
    latitude: parseFloat(driverInfo?.originLatitude),
    longitude: parseFloat(driverInfo?.originLongitude),
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
  console.log('@routeCoordinates', routeCoordinates);
  const [lastJourneyRoutePoints, setLastJourneyRoutePoints] = useState(null);
  const getJourneyRoutePoints = async () => {
    try {
      const GET_JOURNEY_ROUTE_POINTS =
        API_URLS?.GET_JOURNEY_ROUTE_POINTS + journeyUniqueId;
      // const url = `/api/journeyRoutePoints/journeyUniqueId/${journeyUniqueId}`;
      const result = await requestUsingGetMethod({
        url: GET_JOURNEY_ROUTE_POINTS,
      });
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
    let intervalId = null;
    intervalId = setInterval(getJourneyRoutePoints, 5 * 60 * 1000); // 5 minutes
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
      passengerStatus <= listofJourneyStatus?.acceptedByPassenger //4
    ) {
      fetchRoute(
        origin,
        // use currentLocationOfDriver if driver is sending this data ealse use driverLocationData which is origin of driver
        currentLocationOfDriver?.currentLocation || driverLocationData,
        setDriverAndPassengerLocationRouteCoords,
      );
    }
  }, [
    origin,
    currentLocation,
    destination,
    passengerStatus,
    currentLocationOfDriver?.currentLocation,
  ]);

  useEffect(() => {
    //If there is a passengerStatus and journey started use lastJourneyRoutePoints which is current location of driver
    if (
      passengerStatus &&
      passengerStatus >= listofJourneyStatus?.journeyStarted &&
      lastJourneyRoutePoints?.latitude &&
      lastJourneyRoutePoints?.longitude
    ) {
      store.dispatch(
        setRegion({
          latitude: Number(lastJourneyRoutePoints.latitude),
          longitude: Number(lastJourneyRoutePoints.longitude),
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }),
      );
    }

    //If there is no passengerStatus use currentLocation as center of map
    else if (
      !passengerStatus &&
      currentLocation?.latitude &&
      currentLocation?.longitude
    ) {
      store.dispatch(
        setRegion({
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }),
      );
    } else if (
      passengerStatus &&
      passengerStatus < listofJourneyStatus?.journeyStarted
    ) {
      store.dispatch(
        setRegion({
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }),
      );
    }
  }, [currentLocation, lastJourneyRoutePoints]);

  useEffect(() => {
    console.log('@origin', origin);
  }, [origin]);
  console.log(
    '@driverLocationData',
    !isNaN(driverLocationData.latitude),
    '@passengerStatus',
    passengerStatus,
  );
  const safeMapHeight = Math.max(height * (mapHeight || 0.5), 300);
  const isValidCoordinate = point => {
    return (
      point &&
      typeof point.latitude === 'number' &&
      typeof point.longitude === 'number' &&
      !isNaN(point.latitude) &&
      !isNaN(point.longitude)
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={[
          styles.map,
          {
            height: safeMapHeight,
          },
        ]}
        mapType={mapType}
        // customMapStyle={customMapStyle}

        region={region}
        showsUserLocation
        followsUserLocation
        onMapReady={() => setIsMapReady(true)}
      >
        {/* Origin Marker */}
        {origin?.latitude &&
          origin?.longitude &&
          !isNaN(origin.latitude) &&
          !isNaN(origin.longitude) && (
            <Marker
              coordinate={{
                latitude: origin.latitude,
                longitude: origin.longitude,
              }}
              title="Starting Point"
              description={origin?.description || ''}
            />
          )}
        {isValidCoordinate(driverLocationData) && (
          <Marker
            coordinate={{
              latitude: driverLocationData?.latitude,
              longitude: driverLocationData?.longitude,
            }}
            title="Driver Location"
          />
        )}
        {/* driverAndPassengerLocationRouteCoords */}
        {passengerStatus &&
          passengerStatus <= listofJourneyStatus?.acceptedByPassenger &&
          isMapReady &&
          // driverAndPassengerLocationRouteCoords.length > 0 &&
          driverAndPassengerLocationRouteCoords?.length > 0 && (
            <RenderOSMDirections
              routeCoords={driverAndPassengerLocationRouteCoords}
              color={'blue'}
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
export default React.memo(PassengerMap);
