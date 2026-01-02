// NavigationView.js - Vista para la navegación
class NavigationView {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.sections = document.querySelectorAll('.section, .hero-section');

        this.init();
    }

    init() {
        this.setupScrollEffect();
        this.setupSmoothScroll();
        this.setupActiveLink();
        this.setupMobileMenu();
    }

    /**
     * Configura el efecto de scroll en el navbar
     */
    setupScrollEffect() {
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Agregar sombra al hacer scroll
            if (currentScroll > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }

    /**
     * Configura el scroll suave entre secciones
     */
    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Altura del navbar

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Cerrar menú móvil si está abierto
                    if (this.navMenu.classList.contains('active')) {
                        this.toggleMobileMenu();
                    }
                }
            });
        });
    }

    /**
     * Configura el link activo según la sección visible
     */
    setupActiveLink() {
        const observerOptions = {
            root: null,
            rootMargin: '-100px 0px -66%',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.setActiveLink(id);
                }
            });
        }, observerOptions);

        this.sections.forEach(section => {
            observer.observe(section);
        });
    }

    /**
     * Establece el link activo
     * @param {string} sectionId - ID de la sección activa
     */
    setActiveLink(sectionId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Configura el menú móvil
     */
    setupMobileMenu() {
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
    }

    /**
     * Alterna el menú móvil
     */
    toggleMobileMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');

        // Prevenir scroll del body cuando el menú está abierto
        if (this.navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    /**
     * Actualiza el botón de login según el estado de autenticación
     * @param {boolean} isAuthenticated - Si el usuario está autenticado
     * @param {string} userName - Nombre del usuario
     */
    updateLoginButton(isAuthenticated, userName = '') {
        const btnLogin = document.getElementById('btnOpenLogin');

        if (isAuthenticated) {
            btnLogin.textContent = `Hola, ${userName}`;
            btnLogin.style.cursor = 'default';
        } else {
            btnLogin.textContent = 'Iniciar Sesión';
            btnLogin.style.cursor = 'pointer';
        }
    }
}

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationView;
}
