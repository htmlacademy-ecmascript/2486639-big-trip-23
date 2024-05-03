import dayjs from 'dayjs';

const DateFormat = {
  SHORT_DATE_TIME: 'DD/MM/YY HH:mm',
  DATE: 'YYYY-MM-DD',
  MONTH_DAY: 'MMM DD',
  DATE_TIME: 'YYYY-MM-DDTHH:mm',
  TIME: 'HH:mm'
};

const getStringDate = (date, format) => (!date) ? '' : dayjs(date).format(format);

const getDurationString = (dateFrom, dateTo) => {
  const milisecond = dateTo.getTime() - dateFrom.getTime();
  const second = Math.round(milisecond / 1000);
  const minute = Math.round(second / 60);
  const remainderMinute = minute % 60;
  const hour = (minute - remainderMinute) / 60;
  const remainderHour = hour % 24;
  const day = (hour - remainderHour) / 24;
  const strings = [];

  //! прибрать!
  if (day > 0) {
    if (day < 10) {
      strings.push('0');
    }
    strings.push(day, 'D ');
  }
  if (remainderHour > 0 || day > 0) {
    if (remainderHour < 10) {
      strings.push('0');
    }
    strings.push(remainderHour, 'H ');
  }
  if (remainderMinute < 10) {
    strings.push('0');
  }
  strings.push(remainderMinute, 'M');

  return strings.join('');
};

export { DateFormat, getStringDate, getDurationString };
