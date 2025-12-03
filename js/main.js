// ========================================
// POULTRY FARM WEBSITE - MAIN JAVASCRIPT
// ========================================

// Cart Management
class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.updateCartUI();
    }

    loadCart() {
        const saved = localStorage.getItem('poultryCart');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('poultryCart', JSON.stringify(this.cart));
        this.updateCartUI();
    }

    addItem(product) {
        const existingItem = this.cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }

        this.saveCart();
        this.showNotification(`${product.name} added to cart!`, 'success');
    }

    removeItem(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
        }
    }

    getTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
    }

    updateCartUI() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        const count = this.getItemCount();

        cartCountElements.forEach(element => {
            element.textContent = count;
            element.style.display = count > 0 ? 'flex' : 'none';
        });
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize cart manager
const cart = new CartManager();

// ========================================
// NAVIGATION
// ========================================

// Mobile menu toggle
function initMobileMenu() {
    const toggle = document.querySelector('.navbar-toggle');
    const menu = document.querySelector('.navbar-menu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!toggle.contains(e.target) && !menu.contains(e.target)) {
                toggle.classList.remove('active');
                menu.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        const menuLinks = menu.querySelectorAll('.navbar-link');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                menu.classList.remove('active');
            });
        });
    }
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Set active nav link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ========================================
// PRODUCT MANAGEMENT
// ========================================

// Product data
const products = [
    {
        id: 'eggs-large',
        name: 'Fresh Farm Eggs - Large',
        category: 'Eggs',
        price: 45,
        unit: 'per crate (30 eggs)',
        description: 'Premium quality large eggs from free-range chickens. Rich in nutrients and flavor.',
        image: 'pics/egg1.jpg',
        badge: 'Fresh Daily',
        available: true
    },
    {
        id: 'eggs-medium',
        name: 'Fresh Farm Eggs - Medium',
        category: 'Eggs',
        price: 40,
        unit: 'per crate (30 eggs)',
        description: 'High-quality medium eggs perfect for all your cooking needs.',
        image: 'pics/egg2.webp',
        badge: 'Best Seller',
        available: true
    },
    {
        id: 'broiler-2kg',
        name: 'Broiler Chicken - 2kg',
        category: 'Broilers',
        price: 35,
        unit: 'per kg',
        description: 'Tender and juicy broiler chickens, raised with care and proper nutrition.',
        image: 'pics/broiler-chickens.jpg',
        badge: 'Premium',
        available: true
    },
    {
        id: 'broiler-3kg',
        name: 'Broiler Chicken - 3kg',
        category: 'Broilers',
        price: 33,
        unit: 'per kg',
        description: 'Larger broiler chickens ideal for family meals and gatherings.',
        image: 'pics/Broiler Poultry.jpg',
        badge: 'Family Size',
        available: true
    },
    {
        id: 'layer-pullet',
        name: 'Layer Pullets - 18 Weeks',
        category: 'Layers',
        price: 50,
        unit: 'per bird',
        description: 'Point-of-lay pullets ready to start producing eggs. Vaccinated and healthy.',
        image: 'pics/layer 1.avif',
        badge: 'Ready to Lay',
        available: true
    },
    {
        id: 'layer-mature',
        name: 'Mature Layers - 24 Weeks',
        category: 'Layers',
        price: 55,
        unit: 'per bird',
        description: 'Mature laying hens in peak production. Excellent egg producers.',
        image: 'pics/layer chik2.jpg',
        badge: 'High Yield',
        available: true
    }
];

// Render products
function renderProducts(productsToRender = products, containerId = 'products-grid') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = productsToRender.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Crect fill=%22%23f3f4f6%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2224%22 fill=%22%239ca3af%22%3E${product.category}%3C/text%3E%3C/svg%3E'">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <div>
                        <div class="product-price">
                            GH₵${product.price}
                            <span class="product-price-unit">${product.unit}</span>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-sm" onclick="addToCart('${product.id}')" ${!product.available ? 'disabled' : ''}>
                        ${product.available ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product && product.available) {
        cart.addItem(product);
    }
}

// Filter products
function filterProducts(category) {
    const filtered = category === 'all'
        ? products
        : products.filter(p => p.category.toLowerCase() === category.toLowerCase());

    renderProducts(filtered);

    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// ========================================
// FORM HANDLING
// ========================================

// Contact form submission
function handleContactForm(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // Simulate form submission
    cart.showNotification('Thank you! We will get back to you soon.', 'success');
    form.reset();

    // In production, you would send this to a backend
    console.log('Form data:', Object.fromEntries(formData));
}

// Newsletter subscription
function handleNewsletterForm(event) {
    event.preventDefault();

    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;

    cart.showNotification('Successfully subscribed to our newsletter!', 'success');
    form.reset();

    console.log('Newsletter subscription:', email);
}

// ========================================
// SMOOTH SCROLL
// ========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initNavbarScroll();
    setActiveNavLink();
    initSmoothScroll();

    // Render products if on products page or homepage
    if (document.getElementById('products-grid')) {
        renderProducts();
    }

    // Initialize contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Initialize newsletter forms
    document.querySelectorAll('.newsletter-form').forEach(form => {
        form.addEventListener('submit', handleNewsletterForm);
    });
});

// Make functions globally available
window.cart = cart;
window.addToCart = addToCart;
window.filterProducts = filterProducts;
