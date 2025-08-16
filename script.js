// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
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

// Initialize elements
document.querySelectorAll('.noticia-card, .testimonio, .contacto-form').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Listeners
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Form submission
const contactForm = document.querySelector('.contacto-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
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

// Current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// ======================================
// SLIDER HERO
// ======================================
function initSlider() {
    const slides = document.querySelectorAll('.slide');
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

    // Eventos
    nextBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        goToSlide(currentIndex + 1);
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        goToSlide(currentIndex - 1);
        startAutoSlide();
    });

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

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initSlider);

// Agrega al final de script.js
setTimeout(() => {
    const notif = document.createElement('div');
    notif.innerHTML = '¿Necesitas ayuda? <i class="fab fa-whatsapp"></i> Escríbenos';
    notif.style.cssText = `/* estilos aquí */`;
    document.body.appendChild(notif);
}, 10000);