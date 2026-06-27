import dayjs from 'https://esm.run/dayjs';

function isWeekend(date){
  return (date.format('dddd') === 'Saturday' || 
  date.format('dddd') === 'Sunday');
}

export function nearestWeekDay(date){
  while(isWeekend(date)){
    date = date.add(1,'day');
  }
  return date;
}

export default isWeekend;