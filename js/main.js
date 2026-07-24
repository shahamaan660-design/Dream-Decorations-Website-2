/**
 * Dream Decorations - Main Application Controller
 * Handles page interactions, shop filtering, product details, cart page UI, form validation, and Dark Mode theme toggle.
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeEngine();
    initNavigation();
    initCurrentPageLogic();
});

/* ==========================================================================
   Theme Engine (Dark / Light Mode Toggle)
   ========================================================================== */

function initThemeEngine() {
    const THEME_KEY = 'dream_decorations_theme';
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';

    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }

    updateThemeToggleUI();

    // Attach click listeners to all theme toggle buttons
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';

            if (newTheme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }

            localStorage.setItem(THEME_KEY, newTheme);
            updateThemeToggleUI();
            showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
        });
    });
}

function updateThemeToggleUI() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
        btn.innerHTML = isDark ? '☀️' : '🌙';
        btn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
        btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    });
}

/* ==========================================================================
   Navigation & Global UI
   ========================================================================== */

function initNavigation() {
    // Mobile Drawer Toggle
    const drawerToggle = document.getElementById('mobile-drawer-toggle');
    const drawerClose = document.getElementById('mobile-drawer-close');
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('drawer-backdrop');

    if (drawerToggle && drawer && backdrop) {
        const openDrawer = () => {
            drawer.classList.add('open');
            backdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeDrawer = () => {
            drawer.classList.remove('open');
            backdrop.classList.remove('active');
            document.body.style.overflow = '';
        };

        drawerToggle.addEventListener('click', openDrawer);
        if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
        backdrop.addEventListener('click', closeDrawer);
    }

    // Highlight active link in navigation
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Newsletter subscription forms
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input[type="email"]');
            if (input && validateEmail(input.value)) {
                showToast('Thank you for subscribing to Dream Decorations journal!', 'success');
                input.value = '';
            } else {
                showToast('Please enter a valid email address.', 'error');
            }
        });
    }
}

/* ==========================================================================
   Page Router Logic
   ========================================================================== */

function initCurrentPageLogic() {
    const path = window.location.pathname.split('/').pop() || 'index.html';

    if (path === 'index.html' || path === '') {
        initHomePage();
    } else if (path === 'shop.html') {
        initShopPage();
    } else if (path === 'product.html') {
        initProductDetailsPage();
    } else if (path === 'cart.html') {
        initCartPage();
    } else if (path === 'contact.html') {
        initContactPage();
    }
}

/* ==========================================================================
   Product Card Component Generator
   ========================================================================== */

function createProductCardMarkup(product) {
    const badgeMarkup = product.originalPrice 
        ? `<span class="product-badge badge-sale">Sale</span>`
        : product.isNewArrival 
        ? `<span class="product-badge">New</span>` 
        : '';

    const priceMarkup = product.originalPrice
        ? `$${product.price.toFixed(2)} <span class="original-price">$${product.originalPrice.toFixed(2)}</span>`
        : `$${product.price.toFixed(2)}`;

    return `
        <article class="product-card">
            ${badgeMarkup}
            <div class="product-image-wrap">
                <a href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </a>
                <div class="product-actions-overlay">
                    <button class="btn btn-gold btn-sm" onclick="addToCart(${product.id}, 1)">
                        Add to Cart
                    </button>
                    <a href="product.html?id=${product.id}" class="btn btn-primary btn-sm">
                        View
                    </a>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name"><a href="product.html?id=${product.id}">${product.name}</a></h3>
                <div class="product-rating">
                    <span class="stars">★★★★★</span>
                    <span>${product.rating} (${product.reviewsCount})</span>
                </div>
                <div class="product-price-wrap">
                    <div class="product-price">${priceMarkup}</div>
                </div>
            </div>
        </article>
    `;
}

/* ==========================================================================
   Home Page Logic
   ========================================================================== */

