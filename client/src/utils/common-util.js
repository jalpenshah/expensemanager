export const capitalizeFirstLetter = (
  [first, ...rest],
  locale = navigator.language
) =>
  first === undefined ? '' : first.toLocaleUpperCase(locale) + rest.join('');

export const nullCheck = (str) => {
  if (
    typeof str == 'undefined' ||
    !str ||
    str.length === 0 ||
    str === '' ||
    !/[^\s]/.test(str) ||
    /^\s*$/.test(str) ||
    str.replace(/\s/g, '') === ''
  )
    return true;
  else return false;
};

export const roundUpNumber = (num, decimalPlaces) => {
  return parseFloat(num).toFixed(decimalPlaces);
};

export const formatDate = (date, format) => {
  switch (format) {
    case 'DD MMM hh:mm':
      return `${date.getDate()} ${
        monthMap[date.getMonth()]
      }, ${date.getHours()}:${date.getMinutes()}`;
    case 'DD MMM':
      return `${date.getDate()} ${monthMap[date.getMonth()]}`;
    case 'dd/MM/yyyy':
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    default:
      return date.toLocalDateString();
  }
};

const monthMap = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
};
