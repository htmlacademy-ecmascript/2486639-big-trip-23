import dayjs from 'dayjs';
import { getTwoDigitString } from '../utils/string.js';

const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

const getStringDate = (date, format) => (!date) ? '' : dayjs(date).format(format);

const getDurationMinutes = (dateStart, dateEnd) => dayjs(dateEnd).diff(dateStart, 'minute');

const getDurationString = (dateStart, dateEnd) => {
  const durationMinutes = getDurationMinutes(dateStart, dateEnd);
  const minutes = durationMinutes % MINUTES_IN_HOUR;
  const durationHours = (durationMinutes - minutes) / MINUTES_IN_HOUR;
  const hours = durationHours % HOURS_IN_DAY;
  const days = (durationHours - hours) / HOURS_IN_DAY;

  const strings = [];

  if (days > 0) {
    strings.push(getTwoDigitString(days), 'D ');
  }
  if (hours > 0 || days > 0) {
    strings.push(getTwoDigitString(hours), 'H ');
  }
  strings.push(getTwoDigitString(minutes), 'M');

  return strings.join('');
};

export { getStringDate, getDurationMinutes, getDurationString };
