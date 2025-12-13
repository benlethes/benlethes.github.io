// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMenu = document.querySelector('.close-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');
const body = document.body;

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    body.style.overflow = 'hidden';
    // Prevent background scrolling on mobile
    body.style.position = 'fixed';
    body.style.width = '100%';
});

closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    body.style.overflow = '';
    body.style.position = '';
    body.style.width = '';
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        body.style.overflow = '';
        body.style.position = '';
        body.style.width = '';
    });
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        body.style.overflow = '';
        body.style.position = '';
        body.style.width = '';
    }
});

// Prevent touch move when menu is open (mobile Safari fix)
let touchStartY = 0;
mobileMenu.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

mobileMenu.addEventListener('touchmove', (e) => {
    if (mobileMenu.scrollHeight <= mobileMenu.clientHeight) {
        e.preventDefault();
    }
}, { passive: false });

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Hide/Show Navigation on Scroll
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        nav.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        nav.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Project Card Click Handlers
const projectCards = document.querySelectorAll('.project-card');
const modals = document.querySelectorAll('.modal');
const modalCloses = document.querySelectorAll('.modal-close');

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        const modal = document.getElementById(`modal-${projectId}`);
        
        if (modal) {
            modal.classList.add('active');
            // Prevent background scrolling on mobile
            body.style.overflow = 'hidden';
            body.style.position = 'fixed';
            body.style.width = '100%';
        }
    });
    
    // Add keyboard accessibility
    card.setAttribute('tabindex', '0');
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
        }
    });
});

// Close Modal Handlers
modalCloses.forEach(close => {
    close.addEventListener('click', () => {
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        body.style.overflow = '';
        body.style.position = '';
        body.style.width = '';
    });
});

// Close modal on background click
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            body.style.overflow = '';
            body.style.position = '';
            body.style.width = '';
        }
    });
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        body.style.overflow = '';
        body.style.position = '';
        body.style.width = '';
    }
});

// Prevent modal background scrolling on mobile
modals.forEach(modal => {
    modal.addEventListener('touchmove', (e) => {
        // Only prevent if touching the backdrop
        if (e.target === modal) {
            e.preventDefault();
        }
    }, { passive: false });
});

// Scroll Animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .timeline-item, .detail-block');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function setActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// Add smooth appearance to elements on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect
// const heroTitle = document.querySelector('.hero-title');
// if (heroTitle) {
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 30);
// }

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 2px;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

createScrollProgress();

// Preload images (if you add real images later)
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 300px 0px'
    };
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    }, imageOptions);
    
    images.forEach(img => imageObserver.observe(img));
}

preloadImages();

// Add custom cursor effect (optional, modern touch)
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
cursor.style.cssText = `
    width: 40px;
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease-out, border-color 0.15s ease-out;
    display: none;
`;

document.body.appendChild(cursor);

// Only show custom cursor on desktop (not on touch devices)
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

if (window.innerWidth > 768 && !isTouchDevice) {
    cursor.style.display = 'block';
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 20 + 'px';
        cursor.style.top = e.clientY - 20 + 'px';
    });
    
    // Make cursor larger on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = 'rgba(0, 0, 0, 0.6)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = 'rgba(0, 0, 0, 0.3)';
        });
    });
}

// Disable parallax and scroll animations on mobile for better performance
const isMobile = window.innerWidth <= 768 || isTouchDevice;

if (!isMobile) {
    // Parallax Effect for Hero Section (desktop only)
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        });
    }
}

// Optimize images for mobile
if (isMobile) {
    const images = document.querySelectorAll('.project-image img');
    images.forEach(img => {
        // Add loading="lazy" if not already present
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });
}

// Handle orientation changes on mobile
let lastOrientation = window.orientation || 0;
window.addEventListener('orientationchange', () => {
    // Close any open modals or menus on orientation change
    if (mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        body.style.overflow = '';
        body.style.position = '';
        body.style.width = '';
    }
    
    modals.forEach(modal => {
        if (modal.classList.contains('active')) {
            modal.classList.remove('active');
            body.style.overflow = '';
            body.style.position = '';
            body.style.width = '';
        }
    });
    
    lastOrientation = window.orientation || 0;
});

// Generate random dots at grid intersections for hero grid pattern
function generateGridDots() {
    const container = document.getElementById('gridDots');
    if (!container) return; // Exit if grid pattern not enabled
    
    const gridSize = window.innerWidth > 768 ? 50 : 30;
    const numDots = 25; // Number of random dots
    
    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        
        // Snap to grid
        const x = Math.floor(Math.random() * (window.innerWidth / gridSize)) * gridSize;
        const y = Math.floor(Math.random() * (window.innerHeight / gridSize)) * gridSize;
        
        dot.style.left = x + 'px';
        dot.style.top = y + 'px';
        dot.style.animationDelay = (1 + Math.random() * 2) + 's';
        
        container.appendChild(dot);
    }
}

// Generate dots on page load
window.addEventListener('load', generateGridDots);

// Console Easter Egg
console.log(`
%c👋 Hello there!
%cLooking at the code? I like your style.
%cIf you're interested in collaborating, let's connect!
%cben.seegatz@live.de
`,
'font-size: 20px; font-weight: bold;',
'font-size: 14px;',
'font-size: 14px; color: #667eea;',
'font-size: 14px; font-weight: bold; color: #764ba2;'
);
