// app.js - Punto de entrada de la aplicación
(function () {
    'use strict';

    // Esperar a que el DOM esté completamente cargado
    document.addEventListener('DOMContentLoaded', function () {
        console.log('🚀 Ayni Abogados - Aplicación iniciada');

        // Inicializar el controlador principal
        const app = new AppController();

        // Hacer el controlador accesible globalmente para debugging
        window.ayniApp = app;

        // Log de credenciales de ejemplo para testing
        console.log('%c📋 Credenciales de Prueba', 'color: #d4af37; font-size: 16px; font-weight: bold;');
        console.log('%cAbogado/Trabajador:', 'color: #1a4d2e; font-weight: bold;');
        console.log('  Email: juan.perez@ayniabogados.cl');
        console.log('  Password: abogado123');
        console.log('  ---');
        console.log('  Email: maria.gonzalez@ayniabogados.cl');
        console.log('  Password: abogado123');
        console.log('%cCliente:', 'color: #1a4d2e; font-weight: bold;');
        console.log('  Email: cliente@example.com');
        console.log('  Password: cliente123');
        console.log('  ---');
        console.log('  Email: ana.silva@example.com');
        console.log('  Password: cliente123');

        // Agregar funcionalidad adicional
        initializeAdditionalFeatures();
    });

    /**
     * Inicializa características adicionales de la aplicación
     */
    function initializeAdditionalFeatures() {
        // Animaciones al hacer scroll
        initScrollAnimations();

        // Lazy loading de imágenes
        initLazyLoading();

        // Efectos de hover en cards
        initCardEffects();
    }

    /**
     * Inicializa animaciones al hacer scroll
     */
    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observar elementos que deben animarse
        const animatedElements = document.querySelectorAll('.stat-card, .area-card, .news-card');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    }

    /**
     * Inicializa lazy loading de imágenes
     */
    function initLazyLoading() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Aquí se cargarían las imágenes reales
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        const images = document.querySelectorAll('.image-placeholder, .news-image');
        images.forEach(img => imageObserver.observe(img));
    }

    /**
     * Inicializa efectos de hover en cards
     */
    function initCardEffects() {
        const cards = document.querySelectorAll('.stat-card, .area-card, .news-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });
    }

    /**
     * Manejo de errores global
     */
    window.addEventListener('error', function (event) {
        console.error('Error en la aplicación:', event.error);
    });

    /**
     * Prevenir comportamiento por defecto en enlaces de ejemplo
     */
    document.addEventListener('click', function (e) {
        if (e.target.matches('a[href="#"]')) {
            e.preventDefault();
        }
    });

})();

// Utilidades globales
const AyniUtils = {
    /**
     * Formatea un número de teléfono
     * @param {string} phone - Número de teléfono
     * @returns {string} - Teléfono formateado
     */
    formatPhone(phone) {
        return phone.replace(/(\d{2})(\d{4})(\d{4})/, '+$1 $2 $3');
    },

    /**
     * Valida un RUT chileno
     * @param {string} rut - RUT a validar
     * @returns {boolean} - true si es válido
     */
    validateRUT(rut) {
        // Implementación básica de validación de RUT
        rut = rut.replace(/\./g, '').replace('-', '');
        const body = rut.slice(0, -1);
        const dv = rut.slice(-1).toUpperCase();

        let sum = 0;
        let multiplier = 2;

        for (let i = body.length - 1; i >= 0; i--) {
            sum += parseInt(body.charAt(i)) * multiplier;
            multiplier = multiplier === 7 ? 2 : multiplier + 1;
        }

        const expectedDV = 11 - (sum % 11);
        const calculatedDV = expectedDV === 11 ? '0' : expectedDV === 10 ? 'K' : expectedDV.toString();

        return dv === calculatedDV;
    },

    /**
     * Formatea una fecha
     * @param {Date} date - Fecha a formatear
     * @returns {string} - Fecha formateada
     */
    formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('es-CL', options);
    },

    /**
     * Debounce para optimizar eventos
     * @param {Function} func - Función a ejecutar
     * @param {number} wait - Tiempo de espera en ms
     * @returns {Function} - Función con debounce
     */
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
    }
};

// Hacer utilidades accesibles globalmente
window.AyniUtils = AyniUtils;
