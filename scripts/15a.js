import dayjs from 'https://esm.run/dayjs';
import isSatSun from './15a_functions.js'

const today=dayjs();
const todayPlusFive = today.add(5,'day');
console.log(todayPlusFive.format('MM DD'));

const todayPlusThirty = today.add(30,'day');
console.log(todayPlusThirty.format('MM DD'));

const todayMinusThirty = today.subtract(30,'day');
console.log(todayMinusThirty.format('MM DD'));

console.log(todayMinusThirty.format('dddd'));

// function isWeekend(date){
//   return (date.format('dddd') === 'Saturday' || 
//   date.format('dddd') === 'Sunday');
// }

console.log(isSatSun(todayPlusFive));