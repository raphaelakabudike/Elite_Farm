// Cart Page Specific JavaScript

// Render cart items
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    const emptyCart = document.getElementById('empty-cart');

    if (!cartItemsContainer) return;

    if (cart.cart.length === 0) {
        if (emptyCart) emptyCart.style.display = 'block';
        if (cartItemsContainer) cartItemsContainer.style.display = 'none';
        if (cartSummary) cartSummary.style.display = 'none';
        return;
    }

    if (emptyCart) emptyCart.style.display = 'none';
    if (cartItemsContainer) cartItemsContainer.style.display = 'block';
    if (cartSummary) cartSummary.style.display = 'block';

    cartItemsContainer.innerHTML = cart.cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 200%22%3E%3Crect fill=%22%23f3f4f6%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2216%22 fill=%22%239ca3af%22%3E${item.category}%3C/text%3E%3C/svg%3E'">
            </div>
            <div class="cart-item-details">
                <h3 class="cart-item-name">${item.name}</h3>
                <p class="cart-item-category">${item.category}</p>
                <p class="cart-item-price">GH₵${item.price} ${item.unit}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})">−</button>
                <input type="number" value="${item.quantity}" min="1" onchange="updateCartQuantity('${item.id}', parseInt(this.value))" class="quantity-input">
                <button class="quantity-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})">+</button>
            </div>
            <div class="cart-item-total">
                <p class="item-total-price">GH₵${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button class="cart-item-remove" onclick="removeCartItem('${item.id}')" aria-label="Remove item">×</button>
        </div>
    `).join('');

    updateCartSummary();
}

// Update cart quantity
function updateCartQuantity(productId, quantity) {
    if (quantity < 1) {
        if (confirm('Remove this item from cart?')) {
            cart.removeItem(productId);
            renderCartItems();
        }
    } else {
        cart.updateQuantity(productId, quantity);
        renderCartItems();
    }
}

// Remove cart item
function removeCartItem(productId) {
    if (confirm('Remove this item from cart?')) {
        cart.removeItem(productId);
        renderCartItems();
    }
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.getTotal();
    const deliveryFee = subtotal >= 200 ? 0 : 20; // Free delivery over GH₵200
    const total = subtotal + deliveryFee;

    document.getElementById('subtotal').textContent = `GH₵${subtotal.toFixed(2)}`;
    document.getElementById('delivery-fee').textContent = deliveryFee === 0 ? 'FREE' : `GH₵${deliveryFee.toFixed(2)}`;
    document.getElementById('total').textContent = `GH₵${total.toFixed(2)}`;
}

// Handle checkout
function handleCheckout() {
    if (cart.cart.length === 0) {
        cart.showNotification('Your cart is empty!', 'warning');
        return;
    }

    // In a real application, this would redirect to a checkout page
    cart.showNotification('Checkout functionality would be implemented here with payment gateway integration.', 'info');

    // Simulate order placement
    setTimeout(() => {
        if (confirm('This is a demo. Clear cart to simulate order placement?')) {
            cart.clearCart();
            renderCartItems();
            cart.showNotification('Order placed successfully! (Demo)', 'success');
        }
    }, 1000);
}

// Initialize cart page
if (document.getElementById('cart-items')) {
    renderCartItems();
}

// Make functions globally available
window.updateCartQuantity = updateCartQuantity;
window.removeCartItem = removeCartItem;
window.handleCheckout = handleCheckout;
