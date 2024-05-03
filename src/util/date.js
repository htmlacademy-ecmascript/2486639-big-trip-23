import dayjs from 'dayjs';

const DateFormat = {
  SHORT_DATE_TIME: 'DD/MM/YY HH:mm'
};

const getStringDate = (date, format) => (!date) ? '' : dayjs(date).format(format);

export { DateFormat, getStringDate };
