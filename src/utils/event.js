const getEventOffers = (typeOffers, eventOfferIds) => typeOffers.filter((typeOffer) => eventOfferIds.has(typeOffer.id));
const getDestinationName = (destinationInfo) => (destinationInfo) ? destinationInfo.name : '';

export { getEventOffers, getDestinationName };
