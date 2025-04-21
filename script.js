document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart counter
    let cartCount = 0;
    const cartButtons = document.querySelectorAll('.add-to-cart');
    
    // Add to cart functionality
    cartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            cartCount++;
            updateCartBadge();
            showAddToCartAnimation(this);
        });
    });

    function updateCartBadge() {
        const badge = document.querySelector('.cart-badge');
        if (badge) {
            badge.textContent = cartCount;
            badge.classList.remove('hidden');
        }
    }

    function showAddToCartAnimation(button) {
        button.classList.add('animate-pulse');
        setTimeout(() => {
            button.classList.remove('animate-pulse');
        }, 1000);
    }

    // Search functionality
    const searchInput = document.querySelector('input[type="text"]');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function(e) {
            // Simulate search functionality
            console.log('Searching for:', e.target.value);
        }, 300));
    }

    // Debounce function for search
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-section form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && isValidEmail(emailInput.value)) {
                showSubscriptionSuccess();
                emailInput.value = '';
            } else {
                showSubscriptionError();
            }
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showSubscriptionSuccess() {
        const successMessage = document.createElement('div');
        successMessage.className = 'text-white text-center mt-4 fade-in';
        successMessage.textContent = '¡Gracias por suscribirte!';
        
        const form = document.querySelector('.newsletter-section form');
        form.parentNode.insertBefore(successMessage, form.nextSibling);
        
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    }

    function showSubscriptionError() {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'text-red-200 text-center mt-4 fade-in';
        errorMessage.textContent = 'Por favor, ingresa un correo electrónico válido.';
        
        const form = document.querySelector('.newsletter-section form');
        form.parentNode.insertBefore(errorMessage, form.nextSibling);
        
        setTimeout(() => {
            errorMessage.remove();
        }, 3000);
    }

    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href !== '#') {
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add fade-in animation to elements as they scroll into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all product cards and category cards
    document.querySelectorAll('.product-card, .category-card').forEach(card => {
        observer.observe(card);
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            menuToggle.classList.toggle('active');
        });
    }

    // Product quick view
    const quickViewButtons = document.querySelectorAll('.quick-view-button');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.dataset.productId;
            showQuickView(productId);
        });
    });

    function showQuickView(productId) {
        // Simulate quick view modal
        console.log('Showing quick view for product:', productId);
    }
});
