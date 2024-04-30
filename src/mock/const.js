const Event = {
  TYPES: ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'],
  COUNT: 4
};

const Offer = {
  TITLES: ['Travel by train', 'Choose seats', 'Add meal', 'Switch to comfort class', 'Add luggage', 'Order Uber', 'Rent a car', 'Add breakfast', 'Book tickets', 'Lunch in city'],
  PRICES: [40, 5, 15, 100, 30, 20, 200, 50, 40, 30],
};

const PhotoNumber = {
  MIN: 1,
  MAX: 5
};

const DESCRIPTION_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus';

const Description = {
  DESCRIPTIONS: DESCRIPTION_TEXT.split('.').map((string) => `${string.trim()}.`),
  MAX_COUNT: 5
};

export {
  Event,
  Offer,
  PhotoNumber,
  Description
};
