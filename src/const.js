const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const DEFAULT_ENABLED_FILTERS = [FilterType.EVERYTHING, FilterType.PRESENT];

const SORTING_TYPES = ['day', 'event', 'time', 'price', 'offers'];
const DEFAULT_SORTING_TYPE = SORTING_TYPES[0];
const DISABLE_SORTING_TYPES = [SORTING_TYPES[1]];

const MessageType = {
  NEW_EVENT: 'Click New Event to create your first point',
  LOADING: 'Loading...',
  FAILEAD: 'Failed to load latest route information'
};

export {
  EVENT_TYPES,
  FilterType,
  DEFAULT_ENABLED_FILTERS,
  SORTING_TYPES,
  DEFAULT_SORTING_TYPE,
  DISABLE_SORTING_TYPES,
  MessageType
};
