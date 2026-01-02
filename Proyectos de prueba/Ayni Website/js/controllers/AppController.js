// AppController.js - Controlador principal de la aplicación
class AppController {
    constructor() {
        // Inicializar Modelo
        this.userModel = new UserModel();

        // Inicializar Vistas
        this.navigationView = new NavigationView();
        this.loginView = new LoginView();
        this.contactView = new ContactView();

        this.init();
    }

    init() {
        // Configurar callbacks de las vistas
        this.loginView.setOnLogin((email, password, userType) => {
            this.handleLogin(email, password, userType);
        });

        this.contactView.setOnSubmit((formData) => {
            this.handleContactSubmit(formData);
        });

        // Verificar si hay una sesión activa
        this.checkSession();

        // Generar imágenes de ejemplo
        this.generatePlaceholderImages();
    }

    /**
     * Maneja el proceso de login
     * @param {string} email - Email del usuario
     * @param {string} password - Contraseña del usuario
     * @param {string} userType - Tipo de usuario
     */
    handleLogin(email, password, userType) {
        // Mostrar estado de carga
        this.loginView.setLoading(true, userType);

        // Simular delay de red (en producción esto sería una llamada a API)
        setTimeout(() => {
            const user = this.userModel.authenticate(email, password, userType);

            if (user) {
                // Login exitoso
                this.loginView.showSuccess(`¡Bienvenido, ${user.nombre}!`, userType);
                this.navigationView.updateLoginButton(true, user.nombre.split(' ')[0]);

                // Redirigir al dashboard correspondiente
                setTimeout(() => {
                    this.redirectToDashboard(userType);
                }, 1500);
            } else {
                // Login fallido
                this.loginView.showError('Email o contraseña incorrectos', userType);
            }

            this.loginView.setLoading(false, userType);
        }, 1000);
    }

    /**
     * Redirige al dashboard según el tipo de usuario
     * @param {string} userType - Tipo de usuario
     */
    redirectToDashboard(userType) {
        const user = this.userModel.getCurrentUser();

        if (userType === 'abogado') {
            this.showAbogadoDashboard(user);
        } else {
            this.showClienteDashboard(user);
        }
    }

    /**
     * Muestra el dashboard del abogado
     * @param {Object} user - Datos del usuario
     */
    showAbogadoDashboard(user) {
        // En una aplicación real, esto redirigiría a otra página
        // Por ahora, mostramos un alert con la información
        alert(`Dashboard de Abogado\n\nBienvenido: ${user.nombre}\nRol: ${user.rol}\nEspecialidad: ${user.especialidad}\n\nEn una aplicación real, aquí verías:\n- Casos asignados\n- Calendario de audiencias\n- Documentos pendientes\n- Mensajes de clientes`);

        console.log('Dashboard Abogado:', user);
    }

    /**
     * Muestra el dashboard del cliente
     * @param {Object} user - Datos del usuario
     */
    showClienteDashboard(user) {
        // En una aplicación real, esto redirigiría a otra página
        // Por ahora, mostramos un alert con la información
        const casosText = user.casos.length > 0 ? user.casos.join('\n- ') : 'No hay casos activos';

        alert(`Dashboard de Cliente\n\nBienvenido: ${user.nombre}\n\nTus casos:\n- ${casosText}\n\nEn una aplicación real, aquí verías:\n- Estado de tus casos\n- Documentos\n- Mensajes con tu abogado\n- Próximas citas`);

        console.log('Dashboard Cliente:', user);
    }

    /**
     * Verifica si hay una sesión activa
     */
    checkSession() {
        if (this.userModel.restoreSession()) {
            const user = this.userModel.getCurrentUser();
            this.navigationView.updateLoginButton(true, user.nombre.split(' ')[0]);
            console.log('Sesión restaurada:', user);
        }
    }

    /**
     * Maneja el envío del formulario de contacto
     * @param {Object} formData - Datos del formulario
     */
    handleContactSubmit(formData) {
        // Mostrar estado de carga
        this.contactView.setLoading(true);

        // Simular envío (en producción esto sería una llamada a API)
        setTimeout(() => {
            // Simular éxito
            console.log('Consulta enviada:', formData);

            this.contactView.showSuccess('¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.');
            this.contactView.setLoading(false);

            // En producción, aquí se enviaría el email o se guardaría en base de datos
            this.sendContactEmail(formData);
        }, 1500);
    }

    /**
     * Simula el envío de email de contacto
     * @param {Object} formData - Datos del formulario
     */
    sendContactEmail(formData) {
        // En producción, esto haría una llamada a un endpoint que envíe el email
        console.log('Email enviado a contacto@ayniabogados.cl:', {
            from: formData.email,
            subject: `Nueva consulta - ${formData.asunto}`,
            body: `
                Nombre: ${formData.nombre}
                Email: ${formData.email}
                Teléfono: ${formData.telefono}
                Área: ${formData.asunto}
                
                Mensaje:
                ${formData.mensaje}
            `
        });
    }

    /**
     * Genera imágenes de ejemplo para las secciones
     */
    generatePlaceholderImages() {
        // Imagen de "Quienes Somos"
        const aboutImage = document.getElementById('aboutImage');
        if (aboutImage) {
            this.createGradientImage(aboutImage, ['#1a4d2e', '#2d7a4f', '#d4af37']);
        }

        // Imágenes de noticias
        const newsImages = [
            { id: 'newsImage1', colors: ['#1a4d2e', '#2d7a4f'] },
            { id: 'newsImage2', colors: ['#2d7a4f', '#d4af37'] },
            { id: 'newsImage3', colors: ['#1a4d2e', '#d4af37'] }
        ];

        newsImages.forEach(img => {
            const element = document.getElementById(img.id);
            if (element) {
                this.createGradientImage(element, img.colors);
            }
        });
    }

    /**
     * Crea una imagen con gradiente
     * @param {HTMLElement} element - Elemento donde crear la imagen
     * @param {Array} colors - Colores del gradiente
     */
    createGradientImage(element, colors) {
        const gradient = `linear-gradient(135deg, ${colors.join(', ')})`;
        element.style.background = gradient;
    }

    /**
     * Cierra la sesión del usuario
     */
    logout() {
        this.userModel.logout();
        this.navigationView.updateLoginButton(false);
        console.log('Sesión cerrada');
    }
}

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppController;
}
