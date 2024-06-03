import { SortingType } from '../const.js';
import { getDurationMinutes } from './date.js';

const compareEvents = {
  [SortingType.DAY]: (firstEvent, secondEvent) => getDurationMinutes(secondEvent.dateFrom, firstEvent.dateFrom),
  [SortingType.TIME]: (firstEvent, secondEvent) =>
    getDurationMinutes(secondEvent.dateFrom, secondEvent.dateTo) - getDurationMinutes(firstEvent.dateFrom, firstEvent.dateTo),
  [SortingType.PRICE]: (firstEvent, secondEvent) => (secondEvent.basePrice - firstEvent.basePrice)
};

const sortEvents = (events, sortingType) => [...events].sort(compareEvents[sortingType]);

export { sortEvents };
