import { SortingType } from '../const.js';
import { getDurationMinutes } from './date.js';

const sortEvents = {
  [SortingType.DAY]: (firstEvent, secondEvent) => getDurationMinutes(secondEvent.dateFrom, firstEvent.dateFrom),
  [SortingType.TIME]: (firstEvent, secondEvent) =>
    getDurationMinutes(secondEvent.dateFrom, secondEvent.dateTo) - getDurationMinutes(firstEvent.dateFrom, firstEvent.dateTo),
  [SortingType.PRICE]: (firstEvent, secondEvent) => (secondEvent.basePrice - firstEvent.basePrice)
};

export { sortEvents };
