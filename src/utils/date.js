import dayjs from 'dayjs';

const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

const getTwoDigitString = (number) => (number < 10) ? `0${number}` : number.toString();

const getStringDate = (date, format) => (!date) ? '' : dayjs(date).format(format);

const getDurationMinutes = (dateStart, dateEnd) => dayjs(dateEnd).diff(dateStart, 'minute');

const getDurationString = (dateStart, dateEnd) => {
  const durationMinutes = getDurationMinutes(dateStart, dateEnd);
  const minutes = durationMinutes % MINUTES_IN_HOUR;
  const durationHours = (durationMinutes - minutes) / MINUTES_IN_HOUR;
  const hours = durationHours % HOURS_IN_DAY;
  const days = (durationHours - hours) / HOURS_IN_DAY;

  const items = [];

  if (days > 0) {
    items.push(getTwoDigitString(days), 'D ');
  }
  if (hours > 0 || days > 0) {
    items.push(getTwoDigitString(hours), 'H ');
  }
  items.push(getTwoDigitString(minutes), 'M');

  return items.join('');
};

const getISOString = (date) => (date instanceof Date) ? date.toISOString() : date;

export { getStringDate, getDurationMinutes, getDurationString, getISOString };
