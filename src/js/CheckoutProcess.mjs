import { getLocalStorage } from './utils.mjs';

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
}