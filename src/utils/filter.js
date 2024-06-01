import dayjs from 'dayjs';
import { FilterType, filterTypes } from '../const.js';

const filterTypeEvents = {
  [FilterType.EVERYTHING]: () => true,
  [FilterType.FUTURE]: (dateFrom, _, date) => dayjs(dateFrom).isAfter(date),
  [FilterType.PRESENT]: (dateFrom, dateTo, date) => (dayjs(dateFrom).isBefore(date) && dayjs(dateTo).isAfter(date)),
  [FilterType.PAST]: (_, dateTo, date) => dayjs(dateTo).isBefore(date),
};

const existFilteredEvents = (events, filter, now) => {
  const checkEvents = filterTypeEvents[filter];
  return events.some((event) => {
    const { dateFrom, dateTo } = event;

    return checkEvents(dateFrom, dateTo, now);
  });
};

const getEnabledFilterTypes = (events, now) => {
  if (!events.length) {
    return [];
  }

  return filterTypes.filter((filter) => existFilteredEvents(events, filter, now));
};

const filterEvents = (events, filterType, now) => events.filter(({ dateFrom, dateTo }) => filterTypeEvents[filterType](dateFrom, dateTo, now));

export { filterEvents, getEnabledFilterTypes };
