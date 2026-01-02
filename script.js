// ==============================
// SCROLL PROGRESS BAR
// ==============================
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
document.body.appendChild(progressBar);

function updateProgressBar() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.pageYOffset;
    const progress = (scrolled / documentHeight) * 100;
    progressBar.style.transform = `scaleX(${progress / 100})`;
}

window.addEventListener('scroll', updateProgressBar);

// ==============================
// SMOOTH SCROLL
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==============================
// NAVBAR SCROLL EFFECT
// ==============================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ==============================
// PARALLAX EFFECT ON HERO
// ==============================
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    heroTitle.classList.add('hero-title-parallax');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            heroTitle.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// ==============================
// COUNTER ANIMATION
// ==============================
function animateCounter(element, target, suffix = '+', duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + suffix;
        }
    }, 16);
}

// ==============================
// INTERSECTION OBSERVER - REVEAL ANIMATIONS
// ==============================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Trigger counter animation for metric numbers
            if (entry.target.classList.contains('metric-card')) {
                const number = entry.target.querySelector('.metric-number');
                if (number && !number.classList.contains('counted')) {
                    number.classList.add('counted', 'counting');
                    const target = parseInt(number.textContent);
                    const suffix = number.textContent.includes('+') ? '+' : '';
                    animateCounter(number, target, suffix);
                }
            }
            
            // Animate stat items
            if (entry.target.classList.contains('stat-item')) {
                entry.target.classList.add('active');
            }
            
            // Animate section labels
            if (entry.target.classList.contains('section-label')) {
                entry.target.classList.add('active');
            }
            
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply reveal animation to elements
document.querySelectorAll('.section-label, .section-heading, .section-title, .section-title-large, .metric-card, .project-image-large, .project-details, .architecture-section, .experience-item, .capability-card, .fit-item, .education-item, .contact-item, .contact-note').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// Apply reveal with delay to stat items
document.querySelectorAll('.stat-item').forEach((el, index) => {
    el.classList.add('reveal', `reveal-delay-${Math.min(index + 1, 4)}`);
    revealObserver.observe(el);
});

// ==============================
// IMAGE HOVER EFFECTS
// ==============================
const projectImages = document.querySelectorAll('.project-image-large, .architecture-image');
projectImages.forEach(img => {
    img.addEventListener('mousemove', (e) => {
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        const image = img.querySelector('img');
        if (image) {
            image.style.transform = `scale(1.05) translate(${deltaX * 10}px, ${deltaY * 10}px)`;
        }
    });
    
    img.addEventListener('mouseleave', () => {
        const image = img.querySelector('img');
        if (image) {
            image.style.transform = 'scale(1)';
        }
    });
});

// ==============================
// SMOOTH SECTION TRANSITIONS
// ==============================
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.05
});

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(section);
});

// ==============================
// TECH TAG ANIMATIONS
// ==============================
const techTags = document.querySelectorAll('.tech-tags span');
techTags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(10px)';
    tag.style.transition = `opacity 0.4s ease ${index * 0.05}s, transform 0.4s ease ${index * 0.05}s`;
});

const tagObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const tags = entry.target.querySelectorAll('span');
            tags.forEach(tag => {
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            });
            tagObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.tech-tags').forEach(container => {
    tagObserver.observe(container);
});

// ==============================
// CURSOR EFFECT (OPTIONAL)
// ==============================
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor follower (optional, can be removed)
function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    requestAnimationFrame(animateCursor);
}
// animateCursor(); // Uncomment to enable

// ==============================
// PERFORMANCE OPTIMIZATION
// ==============================
// Debounce scroll events for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        updateProgressBar();
    });
}, { passive: true });

// ==============================
// PAGE LOAD ANIMATION
// ==============================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ==============================
// CONSOLE MESSAGE
// ==============================
console.log('%cAkshat Bhatt | Analytics Engineer', 'color: #0066ff; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%cWhere analytics, design, and technology meet to deliver insights that drive decisions.', 'color: #666666; font-size: 14px;');
console.log('%c📧 akshatbhatt30@gmail.com', 'color: #0066ff; font-size: 14px;');
console.log('%c🔗 linkedin.com/in/akshat-bhatt', 'color: #0066ff; font-size: 14px;');
console.log('%c💼 Ready to bring analytics engineering excellence to Retailogists', 'color: #666666; font-size: 13px; font-style: italic;');

