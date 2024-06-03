const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const getTwoDigitString = (number) => (number < 10) ? `0${number}` : number.toString();

export { capitalizeFirstLetter, getTwoDigitString };
