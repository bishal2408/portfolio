// Laravel Developer Portfolio - JavaScript
// Modern, interactive portfolio with smooth animations and effects

class PortfolioApp {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.startAnimations();
    }

    init() {
        // Initialize core functionality
        this.setupSmoothScrolling();
        this.setupNavigation();
        this.setupCursor();
        this.setupIntersectionObserver();
        this.setupSkillsFilter();
        this.setupContactForm();
        this.setupTypingAnimation();
        this.setupFloatingShapes();
        this.setupScrollIndicator();
    }

    setupEventListeners() {
        // Window events
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('load', this.handleLoad.bind(this));

        // Navigation events
        document.addEventListener('click', this.handleNavClick.bind(this));
        
        // Mobile menu toggle
        const navToggle = document.querySelector('.nav-toggle');
        if (navToggle) {
            navToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
        }

        // Skills category filter
        const skillCategories = document.querySelectorAll('.skill-category');
        skillCategories.forEach(category => {
            category.addEventListener('click', this.filterSkills.bind(this));
        });

        // Project card hover effects
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', this.animateProjectCard.bind(this));
            card.addEventListener('mouseleave', this.resetProjectCard.bind(this));
        });

        // Form interactions
        const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', this.handleInputFocus.bind(this));
            input.addEventListener('blur', this.handleInputBlur.bind(this));
        });
    }

    setupSmoothScrolling() {
        // Custom smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupNavigation() {
        const navbar = document.querySelector('.navbar');
        let lastScrollY = window.scrollY;

        // Navbar scroll effects
        this.handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Add/remove scrolled class
            if (currentScrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.classList.add('nav-hidden');
            } else {
                navbar.classList.remove('nav-hidden');
            }
            
            lastScrollY = currentScrollY;
            this.updateActiveNavLink();
        };
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    setupCursor() {
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        
        if (!cursorDot || !cursorOutline) return;

        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        // Smooth cursor outline animation
        const animateCursor = () => {
            outlineX += (mouseX - outlineX) * 0.1;
            outlineY += (mouseY - outlineY) * 0.1;
            
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorDot.classList.add('cursor-hover');
                cursorOutline.classList.add('cursor-hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('cursor-hover');
                cursorOutline.classList.remove('cursor-hover');
            });
        });
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Trigger specific animations
                    if (entry.target.classList.contains('skill-item')) {
                        this.animateSkillBars(entry.target);
                    }
                    
                    if (entry.target.classList.contains('stat-item')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.skill-item, .project-card, .stat-item, .section-header, .about-text, .contact-method');
        animateElements.forEach(element => observer.observe(element));
    }

    animateSkillBars(skillItem) {
        const progressBar = skillItem.querySelector('.skill-progress');
        if (progressBar) {
            const progress = progressBar.getAttribute('data-progress');
            setTimeout(() => {
                progressBar.style.width = progress + '%';
            }, 300);
        }
    }

    animateCounter(statItem) {
        const numberElement = statItem.querySelector('.stat-number');
        if (!numberElement) return;

        const finalNumber = numberElement.textContent.replace(/[^\d]/g, '');
        const suffix = numberElement.textContent.replace(/[\d]/g, '');
        
        let currentNumber = 0;
        const increment = Math.ceil(finalNumber / 50);
        
        const counter = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                currentNumber = finalNumber;
                clearInterval(counter);
            }
            numberElement.textContent = currentNumber + suffix;
        }, 40);
    }

    setupSkillsFilter() {
        // Initially show backend skills
        this.filterSkillsByCategory('backend');
    }

    filterSkills(e) {
        const category = e.currentTarget.getAttribute('data-category');
        
        // Update active category
        document.querySelectorAll('.skill-category').forEach(cat => {
            cat.classList.remove('active');
        });
        e.currentTarget.classList.add('active');
        
        this.filterSkillsByCategory(category);
    }

    filterSkillsByCategory(category) {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (itemCategory === category) {
                item.style.display = 'flex';
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                    item.style.transition = 'all 0.3s ease';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    setupContactForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            
            // Show loading state
            submitBtn.classList.add('loading');
            btnText.style.opacity = '0';
            btnLoading.style.opacity = '1';
            
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success state
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            btnText.textContent = 'Message Sent!';
            btnText.style.opacity = '1';
            btnLoading.style.opacity = '0';
            
            // Reset form after delay
            setTimeout(() => {
                form.reset();
                submitBtn.classList.remove('success');
                btnText.textContent = 'Send Message';
                this.resetFormInputs();
            }, 3000);
        });
    }

    handleInputFocus(e) {
        const formGroup = e.target.closest('.form-group');
        formGroup.classList.add('focused');
    }

    handleInputBlur(e) {
        const formGroup = e.target.closest('.form-group');
        if (!e.target.value) {
            formGroup.classList.remove('focused');
        }
    }

    resetFormInputs() {
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('focused');
        });
    }

    setupTypingAnimation() {
        const typingElement = document.querySelector('.typing-animation');
        if (!typingElement) return;

        const commands = [
            'php artisan make:awesome-app',
            'php artisan serve --host=0.0.0.0',
            'php artisan queue:work --daemon',
            'php artisan migrate:fresh --seed'
        ];

        let commandIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeCommand = () => {
            const currentCommand = commands[commandIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentCommand.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentCommand.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentCommand.length) {
                typeSpeed = 2000; // Pause before deleting
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                commandIndex = (commandIndex + 1) % commands.length;
                typeSpeed = 500; // Pause before typing next command
            }

            setTimeout(typeCommand, typeSpeed);
        };

        // Start typing animation after a delay
        setTimeout(typeCommand, 1000);
    }

    setupFloatingShapes() {
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            // Set random initial positions and animations
            const randomDelay = Math.random() * 10;
            const randomDuration = 15 + Math.random() * 10;
            
            shape.style.animationDelay = randomDelay + 's';
            shape.style.animationDuration = randomDuration + 's';
            
            // Add mouse interaction
            document.addEventListener('mousemove', (e) => {
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;
                
                const moveX = (mouseX - 0.5) * 20 * (index + 1);
                const moveY = (mouseY - 0.5) * 20 * (index + 1);
                
                shape.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX}deg)`;
            });
        });
    }

    setupScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (!scrollIndicator) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const opacity = Math.max(0, 1 - scrolled / 500);
            scrollIndicator.style.opacity = opacity;
        });
    }

    animateProjectCard(e) {
        const card = e.currentTarget;
        const overlay = card.querySelector('.project-overlay');
        
        if (overlay) {
            overlay.style.opacity = '1';
            overlay.style.transform = 'translateY(0)';
        }
        
        card.style.transform = 'translateY(-10px) scale(1.02)';
    }

    resetProjectCard(e) {
        const card = e.currentTarget;
        const overlay = card.querySelector('.project-overlay');
        
        if (overlay) {
            overlay.style.opacity = '0';
            overlay.style.transform = 'translateY(20px)';
        }
        
        card.style.transform = 'translateY(0) scale(1)';
    }

    toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        const body = document.body;
        
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    handleNavClick(e) {
        // Close mobile menu when nav link is clicked
        if (e.target.classList.contains('nav-link')) {
            const navMenu = document.querySelector('.nav-menu');
            const navToggle = document.querySelector('.nav-toggle');
            const body = document.body;
            
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            body.classList.remove('menu-open');
        }
    }

    handleResize() {
        // Handle responsive adjustments
        const isMobile = window.innerWidth <= 768;
        const cursorElements = document.querySelectorAll('.cursor-dot, .cursor-outline');
        
        if (isMobile) {
            cursorElements.forEach(el => el.style.display = 'none');
        } else {
            cursorElements.forEach(el => el.style.display = 'block');
        }
    }

    handleLoad() {
        // Page load animations
        document.body.classList.add('loaded');
        
        // Animate hero elements
        const heroElements = document.querySelectorAll('.hero-greeting, .hero-title, .hero-subtitle, .code-window, .hero-cta');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate-in');
            }, index * 200);
        });
    }

    startAnimations() {
        // Start continuous animations
        this.animateGridOverlay();
        this.animateTerminalCursor();
    }

    animateGridOverlay() {
        const gridOverlay = document.querySelector('.grid-overlay');
        if (!gridOverlay) return;

        let opacity = 0.1;
        let direction = 1;

        setInterval(() => {
            opacity += direction * 0.02;
            if (opacity >= 0.3 || opacity <= 0.1) {
                direction *= -1;
            }
            gridOverlay.style.opacity = opacity;
        }, 100);
    }

    animateTerminalCursor() {
        const terminalLines = document.querySelectorAll('.terminal-line');
        
        terminalLines.forEach((line, index) => {
            // Add blinking cursor effect
            const cursor = document.createElement('span');
            cursor.className = 'terminal-cursor';
            cursor.textContent = '|';
            
            setTimeout(() => {
                line.appendChild(cursor);
            }, 1000 + index * 500);
        });
    }
}

// Utility functions
const utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
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
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Performance optimizations
const optimizedScroll = utils.throttle(() => {
    // Scroll-based animations
    const scrolled = window.scrollY;
    const rate = scrolled * -0.5;
    
    // Parallax effect for hero section
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${rate}px)`;
    }
}, 16); // 60fps

window.addEventListener('scroll', optimizedScroll);

// Initialize the portfolio app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Add CSS custom properties for dynamic theming
document.documentElement.style.setProperty('--primary-hue', '264');
document.documentElement.style.setProperty('--animation-speed', '0.3s');

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.classList.add('konami-activated');
        
        // Show easter egg message
        const message = document.createElement('div');
        message.textContent = '🎉 You found the easter egg! 30 extra lives gained!';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            font-family: 'JetBrains Mono', monospace;
            font-weight: 600;
            z-index: 10000;
            animation: bounceIn 0.5s ease-out;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
            document.body.classList.remove('konami-activated');
        }, 3000);
    }
});

// Preload critical resources
const preloadResources = () => {
    const criticalImages = [
        'https://laravel.com/img/logomark.min.svg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
};

preloadResources();