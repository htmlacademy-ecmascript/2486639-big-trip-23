import { getRandomNumber, getRandomBoolean, getRandomNumbers, getRandomArrayElement, getRandomArrayElements } from '../utils.js';
import { Event, DESTINATIONS, Offer, PhotoNumber, Description } from './const.js';

let currentOffers = [];
let currentEvents = [];

const getTypes = () => Event.TYPES;

const getDestinations = () => DESTINATIONS;

const getOffers = () => currentOffers;

const getOfferIdsByType = (type) => {
  const typeOffers = currentOffers.filter((offer) => offer.type === type);
  const { offers } = typeOffers[0];

  return (offers) ? offers.map((offer) => offer.id) : null;
};

const getEvents = () => currentEvents;

const createEvent = (id) => {
  const type = getRandomArrayElement(Event.TYPES);
  const basePrice = id * 1000;
  const offerIds = getOfferIdsByType(type);
  const offers = (offerIds) ? getRandomArrayElements(offerIds, offerIds.length - 1) : null;
  const description = getRandomArrayElements(Description.DESCRIPTIONS, Description.MAX_COUNT).join(' ');
  const randomNumbers = getRandomNumbers(PhotoNumber.MIN, PhotoNumber.MAX);
  const photos = (randomNumbers) ?
    randomNumbers.map((number) => ({
      src: `img/photos/${number}.jpg`,
      description: `title - ${number}`
    })) :
    null;

  return {
    id,
    type,
    basePrice,
    dateFrom: '11/22/33',
    dateTo: '22/33/44',
    isFavorite: getRandomBoolean(),
    offers,
    destination: {//!!позже перенести в отдельный destinations {id, description, name, pictures[{src,description}]} - getDestinations = () => DESTINATIONS;
      photos,
      description
    }
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

  currentEvents = Array.from({ length: Event.COUNT }, (_, index) => createEvent(index + 1));
};

export { initMockData, getTypes, getDestinations, getOffers, getEvents };
