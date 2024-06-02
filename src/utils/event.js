import { sortEvents } from './sorting.js';
import { findItemByKey } from './utils.js';
import { INFO_DESTINATION_MAX_COUNT, SortingType } from '../const.js';

const getDestinationById = (destinations, id) => findItemByKey(destinations, id);

const getDestinationName = (destination) => destination?.name || '';

const getDestinationByName = (destinations, name) => findItemByKey(destinations, name, 'name');

const getEventOffers = (typeOffers, eventOfferIds) => typeOffers.filter((typeOffer) => eventOfferIds.includes(typeOffer.id));

const getDestinationInfo = (events, destinations) => {
  const destinationNames = [];
  const eventsCount = events.length;

  events.forEach((event) => {
    destinationNames.push(getDestinationById(destinations, event.destination).name);
  });

  if (eventsCount <= INFO_DESTINATION_MAX_COUNT) {
    return destinationNames.join(' — ');
  }

  return `${destinationNames[0]} — ... — ${destinationNames[eventsCount - 1]}`; //В задании' —... — ', в маркапах не нашел '...';
};

const getEventOffersCost = (eventOfferIds, typeOffers) => getEventOffers(typeOffers, eventOfferIds).reduce((cost, offer) => (cost + offer.price), 0);

const getTripInfo = (events, destinations, offers) => {
  const sortedEvents = [...events].sort(sortEvents[SortingType.DAY]);

  return {
    title: getDestinationInfo(sortedEvents, destinations),
    dateFrom: sortedEvents[0].dateFrom,
    dateTo: sortedEvents[sortedEvents.length - 1].dateTo,
    cost: events.reduce((totalCost, event) => (totalCost + event.basePrice + getEventOffersCost(event.offers, offers.get(event.type))), 0)
  };
};

export { getDestinationById, getDestinationName, getDestinationByName, getEventOffers, getTripInfo };
