import {renderOrderSummary} from './checkout/orderSummary.js';
import {paymentSummary} from './checkout/paymentSummary.js';
// import '../data/car.js';
// import '../data/backend-practise.js'
import {loadProducts} from '../data/products.js';
import {loadCart} from '../data/cart.js';


//promise.all runs all promises at the same time
//values in promises can be passed on to then
Promise.all([
  new Promise(
    (resolve)=>{
      loadProducts(()=>{
        resolve('value1');
      });
    }
  ),

  new Promise((resolve)=>{
    loadCart(()=>{
      resolve('value2');
    });
  })
]
).then((values) => {
  console.log(values);
  renderOrderSummary();
  paymentSummary();
});

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