import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';


const productData = new ProductData('tents');
const productList = new ProductList(
  'tents',
  productData,
  document.querySelector('.productList'),
);


const validTentIds = ['880RR', '985RF', '989CG'];


fetch('src/json/tents.json')
  .then(response => response.json())
  .then(data => {
    const filteredTents = data.filter(tent => validTentIds.includes(tent.Id));
    displayTents(filteredTents);
  })
  .catch(error => console.error('Error loading tents:', error));


function displayTents(tents) {
  const container = document.getElementById('tent-list'); // Make sure this matches your HTML

  tents.forEach(tent => {
    const card = document.createElement('div');
    card.classList.add('tent-card');

    card.innerHTML = `
      <h3>${tent.Name}</h3>
      <img src='${tent.Image}' alt='${tent.Name}'>
      <p>${tent.DescriptionHtmlSimple}</p>
      <p><strong>Price:</strong> $${tent.FinalPrice}</p>
      <a href='product_pages/${tent.Id}.html'>View Details</a>
    `;

    container.appendChild(card);
  });
}