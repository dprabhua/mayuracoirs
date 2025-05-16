document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    const faqQuestions = document.querySelectorAll('.faq-question');
    const faqIcons = document.querySelectorAll('.faq-question .icon');

    faqQuestions.forEach((question, index) => {
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach((item, i) => {
                if (i !== index) {
                    item.classList.remove('active');
                    faqIcons[i].textContent = '+';
                }
            });

            // Toggle current item
            const currentItem = faqItems[index];
            currentItem.classList.toggle('active');
            faqIcons[index].textContent = currentItem.classList.contains('active') ? '−' : '+';
        });
    });

    // Category Filtering
    const categories = document.querySelectorAll('.faq-category');
    categories.forEach(category => {
        category.addEventListener('click', () => {
            // Update active category
            categories.forEach(c => c.classList.remove('active'));
            category.classList.add('active');

            const selectedCategory = category.dataset.category;
            faqItems.forEach(item => {
                if (selectedCategory === 'all' || item.dataset.category === selectedCategory) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Search Functionality
    const searchInput = document.querySelector('.faq-search input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        faqItems.forEach(item => {
            const question = item.querySelector('h3').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Handle URL hash for direct FAQ linking
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetItem = document.getElementById(targetId);
        if (targetItem) {
            targetItem.classList.add('active');
            targetItem.querySelector('.icon').textContent = '−';
            targetItem.scrollIntoView({ behavior: 'smooth' });
        }
    }
}); 