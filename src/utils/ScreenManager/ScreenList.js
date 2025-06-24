import {navigate} from '../../services/navigationService';
import store from '../../Redux/Store/Store';
const getScreenLists = () => {
  const state = store.getState();
  const listofJourneyStatus = state?.passengerSlices?.listofJourneyStatus;
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
      passengerStatus: listofJourneyStatus?.waiting,
      // screen: 'Find Driver',
      screen: 'Home',
      description: `Looking for driver ... `,
    },
    {
      passengerStatus: listofJourneyStatus?.requested,
      // screen: 'Find Driver',
      screen: 'Home',
      description: `Waitting for driver responce `,
    },
    {
      passengerStatus: listofJourneyStatus?.acceptedByDriver,
      screen: 'Waiting for your Confirmation',
      screen: 'Home',
      description: `Driver accepted your call and waiting for your confirmation`,
    },
    {
      passengerStatus: listofJourneyStatus?.acceptedByPassenger,
      // screen: 'Journey',

      screen: 'Home',
      description: `Driver is commig to you`,
    },
    {
      passengerStatus: listofJourneyStatus?.journeyStarted,
      screen: 'Journey',
      description: `Going to destination`,
    },
    {
      passengerStatus: listofJourneyStatus?.journeyCompleted,
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
export const navigateToScreen = ({passengerStatus, screen}) => {
  if (screen) return navigate(screen);
  // no need of screen selection
  if (passengerStatus === undefined) return;
  const screenByStatus = findScreenByPassengerStatus(passengerStatus);
  console.log('@screenByStatus', screenByStatus);
  navigate(screenByStatus);
};
export default findScreenByPassengerStatus;
export {findScreenDescription, findScreenByPassengerStatus};
