import {
  addDecision,
  addDestinationLocation,
  addDriver,
  addJourney,
  addListOfCancilationReasons,
  addListOfVehiclesType,
  addOriginLocation,
  addPassenger,
  addPassengerStatus,
  addSelectedVechelesType,
  setFare,
  setSelectedScreen,
} from '../../Redux/slices/PassengerSlice';
import store from '../../Redux/Store/Store';
import errorHandler from '../errorHandler/errorHandler';

const setPassengersLocation = passenger => {
  const destinationLatitude = passenger?.destinationLatitude,
    destinationLongitude = passenger?.destinationLongitude,
    destinationPlace = passenger?.destinationPlace,
    originLatitude = passenger?.originLatitude,
    originLongitude = passenger?.originLongitude,
    originPlace = passenger?.originPlace;

  store.dispatch(
    addOriginLocation({
      latitude: parseFloat(originLatitude),
      longitude: parseFloat(originLongitude),
      description: originPlace,
    }),
  );
  store.dispatch(
    addDestinationLocation({
      latitude: parseFloat(destinationLatitude),
      longitude: parseFloat(destinationLongitude),
      description: destinationPlace,
    }),
  );
};
const HandleResponses = response => {
  const states = store.getState();
  const passengerSlices = states?.passengerSlices;
  const listofJourneyStatus = passengerSlices?.listofJourneyStatus;

  if (!response) return;
  try {
    const passenger = response?.passenger,
      driver = response?.drivers,
      fare = response?.fare,
      decisions = response?.decisions,
      journey = response?.journey,
      listOfVehiclesType = response?.listOfVehiclesType,
      listOfCancilationReasons = response?.listOfCancilationReasons,
      selectedVehicleType = response?.selectedVehicleType;
    let journeyStatusId = response?.status;
    if (journeyStatusId === undefined)
      throw new Error('wrong status format on response ');
    if (listOfVehiclesType?.length > 0) {
      store.dispatch(addListOfVehiclesType(listOfVehiclesType));
    }
    // if (journeyStatusId >= listofJourneyStatus.journeyCompleted) {
    //   journeyStatusId = null;
    // }
    console.log('@HandleResponses journeyStatusId', journeyStatusId);
    if (
      journeyStatusId == listofJourneyStatus?.waiting ||
      journeyStatusId == listofJourneyStatus?.requested
    ) {
      if (passenger) {
        store.dispatch(addPassenger(passenger));
        setPassengersLocation(passenger);
      }
      if (driver) store.dispatch(addDriver(driver));
      if (listOfCancilationReasons)
        store.dispatch(addListOfCancilationReasons(listOfCancilationReasons));
      // if (listOfVehiclesType)
      //   store.dispatch(addListOfVehiclesType(listOfVehiclesType));
      if (selectedVehicleType)
        store.dispatch(addSelectedVechelesType(selectedVehicleType?.[0]));

      store.dispatch(addDecision(decisions));
    } else if (journeyStatusId == listofJourneyStatus?.acceptedByDriver) {
      store.dispatch(addPassenger(passenger));
      setPassengersLocation(passenger);

      store.dispatch(addDriver(driver));
      store.dispatch(addDecision(decisions));
    } else if (journeyStatusId == listofJourneyStatus?.acceptedByPassenger) {
      store.dispatch(addPassenger(passenger));
      setPassengersLocation(passenger);
      store.dispatch(addDriver(driver));
      store.dispatch(addDecision(decisions));
      // store.dispatch(addJourney(journey));
    } else if (journeyStatusId == listofJourneyStatus?.journeyStarted) {
      setPassengersLocation(passenger);
      // journeyStatusId = 6 is a cancel request by passenger
      store.dispatch(addPassenger(passenger));
      store.dispatch(addDriver(driver));
      // store.dispatch(addOriginLocation(null));
      store.dispatch(addDecision(decisions));
      store.dispatch(addJourney(journey));
      // store.dispatch(addDestinationLocation(null));

      // journeyStatusId = 5 is journey completed
    } else if (journeyStatusId == listofJourneyStatus?.journeyCompleted) {
      store.dispatch(setFare(fare));
      // journeyStatusId = 6 journey completed
      store.dispatch(addOriginLocation(null));
      store.dispatch(addDecision(decisions));
      store.dispatch(addJourney(journey));
      store.dispatch(addDestinationLocation(null));
      store.dispatch(setSelectedScreen('Trip History'));
    }
    // console.log('passenger', passenger);
    store.dispatch(addPassengerStatus(journeyStatusId));
  } catch (error) {
    console.log('@HandleResponses response is ', response);
    errorHandler(error);
  }
};
export default HandleResponses;
