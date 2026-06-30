import {cart,getcartQuantity} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOptions } from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';
import { addOrder, orders } from '../../data/orders.js';


export function paymentSummary(){
  
  let productPriceCents = 0;
  let shippingPirceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    const deliveryOption = getDeliveryOptions(cartItem.deliveryOptionId);
    productPriceCents += cartItem.quantity * product.priceCents;
    shippingPirceCents += deliveryOption.priceCents;
  });
  

  const totalBeforeTaxCents = productPriceCents+shippingPirceCents;
  const taxCents = totalBeforeTaxCents*0.1;

  const totalCents = totalBeforeTaxCents+taxCents;
  // console.log(productPriceCents, shippingPirceCents, totalCents);

  const paymentSummaryHTML = `;

          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class="js-payment-summary-items-count">Items (${getcartQuantity()}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPirceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
        `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

  const postOrderURL = 'https://supersimplebackend.dev/orders';

  document.querySelector('.js-place-order').addEventListener('click', async () => {
    
    try{
    const response = await fetch(postOrderURL, {
      method: "POST", 
      headers: {
      "Content-Type": "application/json",
      },
    body: JSON.stringify({
    cart: cart
      }), // Converts JS object to JSON string
    });

    const order = await response.json();
    addOrder(order);
    console.log(orders);
    }catch(error){
      console.error('Error:', error);
    }

    window.location.href = 'orders.html';

  });

}