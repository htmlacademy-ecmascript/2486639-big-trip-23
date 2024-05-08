const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const TRIP_FILTERS = ['everything', 'future', 'present', 'past'];

const TRIP_SORTINGS = [
  {
    name: 'day',
    isEnabled: true
  },
  {
    name: 'event',
    isEnabled: false
  },
  {
    name: 'time',
    isEnabled: true
  },
  {
    name: 'price',
    isEnabled: true
  },
  {
    name: 'offers',
    isEnabled: true
  }
];

const TripMessage = {
  NEW_EVENT: 'Click New Event to create your first point',
  LOADING: 'Loading...',
  FAILEAD: 'Failed to load latest route information'
};

export { EVENT_TYPES, TRIP_FILTERS, TRIP_SORTINGS, TripMessage };
