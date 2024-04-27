const COUNT = 3;

const getEvents = () => Array.from({ length: COUNT }, (_, index) => (index + 1) * 1000);

export { getEvents };
