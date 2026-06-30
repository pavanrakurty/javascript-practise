import {renderOrderSummary} from './checkout/orderSummary.js';
import {paymentSummary} from './checkout/paymentSummary.js';
// import '../data/car.js';
// import '../data/backend-practise.js'
import {loadProductsFetch} from '../data/products.js';
import {loadCart} from '../data/cart.js';


async function loadPage(){
  try{
    //throw 'error1';
    await loadProductsFetch();  //await can only be used in async function and can only await on promise

    await new Promise((resolve, reject)=>{
      loadCart(()=>{
        //reject('error3');
        resolve('value2');
      });
    });
  } catch(error) {
    console.log(`Please try again later. ${error}`)
  }
  
  renderOrderSummary();
  paymentSummary();
}

loadPage();

//promise.all runs all promises at the same time
//values in promises can be passed on to then
// Promise.all([
//   loadProductsFetch(),

//   new Promise((resolve)=>{
//     loadCart(()=>{
//       resolve('value2');
//     });
//   })
// ]
// ).then((values) => {
//   console.log(values);
//   renderOrderSummary();
//   paymentSummary();
// });

/*new Promise(
  (resolve)=>{
    loadProducts(()=>{
      resolve();
    });
  }
).then(()=>{
  return new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  });
}).then(()=>{
  renderOrderSummary();
  paymentSummary();
});
*/

// loadProducts(()=>{
//   renderOrderSummary();
//   paymentSummary();
// });