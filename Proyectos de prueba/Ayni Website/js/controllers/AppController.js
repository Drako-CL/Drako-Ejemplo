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

        this.loginView.setOnLogout((userType) => {
            this.handleLogout(userType);
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
                this.loginView.showLoggedIn(userType);
                this.navigationView.updateLoginButton(true, user.nombre.split(' ')[0]);

                // Mostrar dashboard
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
     * Maneja el cierre de sesión
     * @param {string} userType - Tipo de usuario
     */
    handleLogout(userType) {
        this.logout();
        this.loginView.showLoggedOut(userType);
        alert('Sesión cerrada exitosamente');
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
     * Envía el formulario de contacto por WhatsApp y Email
     * @param {Object} formData - Datos del formulario
     */
    sendContactEmail(formData) {
        // Preparar mensaje para WhatsApp
        const whatsappMessage = `Hola, soy ${formData.nombre}.%0A%0A` +
            `Email: ${formData.email}%0A` +
            `Teléfono: ${formData.telefono}%0A` +
            `Área de consulta: ${formData.asunto}%0A%0A` +
            `Mensaje:%0A${encodeURIComponent(formData.mensaje)}`;

        // Abrir WhatsApp con el mensaje
        const whatsappURL = `https://wa.me/56223456789?text=${whatsappMessage}`;
        window.open(whatsappURL, '_blank');

        // Preparar email
        const emailSubject = encodeURIComponent(`Nueva consulta - ${formData.asunto}`);
        const emailBody = encodeURIComponent(
            `Nombre: ${formData.nombre}\n` +
            `Email: ${formData.email}\n` +
            `Teléfono: ${formData.telefono}\n` +
            `Área: ${formData.asunto}\n\n` +
            `Mensaje:\n${formData.mensaje}`
        );

        // Abrir cliente de email
        const emailURL = `mailto:contacto@ayniabogados.cl?subject=${emailSubject}&body=${emailBody}`;
        window.location.href = emailURL;

        // Log para desarrollo
        console.log('Formulario enviado:', formData);
        console.log('WhatsApp URL:', whatsappURL);
        console.log('Email URL:', emailURL);
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
