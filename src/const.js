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

export { EVENT_TYPES, FILTERS, SORTINGS };
