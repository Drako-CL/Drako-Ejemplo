// UserModel.js - Modelo para gestión de usuarios
class UserModel {
    constructor() {
        this.currentUser = null;
        this.userType = null; // 'abogado' o 'cliente'

        // Usuarios de ejemplo (en producción esto vendría de una base de datos)
        this.users = {
            abogados: [
                {
                    id: 1,
                    email: 'juan.perez@ayniabogados.cl',
                    password: 'abogado123',
                    nombre: 'Juan Pérez',
                    rol: 'Socio Principal',
                    especialidad: 'Derecho Corporativo'
                },
                {
                    id: 2,
                    email: 'maria.gonzalez@ayniabogados.cl',
                    password: 'abogado123',
                    nombre: 'María González',
                    rol: 'Socia',
                    especialidad: 'Derecho Laboral'
                }
            ],
            clientes: [
                {
                    id: 1,
                    email: 'cliente@example.com',
                    password: 'cliente123',
                    nombre: 'Carlos Rodríguez',
                    casos: ['Caso #2024-001', 'Caso #2024-045']
                },
                {
                    id: 2,
                    email: 'ana.silva@example.com',
                    password: 'cliente123',
                    nombre: 'Ana Silva',
                    casos: ['Caso #2024-023']
                }
            ]
        };
    }

    /**
     * Autentica un usuario
     * @param {string} email - Email del usuario
     * @param {string} password - Contraseña del usuario
     * @param {string} userType - Tipo de usuario ('abogado' o 'cliente')
     * @returns {Object|null} - Usuario autenticado o null si falla
     */
    authenticate(email, password, userType) {
        const userList = userType === 'abogado' ? this.users.abogados : this.users.clientes;

        const user = userList.find(u =>
            u.email.toLowerCase() === email.toLowerCase() &&
            u.password === password
        );

        if (user) {
            this.currentUser = user;
            this.userType = userType;
            this.saveSession();
            return user;
        }

        return null;
    }

    /**
     * Guarda la sesión en localStorage
     */
    saveSession() {
        if (this.currentUser) {
            const sessionData = {
                user: this.currentUser,
                userType: this.userType,
                timestamp: new Date().getTime()
            };
            localStorage.setItem('ayniSession', JSON.stringify(sessionData));
        }
    }

    /**
     * Restaura la sesión desde localStorage
     * @returns {boolean} - true si se restauró la sesión, false si no
     */
    restoreSession() {
        const sessionData = localStorage.getItem('ayniSession');

        if (sessionData) {
            try {
                const data = JSON.parse(sessionData);
                const now = new Date().getTime();
                const sessionAge = now - data.timestamp;

                // Sesión válida por 24 horas
                if (sessionAge < 24 * 60 * 60 * 1000) {
                    this.currentUser = data.user;
                    this.userType = data.userType;
                    return true;
                } else {
                    this.logout();
                }
            } catch (e) {
                console.error('Error al restaurar sesión:', e);
            }
        }

        return false;
    }

    /**
     * Cierra la sesión del usuario
     */
    logout() {
        this.currentUser = null;
        this.userType = null;
        localStorage.removeItem('ayniSession');
    }

    /**
     * Obtiene el usuario actual
     * @returns {Object|null} - Usuario actual o null
     */
    getCurrentUser() {
        return this.currentUser;
    }

    /**
     * Obtiene el tipo de usuario actual
     * @returns {string|null} - Tipo de usuario o null
     */
    getUserType() {
        return this.userType;
    }

    /**
     * Verifica si hay un usuario autenticado
     * @returns {boolean}
     */
    isAuthenticated() {
        return this.currentUser !== null;
    }

    /**
     * Registra un nuevo cliente
     * @param {Object} userData - Datos del nuevo usuario
     * @returns {Object|null} - Usuario creado o null si falla
     */
    registerClient(userData) {
        // Verificar si el email ya existe
        const exists = this.users.clientes.some(u =>
            u.email.toLowerCase() === userData.email.toLowerCase()
        );

        if (exists) {
            return null;
        }

        const newUser = {
            id: this.users.clientes.length + 1,
            email: userData.email,
            password: userData.password,
            nombre: userData.nombre,
            casos: []
        };

        this.users.clientes.push(newUser);
        return newUser;
    }

    /**
     * Valida el formato de email
     * @param {string} email - Email a validar
     * @returns {boolean}
     */
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /**
     * Valida la contraseña
     * @param {string} password - Contraseña a validar
     * @returns {Object} - {valid: boolean, message: string}
     */
    validatePassword(password) {
        if (password.length < 6) {
            return {
                valid: false,
                message: 'La contraseña debe tener al menos 6 caracteres'
            };
        }
        return {
            valid: true,
            message: 'Contraseña válida'
        };
    }
}

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserModel;
}
