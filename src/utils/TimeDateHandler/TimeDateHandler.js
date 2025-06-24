const convertToYMDHMSFormat = dateData => {
  // Check if dateData is valid
  if (!dateData || isNaN(new Date(dateData).getTime())) {
    return null; // Return null for invalid dates
  }

  const date = new Date(dateData);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // YYYY-MM-DD HH:MM:SS
};

// Example usage:
console.log(convertToYMDHMSFormat('2025-04-28T15:45:30Z'));
// Output: 2025-04-28 15:45:30 (depending on timezone)

const checkIfExpired = dateData => {
  const date = new Date(dateData);
  const today = new Date();
  return date < today;
};
export {convertToYMDHMSFormat, checkIfExpired};
