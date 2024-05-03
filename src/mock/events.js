import { getRandomNumber, getRandomBoolean, getRandomDate, getRandomNumbers, getRandomArrayElement, getRandomArrayElements } from '../utils.js';
import { Event, DESTINATIONS, Offer, PhotoNumber, Description, Info, Cost } from './const.js';

let currentTypes = [];
let currentDestinations = [];
let currentOffers = [];
let currentEvents = [];

const getMockTypes = () => currentTypes;

const getMockDestinations = () => currentDestinations;

const getDestinationIds = () => currentDestinations.map((destination) => destination.id);

const getMockOffers = () => currentOffers;

const getOfferIdsByType = (type) => {
  const typeOffers = currentOffers.filter((offer) => offer.type === type);
  const { offers } = typeOffers[0];

  return (offers) ? offers.map((offer) => offer.id) : null;
};

const getMockEvents = () => currentEvents;

const createEvent = (id) => {
  const type = getRandomArrayElement(Event.TYPES);
  const { MIN: minPrice, MAX: maxPrice } = Event.Price;
  const basePrice = getRandomNumber(minPrice, maxPrice);
  const offerIds = getOfferIdsByType(type);
  const offers = (offerIds) ? getRandomArrayElements(offerIds, offerIds.length - 1) : null;

  const { MIN: minDate, MAX: maxDate } = Event.Date;
  const dateFrom = getRandomDate(minDate, maxDate);
  const dateTo = getRandomDate(dateFrom, maxDate);

  return {
    id,
    type,
    basePrice,
    dateFrom,
    dateTo,
    isFavorite: getRandomBoolean(),
    offers,
    destination: getRandomArrayElement(getDestinationIds())
  };
};

const initMockData = () => {
  currentTypes = Event.TYPES.map((type) => ({ id: `type-${type}-1`, type }));

  currentDestinations = DESTINATIONS.map((destination, index) => {
    let description = '';
    let pictures = [];
    if (getRandomBoolean()) {
      description = getRandomArrayElements(Description.DESCRIPTIONS, Description.MAX_COUNT).join(' ');
      const randomNumbers = getRandomNumbers(PhotoNumber.MIN, PhotoNumber.MAX);
      if (randomNumbers) {
        pictures = randomNumbers.map((number) => ({
          src: `img/photos/${number}.jpg`,
          description: `title - ${number}`
        }));
      }
    }

    return ({
      id: `destination-${index}`,
      name: destination,
      description,
      pictures
    });
  });

  currentOffers = Event.TYPES.map(
    (type) => {
      const { TITLES: titles } = Offer;
      let offers = [];
      if (getRandomBoolean()) {
        const randomOfferTitles = getRandomArrayElements(titles, getRandomNumber(0, titles.length - 1));
        if (randomOfferTitles) {
          offers = randomOfferTitles.map((title) => {
            const index = titles.indexOf(title);
            const name = `offer-${index}`;
            const id = `${name}-1`;//! в разметке есть и id и for "event-offer-meal-1" и name="event-offer-meal"
            const price = Offer.PRICES[index];

            return { id, name, title, price };
          });
        }
      }

      return { type, offers };
    });

  currentEvents = Array.from({ length: Event.COUNT }, (_, index) => createEvent(index + 1));
};

const getMockInfo = () => {
  const { DESTINATIONS_COUNT: destinationsCount, DATE_MAX: DateMax } = Info;
  const destinations = getRandomArrayElements(currentDestinations, destinationsCount, destinationsCount);
  const title = destinations.map((destination) => destination.name).join(' — ');
  const dates = `${getRandomNumber(1, DateMax)}&nbsp;—&nbsp;${getRandomNumber(1, DateMax)} Mar`;
  const cost = getRandomNumber(Cost.MIN, Cost.MAX);

  return { title, dates, cost };
};

export { initMockData, getMockTypes, getMockDestinations, getMockOffers, getMockEvents, getMockInfo };
