// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.style.overflow = '';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.style.overflow = '';
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.style.overflow = '';
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            }
        }
    });
});

// Contact Form Handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('subject', document.getElementById('subject').value);
    formData.append('message', document.getElementById('message').value);

    // Show loading state
    const submitBtn = this.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Send the form data
    fetch('send-email.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Message sent successfully!');
            this.reset();
        } else {
            alert(data.message || 'Failed to send message. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to send message. Please try again.');
    })
    .finally(() => {
        // Reset button state
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'var(--white)';
        navbar.style.boxShadow = 'none';
    }
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .feature, .about-text');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.querySelectorAll('.service-card, .feature, .about-text').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease-out';
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);
// Initial check for elements in view
animateOnScroll();

// Testimonials Slider
const testimonialsTrack = document.querySelector('.testimonials-track');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.slider-dots');

let currentIndex = 0;
const cardWidth = testimonialCards[0].offsetWidth + 30; // Including gap

// Create dots
testimonialCards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    testimonialsTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    updateDots();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % testimonialCards.length;
    goToSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
    goToSlide(currentIndex);
}

// Event listeners
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto slide
let slideInterval = setInterval(nextSlide, 5000);

// Pause auto slide on hover
testimonialsTrack.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

testimonialsTrack.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

// Handle window resize
window.addEventListener('resize', () => {
    const newCardWidth = testimonialCards[0].offsetWidth + 30;
    testimonialsTrack.style.transform = `translateX(-${currentIndex * newCardWidth}px)`;
}); 