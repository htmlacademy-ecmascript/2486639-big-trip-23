const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

//! посмотреть по ТЗ какие требования к новому событию
const DEFAULT_NEW_EVENT = {
  id: null,
  type: EVENT_TYPES[5],
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  isFavorite: false,
  offers: [],
  destanation: null
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const DEFAULT_FILTER_TYPE = FilterType.EVERYTHING;
const DEFAULT_DISABLE_FILTER_TYPE = [FilterType.FUTURE, FilterType.PAST];

const SortingType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

const DEFAULT_SORTING_TYPE = SortingType.DAY;
const DISABLE_SORTING_TYPES = [SortingType.EVENT, SortingType.OFFER];

const MessageType = {
  NEW_EVENT: 'Click New Event to create your first point',
  LOADING: 'Loading...',
  FAILEAD: 'Failed to load latest route information'
};

const DateFormat = {
  SHORT_DATE_TIME: 'DD/MM/YY HH:mm',
  SHORT_DATE_TIME_FLATPICKR: 'd/m/y H:i',
  DATE: 'YYYY-MM-DD',
  MONTH_DAY: 'MMM DD',
  DAY_MONTH: 'DD MMM',
  DATE_TIME: 'YYYY-MM-DDTHH:mm',
  TIME: 'HH:mm'
};

const DEFAULT_FLATPICKR_CONFIG = {
  enableTime: true,
  // eslint-disable-next-line camelcase
  time_24hr: true, // такое название в настройках, а linter ругаеться на camelCase: "error  Identifier 'time_24hr' is not in camel case  camelcase"
  dateFormat: DateFormat.SHORT_DATE_TIME_FLATPICKR,
};

export {
  EVENT_TYPES,
  DEFAULT_NEW_EVENT,
  FilterType,
  DEFAULT_FILTER_TYPE,
  DEFAULT_DISABLE_FILTER_TYPE,
  SortingType,
  DEFAULT_SORTING_TYPE,
  DISABLE_SORTING_TYPES,
  MessageType,
  DateFormat,
  DEFAULT_FLATPICKR_CONFIG
};
