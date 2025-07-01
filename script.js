
// JavaScript for Green House Future website

document.addEventListener('DOMContentLoaded', function() {
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            console.log('Contact form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! We\'ll get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Newsletter form handling
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = e.target.querySelector('input[type="email"]').value;
            console.log('Newsletter subscription:', email);
            
            alert('Thank you for subscribing to our newsletter!');
            e.target.reset();
        });
    }

    // Blog category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.dataset.category;
                
                // Update active button
                categoryButtons.forEach(btn => {
                    btn.classList.remove('active', 'btn-success');
                    btn.classList.add('btn-outline-success');
                });
                this.classList.remove('btn-outline-success');
                this.classList.add('active', 'btn-success');
                
                // Filter blog posts
                blogPosts.forEach(post => {
                    if (category === 'all' || post.dataset.category === category) {
                        post.style.display = 'block';
                        post.classList.remove('hidden');
                    } else {
                        post.style.display = 'none';
                        post.classList.add('hidden');
                    }
                });
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('shadow-lg');
            } else {
                navbar.classList.remove('shadow-lg');
            }
        });
    }

    // Active navigation highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards and sections for animation
    document.querySelectorAll('.card, .hero-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Blog detail page URL parameter handling
    if (window.location.pathname.includes('blog-detail.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const blogId = urlParams.get('id');
        
        // Mock blog data - in a real application, this would come from a database or API
        const blogData = {
            1: {
                title: 'The Future of Smart Greenhouse Technology',
                author: 'Dr. Sarah Chen',
                date: 'January 15, 2025',
                readTime: '8 min read'
            },
            2: {
                title: '10 Ways AI Can Optimize Your Greenhouse Operations',
                author: 'Mark Rodriguez',
                date: 'January 10, 2025',
                readTime: '7 min read'
            },
            3: {
                title: 'Sustainable Agriculture Through Smart Automation',
                author: 'Dr. Emily Watson',
                date: 'January 5, 2025',
                readTime: '6 min read'
            }
        };
        
        if (blogId && blogData[blogId]) {
            const blog = blogData[blogId];
            document.getElementById('articleTitle').textContent = blog.title;
            document.getElementById('articleAuthor').textContent = blog.author;
            document.getElementById('articleDate').textContent = blog.date;
            document.getElementById('articleReadTime').textContent = blog.readTime;
            document.title = blog.title + ' - Green House Future';
        }
    }

    // Mobile menu close on link click
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }
});

// Utility functions
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Loading animation for forms
function showLoading(element) {
    const originalText = element.textContent;
    element.textContent = 'Loading...';
    element.disabled = true;
    
    return function hideLoading() {
        element.textContent = originalText;
        element.disabled = false;
    };
}
