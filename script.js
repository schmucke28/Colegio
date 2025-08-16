// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Efecto scroll suave para enlaces
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animación al hacer scroll
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.noticia, .testimonio, .contacto-form');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Configuración inicial para elementos animados
document.querySelectorAll('.noticia, .testimonio, .contacto-form').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
// Ejecutar una vez al cargar la página
animateOnScroll();

// Formulario de contacto (simulado)
const form = document.querySelector('.contacto-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Gracias por su mensaje. Nos pondremos en contacto pronto.');
        form.reset();
    });
}