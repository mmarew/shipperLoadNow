import { navigate } from '../../services/navigationService';
import store from '../../Redux/Store/Store';
const getScreenLists = () => {
  const state = store.getState();
  const listOfJourneyStatus = state?.passengerSlices?.listOfJourneyStatus;
  const screenLists = [
    {
      passengerStatus: undefined,
      // screen: '',
      screen: '',
      screen: 'Home',
      // description: `waitting for connections`,
    },
    {
      passengerStatus: null,
      screen: 'Home',
      // description: `You have not created request yet. `,
    },
    {
      passengerStatus: listOfJourneyStatus?.waiting,
      // screen: 'Find Driver',
      screen: 'Home',
      description: `Looking for driver ... `,
    },
    {
      passengerStatus: listOfJourneyStatus?.requested,
      // screen: 'Find Driver',
      screen: 'Home',
      description: `Waitting for driver responce `,
    },
    {
      passengerStatus: listOfJourneyStatus?.acceptedByDriver,
      screen: 'Waiting for your Confirmation',
      screen: 'Home',
      description: `Driver accepted your call and waiting for your confirmation`,
    },
    {
      passengerStatus: listOfJourneyStatus?.acceptedByPassenger,
      // screen: 'Journey',

      screen: 'Home',
      description: `Driver is commig to you`,
    },
    {
      passengerStatus: listOfJourneyStatus?.journeyStarted,
      screen: 'Journey',
      description: `Going to destination`,
    },
    {
      passengerStatus: listOfJourneyStatus?.journeyCompleted,
      screen: 'Journey Completed',
      description: `Journey is completed`,
    },
  ];
  return screenLists;
};

const findScreenByPassengerStatus = passengerStatus => {
  return getScreenLists().find(
    screen => screen?.passengerStatus === passengerStatus,
  )?.screen;
};
const findScreenDescription = passengerStatus => {
  return getScreenLists().find(
    screen => screen?.passengerStatus === passengerStatus,
  )?.description;
};
export const navigateToScreen = ({ passengerStatus, screen }) => {
  if (screen) return navigate(screen);
  // no need of screen selection
  if (passengerStatus === undefined) return;
  const screenByStatus = findScreenByPassengerStatus(passengerStatus);
  console.log('@screenByStatus', screenByStatus);
  navigate(screenByStatus);
};
export default findScreenByPassengerStatus;
export { findScreenDescription, findScreenByPassengerStatus };
