const API_URLS = {
  VERIFY_PASSENGER_STATUS: '/api/passengerRequest/verifyPassengerStatus',
  GET_CANCELLATION_REASONS: '/api/user/getCancellationReasons',
  GET_VEHICLE_TYPES: '/api/admin/vehicleTypes',
  GET_VEHICLES_TARRIF_RATES: '/api/admin/tarrifRateForVehicleType',
  ACCEPT_PASSENGERS_REQUEST: '/api/passenger/acceptDriverRequest',
  GET_LIST_OF_JOURNEY_STATUS: '/api/admin/journeyStatus/1',
  GET_JOURNEY_ROUTE_POINTS: `/api/journeyRoutePoints/journeyUniqueId/`,
};
export default API_URLS;
