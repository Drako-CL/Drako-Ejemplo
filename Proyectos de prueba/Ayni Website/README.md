# Ayni Abogados - Sitio Web

![Ayni Abogados](https://img.shields.io/badge/Estado-Activo-success)
![Versión](https://img.shields.io/badge/Versión-1.0.0-blue)
![Licencia](https://img.shields.io/badge/Licencia-MIT-green)

## 📋 Descripción

Sitio web profesional para **Ayni Abogados**, una firma legal de prestigio. El proyecto implementa una página única (Single Page Application) con sistema de autenticación dual para abogados/trabajadores y clientes, desarrollado con arquitectura MVC.

## ✨ Características

- 🎨 **Diseño Premium**: Interfaz moderna y profesional con animaciones suaves
- 📱 **Responsive**: Totalmente adaptable a dispositivos móviles, tablets y desktop
- 🔐 **Sistema de Login Dual**: Autenticación separada para abogados y clientes
- 🏗️ **Arquitectura MVC**: Código organizado y mantenible
- ⚡ **Navegación Suave**: Scroll suave entre secciones
- 📧 **Formulario de Contacto**: Con validación completa
- 💾 **Persistencia de Sesión**: Las sesiones se mantienen en localStorage

## 🚀 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Diseño moderno con variables CSS, gradientes y animaciones
- **JavaScript ES6+**: Lógica de la aplicación con clases y módulos
- **Arquitectura MVC**: Separación de responsabilidades
- **LocalStorage**: Persistencia de sesiones

## 📁 Estructura del Proyecto

```
Ayni Website/
├── index.html              # Página principal
├── css/
│   └── styles.css         # Estilos globales
├── js/
│   ├── models/
│   │   └── UserModel.js   # Modelo de usuarios
│   ├── views/
│   │   ├── NavigationView.js   # Vista de navegación
│   │   ├── LoginView.js        # Vista de login
│   │   └── ContactView.js      # Vista de contacto
│   ├── controllers/
│   │   └── AppController.js    # Controlador principal
│   └── app.js             # Punto de entrada
└── README.md              # Documentación
```

## 🎯 Secciones del Sitio

1. **Inicio (Hero)**: Presentación impactante con llamados a la acción
2. **¿Quiénes Somos?**: Historia de la firma y estadísticas
3. **Organización**: Áreas de práctica legal
4. **Noticias**: Últimas novedades y artículos
5. **Contacto**: Formulario de consulta y datos de contacto

## 🔑 Credenciales de Prueba

### Abogados/Trabajadores

**Usuario 1:**

- Email: `juan.perez@ayniabogados.cl`
- Password: `abogado123`
- Rol: Socio Principal
- Especialidad: Derecho Corporativo

**Usuario 2:**

- Email: `maria.gonzalez@ayniabogados.cl`
- Password: `abogado123`
- Rol: Socia
- Especialidad: Derecho Laboral

### Clientes

**Usuario 1:**

- Email: `cliente@example.com`
- Password: `cliente123`
- Casos: Caso #2024-001, Caso #2024-045

**Usuario 2:**

- Email: `ana.silva@example.com`
- Password: `cliente123`
- Casos: Caso #2024-023

## 🛠️ Instalación y Uso

### Opción 1: Servidor Local Simple

```bash
# Navegar a la carpeta del proyecto
cd "Ayni Website"

# Iniciar un servidor HTTP simple con Python
python -m http.server 8000

# O con Node.js (si tienes npx instalado)
npx http-server -p 8000
```

Luego abrir en el navegador: `http://localhost:8000`

### Opción 2: Abrir Directamente

Simplemente abre el archivo `index.html` en tu navegador favorito.

## 📖 Arquitectura MVC

### Modelo (Model)

- **UserModel.js**: Gestiona la lógica de usuarios, autenticación y sesiones

### Vista (View)

- **NavigationView.js**: Maneja la navegación y scroll
- **LoginView.js**: Gestiona el modal de login y sus formularios
- **ContactView.js**: Controla el formulario de contacto

### Controlador (Controller)

- **AppController.js**: Coordina el modelo y las vistas, maneja eventos

## 🎨 Paleta de Colores

```css
--primary-color: #1a4d2e      /* Verde oscuro profesional */
--primary-dark: #0f2919       /* Verde muy oscuro */
--primary-light: #2d7a4f      /* Verde medio */
--accent-gold: #d4af37        /* Dorado elegante */
--accent-gold-light: #f0d98d  /* Dorado claro */
```

## 📱 Responsive Design

El sitio es completamente responsive con breakpoints en:

- **Desktop**: > 968px
- **Tablet**: 640px - 968px
- **Mobile**: < 640px

## 🔒 Seguridad

⚠️ **Nota Importante**: Este es un proyecto de demostración. En producción:

1. Nunca almacenar contraseñas en texto plano
2. Usar HTTPS para todas las comunicaciones
3. Implementar autenticación con JWT o similar
4. Validar datos en el servidor
5. Usar una base de datos real
6. Implementar rate limiting
7. Sanitizar todas las entradas de usuario

## 🚀 Próximas Mejoras

- [ ] Integración con backend real (Node.js/Express o similar)
- [ ] Base de datos (MongoDB, PostgreSQL)
- [ ] Sistema de recuperación de contraseña
- [ ] Panel de administración completo
- [ ] Sistema de mensajería entre clientes y abogados
- [ ] Gestión de documentos
- [ ] Calendario de citas
- [ ] Notificaciones en tiempo real
- [ ] Integración con sistemas de pago
- [ ] Blog con CMS

## 👥 Funcionalidades por Tipo de Usuario

### Dashboard Abogado/Trabajador

- Ver casos asignados
- Calendario de audiencias
- Documentos pendientes
- Mensajes de clientes
- Gestión de expedientes

### Dashboard Cliente

- Estado de casos activos
- Documentos del caso
- Mensajes con abogado asignado
- Próximas citas
- Historial de consultas

## 📝 Licencia

Este proyecto es de código abierto bajo la licencia MIT.

## 👨‍💻 Autor

Desarrollado por **Drako_CL**

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

Para consultas sobre el proyecto:

- Email: <contacto@ayniabogados.cl>
- Teléfono: +56 2 2345 6789

---

**Ayni Abogados** - Excelencia Legal a Su Servicio © 2026
