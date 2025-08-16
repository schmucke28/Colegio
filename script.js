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
            const offset = window.innerWidth < 768 ? 80 : 100; // Ajuste responsivo del offset
            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: 'smooth'
            });
            
            // Cerrar menú móvil si está abierto
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });
});

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.noticia-card, .testimonio, .contacto-form');
    const windowHeight = window.innerHeight;
    const animationPoint = windowHeight * (window.innerWidth < 768 ? 0.75 : 0.8); // Ajuste responsivo
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        
        if (elementPosition < animationPoint) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animated elements
document.querySelectorAll('.noticia-card, .testimonio, .contacto-form').forEach(element => {
    const translateY = window.innerWidth < 768 ? '20px' : '30px'; // Menos movimiento para móviles
    element.style.opacity = '0';
    element.style.transform = `translateY(${translateY})`;
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Form submission handler
const contactForm = document.querySelector('.contacto-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        // Simulación de envío (reemplazar con AJAX real)
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
// SLIDER HERO CON SOPORTE PARA TÁCTIL
// ======================================
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const sliderContainer = document.querySelector('.slider-container');
    let currentIndex = 0;
    let autoSlideInterval;
    let isTouchDevice = 'ontouchstart' in window;
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;

    // Cambiar slide con transición suave
    const goToSlide = (index) => {
        slides.forEach(slide => {
            slide.style.transition = 'opacity 1s ease-in-out';
            slide.classList.remove('active');
        });
        indicators.forEach(ind => ind.classList.remove('active'));
        
        currentIndex = (index + slides.length) % slides.length;
        slides[currentIndex].classList.add('active');
        indicators[currentIndex].classList.add('active');
        
        // Reiniciar temporizador de auto-slide
        resetAutoSlide();
    };

    // Auto-avance cada 5 segundos (solo en desktop)
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

    // Eventos de botones
    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });

    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });

    // Eventos táctiles para móviles
    if (isTouchDevice) {
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            isDragging = true;
            clearInterval(autoSlideInterval);
        }, { passive: true });

        sliderContainer.addEventListener('touchmove', (e) => {
            if (isDragging) {
                touchEndX = e.changedTouches[0].screenX;
            }
        }, { passive: true });

        sliderContainer.addEventListener('touchend', () => {
            if (isDragging) {
                handleSwipe();
                isDragging = false;
            }
        }, { passive: true });

        const handleSwipe = () => {
            const threshold = 50; // Mínimo desplazamiento para considerar swipe
            const diff = touchEndX - touchStartX;

            if (Math.abs(diff) > threshold) {
                if (diff < 0) { // Swipe izquierda
                    goToSlide(currentIndex + 1);
                } else { // Swipe derecha
                    goToSlide(currentIndex - 1);
                }
            }
        };
    }

    // Eventos de indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    // Pausar auto-slide al hacer hover (solo desktop)
    if (!isTouchDevice) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        sliderContainer.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }

    // Iniciar
    startAutoSlide();
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initSlider();
    
    // Inicializar animaciones al cargar
    animateOnScroll();
    
    // Configurar notificación de WhatsApp (opcional)
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
            
            // Auto-ocultar después de 10 segundos
            setTimeout(() => {
                notif.style.animation = 'fadeOut 0.5s ease';
                setTimeout(() => {
                    notif.remove();
                }, 500);
            }, 10000);
        }
    }, 10000);
});

// Añadir estilos para animaciones de notificación
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