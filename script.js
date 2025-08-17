// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.noticia-card, .testimonio, .contacto-form');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const animationPoint = windowHeight * 0.8;
        
        if (elementPosition < animationPoint) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize elements with scroll animation
function initScrollAnimations() {
    const animatableElements = document.querySelectorAll('.noticia-card, .testimonio, .contacto-form');
    
    animatableElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
}

// Form submission
function setupFormSubmission() {
    const contactForm = document.querySelector('.contacto-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            if (!submitBtn) return;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            
            setTimeout(() => {
                submitBtn.textContent = '✓ Enviado';
                setTimeout(() => {
                    submitBtn.textContent = 'Enviar';
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }
}

// Current year in footer
function updateCurrentYear() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

// SLIDER HERO
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    let autoSlideInterval;

    // Cambiar slide
    const goToSlide = (index) => {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        
        currentIndex = (index + slides.length) % slides.length;
        slides[currentIndex].classList.add('active');
        indicators[currentIndex].classList.add('active');
    };

    // Auto-avance cada 5 segundos
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    };

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            clearInterval(autoSlideInterval);
            goToSlide(currentIndex + 1);
            startAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            clearInterval(autoSlideInterval);
            goToSlide(currentIndex - 1);
            startAutoSlide();
        });
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(autoSlideInterval);
            goToSlide(index);
            startAutoSlide();
        });
    });

    // Iniciar
    startAutoSlide();
}

// WhatsApp notification
function showWhatsAppNotification() {
    setTimeout(() => {
        const notif = document.createElement('div');
        notif.className = 'whatsapp-notification';
        notif.innerHTML = '¿Necesitas ayuda? <i class="fab fa-whatsapp"></i> Escríbenos';
        
        // Estilos para la notificación
        notif.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            background: #25D366;
            color: white;
            padding: 15px 20px;
            border-radius: 30px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            animation: fadeIn 0.5s ease-out;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        document.body.appendChild(notif);
        
        // Auto-ocultar después de 5 segundos
        setTimeout(() => {
            notif.style.animation = 'fadeOut 0.5s ease-out';
            setTimeout(() => notif.remove(), 500);
        }, 5000);
    }, 10000);
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = window.innerWidth < 768 ? 70 : 100;
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize all functions when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    setupFormSubmission();
    updateCurrentYear();
    initSlider();
    showWhatsAppNotification();
    setupSmoothScrolling();
});