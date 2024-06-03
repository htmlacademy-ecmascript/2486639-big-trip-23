const capitalizeFirstLetter = (value) => value.charAt(0).toUpperCase() + value.slice(1);

const getTwoDigitString = (value) => (value < 10) ? `0${value}` : value.toString();

export { capitalizeFirstLetter, getTwoDigitString };
