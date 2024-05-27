const makeExtendedEvent = (event, offers, destinations) => {
  const { type, destination, offers: offerIds } = event;
  const offersMap = new Set(offerIds);
  const destinationInfo = destinations.get(destination);
  const typeOffers = offers.get(type);

  return { ...event, offers: offersMap, destinationInfo, typeOffers };
};

const getEventOffers = (typeOffers, eventOfferIds) => typeOffers.filter((typeOffer) => eventOfferIds.has(typeOffer.id));
const getDestinationName = (destinationInfo) => (destinationInfo) ? destinationInfo.name : '';

export { makeExtendedEvent, getEventOffers, getDestinationName };
