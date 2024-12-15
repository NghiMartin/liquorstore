import { products } from "./data.js";
import { addToCart, renderCartDropdown } from "./home.js";

function loadProducts(products) {
    const productContainer = $("#list-product-all"); 
    console.log(products);
    console.log(productContainer);
    
    products.forEach(product => {
        const saleBadge = product.salePrice ? `<span class="price-sale">$${product.price.toFixed(2)}</span>` : '';
        const productHTML = `
            <div class="col-md-4 d-flex">
                <div class="product">
                    <div class="img d-flex align-items-center justify-content-center" style="background-image: url(${product.image});">
                        <div class="desc">
                            <p class="meta-prod d-flex">
                                <a href="#" class="d-flex align-items-center justify-content-center add-to-cart" data-id="${product.id}"><span class="flaticon-shopping-bag"></span></a>
                                <a href="#" class="d-flex align-items-center justify-content-center"><span class="flaticon-heart"></span></a>
                                <a href="#" class="d-flex align-items-center justify-content-center"><span class="flaticon-visibility"></span></a>
                            </p>
                        </div>
                    </div>
                    <div class="text text-center">
                        ${product.sale ? `<span class="sale">${product.sale}</span>` : ''}
                        ${product.tag === 'Best Seller' ? `<span class="seller">${product.tag}</span>` : ''}
                        ${product.tag === 'New Arrival' ? `<span class="new">${product.tag}</span>` : ''}

                        <span class="category">${product.category}</span>
                        <h2>${product.title}</h2>
                        <p class="mb-0">
                            ${saleBadge} <span class="price">$${(product.salePrice || product.price).toFixed(2)}</span>
                        </p>
                    </div>
                </div>
            </div>
        `;
        productContainer.append(productHTML);
    });
}

$(document).ready(function () {
    loadProducts(products);
});