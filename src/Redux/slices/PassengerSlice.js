import { createSlice } from '@reduxjs/toolkit';
import { defaultRegion } from '../../Components/Constants/constant.utils';

const name = 'webSocket';

const initialState = {
  // it holds the current location of driver
  currentLocationOfDriver: undefined,
  region: defaultRegion,
  listofJourneyStatus: undefined,
  shippableItem: {
    shippableItemName: undefined,
    shippableItemQtyInQuintal: undefined,
    shippingDate: undefined,
    deliveryDate: undefined,
    shippingCost: undefined,
  },
  passengersToken: undefined,
  connectionToBackEnd: {
    isWSConnected: undefined,
    isHTTPConnected: undefined,
  },
  journeyRoutePoints: undefined,
  reloadApp: undefined,
  messages: [],
  originLocation: undefined,
  currentLocation: undefined,
  destination: undefined,
  WSError: undefined,
  isConnected: undefined,
  driver: undefined,
  passengerStatus: undefined,
  journey: undefined,
  decision: undefined,
  passenger: undefined,
  listOfVehiclesType: undefined,
  selectedVechelesType: undefined,
  listOfCancilationReasons: undefined,
  selectedCancilationReason: undefined,
  isLoading: undefined,
  goBackTo: undefined,
  registrablePassenger: undefined,
  fare: undefined,
  selectedScreen: 'Home',
};

// 🔁 Reusable single-property updater
const createSimpleSetter = key => (state, action) => {
  state[key] = action.payload;
};

// 🔁 Object patching helper for partial updates
const createPartialUpdater = (parentKey, allowedKeys) => (state, action) => {
  allowedKeys.forEach(key => {
    if (action.payload[key] !== undefined) {
      state[parentKey][key] = action.payload[key];
    }
  });
};

const reducers = {
  updateShipableItem: createPartialUpdater('shippableItem', [
    'shippableItemName',
    'shippableItemQtyInQuintal',
    'shippingDate',
    'deliveryDate',
    'shippingCost',
  ]),

  updateConnectionStatus: createPartialUpdater('connectionToBackEnd', [
    'isWSConnected',
    'isHTTPConnected',
  ]),
  setRegion: createSimpleSetter('region'),
  updateListofJourneyStatus: createSimpleSetter('listofJourneyStatus'),
  addPassengersToken: createSimpleSetter('passengersToken'),
  updateJourneyRoutePoints: createSimpleSetter('journeyRoutePoints'),
  setFare: createSimpleSetter('fare'),
  setRegistrablePassenger: createSimpleSetter('registrablePassenger'),
  setReloadApp: createSimpleSetter('reloadApp'),
  setModalVisible: createSimpleSetter('modalVisible'),
  setSelectedCancilationReason: createSimpleSetter('selectedCancilationReason'),
  addOriginLocation: createSimpleSetter('originLocation'),
  updateCurrentLocation: createSimpleSetter('currentLocation'),
  addDestinationLocation: createSimpleSetter('destination'),
  addSelectedVechelesType: createSimpleSetter('selectedVechelesType'),
  addGoBackTo: createSimpleSetter('goBackTo'),
  setIsLoading: createSimpleSetter('isLoading'),
  addListOfCancilationReasons: createSimpleSetter('listOfCancilationReasons'),
  addListOfVehiclesType: createSimpleSetter('listOfVehiclesType'),
  addPassenger: createSimpleSetter('passenger'),
  addJourney: createSimpleSetter('journey'),
  addDecision: createSimpleSetter('decision'),
  addPassengerStatus: createSimpleSetter('passengerStatus'),
  addDriver: createSimpleSetter('driver'),
  setSelectedScreen: createSimpleSetter('selectedScreen'),
  updateCurrentLocationOfDriver: createSimpleSetter('currentLocationOfDriver'),
  removeDriver: state => {
    state.driver = null;
  },

  receiveMessage: (state, action) => {
    state.messages.push(action.payload);
  },

  webSocketError: (state, action) => {
    state.WSError = action.payload.message;
  },

  webSocketClosed: state => {
    state.isConnected = false;
  },

  updateWebSocketStatus: (state, action) => {
    state.isConnected = action.payload.message;
  },
};

const webSocketSlice = createSlice({ name, initialState, reducers });

export const {
  updateCurrentLocationOfDriver,
  updateListofJourneyStatus,
  updateShipableItem,
  addPassengersToken,
  setRegistrablePassenger,
  receiveMessage,
  webSocketError,
  webSocketClosed,
  updateWebSocketStatus,
  addPassengerStatus,
  addDriver,
  removeDriver,
  addJourney,
  addDecision,
  addPassenger,
  addListOfVehiclesType,
  addListOfCancilationReasons,
  setIsLoading,
  addGoBackTo,
  addSelectedVechelesType,
  addOriginLocation,
  updateCurrentLocation,
  addDestinationLocation,
  setSelectedCancilationReason,
  setModalVisible,
  setReloadApp,
  setFare,
  updateConnectionStatus,
  updateJourneyRoutePoints,
  setRegion,
  setSelectedScreen,
} = webSocketSlice.actions;

export default webSocketSlice.reducer;
