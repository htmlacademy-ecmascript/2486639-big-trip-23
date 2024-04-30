const EVENT_COUNT = 4;

const OFFERS = [
  {
    title: 'Travel by train',
    price: 40
  },
  {
    title: 'Choose seats',
    price: 5
  },
  {
    title: 'Add meal',
    price: 15
  },
  {
    title: 'Switch to comfort class',
    price: 100
  },
  {
    title: 'Add luggage',
    price: 30
  },
  {
    title: 'Order Uber',
    price: 20
  },
  {
    title: 'Rent a car',
    price: 200
  },
  {
    title: 'Add breakfast',
    price: 50
  },
  {
    title: 'Book tickets',
    price: 40
  },
  {
    title: 'Lunch in city',
    price: 30
  },
];

const PhotoNumber = {
  MIN: 1,
  MAX: 5
};
const Description = {
  TEXT: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus',
  MAX_COUNT: 5
};

const DESCRIPTIONS = Description.TEXT.split('.').map((string) => `${string.trim()}.`);

export {
  EVENT_COUNT,
  OFFERS,
  PhotoNumber,
  Description,
  DESCRIPTIONS
};
