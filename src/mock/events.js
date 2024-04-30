import { getRandomArrayElements, getRandomNumber, getRandomNumbers } from '../utils.js';
import { Event, DESTINATIONS, Offer, PhotoNumber, Description } from './const.js';

let currentOffers = [];
let currentEvents = [];

const createEvent = (id, type, price) => {
  const randomOfferNumbers = getRandomNumbers(0, (Offer.TITLES.length - 1) / 2);
  const offers = (randomOfferNumbers)
    ? randomOfferNumbers.map(
      (offerNumber) => ({
        id: `offer-${offerNumber}-1`, //!! в разметке есть и id и for "event-offer-meal-1" и name="event-offer-meal"
        name: `offer-${offerNumber}`,
        title: Offer.TITLES[offerNumber],
        price: Offer.PRICES[offerNumber]
      }))
    : null;

  const description = getRandomArrayElements(Description.DESCRIPTIONS, Description.MAX_COUNT).join(' ');
  const randomNumbers = getRandomNumbers(PhotoNumber.MIN, PhotoNumber.MAX);
  const photos = (randomNumbers) ?
    randomNumbers.map((number) => ({
      url: `img/photos/${number}.jpg`,
      title: `title - ${number}`
    })) :
    null;

  return {
    id,
    type,
    offers,
    destination: {
      photos,
      description
    },
    price//!! временно
  };
};

const initMockData = () => {
  currentOffers = Event.TYPES.map(
    (type) => {
      const { TITLES: titles } = Offer;
      const randomOfferTitles = getRandomArrayElements(titles, getRandomNumber(0, titles.length - 1));

      const offers = (randomOfferTitles)
        ? randomOfferTitles.map((title) => {
          const index = titles.indexOf(title);
          const name = `offer-${index}`;
          const id = `${name}-1`;//!! в разметке есть и id и for "event-offer-meal-1" и name="event-offer-meal"
          const price = Offer.PRICES[index];

          return { id, name, title, price };
        }) : null;

      return { type, offers };
    });

  currentEvents = Array.from({ length: Event.COUNT }, (_, index) => createEvent(index + 1, 'type', (index + 1) * 1000));
};

const getTypes = () => Event.TYPES;

const getDestinations = () => DESTINATIONS;

const getOffers = () => currentOffers;

const getEvents = () => currentEvents;

export { initMockData, getTypes, getDestinations, getOffers, getEvents };
