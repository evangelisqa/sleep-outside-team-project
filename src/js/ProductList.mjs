export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        const list = await this.dataSource.getData();
    }
    renderList(list) {
        const htmlStrings = list.map(productCardTemplate);
        this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
    }
}

function productCardTemplate(product) {
    return `
    <li class='product-card'>
        <a href='product_pages/?product=${product.productId}'>
            <img src='${product.Image}' alt='Image of ${product.NameWithoutBrand}'/>
            <h2 class='card_brand'>${product.Brand.Name}</h2>
            <h3 class='card__name'>${product.NameWithoutBrand}</h3>
            <p class='product-card__price'>$${product.FinalPrice}</p>
        </a>
    </li>
    `;
}