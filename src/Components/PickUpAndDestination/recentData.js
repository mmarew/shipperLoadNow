import { requestUsingGetMethod } from '../../utils/handleRequestToServer/handleRequestToServer';

const getRecentCompletedJourney = async () => {
  try {
    const response = await requestUsingGetMethod({
      url: '/api/recentrequest/getRecentCompletedJourney',
    });
    return response?.data;
  } catch (error) {
    console.log('@ getRecentCompletedJourney error =========> ', error);
  }
};
export { getRecentCompletedJourney };
