import { findItemByKey } from './utils.js';

const findDestinationByName = (destinations, destinationName) => findItemByKey(destinations, destinationName, 'name');

export { findDestinationByName };
