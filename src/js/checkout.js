import { loadHeaderFooter, getLocalStorage } from './utils.mjs';

const cartItems = getLocalStorage('so-cart');
if (cartItems) {
  // Get the total and return it
  let totalPrice = 0;
  let itemPrices = cartItems.map((item) => {
    let itemPrice = 0;
    itemPrice = itemPrice + item.ListPrice;
    return itemPrice;
  });
  itemPrices.forEach((item) => {
    totalPrice += item;
  });
  let tax = totalPrice * 0.06;

  let shippingCost = 10;
  if (cartItems.length > 1) {
    cartItems.forEach(() => shippingCost + 2);
  }

  let orderTotal = totalPrice + tax + shippingCost;

  document.getElementById('orderSummary').innerHTML = `
        <p>Subtotal: ${totalPrice}</p>
        <p>Tax: ${tax}</p>
        <p>Shipping Estimate: ${shippingCost}</p>
        <p>Total: ${orderTotal}</p>
    `;
} else {
  document.querySelector('.product-list').innerHTML =
    '<h3>Your cart is empty</h3>';
}

loadHeaderFooter();
