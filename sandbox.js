// Mobile menu toggle functionality
document.querySelector('.menu-toggle').addEventListener('click', function () {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active'); // Toggle the 'active' class
    
    // Add animation to the menu toggle
    this.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            document.querySelector('.menu-toggle').classList.remove('active');
        }
    });
});

// Active link highlighting based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
    
    // Header scroll effect - add shadow and reduce padding on scroll
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.padding = '10px 5%';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.4)';
    } else {
        header.style.padding = '15px 5%';
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    }
});

// Initialize active class on page load
window.addEventListener('DOMContentLoaded', () => {
    // Set active class for the current section
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
    
    // Force all project cards to be visible immediately
    document.querySelectorAll('.project_card').forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animated');
        }, 150 * index);
    });
    
    // Check for elements to animate on scroll
    checkScrollAnimation();
});

// Function to check and animate elements when they come into view
function checkScrollAnimation() {
    const animateTextElements = document.querySelectorAll('.animate-text');
    const triggerBottom = window.innerHeight * 0.8;
    
    animateTextElements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            // Add delay based on index for staggered animation
            setTimeout(() => {
                element.classList.add('animated');
            }, 300 * index);
        }
    });
    
    // Animate skill cards when they come into view
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card) => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < triggerBottom) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
    
    // Animate project cards when they come into view
    const projectCards = document.querySelectorAll('.project_card');
    projectCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < triggerBottom) {
            setTimeout(() => {
                card.classList.add('animated');
            }, 150 * index);
        }
    });
}

// Check for animations when scrolling
window.addEventListener('scroll', () => {
    checkScrollAnimation();
});

// Add hover animations for skill cards
document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.skill-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.skill-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Initial animation check
    checkScrollAnimation();
});

// Function to animate the radial progress bars
function animateRadialProgressBars() {
    const radialProgressElements = document.querySelectorAll('.radial-progress');
    const triggerBottom = window.innerHeight * 0.8;
    
    radialProgressElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            element.classList.add('animated');
        }
    });
}

// Check for animations when scrolling
window.addEventListener('scroll', () => {
    checkScrollAnimation();
    animateRadialProgressBars();
});

// Initial animation check
document.addEventListener('DOMContentLoaded', function() {
    checkScrollAnimation();
    animateRadialProgressBars();
});
