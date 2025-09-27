import { getLocalStorage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

const services = new ExternalServices();

export default class CheckoutProcess {
    constructor(key, outputSelector){
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.subtotal = 0;
        this.tax = 0;
        this.shippingCost = 0;
        this.orderTotal = 0;
    }
    init() {
        this.list = getLocalStorage(this.key);
        this.calculateSubtotal()
    }

    calculateSubtotal() {
        if(this.list) {
            // Get the total and return it
        let itemPrices = this.list.map((item)=> {
            let itemPrice = 0;
            itemPrice = itemPrice + item.ListPrice;
            return itemPrice;
        });
        itemPrices.forEach(item => {
            this.subtotal += item;
        });
    }
    }
    calculateTotal() {
        if(this.list) {
            this.tax = this.subtotal * .06;
            this.shippingCost = 10;
            if(this.list.length > 1) {
                this.list.forEach(() => this.shippingCost + 2);
            }
            this.orderTotal = this.subtotal + this.tax + this.shippingCost;
        }
        this.displayTotals();
    }
    displayTotals() {
        document.getElementById(this.outputSelector).innerHTML = `
        <p>Subtotal: ${this.subtotal}</p>
        <p>Tax: ${this.tax}</p>
        <p>Shipping Estimate: ${this.shippingCost}</p>
        <p>Total: ${this.orderTotal}</p>
    `;
    }
    async checkout() {
    const formElement = document.forms['checkout'];
    const order = formDataToJSON(formElement);

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal;
    order.tax = this.tax;
    order.shipping = this.shipping;
    order.items = packageItems(this.list);
    //console.log(order);

    try {
      const response = await services.checkout(order);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
}
// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

function formDataToJSON(formElement) {
  // convert the form data to a JSON object
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}