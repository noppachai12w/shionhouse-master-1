// 1. Initial Load: Retrieve the cart from LocalStorage immediately
// We parse the string back into an object, or default to an empty object {}
let cart = JSON.parse(localStorage.getItem('ecommerce_cart')) || {};

/**
 * Updates the Number badge in the Cart Icon UI
 */
function updateCartUI() {
    console
    const cartBadge = document.querySelector('.card-stor span');
    
    // Calculate total quantity of all items in the cart
    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    
    // Update the HTML <span>0</span>
    if (cartBadge) {
        cartBadge.textContent = totalItems;
    }
}

/**
 * Handler function with Persistence Logic
 */
function handleAddToCart(id, price) {
    // RE-LOAD: Double-check storage in case of multiple tabs (Optional but safer)
    cart = JSON.parse(localStorage.getItem('ecommerce_cart')) || cart;

    const numericPrice = parseFloat(price);

    // Logic to update the cart object
    if (cart[id]) {
        cart[id].quantity += 1;
    } else {
        cart[id] = {
            id: id,
            quantity: 1,
            price: numericPrice
        };
    }

    // SAVE: Convert the object to a string and store it
    localStorage.setItem('ecommerce_cart', JSON.stringify(cart));

    // UI UPDATE: Refresh the badge count
    updateCartUI();
    
    console.log("Cart saved to LocalStorage:", cart);
}

// 2. Event Delegation (as established previously)
const productContainer = document.querySelector('#product-container');
productContainer.addEventListener('click', (event) => {
    const targetButton = event.target.closest('.add-to-cart');
    if (targetButton) {
        const productId = targetButton.dataset.productId;
        const productPrice = targetButton.dataset.productPrice;
        handleAddToCart(productId, productPrice);
    }
});

// 3. Initialize UI on page load
// This ensures the badge shows the correct number immediately when the site opens
document.addEventListener('DOMContentLoaded', updateCartUI);