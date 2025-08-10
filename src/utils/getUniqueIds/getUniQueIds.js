const getUniQueIds = webSocket => {
  const driver = webSocket?.driver,
    passenger = webSocket?.passenger,
    decision = webSocket?.decision,
    journey = webSocket?.journey,
    journeyDecisionUniqueId = decision?.journeyDecisionUniqueId,
    passengerRequestUniqueId = passenger?.passengerRequestUniqueId,
    driverRequestUniqueId = driver?.driver?.driverRequestUniqueId,
    journeyUniqueId = journey?.journeyUniqueId;
  console.log('@decisions', decision);
  return {
    journeyDecisionUniqueId,
    passengerRequestUniqueId,
    driverRequestUniqueId,
    journeyUniqueId,
  };
};
export default getUniQueIds;
