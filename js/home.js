import { products } from "./data.js";
import { generateRandomId, toastr_options } from "./utils.js";

let totalOrder;
export function saveCartToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function getCartFromLocalStorage() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}
export function renderCartDropdown() {
    const cart = getCartFromLocalStorage() || [];
    console.log({cart}); 
    $('.countCart').text(`${cart?.length || 0}`)
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const emptyCartMessage = $("#empty-cart-message");
    const tableWrapper = $('.table-wrap');
    const cartTotalWrapper = $('.cartTotalWrapper');
    dropdownMenu.innerHTML = '';
    if (cart.length === 0) {
        dropdownMenu.innerHTML = '<p class="dropdown-item text-center">Your cart is empty</p>';
        emptyCartMessage.show();
        tableWrapper.hide();
        cartTotalWrapper.hide();
        return;
    }
    emptyCartMessage.hide();
    tableWrapper.show();
    cartTotalWrapper.show();
    cart.forEach(item => {
        const productHTML = `
            <div class="dropdown-item d-flex align-items-start">
                <div class="img" style="background-image: url(${item.image});"></div>
                <div class="text pl-3">
                    <h4>${item.title}</h4>
                    <p class="mb-0">
                        <a href="#" class="price">${item.price}$</a>
                        <span class="quantity ml-3">Quantity: ${item.quantity}</span>
                    </p>
                </div>
            </div>
        `;
        dropdownMenu.innerHTML += productHTML;
    });

    dropdownMenu.innerHTML += `
        <a class="dropdown-item text-center btn-link d-block w-100" href="cart.html">
            View All
            <span class="ion-ios-arrow-round-forward"></span>
        </a>
    `;
    renderCartAll(cart);

    const deliveryFee = 5.00; 
    const discount = 3.00; 

    let subtotal = 0;
    

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    const total = subtotal + deliveryFee - discount;
    $("#cart-total").text(`Total: $${total}`);

    $("#subtotal").text(`$${subtotal.toFixed(2)}`);
    $("#delivery").text(`$${deliveryFee.toFixed(2)}`);
    $("#discount").text(`$${discount.toFixed(2)}`);
    $("#total").text(`$${total.toFixed(2)}`);
    totalOrder = total.toFixed(2);
}

function renderCartAll(cart) {

    const tbody = $(".cartTableList");
    tbody.empty();
    cart.forEach((item, index) => {
        const rowHTML = `
            <tr class="alert" role="alert">
                <td>
                    <label class="checkbox-wrap checkbox-primary">
                        <input type="checkbox" checked>
                        <span class="checkmark"></span>
                    </label>
                </td>
                <td>
                    <div class="img" style="background-image: url(${item?.image});"></div>
                </td>
                <td>
                    <div class="email">
                        <span>${item?.title}</span>
                        <span>${item?.description || "No description available"}</span>
                    </div>
                </td>
                <td>$${item?.price?.toFixed(2)}</td>
                <td class="quantity">
                    <div class="input-group">
                        <input type="number" name="quantity" class="quantity form-control input-number" value="${item?.quantity}" min="1" max="100" data-id="${item?.id}">
                    </div>
                </td>
                <td>$${(item?.price * item?.quantity).toFixed(2)}</td>
                <td>
                    <button type="button" class="close remove-item" data-id="${item.id}" aria-label="Close">
                        <span aria-hidden="true"><i class="fa fa-close"></i></span>
                    </button>
                </td>
            </tr>
        `;
        tbody.append(rowHTML);
    });

}

$(document).ready(function () {
    const $container = $("#list-product");
    products.forEach(product => {
        const productHTML = `
            <div class="col-md-3 d-flex">
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
                        ${product.tag ? `<span class="tag">${product.tag}</span>` : ''}
                        <span class="category">${product.category}</span>
                        <h2>${product.title}</h2>
                        <p class="mb-0">
                            ${product.priceSale ? `<span class="price price-sale">${product.priceSale}</span>` : ''}
                            <span class="price">${product.price}$</span>
                        </p>
                    </div>
                </div>
            </div>
        `;
        $container.append(productHTML);
    });
    $(document).on('click', '.add-to-cart', function (e) {
        e.preventDefault();
        const productId = $(this).data('id');
    
        const product = products.find(p => p.id === productId);
    
        if (product) {
            addToCart(product);
            renderCartDropdown();
        }
    });
        

            
        $(document).on("click", ".remove-item", function () {
            const itemId = $(this).data("id");
            const cart = getCartFromLocalStorage() || []; 
            const updatedCart = cart.filter(item => item.id !== itemId);
            saveCartToLocalStorage(updatedCart);
            renderCartDropdown();
        });

    renderCartDropdown();
    
    // Handle redirect page Checkout
    $('.checkOutBtn').on('click', function (e) {
        e.preventDefault();
        console.log('click');
        const idUser = generateRandomId();
        window.location.href = `https://payment-client-web.vercel.app/?idUser=${idUser}&priceTotal=${totalOrder}`; 
    });
});
export function addToCart(product) {
    const cart = getCartFromLocalStorage();

    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCartToLocalStorage(cart);
    toastr.option = toastr_options;
    toastr.success(`${product.title} has been added to your cart.`,"Success Added");
}