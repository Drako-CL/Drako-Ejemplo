// ContactView.js - Vista para el formulario de contacto
class ContactView {
    constructor() {
        this.contactForm = document.getElementById('contactForm');
        this.onSubmitCallback = null;

        this.init();
    }

    init() {
        this.setupForm();
    }

    /**
     * Configura el formulario de contacto
     */
    setupForm() {
        this.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    /**
     * Maneja el envío del formulario
     */
    handleSubmit() {
        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            asunto: document.getElementById('asunto').value,
            mensaje: document.getElementById('mensaje').value
        };

        // Validar datos
        if (!this.validateForm(formData)) {
            return;
        }

        if (this.onSubmitCallback) {
            this.onSubmitCallback(formData);
        }
    }

    /**
     * Valida el formulario
     * @param {Object} data - Datos del formulario
     * @returns {boolean} - true si es válido
     */
    validateForm(data) {
        // Validar nombre
        if (data.nombre.trim().length < 3) {
            this.showError('Por favor ingrese un nombre válido (mínimo 3 caracteres)');
            return false;
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showError('Por favor ingrese un email válido');
            return false;
        }

        // Validar asunto
        if (!data.asunto) {
            this.showError('Por favor seleccione un área de consulta');
            return false;
        }

        // Validar mensaje
        if (data.mensaje.trim().length < 10) {
            this.showError('Por favor ingrese un mensaje más detallado (mínimo 10 caracteres)');
            return false;
        }

        return true;
    }

    /**
     * Establece el callback para el envío
     * @param {Function} callback - Función a ejecutar al enviar
     */
    setOnSubmit(callback) {
        this.onSubmitCallback = callback;
    }

    /**
     * Muestra un mensaje de error
     * @param {string} message - Mensaje de error
     */
    showError(message) {
        // Remover mensaje anterior si existe
        const existingMessage = this.contactForm.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-message error-message';
        errorDiv.style.cssText = `
            background: #fee;
            color: #c33;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 15px;
            font-size: 0.9rem;
            border: 1px solid #fcc;
            animation: fadeIn 0.3s ease-out;
        `;
        errorDiv.textContent = message;

        this.contactForm.insertBefore(errorDiv, this.contactForm.firstChild);

        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    /**
     * Muestra un mensaje de éxito
     * @param {string} message - Mensaje de éxito
     */
    showSuccess(message) {
        // Remover mensaje anterior si existe
        const existingMessage = this.contactForm.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const successDiv = document.createElement('div');
        successDiv.className = 'form-message success-message';
        successDiv.style.cssText = `
            background: #efe;
            color: #2d7a4f;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 15px;
            font-size: 0.9rem;
            border: 1px solid #cfc;
            animation: fadeIn 0.3s ease-out;
        `;
        successDiv.textContent = message;

        this.contactForm.insertBefore(successDiv, this.contactForm.firstChild);

        // Limpiar formulario
        this.contactForm.reset();

        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    /**
     * Muestra el estado de carga
     * @param {boolean} loading - Si está cargando
     */
    setLoading(loading) {
        const submitButton = this.contactForm.querySelector('button[type="submit"]');

        if (loading) {
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
        } else {
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar Consulta';
        }
    }
}

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactView;
}
