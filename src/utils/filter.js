import { FilterType } from '../const.js';

//! у каждого фильтра свое сообщение в ТЗ поискать

//! сделать (events) => {} и для проверок и для фильтрации, сортивки!
//! применить dayjs isBefore isAfter
const tripDatePeriodChecks = { //! trip -> events?
  [FilterType.EVERYTHING]: () => true,
  [FilterType.FUTURE]: (dateFrom, _, date) => (dateFrom > date),
  [FilterType.PRESENT]: (dateFrom, dateTo, date) => ((dateFrom <= date) && (dateTo >= date)),
  [FilterType.PAST]: (_, dateTo, date) => (dateTo < date),
};

const existFilteredEvents = (events, filter, now) => {
  const tripDatePeriodCheck = tripDatePeriodChecks[filter];
  return events.some((event) => {
    const { dateFrom, dateTo } = event;

    return tripDatePeriodCheck(dateFrom, dateTo, now);
  });
};

export { existFilteredEvents };
