document.addEventListener('DOMContentLoaded', function() {
    // Cart functionality
    let cartCount = 0;
    const cartCountElement = document.createElement('span');
    cartCountElement.className = 'absolute -top-2 -right-2 bg-[#00A650] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center';
    cartCountElement.textContent = '0';
    
    const cartIcon = document.querySelector('.fa-shopping-cart').parentElement;
    cartIcon.style.position = 'relative';
    cartIcon.appendChild(cartCountElement);

    // Add to cart buttons
    document.querySelectorAll('button:not([type="submit"])').forEach(button => {
        if (button.textContent.includes('Agregar')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                cartCount++;
                cartCountElement.textContent = cartCount;
                
                // Animation effect
                this.classList.add('scale-110');
                setTimeout(() => this.classList.remove('scale-110'), 200);
                
                // Show success message
                const toast = document.createElement('div');
                toast.className = 'fixed bottom-4 right-4 bg-[#00A650] text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-y-0 opacity-100 transition-all duration-300';
                toast.textContent = '¡Producto agregado al carrito!';
                document.body.appendChild(toast);
                
                setTimeout(() => {
                    toast.classList.add('translate-y-full', 'opacity-0');
                    setTimeout(() => toast.remove(), 300);
                }, 2000);
            });
        }
    });

    // Favorite buttons
    document.querySelectorAll('.fa-heart').forEach(heart => {
        heart.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('fas');
            this.classList.toggle('far');
            this.classList.toggle('text-red-500');
            
            const toast = document.createElement('div');
            toast.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
            toast.textContent = this.classList.contains('fas') ? '¡Agregado a favoritos!' : 'Eliminado de favoritos';
            document.body.appendChild(toast);
            
            setTimeout(() => toast.remove(), 2000);
        });
    });

    // Search functionality with suggestions
    const searchInput = document.querySelector('input[type="text"]');
    const searchSuggestions = document.createElement('div');
    searchSuggestions.className = 'absolute top-full left-0 right-0 bg-white shadow-lg rounded-lg mt-2 overflow-hidden z-50 hidden';
    searchInput.parentElement.appendChild(searchSuggestions);

    const sampleProducts = [
        'Vitamina C', 'Protector Solar', 'Crema Hidratante', 'Shampoo Natural',
        'Paracetamol', 'Ibuprofeno', 'Alcohol en Gel', 'Mascarillas',
        'Suplementos', 'Crema Facial', 'Jabón Líquido', 'Pasta Dental'
    ];

    searchInput.addEventListener('input', debounce(function(e) {
        const value = e.target.value.toLowerCase();
        if (value.length > 0) {
            const matches = sampleProducts.filter(product => 
                product.toLowerCase().includes(value)
            );
            
            searchSuggestions.innerHTML = '';
            if (matches.length > 0) {
                matches.forEach(match => {
                    const div = document.createElement('div');
                    div.className = 'px-4 py-2 hover:bg-gray-100 cursor-pointer';
                    div.textContent = match;
                    div.addEventListener('click', () => {
                        searchInput.value = match;
                        searchSuggestions.classList.add('hidden');
                    });
                    searchSuggestions.appendChild(div);
                });
                searchSuggestions.classList.remove('hidden');
            } else {
                searchSuggestions.classList.add('hidden');
            }
        } else {
            searchSuggestions.classList.add('hidden');
        }
    }, 300));

    // Hide search suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target)) {
            searchSuggestions.classList.add('hidden');
        }
    });

    // Category cards hover effect
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('img').style.transform = 'scale(1.1)';
            this.querySelector('h3').classList.add('text-[#00A650]');
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'scale(1)';
            this.querySelector('h3').classList.remove('text-[#00A650]');
        });
    });

    // Newsletter subscription with validation
    const newsletterForm = document.querySelector('.newsletter-section form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        
        if (isValidEmail(emailInput.value)) {
            // Success animation and message
            const successMsg = document.createElement('div');
            successMsg.className = 'text-white text-center mt-4 animate-fade-in';
            successMsg.textContent = '¡Gracias por suscribirte! Recibirás nuestras ofertas pronto.';
            this.parentElement.appendChild(successMsg);
            
            emailInput.value = '';
            emailInput.classList.add('border-green-500');
            setTimeout(() => {
                successMsg.remove();
                emailInput.classList.remove('border-green-500');
            }, 3000);
        } else {
            // Error animation and message
            emailInput.classList.add('border-red-500', 'shake');
            const errorMsg = document.createElement('div');
            errorMsg.className = 'text-red-200 text-center mt-4 animate-fade-in';
            errorMsg.textContent = 'Por favor, ingresa un correo electrónico válido.';
            this.parentElement.appendChild(errorMsg);
            
            setTimeout(() => {
                emailInput.classList.remove('border-red-500', 'shake');
                errorMsg.remove();
            }, 3000);
        }
    });

    // Product image hover effects
    document.querySelectorAll('.product-card').forEach(card => {
        const img = card.querySelector('img');
        const title = card.querySelector('h3');
        const price = card.querySelector('.text-[#00A650]');
        
        card.addEventListener('mouseenter', function() {
            img.style.transform = 'scale(1.05)';
            title.classList.add('text-[#00A650]');
            price.classList.add('scale-110');
        });
        
        card.addEventListener('mouseleave', function() {
            img.style.transform = 'scale(1)';
            title.classList.remove('text-[#00A650]');
            price.classList.remove('scale-110');
        });
    });

    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const carouselDots = document.querySelectorAll('.carousel button');
    let currentSlide = 0;

    function updateCarousel() {
        carouselItems.forEach((item, index) => {
            item.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
        });

        carouselDots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('bg-white');
                dot.classList.remove('bg-white/50');
            } else {
                dot.classList.add('bg-white/50');
                dot.classList.remove('bg-white');
            }
        });
    }

    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });

    // Auto-advance carousel
    setInterval(() => {
        currentSlide = (currentSlide + 1) % carouselItems.length;
        updateCarousel();
    }, 5000);

    // Helper functions
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

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Initialize animations for elements as they scroll into view
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

    // Observe all animated elements
    document.querySelectorAll('.category-card, .product-card, .feature-card').forEach(card => {
        observer.observe(card);
    });
});
