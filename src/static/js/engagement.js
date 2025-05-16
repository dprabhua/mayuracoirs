// User Engagement Features
document.addEventListener('DOMContentLoaded', function() {
    // Newsletter Subscription
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            // Here you would typically send the email to your backend
            showNotification('Successfully subscribed to newsletter!', 'success');
            newsletterForm.reset();
        });
    }

    // Product Quick View
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const productId = this.dataset.productId;
            showQuickView(productId);
        });
    });

    // Live Chat Widget
    initializeLiveChat();

    // Social Share Buttons
    initializeSocialShare();

    // Product Comparison Tool
    initializeProductComparison();

    // User Reviews and Ratings
    initializeReviews();
});

// Newsletter Subscription
function subscribeToNewsletter(email) {
    // Validate email
    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Send subscription request
    fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    })
    .then(response => response.json())
    .then(data => {
        showNotification('Thank you for subscribing!', 'success');
    })
    .catch(error => {
        showNotification('Subscription failed. Please try again.', 'error');
    });
}

// Quick View Modal
function showQuickView(productId) {
    fetch(`/api/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            const modal = createQuickViewModal(product);
            document.body.appendChild(modal);
            modal.style.display = 'block';
        });
}

// Live Chat Widget
function initializeLiveChat() {
    // Add chat button to the page
    const chatButton = document.createElement('div');
    chatButton.className = 'chat-button';
    chatButton.innerHTML = '<i class="fas fa-comments"></i>';
    document.body.appendChild(chatButton);

    chatButton.addEventListener('click', function() {
        const chatWindow = document.createElement('div');
        chatWindow.className = 'chat-window';
        chatWindow.innerHTML = `
            <div class="chat-header">
                <h3>Chat with Us</h3>
                <button class="close-chat">×</button>
            </div>
            <div class="chat-messages"></div>
            <div class="chat-input">
                <input type="text" placeholder="Type your message...">
                <button>Send</button>
            </div>
        `;
        document.body.appendChild(chatWindow);
    });
}

// Social Share Buttons
function initializeSocialShare() {
    const shareButtons = document.querySelectorAll('.share-button');
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.dataset.platform;
            const url = window.location.href;
            shareOnPlatform(platform, url);
        });
    });
}

// Product Comparison Tool
function initializeProductComparison() {
    const compareButtons = document.querySelectorAll('.compare-button');
    compareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            addToComparison(productId);
        });
    });
}

// User Reviews and Ratings
function initializeReviews() {
    const reviewForm = document.querySelector('.review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const reviewData = {
                rating: this.querySelector('input[name="rating"]').value,
                comment: this.querySelector('textarea[name="comment"]').value,
                name: this.querySelector('input[name="name"]').value,
                email: this.querySelector('input[name="email"]').value
            };
            submitReview(reviewData);
        });
    }
}

// Helper Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function createQuickViewModal(product) {
    const modal = document.createElement('div');
    modal.className = 'modal quick-view-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="product-details">
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p class="price">₹${product.price}</p>
                <div class="specifications">
                    ${Object.entries(product.specifications).map(([key, value]) => `
                        <div class="spec">
                            <strong>${key}:</strong> ${value}
                        </div>
                    `).join('')}
                </div>
                <button class="btn-primary">Add to Cart</button>
            </div>
        </div>
    `;
    return modal;
}

function shareOnPlatform(platform, url) {
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(url)}`
    };
    window.open(shareUrls[platform], '_blank');
}

function addToComparison(productId) {
    // Add product to comparison list
    const comparisonList = JSON.parse(localStorage.getItem('comparisonList') || '[]');
    if (!comparisonList.includes(productId)) {
        comparisonList.push(productId);
        localStorage.setItem('comparisonList', JSON.stringify(comparisonList));
        showNotification('Product added to comparison', 'success');
    }
}

function submitReview(reviewData) {
    fetch('/api/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
    })
    .then(response => response.json())
    .then(data => {
        showNotification('Thank you for your review!', 'success');
        updateReviewsList(data);
    })
    .catch(error => {
        showNotification('Failed to submit review. Please try again.', 'error');
    });
} 