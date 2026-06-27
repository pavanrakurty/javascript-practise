function isWeekend(date){
  return (date.format('dddd') === 'Saturday' || 
  date.format('dddd') === 'Sunday');
}

export default isWeekend;