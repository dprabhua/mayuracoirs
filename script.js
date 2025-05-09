// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('.header');
const loading = document.querySelector('.loading');

// Navigation Toggle
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Sticky Header
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.product-card, .feature-card, .testimonial').forEach(el => {
    observer.observe(el);
});

// Loading Animation
window.addEventListener('load', () => {
    if (loading) {
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Here you would typically send the email to your server
        console.log('Subscribing email:', email);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for subscribing!';
        newsletterForm.appendChild(successMessage);
        
        // Clear input
        newsletterForm.querySelector('input[type="email"]').value = '';
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    });
}

// // Product Card Hover Effect
// document.querySelectorAll('.product-card').forEach(card => {
//     card.addEventListener('mouseenter', () => {
//         card.style.transform = 'translateY(-10px)';
//     });
    
//     card.addEventListener('mouseleave', () => {
//         card.style.transform = 'translateY(0)';
//     });
// });

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const testimonialSlider = document.querySelector('.testimonial-slider');

if (testimonials.length > 1) {
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonialSlider.style.transform = `translateX(-${currentTestimonial * 100}%)`;
    }, 5000);
}

// Add active class to current navigation item
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// Image Loading Strategy
document.addEventListener('DOMContentLoaded', function() {
    // Function to load an image
    function loadImage(img) {
        if (img.dataset.src) {
            const src = img.dataset.src;
            const tempImg = new Image();
            
            tempImg.onload = function() {
                img.src = src;
                img.classList.add('loaded');
            };
            
            tempImg.onerror = function() {
                console.error('Failed to load image:', src);
                img.src = 'images/placeholder.jpg'; // Fallback image
            };
            
            tempImg.src = src;
        }
    }

    // Load all images immediately
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(loadImage);

    // Intersection Observer for images that enter viewport
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                loadImage(img);
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });

    // Observe all lazy-loaded images
    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// Dropdown Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');
    
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }
});

// Analytics Helper Functions
const analytics = {
    init: function() {
        // Track search engine referrals
        const referrer = document.referrer;
        if (referrer) {
            const searchEngines = {
                'google': 'Google',
                'bing': 'Bing',
                'yahoo': 'Yahoo',
                'duckduckgo': 'DuckDuckGo',
                'baidu': 'Baidu',
                'yandex': 'Yandex'
            };

            for (const [domain, name] of Object.entries(searchEngines)) {
                if (referrer.toLowerCase().includes(domain)) {
                    gtag('event', 'search_engine_referral', {
                        'search_engine': name,
                        'referrer': referrer,
                        'page_path': window.location.pathname
                    });
                    break;
                }
            }
        }

        // Track user location (country level only, respecting privacy)
        if (navigator.language) {
            gtag('event', 'user_location', {
                'language': navigator.language,
                'page_path': window.location.pathname
            });
        }

        // Track device and browser information
        gtag('event', 'device_info', {
            'device_type': this.getDeviceType(),
            'browser': this.getBrowserInfo(),
            'page_path': window.location.pathname
        });
    },

    getDeviceType: function() {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return 'tablet';
        }
        if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            return 'mobile';
        }
        return 'desktop';
    },

    getBrowserInfo: function() {
        const ua = navigator.userAgent;
        let browser = 'Unknown';
        if (ua.includes('Firefox')) browser = 'Firefox';
        else if (ua.includes('Chrome')) browser = 'Chrome';
        else if (ua.includes('Safari')) browser = 'Safari';
        else if (ua.includes('Edge')) browser = 'Edge';
        else if (ua.includes('MSIE') || ua.includes('Trident/')) browser = 'Internet Explorer';
        return browser;
    }
};

// Initialize analytics when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    analytics.init();
}); 