import {renderOrderSummary} from './checkout/orderSummary.js';
import {paymentSummary} from './checkout/paymentSummary.js';
// import '../data/car.js';
// import '../data/backend-practise.js'
import {loadProducts} from '../data/products.js'


loadProducts(()=>{
  renderOrderSummary();
  paymentSummary();
});