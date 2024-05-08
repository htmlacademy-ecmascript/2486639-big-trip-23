import { getRandomNumber, getRandomBoolean, getRandomDatePeriod, getRandomNumbers, getRandomArrayElement, getRandomArrayElements } from '../utils/random.js';
import { Event, DESTINATIONS, Offer, PhotoNumber, Description, Info } from './const.js';

const getOfferIdsByType = (typesOffers, type) => {
  const typeOffers = typesOffers.filter((offer) => offer.type === type)[0]?.offers;

  return (typeOffers) ? typeOffers.map((offer) => offer.id) : [];
};

const createEvent = (id, type, typesOffers, destinations) => {
  const { MIN: minPrice, MAX: maxPrice } = Event.Price;
  const basePrice = getRandomNumber(minPrice, maxPrice);
  const offerIds = getOfferIdsByType(typesOffers, type);
  const randomOffers = (offerIds) ? getRandomArrayElements(offerIds, offerIds.length - 1) : [];

  const { dateFrom, dateTo } = getRandomDatePeriod(Event.Date.MIN, Event.Date.MAX);

  return {
    id,
    type,
    basePrice,
    dateFrom,
    dateTo,
    isFavorite: getRandomBoolean(),
    offers: randomOffers,
    destination: getRandomArrayElement(destinations.map((destination) => destination.id))
  };
};

const generateMockData = (types) => {
  const destinations = DESTINATIONS.map((destination, index) => {
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

  const typesOffers = types.map(
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

  const events = Array.from(
    { length: getRandomNumber(0, Event.MAX_COUNT) },
    //{ length: 0 }, //! для тестирования
    //{ length: 1 }, //! для тестирования
    //{ length: 2 }, //! для тестирования
    (_, index) => createEvent(index + 1, getRandomArrayElement(types), typesOffers, destinations));

  return { destinations, typesOffers, events };
};

const getMockInfo = (destinations) => {
  const { DESTINATIONS_COUNT: destinationsCount, Cost: { MIN: minCost, MAX: maxCost } } = Info;
  const randomDestinations = getRandomArrayElements(destinations, destinationsCount, destinationsCount);
  const title = randomDestinations.map((destination) => destination.name).join(' — ');
  const { dateFrom, dateTo } = getRandomDatePeriod(Event.Date.MIN, Event.Date.MAX);
  const cost = getRandomNumber(minCost, maxCost);

  return { title, dateFrom, dateTo, cost };
};

export { generateMockData, getMockInfo };
