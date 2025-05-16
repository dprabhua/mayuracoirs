document.addEventListener('DOMContentLoaded', function() {
    // Blog data structure
    const blogPosts = [
        {
            id: 1,
            title: "Sustainable Gardening with Cocopeat",
            excerpt: "Learn how to maximize the benefits of cocopeat in your garden for sustainable plant growth.",
            image: "images/placeholder.jpg",
            category: "sustainability",
            date: "2024-03-15",
            readTime: "5 min read"
        },
        {
            id: 2,
            title: "Complete Guide to Hydroponic Gardening",
            excerpt: "Master the art of hydroponic gardening using our premium cocopeat products.",
            image: "images/placeholder.jpg",
            category: "gardening",
            date: "2024-03-10",
            readTime: "7 min read"
        },
        {
            id: 3,
            title: "Benefits of Coir Products in Agriculture",
            excerpt: "Discover how coir products are revolutionizing modern agriculture practices.",
            image: "images/placeholder.jpg",
            category: "agriculture",
            date: "2024-03-05",
            readTime: "6 min read"
        }
    ];

    // DOM Elements
    const blogGrid = document.querySelector('.blog-grid');
    const searchInput = document.getElementById('blogSearch');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const prevButton = document.querySelector('.prev-page');
    const nextButton = document.querySelector('.next-page');
    const currentPageSpan = document.querySelector('.current-page');
    const totalPagesSpan = document.querySelector('.total-pages');

    // Pagination variables
    let currentPage = 1;
    const postsPerPage = 6;
    let filteredPosts = [...blogPosts];

    // Initialize blog
    function initBlog() {
        renderBlogPosts();
        setupEventListeners();
    }

    // Render blog posts
    function renderBlogPosts() {
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const postsToShow = filteredPosts.slice(startIndex, endIndex);

        blogGrid.innerHTML = postsToShow.map(post => `
            <article class="blog-card" data-category="${post.category}">
                <div class="blog-image">
                    <img src="${post.image}" alt="${post.title}" loading="lazy">
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span class="category">${post.category}</span>
                        <span class="date">${formatDate(post.date)}</span>
                        <span class="read-time">${post.readTime}</span>
                    </div>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <a href="#" class="read-more">Read More</a>
                </div>
            </article>
        `).join('');

        updatePagination();
    }

    // Format date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Update pagination
    function updatePagination() {
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        currentPageSpan.textContent = currentPage;
        totalPagesSpan.textContent = `of ${totalPages}`;
        
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

    // Filter posts by category
    function filterByCategory(category) {
        if (category === 'all') {
            filteredPosts = [...blogPosts];
        } else {
            filteredPosts = blogPosts.filter(post => post.category === category);
        }
        currentPage = 1;
        renderBlogPosts();
    }

    // Search posts
    function searchPosts(query) {
        query = query.toLowerCase();
        filteredPosts = blogPosts.filter(post => 
            post.title.toLowerCase().includes(query) || 
            post.excerpt.toLowerCase().includes(query)
        );
        currentPage = 1;
        renderBlogPosts();
    }

    // Show error message
    function showError(message) {
        blogGrid.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>${message}</p>
            </div>
        `;
    }

    // Setup event listeners
    function setupEventListeners() {
        // Category filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                filterByCategory(button.dataset.category);
            });
        });

        // Search input
        searchInput.addEventListener('input', (e) => {
            searchPosts(e.target.value);
        });

        // Pagination buttons
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderBlogPosts();
            }
        });

        nextButton.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderBlogPosts();
            }
        });
    }

    // Initialize the blog
    initBlog();
}); 