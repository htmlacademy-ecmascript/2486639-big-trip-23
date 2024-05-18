import { getRandomNumber, getRandomBoolean, getRandomDatePeriod, getRandomNumbers, getRandomArrayElement, getRandomArrayElements } from '../utils/random.js';
import { EventPrice, EventDate, EVENTS_MAX_COUNT, DESTINATIONS, Offer, PhotoNumber, Description, INFO_DESTINATIONS_COUNT, InfoCost } from './const.js';

const getOfferIdsByType = (offers, type) => {
  const typeOffers = offers.filter((offer) => offer.type === type)[0]?.offers;

  return (typeOffers) ? typeOffers.map((offer) => offer.id) : [];
};

const createEvent = (id, type, offers, destinations) => {
  const basePrice = getRandomNumber(EventPrice.MIN, EventPrice.MAX);
  const offerIds = getOfferIdsByType(offers, type);
  const randomOffers = (offerIds) ? getRandomArrayElements(offerIds, offerIds.length - 1) : [];

  const { dateFrom, dateTo } = getRandomDatePeriod(EventDate.MIN, EventDate.MAX);

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

  const offers = types.map(
    (type) => {
      const { TITLES: titles } = Offer;
      let randomOffers = [];
      if (getRandomBoolean()) {
        const randomOfferTitles = getRandomArrayElements(titles, getRandomNumber(0, titles.length - 1));
        if (randomOfferTitles) {
          randomOffers = randomOfferTitles.map((title) => {
            const index = titles.indexOf(title);
            const name = `${type}-offer-${index}`;
            const id = `${name}-1`;//! в разметке есть и id и for "event-offer-meal-1" и name="event-offer-meal"
            const price = Offer.PRICES[index];

            return { id, name, title, price };
          });
        }
      }

      return { type, offers: randomOffers };
    });

  const events = Array.from(
    { length: getRandomNumber(0, EVENTS_MAX_COUNT) },
    //{ length: 0 }, //! для тестирования
    //{ length: 1 }, //! для тестирования
    //{ length: 2 }, //! для тестирования
    //{ length: 4 }, //! для тестирования
    (_, index) => createEvent(index + 1, getRandomArrayElement(types), offers, destinations));

  return { destinations, offers, events };
};

const getMockTripInfo = (destinations) => {
  const randomDestinations = getRandomArrayElements(destinations, INFO_DESTINATIONS_COUNT, INFO_DESTINATIONS_COUNT);
  const title = randomDestinations.map((destination) => destination.name).join(' — ');
  const { dateFrom, dateTo } = getRandomDatePeriod(EventDate.MIN, EventDate.MAX);
  const cost = getRandomNumber(InfoCost.MIN, InfoCost.MAX);

  return { title, dateFrom, dateTo, cost };
};

export { generateMockData, getMockTripInfo };
