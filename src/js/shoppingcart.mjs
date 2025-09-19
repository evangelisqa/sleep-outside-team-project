function productCardTemplate(product) {
  return `<li class="cart-card divider">
    <a href="product_pages/?product=" class="cart-card__image">
      <img src="" alt="Image of ">
    </a>
    <a href="product-pages/?product=">
        <h2 class="card__name"></h2>
    </a>
    <p class="cart-card__color"></p>
    <p class="cart-card__quantity">qty: </p>
    <p class="cart-card__price"></p>
  </li>`
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    // You passed in this information to make the class as reusable as possible.
    // Being able to define these things when you use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // the dataSource will return a Promise...so you can use await to resolve it.
    const list = await this.dataSource.getData();
    // next, render the list – ** future **
  }
  renderList(list) {
    const htmlString = list.map(productCardTemplate);
    this.listElement.insertAdjacentHTML('afterbegin', htmlString.join (''));
  }
}