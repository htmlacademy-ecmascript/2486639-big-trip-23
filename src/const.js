const INFO_DESTINATION_COUNT = 3;

const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const DEFAULT_NEW_EVENT = {
  type: EVENT_TYPES[5],
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  isFavorite: false,
  offers: null,
  destination: null,
  destinationInfo: null,
  typeOffers: []
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const filterTypes = Object.values(FilterType);

const DEFAULT_FILTER_TYPE = FilterType.EVERYTHING;
const DEFAULT_ENABLED_FILTER_TYPES = [FilterType.EVERYTHING, FilterType.PRESENT];

const filterEmptyMessage = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

const SortingType = { //? columns + canSort или что то другое
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

const sortingTypeLabelText = { //? columns
  [SortingType.DAY]: SortingType.DAY,
  [SortingType.EVENT]: SortingType.EVENT,
  [SortingType.TIME]: SortingType.TIME,
  [SortingType.PRICE]: SortingType.PRICE,
  [SortingType.OFFER]: 'offers'
};

const DEFAULT_SORTING_TYPE = SortingType.DAY;
const DISABLE_SORTING_TYPES = [SortingType.EVENT, SortingType.OFFER];

const MessageType = {
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
  'time_24hr': true, // в настройках  flatpickr назваеться time_24hr, а linter ругаеться на camelCase: "error  Identifier 'time_24hr' is not in camel case  camelcase"
  dateFormat: DateFormat.SHORT_DATE_TIME_FLATPICKR,
};

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  INIT_ERROR: 'INIT_ERROR'
};

const BASE_URL = 'https://23.objects.htmlacademy.pro/big-trip';
const AUTHORIZATION = 'Basic id2486639';

const UiBlockerLimit = {
  LOWER: 350,
  UPPER: 1000
};

export {
  INFO_DESTINATION_COUNT,
  EVENT_TYPES,
  DEFAULT_NEW_EVENT,
  FilterType,
  filterTypes,
  DEFAULT_FILTER_TYPE,
  DEFAULT_ENABLED_FILTER_TYPES,
  filterEmptyMessage,
  SortingType,
  sortingTypeLabelText,
  DEFAULT_SORTING_TYPE,
  DISABLE_SORTING_TYPES,
  MessageType,
  DateFormat,
  DEFAULT_FLATPICKR_CONFIG,
  UserAction,
  UpdateType,
  BASE_URL,
  AUTHORIZATION,
  UiBlockerLimit
};
