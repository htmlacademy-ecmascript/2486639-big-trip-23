const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const TripFilters = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const TRIP_SORTINGS = ['day', 'event', 'time', 'price', 'offers'];

const TripMessage = {
  NEW_EVENT: 'Click New Event to create your first point',
  LOADING: 'Loading...',
  FAILEAD: 'Failed to load latest route information'
};

export { EVENT_TYPES, TripFilters, TRIP_SORTINGS, TripMessage };
