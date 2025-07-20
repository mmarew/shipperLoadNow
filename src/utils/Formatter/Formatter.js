const formatPhoneNumber = raw => {
  raw = raw.replace(/\D/g, '').slice(0, 9);
  if (raw?.length === 0) return '';

  let result = raw.substring(0, 1) + '-';
  console.log('@raw', raw);
  if (raw.length > 1) result += raw.substring(1, 3);
  if (raw.length >= 3) result += '-' + raw.substring(3, 5);
  if (raw.length >= 5) result += '-' + raw.substring(5, 7);
  if (raw.length >= 7) result += '-' + raw.substring(7, 9);
  return result;
};
const handlePhoneChange = (newText, setPhoneNumber, phoneNumber) => {
  const isDeleting = newText?.length < phoneNumber?.length;

  // If deleting everything, stop formatting
  if (isDeleting) {
    setPhoneNumber(newText);
    return;
  }

  setPhoneNumber(formatPhoneNumber(newText));
};
const isJSON = str => {
  if (typeof str !== 'string') return false;
  try {
    const parsed = JSON.parse(str);
    return typeof parsed === 'object' && parsed !== null;
  } catch (e) {
    return false;
  }
};

const createDateFormatter = (isoString, defaultLocale = 'en-US') => {
  return (isoString, options = {}) => {
    return new Date(isoString).toLocaleDateString(defaultLocale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...options,
    });
  };
};

/**
 * Trims text to a specified size and adds ellipsis if needed
 * @param {string} text - The input text to trim
 * @param {number} size - The maximum length of the output text
 * @param {boolean} [addEllipsis=true] - Whether to add '...' when text is trimmed
 * @returns {string} The trimmed text
 */
function trimText({ text, size, addEllipsis = true }) {
  // Validate inputs
  if (typeof text !== 'string') {
    throw new TypeError('First argument must be a string');
  }
  if (typeof size !== 'number' || size < 0) {
    throw new TypeError('Size must be a positive number');
  }

  // If text is already shorter than or equal to size, return as-is
  if (text.length <= size) {
    return text;
  }

  // Trim the text
  const trimmed = text.substring(0, size);

  // Add ellipsis if requested and needed
  if (addEllipsis && text.length > size) {
    // Make sure we have room for ellipsis (don't exceed requested size)
    return size > 3
      ? trimmed.substring(0, size - 3) + '...'
      : trimmed.substring(0, size);
  }

  return trimmed;
}

function formatShortDate(data) {
  const date = new Date(data);
  // Array of month abbreviations.
  console.log('@formatShortDate date', date);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Get the individual parts of the date.
  const day = date.getDate();
  const monthIndex = date.getMonth(); // getMonth() is zero-based (0-11)
  const year = date.getFullYear();

  // Assemble the parts into the final string.
  return `${months[monthIndex]} ${day} ${year}`;
}

export {
  handlePhoneChange,
  isJSON,
  createDateFormatter,
  trimText,
  formatShortDate,
};
