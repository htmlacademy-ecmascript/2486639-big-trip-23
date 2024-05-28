import { SortingType } from '../const.js';
import { sortEvents } from './sorting.js';


const makeExtendedEvent = (event, offers, destinations) => {
  const { type, destination, offers: offerIds } = event;
  const offersMap = new Set(offerIds);
  const destinationInfo = destinations.get(destination);
  const typeOffers = offers.get(type);

  return { ...event, offers: offersMap, destinationInfo, typeOffers };
};

//! может перенсти в допольнительные данные события в модель перенести, т.к. есть вызов для отображения в списке и каждый пересчет блока Инфо.
//! или добавить в typeOffers признак isSelected...
const getEventOffers = (typeOffers, eventOfferIds) => typeOffers.filter((typeOffer) => eventOfferIds.has(typeOffer.id));
const getDestinationName = (destinationInfo) => (destinationInfo) ? destinationInfo.name : '';

const getDestinationInfo = (events) => {
  const destinationNames = [];
  const eventsCount = events.length;

  events.forEach((event) => {
    destinationNames.push(event.destinationInfo.name);
  });

  if (eventsCount < 4) {
    return destinationNames.join(' — ');
  }

  return `${destinationNames[0]} —... — ${destinationNames[eventsCount - 1]}`;
};

const getEventCost = ({ offers, typeOffers }) => getEventOffers(typeOffers, offers).reduce((cost, offer) => (cost + offer.price), 0);

const getTripInfo = (events) => {
  const sortedEvents = [...events].sort(sortEvents[SortingType.DAY]);

  return {
    title: getDestinationInfo(sortedEvents),
    dateFrom: sortedEvents[0].dateFrom,
    dateTo: sortedEvents[sortedEvents.length - 1].dateTo,
    cost: events.reduce((totalCost, event) => (totalCost + event.basePrice + getEventCost(event)), 0)
  };
};

export { makeExtendedEvent, getEventOffers, getDestinationName, getTripInfo };
