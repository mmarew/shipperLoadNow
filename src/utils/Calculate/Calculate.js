// import {useSelector} from 'react-redux';

import getDistanceAndETA from '../GetDistanceAndETA/getDistanceAndETA';

const calculateEstimatedMoney = async ({
  tarrifRateForVehicleType,
  standingCoords,
  destinationCoords,
}) => {
  if (!standingCoords || !destinationCoords) return 0;
  if (
    !tarrifRateForVehicleType ||
    typeof tarrifRateForVehicleType !== 'object'
  ) {
    console.error('Error: tarrifRateForVehicleType is null or invalid.');
    return 0;
  }
  try {
    const {distance, duration} = await getDistanceAndETA({
      standingCoords,
      destinationCoords,
    });
    console.log('distance, duration', distance, duration);
    if (
      distance === 'N/A' ||
      duration === 'N/A' ||
      distance === 'Error' ||
      duration === 'Error'
    ) {
      return 0; // Return 0 if Google Maps API fails to get data
    }

    const standingTarrifRate =
      parseFloat(tarrifRateForVehicleType?.standingTarrifRate) || 0;
    const journeyTarrifRate =
      parseFloat(tarrifRateForVehicleType?.journeyTarrifRate) || 0;
    const timingTarrifRate =
      parseFloat(tarrifRateForVehicleType?.timingTarrifRate) || 0;

    // Convert distance from string ("10 km") to float
    const totalDistance =
      parseFloat(distance.replace(' km', '').replace(',', '')) || 0;
    // Convert duration from string ("20 mins" or "1 hour 30 mins") to hours
    const totalDuration = convertDurationToHours(duration);
    const estimatedMoney =
      standingTarrifRate +
      journeyTarrifRate * totalDistance +
      timingTarrifRate * totalDuration;
    return Math.ceil(estimatedMoney);
  } catch (error) {
    console.error('Error calculating estimated money:', error);
    return 0;
  }
};

/**
 * Converts duration text from Google Maps API into hours.
 *
 * @param {string} durationText - Duration text (e.g., "1 hour 30 mins" or "20 mins").
 * @returns {number} - Duration in hours.
 */
const convertDurationToHours = durationText => {
  let totalMinutes = 0;
  const hourMatch = durationText.match(/(\d+)\s*hour/);
  const minuteMatch = durationText.match(/(\d+)\s*min/);

  if (hourMatch) totalMinutes += parseInt(hourMatch[1]) * 60;
  if (minuteMatch) totalMinutes += parseInt(minuteMatch[1]);

  return totalMinutes / 60;
};
function formatETB(amount) {
  // Create a formatter for Ethiopian Birr
  const etbFormatter = new Intl.NumberFormat('EN-ET', {
    style: 'currency',
    currency: 'ETB',
    currencyDisplay: 'symbol', // Display the currency symbol
  });

  // Format and return the amount
  return etbFormatter.format(amount);
}

export {calculateEstimatedMoney, formatETB};
