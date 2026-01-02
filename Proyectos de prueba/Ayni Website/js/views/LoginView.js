// LoginView.js - Vista para el sistema de login
class LoginView {
    constructor() {
        this.modal = document.getElementById('loginModal');
        this.btnOpenLogin = document.getElementById('btnOpenLogin');
        this.btnCloseModal = document.getElementById('closeModal');
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.tabContents = document.querySelectorAll('.tab-content');
        this.loginAbogadoForm = document.getElementById('loginAbogadoForm');
        this.loginClienteForm = document.getElementById('loginClienteForm');
        this.btnLogoutAbogado = document.getElementById('btnLogoutAbogado');
        this.btnLogoutCliente = document.getElementById('btnLogoutCliente');

        this.onLoginCallback = null;
        this.onLogoutCallback = null;

        this.init();
    }

    init() {
        this.setupModalControls();
        this.setupTabs();
        this.setupForms();
        this.setupLogoutButtons();
    }

    /**
     * Configura los controles del modal
     */
    setupModalControls() {
        // Abrir modal
        this.btnOpenLogin.addEventListener('click', () => {
            this.openModal();
        });

        // Cerrar modal
        this.btnCloseModal.addEventListener('click', () => {
            this.closeModal();
        });

        // Cerrar al hacer click fuera del modal
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Cerrar con tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    /**
     * Configura las pestañas del modal
     */
    setupTabs() {
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabName = button.getAttribute('data-tab');
                this.switchTab(tabName);
            });
        });
    }

    /**
     * Cambia entre pestañas
     * @param {string} tabName - Nombre de la pestaña a activar
     */
    switchTab(tabName) {
        // Desactivar todos los botones y contenidos
        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        this.tabContents.forEach(content => content.classList.remove('active'));

        // Activar el botón y contenido seleccionado
        const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
        const activeContent = document.getElementById(`${tabName}-tab`);

        if (activeButton && activeContent) {
            activeButton.classList.add('active');
            activeContent.classList.add('active');
        }
    }

    /**
     * Configura los formularios de login
     */
    setupForms() {
        // Formulario de abogado
        this.loginAbogadoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin('abogado');
        });

        // Formulario de cliente
        this.loginClienteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin('cliente');
        });
    }

    /**
     * Maneja el proceso de login
     * @param {string} userType - Tipo de usuario ('abogado' o 'cliente')
     */
    handleLogin(userType) {
        const email = document.getElementById(`email${userType.charAt(0).toUpperCase() + userType.slice(1)}`).value;
        const password = document.getElementById(`password${userType.charAt(0).toUpperCase() + userType.slice(1)}`).value;

        if (this.onLoginCallback) {
            this.onLoginCallback(email, password, userType);
        }
    }

    /**
     * Establece el callback para el login
     * @param {Function} callback - Función a ejecutar al hacer login
     */
    setOnLogin(callback) {
        this.onLoginCallback = callback;
    }

    /**
     * Abre el modal
     */
    openModal() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Cierra el modal
     */
    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.clearForms();
    }

    /**
     * Limpia los formularios
     */
    clearForms() {
        this.loginAbogadoForm.reset();
        this.loginClienteForm.reset();
    }

    /**
     * Muestra un mensaje de error
     * @param {string} message - Mensaje de error
     * @param {string} userType - Tipo de usuario
     */
    showError(message, userType) {
        const form = userType === 'abogado' ? this.loginAbogadoForm : this.loginClienteForm;

        // Remover mensaje de error anterior si existe
        const existingError = form.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Crear nuevo mensaje de error
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            background: #fee;
            color: #c33;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 15px;
            font-size: 0.9rem;
            border: 1px solid #fcc;
        `;
        errorDiv.textContent = message;

        form.insertBefore(errorDiv, form.firstChild);

        // Remover después de 5 segundos
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    /**
     * Muestra un mensaje de éxito
     * @param {string} message - Mensaje de éxito
     * @param {string} userType - Tipo de usuario
     */
    showSuccess(message, userType) {
        const form = userType === 'abogado' ? this.loginAbogadoForm : this.loginClienteForm;

        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.cssText = `
            background: #efe;
            color: #3c3;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 15px;
            font-size: 0.9rem;
            border: 1px solid #cfc;
        `;
        successDiv.textContent = message;

        form.insertBefore(successDiv, form.firstChild);

        // Cerrar modal después de 1.5 segundos
        setTimeout(() => {
            this.closeModal();
        }, 1500);
    }

    /**
     * Muestra el estado de carga
     * @param {boolean} loading - Si está cargando
     * @param {string} userType - Tipo de usuario
     */
    setLoading(loading, userType) {
        const form = userType === 'abogado' ? this.loginAbogadoForm : this.loginClienteForm;
        const submitButton = form.querySelector('button[type="submit"]');

        if (loading) {
            submitButton.disabled = true;
            submitButton.textContent = 'Iniciando sesión...';
        } else {
            submitButton.disabled = false;
            submitButton.textContent = userType === 'abogado' ? 'Acceder al Portal' : 'Acceder a Mi Cuenta';
        }
    }

    /**
     * Configura los botones de cerrar sesión
     */
    setupLogoutButtons() {
        if (this.btnLogoutAbogado) {
            this.btnLogoutAbogado.addEventListener('click', () => {
                this.handleLogout('abogado');
            });
        }

        if (this.btnLogoutCliente) {
            this.btnLogoutCliente.addEventListener('click', () => {
                this.handleLogout('cliente');
            });
        }
    }

    /**
     * Maneja el cierre de sesión
     * @param {string} userType - Tipo de usuario
     */
    handleLogout(userType) {
        if (this.onLogoutCallback) {
            this.onLogoutCallback(userType);
        }
        this.showLoggedOut(userType);
    }

    /**
     * Establece el callback para el logout
     * @param {Function} callback - Función a ejecutar al cerrar sesión
     */
    setOnLogout(callback) {
        this.onLogoutCallback = callback;
    }

    /**
     * Muestra el estado de sesión iniciada
     * @param {string} userType - Tipo de usuario
     */
    showLoggedIn(userType) {
        const form = userType === 'abogado' ? this.loginAbogadoForm : this.loginClienteForm;
        const submitButton = form.querySelector('button[type="submit"]');
        const logoutButton = userType === 'abogado' ? this.btnLogoutAbogado : this.btnLogoutCliente;
        const formInputs = form.querySelectorAll('input, select');

        // Ocultar botón de login y campos
        submitButton.style.display = 'none';
        formInputs.forEach(input => {
            input.parentElement.style.display = 'none';
        });
        form.querySelector('.form-options').style.display = 'none';

        // Mostrar botón de logout
        if (logoutButton) {
            logoutButton.style.display = 'block';
        }
    }

    /**
     * Muestra el estado de sesión cerrada
     * @param {string} userType - Tipo de usuario
     */
    showLoggedOut(userType) {
        const form = userType === 'abogado' ? this.loginAbogadoForm : this.loginClienteForm;
        const submitButton = form.querySelector('button[type="submit"]');
        const logoutButton = userType === 'abogado' ? this.btnLogoutAbogado : this.btnLogoutCliente;
        const formInputs = form.querySelectorAll('input, select');

        // Mostrar botón de login y campos
        submitButton.style.display = 'block';
        formInputs.forEach(input => {
            input.parentElement.style.display = 'block';
        });
        form.querySelector('.form-options').style.display = 'flex';

        // Ocultar botón de logout
        if (logoutButton) {
            logoutButton.style.display = 'none';
        }

        // Limpiar formularios
        this.clearForms();
    }
}

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LoginView;
}
