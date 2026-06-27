import {cart,removeCartItem,updateCartQuantity,updateQuantity,updateDeliveryOption} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import dayjs from 'https://esm.run/dayjs';
import {deliveryOptions, getDeliveryOptions} from '../../data/deliveryOptions.js';


export function renderOrderSummary(){
  let checkoutSummaryHTML = '';

  cart.forEach((cartItem) => {

    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOptions(deliveryOptionId);

    const today = dayjs();
    const deliveryDaysOpted = deliveryOption.deliveryDays;
    const deliveryDate = today.add(deliveryDaysOpted, 'day');
    const deliveryDateString = deliveryDate.format('dddd, MMMM D');

    checkoutSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${deliveryDateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
          ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${(formatCurrency(matchingProduct.priceCents))}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label  js-new-quantity-label-${matchingProduct.id} js-new-quantity-update">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-button"
            data-update-product-id = "${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input js-new-quantity-${matchingProduct.id}"></input>
            <span class="save-quantity-link link-primary js-save-button" data-save-product-id = '${matchingProduct.id}'>Save</span>
            <span class="delete-quantity-link link-primary js-delete-cart-item" data-product-id=${matchingProduct.id}>
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsGenerator(matchingProduct, cartItem)}
        </div>
      </div>
    </div>`
  ;
  });


  function deliveryOptionsGenerator(matchingProduct, cartItem){
    let deliveryOptionsHTML = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDaysOpted = deliveryOption.deliveryDays;
      const deliveryDate = today.add(deliveryDaysOpted, 'day');

      const deliveryDateString = deliveryDate.format('dddd, MMMM D');
      const deliveryPriceString = 
        deliveryOption.priceCents === 0? 'Free':`$${formatCurrency(deliveryOption.priceCents)}`;
      
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      
      deliveryOptionsHTML += 
      `
            <div class="delivery-option js-delivery-option"
            data-product-id = "${matchingProduct.id}"
            data-delivery-option-id = "${deliveryOption.id}">
              <input type="radio"
                ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
              <div>
                <div class="delivery-option-date">
                  ${deliveryDateString}
                </div>
                <div class="delivery-option-price">
                  ${deliveryPriceString} - Shipping
                </div>
              </div>
            </div>
      `
    }); 

    return deliveryOptionsHTML;
  };



  document.querySelector(".order-summary").innerHTML = checkoutSummaryHTML;

  document.querySelectorAll(".js-delete-cart-item").forEach((deleteLink) => {
    deleteLink.addEventListener("click",()=>{
      const productId = deleteLink.dataset.productId;
      removeCartItem(productId);
      
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
      // document.querySelector('.js-cart-checkout-count-display').innerHTML = getcartQuantity();
      updateCartQuantity('.js-cart-checkout-count-display');
    });
  });

  // document.querySelector('.js-cart-checkout-count-display').innerHTML = getcartQuantity();

  updateCartQuantity('.js-cart-checkout-count-display');

  document.querySelectorAll('.js-update-button').forEach((updateButton) => {
    updateButton.addEventListener('click',()=>{
      const productId = updateButton.dataset.updateProductId;
      const updatingItem = document.querySelector(`.js-cart-item-container-${productId}`);
      updatingItem.classList.add('is-editing-quantity');
    });
  });


  document.querySelectorAll('.js-save-button').forEach((saveButton) => {
    saveButton.addEventListener('click', () => {
      const productId = saveButton.dataset.saveProductId;
      const savingItem = document.querySelector(`.js-cart-item-container-${productId}`);
      
      const newQuantity = Number(document.querySelector(`.js-new-quantity-${productId}`).value);

      if (newQuantity <= 0 || newQuantity > 1000) {
        alert('Item quantity should be more than 0 and not more than 1000!');
        // Optional: focus back onto the input or reset it here
        return; 
      }

      // Only close the editing view and update if the data is valid
      savingItem.classList.remove('is-editing-quantity');
      updateQuantity(productId, newQuantity);

      document.querySelector(`.js-new-quantity-label-${productId}`).innerHTML = newQuantity;

      // Double-check if this selector shouldn't be '.js-cart-checkout-count-display'
      updateCartQuantity('.js-cart-checkout-count-display'); 
    });
  });


  document.querySelectorAll('.js-delivery-option').forEach((deliveryOption) => {

    deliveryOption.addEventListener('click', () => {
      const {productId,deliveryOptionId}= deliveryOption.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    });

  });
}