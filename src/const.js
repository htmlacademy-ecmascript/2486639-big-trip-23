const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const DEFAULT_ENABLED_FILTERS = [FilterType.EVERYTHING, FilterType.PRESENT];

const TRIP_SORTINGS = ['day', 'event', 'time', 'price', 'offers'];

const MessageType = {
  NEW_EVENT: 'Click New Event to create your first point',
  LOADING: 'Loading...',
  FAILEAD: 'Failed to load latest route information'
};

export { EVENT_TYPES, FilterType, DEFAULT_ENABLED_FILTERS, TRIP_SORTINGS, MessageType };
