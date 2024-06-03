import dayjs from 'dayjs';
import { FilterType } from '../const.js';

const isFilteredEvent = {
  [FilterType.EVERYTHING]: () => true,
  [FilterType.FUTURE]: (dateFrom, _, date) => dayjs(dateFrom).isAfter(date),
  [FilterType.PRESENT]: (dateFrom, dateTo, date) => (dayjs(dateFrom).isBefore(date) && dayjs(dateTo).isAfter(date)),
  [FilterType.PAST]: (_, dateTo, date) => dayjs(dateTo).isBefore(date),
};

const existFilteredEvents = (events, filterType, now) => events.some((event) => isFilteredEvent[filterType](event.dateFrom, event.dateTo, now));

const getEnabledFilterTypes = (events, now) => {
  if (!events.length) {
    return [];
  }

  return Object.values(FilterType).filter((filter) => existFilteredEvents(events, filter, now));
};

const filterEvents = (events, filterType, now) => events.filter(({ dateFrom, dateTo }) => isFilteredEvent[filterType](dateFrom, dateTo, now));

export { filterEvents, getEnabledFilterTypes };
