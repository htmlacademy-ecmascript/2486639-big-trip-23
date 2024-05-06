import { getRandomNumber, getRandomBoolean, getRandomDate, getRandomNumbers, getRandomArrayElement, getRandomArrayElements } from '../utils.js';
import { Event, DESTINATIONS, Offer, PhotoNumber, Description, Info, Cost } from './const.js';

const getOfferIdsByType = (offers, type) => {
  const typeOffers = offers.filter((offer) => offer.type === type)[0]?.offers;

  return (typeOffers) ? typeOffers.map((offer) => offer.id) : [];
};

const createEvent = (id, type, offers, destinations) => {
  const { MIN: minPrice, MAX: maxPrice } = Event.Price;
  const basePrice = getRandomNumber(minPrice, maxPrice);
  const offerIds = getOfferIdsByType(offers, type);
  const randomOffers = (offerIds) ? getRandomArrayElements(offerIds, offerIds.length - 1) : [];

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
      let typeOffers = [];
      if (getRandomBoolean()) {
        const randomOfferTitles = getRandomArrayElements(titles, getRandomNumber(0, titles.length - 1));
        if (randomOfferTitles) {
          typeOffers = randomOfferTitles.map((title) => {
            const index = titles.indexOf(title);
            const name = `offer-${index}`;
            const id = `${name}-1`;//! в разметке есть и id и for "event-offer-meal-1" и name="event-offer-meal"
            const price = Offer.PRICES[index];

            return { id, name, title, price };
          });
        }
      }

      return { type, offers: typeOffers };
    });

  const events = Array.from({ length: Event.COUNT }, (_, index) => createEvent(index + 1, getRandomArrayElement(types), offers, destinations));

  return { destinations, offers, events };
};

const getMockInfo = (destinations) => {
  const { DESTINATIONS_COUNT: destinationsCount, DATE_MAX: DateMax } = Info;
  const randomDestinations = getRandomArrayElements(destinations, destinationsCount, destinationsCount);
  const title = randomDestinations.map((destination) => destination.name).join(' — ');
  const dates = `${getRandomNumber(1, DateMax)}&nbsp;—&nbsp;${getRandomNumber(1, DateMax)} Mar`;
  const cost = getRandomNumber(Cost.MIN, Cost.MAX);

  return { title, dates, cost };
};

export { generateMockData, getMockInfo };