function initHomePage() {
    const featuredContainer = document.getElementById('featured-products-grid');
    if (featuredContainer && typeof PRODUCTS !== 'undefined') {
        const featuredItems = getFeaturedProducts();
        featuredContainer.innerHTML = featuredItems.map(createProductCardMarkup).join('');
    }

    const newArrivalsContainer = document.getElementById('new-arrivals-grid');
    if (newArrivalsContainer && typeof PRODUCTS !== 'undefined') {
        const newArrivals = getNewArrivals();
        newArrivalsContainer.innerHTML = newArrivals.map(createProductCardMarkup).join('');
    }
}

/* ==========================================================================
   Shop Page Logic (Filtering, Search, Sorting)
   ========================================================================== */

function initShopPage() {
    const gridContainer = document.getElementById('shop-products-grid');
    const searchInput = document.getElementById('shop-search');
    const sortSelect = document.getElementById('shop-sort');
    const categoryPillsContainer = document.getElementById('category-pills');
    const productCountEl = document.getElementById('shop-product-count');

    if (!gridContainer || typeof PRODUCTS === 'undefined') return;

    // Check URL query string for initial category/search
    const urlParams = new URLSearchParams(window.location.search);
    let activeCategory = urlParams.get('category') || 'All';
    let searchQuery = urlParams.get('search') || '';
    let currentSort = 'popular';

    if (searchInput && searchQuery) {
        searchInput.value = searchQuery;
    }

    function renderShop() {
        let filtered = [...PRODUCTS];

        // 1. Category Filter
        if (activeCategory !== 'All') {
            filtered = filtered.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
        }

        // 2. Search Query Filter
        if (searchQuery.trim() !== '') {
            const q = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(q) || 
                p.category.toLowerCase().includes(q) || 
                p.description.toLowerCase().includes(q)
            );
        }

        // 3. Sorting
        if (currentSort === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (currentSort === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (currentSort === 'name-asc') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (currentSort === 'popular') {
            filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
        }

        // Render Results
        if (filtered.length === 0) {
            gridContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🔍</div>
                    <h3>No decorations found</h3>
                    <p class="text-muted">Try clearing your search query or selecting a different category.</p>
                    <button class="btn btn-secondary btn-sm" style="margin-top: 1rem;" onclick="resetShopFilters()">
                        Reset Filters
                    </button>
                </div>
            `;
        } else {
            gridContainer.innerHTML = filtered.map(createProductCardMarkup).join('');
        }

        if (productCountEl) {
            productCountEl.textContent = `Showing ${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;
        }
    }

    // Window global reset helper
    window.resetShopFilters = () => {
        activeCategory = 'All';
        searchQuery = '';
        if (searchInput) searchInput.value = '';
        updateActivePill();
        renderShop();
    };

    function updateActivePill() {
        if (!categoryPillsContainer) return;
        const pills = categoryPillsContainer.querySelectorAll('.pill-btn');
        pills.forEach(pill => {
            const cat = pill.dataset.category;
            if (cat.toLowerCase() === activeCategory.toLowerCase()) {
                pill.classList.add('active');
            } else {
                pill.classList.remove('active');
            }
        });
    }

    // Attach Event Listeners
    if (categoryPillsContainer) {
        categoryPillsContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.pill-btn');
            if (btn) {
                activeCategory = btn.dataset.category;
                updateActivePill();
                renderShop();
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderShop();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderShop();
        });
    }

    updateActivePill();
    renderShop();
}

/* ==========================================================================
   Product Details Page Logic
   ========================================================================== */

function initProductDetailsPage() {
    const container = document.getElementById('product-details-container');
    if (!container || typeof PRODUCTS === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 1;
    const product = getProductById(productId);

    if (!product) {
        container.innerHTML = `
            <div class="empty-state">
                <h2>Product Not Found</h2>
                <p class="text-muted">The product you are searching for does not exist in our catalog.</p>
                <a href="shop.html" class="btn btn-primary" style="margin-top: 1.5rem;">Return to Shop</a>
            </div>
        `;
        return;
    }

    // Update document title
    document.title = `${product.name} | Dream Decorations`;

    // Render Product Details
    const priceMarkup = product.originalPrice
        ? `$${product.price.toFixed(2)} <span class="original-price">$${product.originalPrice.toFixed(2)}</span>`
        : `$${product.price.toFixed(2)}`;

    const featuresListMarkup = product.details
        ? product.details.map(detail => `<li>${detail}</li>`).join('')
        : '';

    container.innerHTML = `
        <nav class="breadcrumb">
            <a href="index.html">Home</a> / 
            <a href="shop.html">Shop</a> / 
            <a href="shop.html?category=${encodeURIComponent(product.category)}">${product.category}</a> / 
            <span>${product.name}</span>
        </nav>

        <div class="product-details-grid">
            <div class="product-gallery">
                <div class="main-image-frame">
                    <img id="main-product-img" src="${product.image}" alt="${product.name}">
                </div>
            </div>

            <div class="product-details-info">
                <div class="details-category">${product.category}</div>
                <h1 class="details-title">${product.name}</h1>
                
                <div class="details-rating">
                    <span class="stars">★★★★★</span>
                    <span><strong>${product.rating}</strong> (${product.reviewsCount} customer reviews)</span>
                </div>

                <div class="details-price-row">
                    <div class="details-price">${priceMarkup}</div>
                </div>

                <p class="details-description">${product.description}</p>

                <ul class="details-features">
                    ${featuresListMarkup}
                </ul>

                <div class="specs-box">
                    <div class="specs-item">
                        <span class="specs-label">Dimensions:</span>
                        <span class="specs-value">${product.dimensions}</span>
                    </div>
                    <div class="specs-item">
                        <span class="specs-label">Materials:</span>
                        <span class="specs-value">${product.material}</span>
                    </div>
                    <div class="specs-item">
                        <span class="specs-label">Availability:</span>
                        <span class="specs-value" style="color: var(--color-success);">In Stock (Ready to Ship)</span>
                    </div>
                </div>

                <div class="quantity-add-row">
                    <div class="qty-control">
                        <button class="qty-btn" id="qty-minus">-</button>
                        <input type="number" id="detail-qty" class="qty-input" value="1" min="1" max="10" readonly>
                        <button class="qty-btn" id="qty-plus">+</button>
                    </div>
                    <button class="btn btn-gold btn-block" id="add-to-cart-detail-btn">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>

        <section class="section" style="padding-top: 2rem;">
            <div class="section-header">
                <span class="section-tag">Curated Suggestions</span>
                <h2 class="section-title">Related Pieces</h2>
            </div>
            <div class="product-grid" id="related-products-grid"></div>
        </section>
    `;

    // Quantity controls logic
    const minusBtn = document.getElementById('qty-minus');
    const plusBtn = document.getElementById('qty-plus');
    const qtyInput = document.getElementById('detail-qty');

    if (minusBtn && plusBtn && qtyInput) {
        minusBtn.addEventListener('click', () => {
            let val = parseInt(qtyInput.value) || 1;
            if (val > 1) qtyInput.value = val - 1;
        });

        plusBtn.addEventListener('click', () => {
            let val = parseInt(qtyInput.value) || 1;
            if (val < 10) qtyInput.value = val + 1;
        });
    }

    // Add to Cart Button Logic
    const addBtn = document.getElementById('add-to-cart-detail-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const qty = parseInt(qtyInput.value) || 1;
            addToCart(product.id, qty);
        });
    }

    // Render Related Products
    const relatedContainer = document.getElementById('related-products-grid');
    if (relatedContainer) {
        const related = PRODUCTS
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 4);

        if (related.length > 0) {
            relatedContainer.innerHTML = related.map(createProductCardMarkup).join('');
        } else {
            // Fallback to top rated
            const fallback = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);
            relatedContainer.innerHTML = fallback.map(createProductCardMarkup).join('');
        }
    }
}

