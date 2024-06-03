import { sortEvents } from './sorting.js';
import { findItemByKey } from './common.js';
import { INFO_DESTINATION_MAX_COUNT, SortingType } from '../const.js';

const delimiter = ' &mdash; ';

const getDestinationById = (destinations, id) => findItemByKey(destinations, id);

const getDestinationName = (destination) => destination?.name || '';

const getDestinationByName = (destinations, name) => findItemByKey(destinations, name, 'name');

const getEventOffers = (event, offers) => {
  const { type, offers: eventOfferIds } = event;
  const typeOffers = offers.get(type);

  return typeOffers.filter((typeOffer) => eventOfferIds.includes(typeOffer.id));
};
const getDestinationInfo = (events, destinations) => {
  const destinationNames = [];
  const eventsCount = events.length;

  events.forEach((event) => {
    destinationNames.push(getDestinationById(destinations, event.destination).name);
  });

  if (eventsCount <= INFO_DESTINATION_MAX_COUNT) {
    return destinationNames.join(delimiter);
  }

  return `${destinationNames[0]}${delimiter}...${delimiter}${destinationNames[eventsCount - 1]}`;
};

const getEventOffersCost = (event, offers) => getEventOffers(event, offers).reduce((cost, offer) => (cost + offer.price), 0);

const getTripInfo = (events, destinations, offers) => {
  const sortedEvents = sortEvents(events, SortingType.DAY);

  return {
    title: getDestinationInfo(sortedEvents, destinations),
    dateFrom: sortedEvents[0].dateFrom,
    dateTo: sortedEvents[sortedEvents.length - 1].dateTo,
    cost: events.reduce((totalCost, event) => (totalCost + event.basePrice + getEventOffersCost(event, offers)), 0)
  };
};

export { getDestinationById, getDestinationName, getDestinationByName, getEventOffers, getTripInfo };
