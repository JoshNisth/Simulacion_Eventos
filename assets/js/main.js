// ===== THEME MANAGEMENT =====
class ThemeManager {
    constructor() {
        this.init();
    }

    init() {
        // Dark-only: ensure no light class remains if coming from older state
        document.documentElement.classList.remove('light');
        this.updateCurrentYear();
    }

    updateCurrentYear() {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) yearElement.textContent = new Date().getFullYear();
    }
}

// ===== CARD TILT EFFECT =====
class TiltEffect {
    constructor() {
        this.init();
    }

    init() {
        // Only apply tilt on devices with fine pointer (non-touch)
        if (!window.matchMedia('(pointer: fine)').matches) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        this.bindEvents();
    }

    bindEvents() {
        const cards = document.querySelectorAll('[data-tilt]');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
            card.addEventListener('mousemove', this.handleMouseMove.bind(this));
            card.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        });
    }

    handleMouseEnter(e) {
        const card = e.currentTarget;
        card.style.transition = 'none';
    }

    handleMouseMove(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        const rotateX = (mouseY / rect.height) * -10; // Max 10deg rotation
        const rotateY = (mouseX / rect.width) * 10;
        
        const icon = card.querySelector('.card-icon');
        
        card.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateY(-8px)
        `;
        
        if (icon) {
            icon.style.transform = `
                translateY(-4px) 
                scale(1.05) 
                translateX(${mouseX * 0.02}px) 
                translateY(${mouseY * 0.02}px)
            `;
        }
    }

    handleMouseLeave(e) {
        const card = e.currentTarget;
        const icon = card.querySelector('.card-icon');
        
        card.style.transition = 'all 0.3s ease-out';
        card.style.transform = '';
        
        if (icon) {
            icon.style.transform = '';
        }
        
        // Reset transition after animation
        setTimeout(() => {
            card.style.transition = '';
        }, 300);
    }
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        
        this.observeElements();
    }

    observeElements() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        // Observe elements that should animate in
        const animatedElements = document.querySelectorAll('.section-title, .about-content');
        animatedElements.forEach(el => observer.observe(el));
    }
}

// ===== NAVIGATION ENHANCEMENTS =====
class Navigation {
    constructor() {
        this.init();
    }

    init() {
        this.handleSmoothScroll();
        this.updateNavOnScroll();
    }

    handleSmoothScroll() {
        // Handle smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    updateNavOnScroll() {
        let ticking = false;
        
        const updateNav = () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateNav);
                ticking = true;
            }
        });
    }
}

// ===== UTILITIES =====
class Utils {
    static debounce(func, wait) {
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

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static preloadImages() {
        // Preload any critical images if needed
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            const actualSrc = img.dataset.src;
            if (actualSrc) {
                const imageLoader = new Image();
                imageLoader.onload = () => {
                    img.src = actualSrc;
                    img.classList.add('loaded');
                };
                imageLoader.src = actualSrc;
            }
        });
    }
}

// ===== ERROR HANDLING =====
class ErrorHandler {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('error', this.handleError.bind(this));
        window.addEventListener('unhandledrejection', this.handlePromiseRejection.bind(this));
    }

    handleError(event) {
        console.error('Script error:', event.error);
        // Could send to analytics service in production
    }

    handlePromiseRejection(event) {
        console.error('Unhandled promise rejection:', event.reason);
        // Could send to analytics service in production
    }
}

// ===== INITIALIZATION =====
class App {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.bootstrap());
        } else {
            this.bootstrap();
        }
    }

    bootstrap() {
        try {
            // Initialize core features
            new ErrorHandler();
            new ThemeManager();
            new TiltEffect();
            new ScrollAnimations();
            new Navigation();
            
            // Utility functions
            Utils.preloadImages();
            
            // Performance optimization
            this.optimizePerformance();
            
            console.log('🚀 Simulación de Eventos Discretos - App initialized');
        } catch (error) {
            console.error('Failed to initialize app:', error);
        }
    }

    optimizePerformance() {
        // Optimize scroll performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            document.body.classList.add('scrolling');
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                document.body.classList.remove('scrolling');
            }, 100);
        });

        // Preconnect to external domains if needed
        // const preconnectLink = document.createElement('link');
        // preconnectLink.rel = 'preconnect';
        // preconnectLink.href = 'https://example.com';
        // document.head.appendChild(preconnectLink);
    }
}

// ===== START APPLICATION =====
new App();

// ===== EXPORTS FOR POTENTIAL MODULE USE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThemeManager, TiltEffect, ScrollAnimations, Navigation, Utils };
}