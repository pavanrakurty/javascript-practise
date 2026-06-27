import {cart} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOptions } from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js'

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
            <div>Items (3):</div>
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

          <button class="place-order-button button-primary">
            Place your order
          </button>
        `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

}