import { INFO_DESTINATION_COUNT, SortingType } from '../const.js';
import { sortEvents } from './sorting.js';

const getEventOffers = (typeOffers, eventOfferIds) => typeOffers.filter((typeOffer) => eventOfferIds.includes(typeOffer.id));

const getDestinationInfo = (events, destinationsById) => {
  const destinationNames = [];
  const eventsCount = events.length;

  events.forEach((event) => {
    destinationNames.push(destinationsById.get(event.destination).name);
  });

  if (eventsCount <= INFO_DESTINATION_COUNT) {
    return destinationNames.join(' — ');
  }

  return `${destinationNames[0]} — ... — ${destinationNames[eventsCount - 1]}`; //В задании' —... — ', в markup не нашел...;
};

const getEventOffersCost = (eventOfferIds, typeOffers) => getEventOffers(typeOffers, eventOfferIds).reduce((cost, offer) => (cost + offer.price), 0);

const getTripInfo = (events, destinationsById, offers) => {
  const sortedEvents = [...events].sort(sortEvents[SortingType.DAY]);

  return {
    title: getDestinationInfo(sortedEvents, destinationsById),
    dateFrom: sortedEvents[0].dateFrom,
    dateTo: sortedEvents[sortedEvents.length - 1].dateTo,
    cost: events.reduce((totalCost, event) => (totalCost + event.basePrice + getEventOffersCost(event.offers, offers.get(event.type))), 0)
  };
};

export { getEventOffers, getTripInfo };
