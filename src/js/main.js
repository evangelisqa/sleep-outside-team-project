import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const dataSource = new ProductData('tents');
const listElement = document.querySelector('#product-list');

const tentList = new ProductList('tents', dataSource, listElement);
tentList.init();

const validTentIds = ['880RR', '985RF', '989CG'];

fetch('src/json/tents.json') 
.then(response => response.json()) 
.then(data => { 
    const filteredTents = data.filter(tent => validTentIds.includes(tent.Id)); 
    displayTents(filteredTents); }) .catch(error => console.error('Error loading tents:', error));

function displayTents(tents) { const container = document.getElementById('tent-list');

tents.forEach(tent => { const card = document.createElement('div'); card.classList.add('tent-card');

card.innerHTML = `
  <h3>${tent.Name}</h3>
  <img src="${tent.Image}" alt="${tent.Name}">
  <p>${tent.DescriptionHtmlSimple}</p>
  <p><strong>Price:</strong> $${tent.FinalPrice}</p>
  <a href="product_pages/${tent.Id}.html">View Details</a>
`;

container.appendChild(card);

}); }