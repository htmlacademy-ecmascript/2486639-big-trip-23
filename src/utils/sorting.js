import { SortingType } from '../const.js';
import { getDurationMinutes } from './date.js';

const sort = {
  [SortingType.DAY]: (firstEvent, secondEvent) => getDurationMinutes(firstEvent.dateFrom, secondEvent.dateFrom),
  [SortingType.TIME]: (firstEvent, secondEvent) =>
    getDurationMinutes(secondEvent.dateFrom, secondEvent.dateTo) - getDurationMinutes(firstEvent.dateFrom, firstEvent.dateTo),
  [SortingType.PRICE]: (firstEvent, secondEvent) => (secondEvent.basePrice - firstEvent.basePrice)
};

const sortEvents = (events, sortingType) => {
  //! Map позволяет делать доступ по ключу, а сортировать и фильтровать мешает или в модели сделать геттер для получения в виде массива или сразу свойство
  const items = Array.from(events, ([, value]) => value);
  items.sort(sort[sortingType]);

  const sortedEvents = new Map();
  //! Дубль кода как в модели(events-model.js) вынести в utils или event
  items.forEach((event) => {
    sortedEvents.set(event.id, event); // весь event, с id, иначе id дополнительно доставать? перекладывать в event или хранить в перезенторе
  });

  return sortedEvents;
};

export { sortEvents };
