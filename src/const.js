const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const FILTERS = ['everything', 'future', 'present', 'past'];

const SORTINGS = [
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

const Message = {
  NEW_EVENT: 'Click New Event to create your first point',
  LOADING: 'Loading...',
  FAILEAD: 'Failed to load latest route information'
};

export { EVENT_TYPES, FILTERS, SORTINGS, Message };
