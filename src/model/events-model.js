import { isEmptyArray, getById } from '../utils/utils.js';
import { EVENT_TYPES } from '../const.js';
import { generateMockData, getMockInfo } from '../mock/events.js';

export default class EventsModel {
  constructor() {
    //! временно - скорее всего сделать init()
    const { destinations, offers, events } = generateMockData(EVENT_TYPES);
    this.destinations = destinations;
    this.offers = offers;
    this.events = events;
  }

  getInfo() {
    return getMockInfo(this.destinations); //! временно, потом собрать из событий
  }

  getDestinationNames() {
    return this.destinations.map((destination) => destination.name);
  }

  getDestinationById(id) {
    return getById(this.destinations, id);
  }

  getAvailableEventOffers(event) {
    const { type, offers: eventOfferIds } = event;
    const currentType = getById(this.offers, type, 'type');
    const typeOffers = currentType?.offers;

    if (isEmptyArray(typeOffers)) {
      return [];
    }

    if (isEmptyArray(eventOfferIds)) {
      return typeOffers;
    }

    return typeOffers.map((offer) => ({ ...offer, checked: eventOfferIds.includes(offer.id) }));
  }

  getEventOffers(event) {
    const { type, offers: eventOfferIds } = event;
    const currentType = getById(this.offers, type, 'type');
    const typeOffers = currentType?.offers;

    if (isEmptyArray(typeOffers)) {
      return [];
    }

    if (isEmptyArray(eventOfferIds)) {
      return typeOffers;
    }

    return typeOffers.filter((offer) => eventOfferIds.includes(offer.id));
  }

  getEvents() {
    return this.events;
  }
}
