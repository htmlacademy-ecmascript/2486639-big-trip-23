const getEventOffers = (typeOffers, eventOfferIds) => typeOffers.filter((typeOffer) => eventOfferIds.has(typeOffer.id));

export { getEventOffers };
