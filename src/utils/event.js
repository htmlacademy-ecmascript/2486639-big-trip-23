import { findItemByKey } from './utils.js';

const findTypeOffers = (offers, type) => {
  const offer = offers.get(type);
  return (offer) ? offer.offers : [];
};

const findDestinationByName = (destinations, destinationName) => findItemByKey(destinations, destinationName, 'name');

export { findTypeOffers, findDestinationByName };
