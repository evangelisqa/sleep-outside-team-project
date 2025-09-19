
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

// Create a data source and product list instance
const productData = new ProductData('tents');
const productList = new ProductList('tents', productData, document.getElementById('tent-list'));

// Call init to fetch and render the product list
productList.init();

// Optional: If you want to filter specific tents manually
const validTentIds = ['880RT', '985PR', '989CJ'];

fetch('/src/json/tents.json')
  .then(response => response.json())
  .then(data => {
    const filteredTents = data.filter(tent => validTentIds.includes(tent.Id));
    displayTents(filteredTents);
  })
  .catch(error => console.error('Error loading tents:', error));

// This function manually renders tents if you're not using ProductList.renderList()
function displayTents(tents) {
  const container = document.getElementById('tent-list');
  container.innerHTML = ''; // Clear existing content

  tents.forEach(tent => {
    const card = document.createElement('div');
    card.classList.add('tent-card');

    card.innerHTML = `
      <h3>${tent.Name}</h3>
      <img src="src/img/${tent.Image}" alt="${tent.Name}" />
      <p>${tent.DescriptionHtmlSimple}</p>
      <p><strong>Price:</strong> $${tent.FinalPrice}</p>
      <a href="product_pages/${tent.Id}.html">View Details</a>
    `;

    container.appendChild(card);
  });
}