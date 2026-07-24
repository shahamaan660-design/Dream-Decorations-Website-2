/**
 * Dream Decorations - Cart Management Engine
 * Handles shopping cart operations, localStorage persistence, and UI synchronization.
 */

const CART_STORAGE_KEY = 'dream_decorations_cart';

// Initialize or retrieve cart items
function getCart() {
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Error loading cart from localStorage:', e);
        return [];
    }
}

// Save cart items to localStorage and update UI badges
function saveCart(cart) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        updateCartBadges();
        // Dispatch custom event for listeners on cart page
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }));
    } catch (e) {
        console.error('Error saving cart to localStorage:', e);
    }
}

// Add item to cart
function addToCart(productId, quantity = 1) {
    const qty = Math.max(1, parseInt(quantity) || 1);
    const product = getProductById(productId);
    
    if (!product) {
        showToast('Product not found.', 'error');
        return false;
    }

    let cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += qty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: qty
        });
    }

    saveCart(cart);
    showToast(`Added "${product.name}" (${qty}) to your cart.`, 'success');
    return true;
}

// Remove item from cart
function removeFromCart(productId) {
    let cart = getCart();
    const item = cart.find(i => i.id === parseInt(productId));
    const updated = cart.filter(i => i.id !== parseInt(productId));
    saveCart(updated);
    if (item) {
        showToast(`Removed "${item.name}" from cart.`, 'info');
    }
}

// Update item quantity
function updateQuantity(productId, quantity) {
    const newQty = parseInt(quantity);
    let cart = getCart();
    
    if (isNaN(newQty) || newQty <= 0) {
        removeFromCart(productId);
        return;
    }

    const itemIndex = cart.findIndex(i => i.id === parseInt(productId));
    if (itemIndex > -1) {
        cart[itemIndex].quantity = newQty;
        saveCart(cart);
    }
}

// Clear all cart items
function clearCart() {
    saveCart([]);
    showToast('Shopping cart cleared.', 'info');
}

// Calculate total item count
function getCartCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}

// Calculate subtotal price
function getCartSubtotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Calculate complete financial summary
function getCartSummary(discountCode = '') {
    const subtotal = getCartSubtotal();
    let shipping = subtotal > 150 || subtotal === 0 ? 0 : 15;
    let discount = 0;

    if (discountCode.trim().toUpperCase() === 'DREAM10' && subtotal > 0) {
        discount = subtotal * 0.10; // 10% off
    }

    const taxableAmount = subtotal - discount;
    const tax = taxableAmount > 0 ? taxableAmount * 0.08 : 0; // 8% estimated tax
    const total = Math.max(0, subtotal - discount + (subtotal > 0 ? shipping : 0) + tax);

    return {
        subtotal: subtotal.toFixed(2),
        shipping: shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`,
        rawShipping: shipping,
        discount: discount.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2),
        itemCount: getCartCount(),
        qualifiesForFreeShipping: subtotal >= 150,
        freeShippingRemaining: Math.max(0, 150 - subtotal).toFixed(2)
    };
}

// Update header badges across DOM
function updateCartBadges() {
    const count = getCartCount();
    const badgeElements = document.querySelectorAll('.cart-badge');
    badgeElements.forEach(badge => {
        badge.textContent = count;
        if (count > 0) {
            badge.classList.add('has-items');
        } else {
            badge.classList.remove('has-items');
        }
    });
}

// Toast notification helper
function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    // Animate in
    setTimeout(() => toast.classList.add('show'), 10);

    // Auto remove after 3.5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// Update badges on initial script load
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadges();
});