/* ==========================================================================
   Cart Page Logic
   ========================================================================== */

function initCartPage() {
    const tableContainer = document.getElementById('cart-items-container');
    const summaryContainer = document.getElementById('cart-summary-container');
    let appliedPromo = '';

    if (!tableContainer || !summaryContainer) return;

    function renderCartPage() {
        const cart = getCart();

        if (cart.length === 0) {
            tableContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🛍️</div>
                    <h2>Your Shopping Cart is Empty</h2>
                    <p class="text-muted">Explore our curated collections of luxury home decor to discover statement pieces.</p>
                    <a href="shop.html" class="btn btn-primary" style="margin-top: 1.5rem;">Shop Collection</a>
                </div>
            `;
            summaryContainer.style.display = 'none';
            return;
        }

        summaryContainer.style.display = 'block';

        // Render Cart Items Table
        const rowsMarkup = cart.map(item => `
            <tr>
                <td>
                    <div class="cart-product-cell">
                        <img src="${item.image}" alt="${item.name}" class="cart-thumb">
                        <div>
                            <div class="cart-product-category">${item.category}</div>
                            <h4 class="cart-product-title"><a href="product.html?id=${item.id}">${item.name}</a></h4>
                        </div>
                    </div>
                </td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <div class="qty-control">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="qty-input" value="${item.quantity}" readonly>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </td>
                <td><strong>$${(item.price * item.quantity).toFixed(2)}</strong></td>
                <td>
                    <button class="remove-btn" title="Remove Item" onclick="removeFromCart(${item.id})">✕</button>
                </td>
            </tr>
        `).join('');

        tableContainer.innerHTML = `
            <div class="cart-table-wrap">
                <table class="cart-table">
                    <thead>
                        <tr>
                            <th>Product Details</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsMarkup}
                    </tbody>
                </table>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 1.5rem;">
                <a href="shop.html" class="btn btn-secondary btn-sm">← Continue Shopping</a>
                <button class="btn btn-secondary btn-sm" onclick="clearCart()">Clear Cart</button>
            </div>
        `;

        // Render Order Summary
        const summary = getCartSummary(appliedPromo);

        summaryContainer.innerHTML = `
            <div class="summary-card">
                <h3 class="summary-title">Order Summary</h3>
                
                ${summary.qualifiesForFreeShipping ? `
                    <div style="font-size: 0.85rem; color: var(--color-success); font-weight: 500;">
                        ✓ Congratulations! You unlocked Free Shipping
                    </div>
                    <div class="shipping-progress-bar">
                        <div class="shipping-progress-fill" style="width: 100%;"></div>
                    </div>
                ` : `
                    <div style="font-size: 0.85rem; color: var(--color-text-muted);">
                        Add <strong>$${summary.freeShippingRemaining}</strong> more for Free Shipping
                    </div>
                    <div class="shipping-progress-bar">
                        <div class="shipping-progress-fill" style="width: ${Math.min(100, (summary.subtotal / 150) * 100)}%;"></div>
                    </div>
                `}

                <div class="summary-row">
                    <span>Subtotal (${summary.itemCount} items):</span>
                    <span>$${summary.subtotal}</span>
                </div>

                ${parseFloat(summary.discount) > 0 ? `
                    <div class="summary-row" style="color: var(--color-success);">
                        <span>Promo Discount (10% Off):</span>
                        <span>-$${summary.discount}</span>
                    </div>
                ` : ''}

                <div class="summary-row">
                    <span>Estimated Shipping:</span>
                    <span>${summary.shipping}</span>
                </div>

                <div class="summary-row">
                    <span>Estimated Tax (8%):</span>
                    <span>$${summary.tax}</span>
                </div>

                <div class="summary-row summary-total-row">
                    <span>Total:</span>
                    <span class="text-gold">$${summary.total}</span>
                </div>

                <form id="promo-code-form" class="promo-form">
                    <input type="text" id="promo-input" class="promo-input" placeholder="Promo code (e.g. DREAM10)" value="${appliedPromo}">
                    <button type="submit" class="btn btn-secondary btn-sm">Apply</button>
                </form>

                <button class="btn btn-gold btn-block" style="margin-top: 1.5rem;" onclick="triggerCheckoutModal()">
                    Proceed to Checkout
                </button>
                <div style="text-align: center; font-size: 0.75rem; color: var(--color-text-muted); margin-top: 0.75rem;">
                    🔒 256-Bit SSL Encrypted Prototype Checkout
                </div>
            </div>
        `;

        // Attach promo form event
        const promoForm = document.getElementById('promo-code-form');
        if (promoForm) {
            promoForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const code = document.getElementById('promo-input').value.trim();
                if (code.toUpperCase() === 'DREAM10') {
                    appliedPromo = 'DREAM10';
                    showToast('Promo code "DREAM10" applied! 10% off.', 'success');
                    renderCartPage();
                } else if (code === '') {
                    appliedPromo = '';
                    renderCartPage();
                } else {
                    showToast('Invalid promo code. Try "DREAM10".', 'error');
                }
            });
        }
    }

    // Global listener for cart state updates
    window.addEventListener('cartUpdated', renderCartPage);

    // Modal popup trigger
    window.triggerCheckoutModal = () => {
        const summary = getCartSummary(appliedPromo);
        const modalBackdrop = document.createElement('div');
        modalBackdrop.className = 'modal-backdrop active';
        modalBackdrop.innerHTML = `
            <div class="modal-box">
                <div class="modal-icon">✦</div>
                <h2 style="font-family: var(--font-heading); font-size: 1.75rem; margin-bottom: 1rem;">Order Prototype Received</h2>
                <p class="text-muted" style="margin-bottom: 1.5rem;">
                    Thank you for reviewing the <strong>Dream Decorations</strong> e-commerce demonstration.
                </p>
                <div class="specs-box" style="margin-bottom: 1.5rem; text-align: left;">
                    <div class="specs-item">
                        <span class="specs-label">Total Items:</span>
                        <span class="specs-value">${summary.itemCount}</span>
                    </div>
                    <div class="specs-item">
                        <span class="specs-label">Order Total:</span>
                        <span class="specs-value" style="color: var(--color-accent-gold); font-weight: 700;">$${summary.total}</span>
                    </div>
                    <div class="specs-item">
                        <span class="specs-label">Mode:</span>
                        <span class="specs-value">Front-End Demonstration Prototype</span>
                    </div>
                </div>
                <button class="btn btn-gold btn-block" onclick="this.closest('.modal-backdrop').remove(); clearCart();">
                    Complete Demonstration Order
                </button>
            </div>
        `;
        document.body.appendChild(modalBackdrop);
    };

    renderCartPage();
}

/* ==========================================================================
   Contact Page Logic
   ========================================================================== */

function initContactPage() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('contact-name');
            const emailInput = document.getElementById('contact-email');
            const subjectInput = document.getElementById('contact-subject');
            const messageInput = document.getElementById('contact-message');

            let isValid = true;

            // Reset field errors
            [nameInput, emailInput, subjectInput, messageInput].forEach(field => {
                if (field) field.classList.remove('is-invalid');
            });

            // Name validation
            if (!nameInput || nameInput.value.trim() === '') {
                if (nameInput) nameInput.classList.add('is-invalid');
                isValid = false;
            }

            // Email validation
            if (!emailInput || !validateEmail(emailInput.value.trim())) {
                if (emailInput) emailInput.classList.add('is-invalid');
                isValid = false;
            }

            // Subject validation
            if (!subjectInput || subjectInput.value.trim() === '') {
                if (subjectInput) subjectInput.classList.add('is-invalid');
                isValid = false;
            }

            // Message validation (min 10 characters)
            if (!messageInput || messageInput.value.trim().length < 10) {
                if (messageInput) messageInput.classList.add('is-invalid');
                isValid = false;
            }

            if (isValid) {
                showToast('Your message has been sent successfully! We will get back to you shortly.', 'success');
                contactForm.reset();
            } else {
                showToast('Please correct the highlighted errors in the form.', 'error');
            }
        });
    }

    // FAQ Accordion Toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            faqItem.classList.toggle('open');
        });
    });
}

/* ==========================================================================
   Validation Helper Utilities
   ========================================================================== */

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
