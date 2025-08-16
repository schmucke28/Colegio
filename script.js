// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
        // Forzar la animación de las noticias después de que el preloader desaparezca
        animateOnScroll();
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
            const offset = window.innerWidth < 768 ? 80 : 100;
            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.noticia-card');
    const windowHeight = window.innerHeight;
    const animationPoint = windowHeight * (window.innerWidth < 768 ? 0.75 : 0.8);
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        
        if (elementPosition < animationPoint) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animated elements
function initAnimations() {
    const elements = document.querySelectorAll('.noticia-card');
    const translateY = window.innerWidth < 768 ? '20px' : '30px';
    
    elements.forEach(element => {
        // Solo inicializar si no ha sido inicializado antes
        if (element.style.opacity === '') {
            element.style.opacity = '0';
            element.style.transform = `translateY(${translateY})`;
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }
    });
    
    // Forzar una primera comprobación
    animateOnScroll();
}

// Form submission handler
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

// SLIDER HERO
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    let autoSlideInterval;
    let isTouchDevice = 'ontouchstart' in window;

    const goToSlide = (index) => {
        slides.forEach(slide => {
            slide.style.transition = 'opacity 1s ease-in-out';
            slide.classList.remove('active');
        });
        indicators.forEach(ind => ind.classList.remove('active'));
        
        currentIndex = (index + slides.length) % slides.length;
        slides[currentIndex].classList.add('active');
        indicators[currentIndex].classList.add('active');
        
        resetAutoSlide();
    };

    const startAutoSlide = () => {
        if (!isTouchDevice) {
            autoSlideInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 5000);
        }
    };

    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });

    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });

    if (isTouchDevice) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.querySelector('.slider-container').addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(autoSlideInterval);
        }, { passive: true });

        document.querySelector('.slider-container').addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        const handleSwipe = () => {
            const threshold = 50;
            const diff = touchEndX - touchStartX;

            if (Math.abs(diff) > threshold) {
                if (diff < 0) {
                    goToSlide(currentIndex + 1);
                } else {
                    goToSlide(currentIndex - 1);
                }
            }
        };
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    startAutoSlide();
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initSlider();
    initAnimations(); // Inicializar animaciones de noticias
    
    // Configurar listeners de scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Configurar notificación de WhatsApp
    setTimeout(() => {
        if (!document.querySelector('.whatsapp-notif')) {
            const notif = document.createElement('div');
            notif.className = 'whatsapp-notif';
            notif.innerHTML = '¿Necesitas ayuda? <i class="fab fa-whatsapp"></i> Escríbenos';
            notif.style.cssText = `
                position: fixed;
                bottom: 100px;
                right: 20px;
                background: #25D366;
                color: white;
                padding: 12px 15px;
                border-radius: 30px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 1000;
                font-size: 0.9rem;
                display: flex;
                align-items: center;
                gap: 8px;
                animation: fadeIn 0.5s ease;
            `;
            notif.addEventListener('click', () => {
                window.open('https://wa.me/51960382052', '_blank');
            });
            document.body.appendChild(notif);
            
            setTimeout(() => {
                notif.style.animation = 'fadeOut 0.5s ease';
                setTimeout(() => {
                    notif.remove();
                }, 500);
            }, 10000);
        }
    }, 10000);
});

// Añadir estilos para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(20px); }
    }
`;
document.head.appendChild(style);