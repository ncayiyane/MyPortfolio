// Main Portfolio JavaScript - Consolidated File
document.addEventListener('DOMContentLoaded', function() {
    // ==================== HEADER FUNCTIONALITY ====================
    
    // Get DOM elements
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.querySelector('.navbar');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const contactForm = document.getElementById('contactForm');

    // Header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Modern header scroll effect
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Legacy header scroll effect for compatibility
        if (header) {
            if (window.scrollY > 50) {
                header.style.padding = '10px 5%';
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.4)';
            } else {
                header.style.padding = '15px 5%';
                header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            }
        }
        
        lastScrollTop = scrollTop;
        
        // Update active navigation based on scroll position
        updateActiveNavOnScroll();
    });

    // Mobile menu toggle functionality
    function openMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            menuToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Menu toggle event listeners
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            // Modern mobile menu
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
            
            // Legacy navbar toggle for compatibility
            if (navbar) {
                navbar.classList.toggle('active');
                this.classList.toggle('active');
            }
        });
    }

    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMobileMenu);

    // Close mobile menu when clicking on a link (legacy support)
    if (navbar) {
        document.querySelectorAll('.navbar a').forEach(link => {
            link.addEventListener('click', () => {
                if (navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    if (menuToggle) menuToggle.classList.remove('active');
                }
            });
        });
    }

    // ==================== NAVIGATION FUNCTIONALITY ====================
    
    // Navigation active state management
    function setActiveNavLink(targetSection) {
        // Remove active class from all nav links
        navLinks.forEach(link => link.classList.remove('active'));
        mobileNavLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to corresponding nav links
        navLinks.forEach(link => {
            if (link.dataset.section === targetSection) {
                link.classList.add('active');
            }
        });
        
        mobileNavLinks.forEach(link => {
            if (link.dataset.section === targetSection) {
                link.classList.add('active');
            }
        });
    }

    // Smooth scrolling for navigation links
    function smoothScrollTo(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const headerHeight = header ? header.offsetHeight : 80;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active state
            const sectionName = targetId.replace('#', '').toLowerCase();
            setActiveNavLink(sectionName);
        }
    }

    // Desktop navigation click handlers
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollTo(targetId);
        });
    });

    // Mobile navigation click handlers
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollTo(targetId);
            closeMobileMenu();
        });
    });

    // Update active navigation based on scroll position
    function updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + (header ? header.offsetHeight : 80) + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                setActiveNavLink(sectionId.toLowerCase());
            }
        });
    }

    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // ==================== CONTACT FORM FUNCTIONALITY ====================
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit_btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ==================== NOTIFICATION SYSTEM ====================
    
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        // Set background color based on type
        switch (type) {
            case 'success':
                notification.style.background = 'linear-gradient(135deg, #4dc247, #45b7d1)';
                break;
            case 'error':
                notification.style.background = 'linear-gradient(135deg, #f06, #ff4336)';
                break;
            default:
                notification.style.background = 'linear-gradient(135deg, #3cf, #45b7d1)';
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // ==================== ANIMATIONS AND VISUAL EFFECTS ====================
    
    // Add hover effect to social links
    const socialLinks = document.querySelectorAll('.social-link, .mobile-social-link, .social_icon');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        });
    });

    // Initialize active nav state
    updateActiveNavOnScroll();

    // Add loading animation to header elements
    const logoText = document.querySelector('.logo-text');
    const navItems = document.querySelectorAll('.nav-link');
    
    setTimeout(() => {
        if (logoText) {
            logoText.style.opacity = '1';
            logoText.style.transform = 'translateY(0)';
        }
    }, 300);

    navItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
    });

    // Performance optimization: Debounce scroll events
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

    const debouncedScroll = debounce(updateActiveNavOnScroll, 10);
    window.addEventListener('scroll', debouncedScroll);

    // ==================== RIPPLE EFFECTS ====================
    
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Add ripple CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        .nav-link, .mobile-nav-link {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(78, 205, 196, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .notification {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
        }
    `;
    document.head.appendChild(style);

    // Apply ripple effect to navigation items
    [...navLinks, ...mobileNavLinks].forEach(link => {
        link.addEventListener('click', createRipple);
    });

    // ==================== SCROLL ANIMATIONS ====================
    
    function checkScrollAnimation() {
        const animateTextElements = document.querySelectorAll('.animate-text');
        const triggerBottom = window.innerHeight * 0.8;
        
        animateTextElements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                setTimeout(() => {
                    element.classList.add('animated');
                }, 300 * index);
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
        
        // Animate skill cards when they come into view
        const skillCards = document.querySelectorAll('.skill-card, .radial-progress');
        skillCards.forEach((card) => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < triggerBottom) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.classList.add('animated');
            }
        });
        
        // Animate achievement cards when they come into view
        const achievementCards = document.querySelectorAll('.achievement-card');
        achievementCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < triggerBottom) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 200 * index);
            }
        });
    }

    // Check for animations when scrolling
    window.addEventListener('scroll', checkScrollAnimation);

    // Animate radial progress bars when they come into view
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

    window.addEventListener('scroll', animateRadialProgressBars);

    // Initial animation checks
    checkScrollAnimation();
    animateRadialProgressBars();

    // ==================== ADDITIONAL INTERACTIONS ====================
    
    // Add hover animations for skill cards
    const skillCards = document.querySelectorAll('.skill-card, .radial-progress');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.skill-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.skill-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project_card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Achievement card hover effects
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Form input focus effects
    const formInputs = document.querySelectorAll('.form_group input, .form_group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Add focused state styles
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        .form_group.focused label {
            color: #4ecdc4;
            transform: translateY(-2px);
        }
        
        .form_group input:focus,
        .form_group textarea:focus {
            border-color: #4ecdc4;
            box-shadow: 0 0 15px rgba(78, 205, 196, 0.3);
        }
    `;
    document.head.appendChild(focusStyle);

    // Typing animation removed (element was deleted from HTML per user request)

    // ==================== PARALLAX EFFECT ====================
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const homeSection = document.querySelector('.home');
        if (homeSection && scrolled < window.innerHeight) {
            const speed = 0.5;
            homeSection.style.transform = `translateY(${scrolled * speed}px)`;
        }
    });

    // ==================== SMOOTH REVEAL ANIMATION ====================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for reveal animation
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    console.log('Portfolio JavaScript initialized successfully!');

    // ==================== MATRIX RAIN EFFECT ====================
    
    function createMatrixRain() {
        const matrixContainer = document.querySelector('.matrix-rain');
        if (!matrixContainer) return;
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        matrixContainer.appendChild(canvas);
        
        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const matrixArray = matrix.split("");
        
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        
        const drops = [];
        for(let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff00';
            ctx.font = fontSize + 'px monospace';
            
            for(let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        const matrixInterval = setInterval(draw, 35);
        
        // Handle window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        
        return matrixInterval;
    }
    
    // Initialize Matrix rain effect
    const matrixInterval = createMatrixRain();
});
