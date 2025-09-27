import { getParam, loadHeaderFooter } from './utils.mjs';
importExternalServicesfrom './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

loadHeaderFooter();

const dataSource = new ProductData('tents');
const productID = getParam('product');

const product = new ProductDetails(productID, dataSource);
product.init();
