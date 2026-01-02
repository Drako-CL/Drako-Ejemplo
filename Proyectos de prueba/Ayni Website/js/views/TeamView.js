// TeamView.js - Vista para el equipo y modal de perfiles
class TeamView {
    constructor() {
        this.teamModal = document.getElementById('teamModal');
        this.teamProfile = document.getElementById('teamProfile');
        this.closeTeamModal = document.getElementById('closeTeamModal');
        this.teamMembers = document.querySelectorAll('.team-member');

        this.teamData = {
            'juan-perez': {
                name: 'Juan Pérez Valenzuela',
                role: 'Socio Director',
                specialty: 'Derecho Corporativo',
                email: 'juan.perez@ayniabogados.cl',
                phone: '+56 2 2345 6789',
                image: 'images/juan-perez.jpg',
                bio: 'Abogado titulado de la Universidad de Chile con más de 20 años de experiencia en derecho corporativo. Ha liderado importantes fusiones y adquisiciones en el mercado chileno.',
                education: [
                    'Licenciado en Derecho, Universidad de Chile',
                    'MBA, Universidad Adolfo Ibáñez',
                    'Diplomado en Derecho Corporativo, Pontificia Universidad Católica'
                ],
                experience: [
                    'Socio Director en Ayni Abogados (2015 - Presente)',
                    'Socio en Estudio Jurídico Internacional (2010 - 2015)',
                    'Asociado Senior en Firma Legal Corporativa (2005 - 2010)'
                ],
                areas: [
                    'Fusiones y Adquisiciones',
                    'Gobierno Corporativo',
                    'Derecho Comercial',
                    'Contratos Comerciales'
                ]
            },
            'maria-gonzalez': {
                name: 'María González Soto',
                role: 'Socia',
                specialty: 'Derecho Laboral',
                email: 'maria.gonzalez@ayniabogados.cl',
                phone: '+56 2 2345 6790',
                image: 'images/maria-gonzalez.jpg',
                bio: 'Especialista en derecho laboral con amplia experiencia en negociaciones colectivas y litigios laborales. Reconocida por su compromiso con los derechos de los trabajadores.',
                education: [
                    'Licenciada en Derecho, Pontificia Universidad Católica',
                    'Magíster en Derecho del Trabajo, Universidad de Chile',
                    'Diplomado en Relaciones Laborales'
                ],
                experience: [
                    'Socia en Ayni Abogados (2012 - Presente)',
                    'Asociada Senior en Estudio Laboral (2008 - 2012)',
                    'Abogada en Dirección del Trabajo (2005 - 2008)'
                ],
                areas: [
                    'Negociaciones Colectivas',
                    'Litigios Laborales',
                    'Despidos y Finiquitos',
                    'Compliance Laboral'
                ]
            },
            'carlos-rodriguez': {
                name: 'Carlos Rodríguez Muñoz',
                role: 'Socio Senior',
                specialty: 'Derecho Civil',
                email: 'carlos.rodriguez@ayniabogados.cl',
                phone: '+56 2 2345 6791',
                image: 'images/carlos-rodriguez.jpg',
                bio: 'Abogado con más de 25 años de experiencia en derecho civil, especializado en contratos, sucesiones y responsabilidad civil. Profesor universitario y autor de publicaciones jurídicas.',
                education: [
                    'Licenciado en Derecho, Universidad de Chile',
                    'Doctor en Derecho, Universidad Complutense de Madrid',
                    'Profesor de Derecho Civil, Universidad de Chile'
                ],
                experience: [
                    'Socio Senior en Ayni Abogados (2010 - Presente)',
                    'Socio Fundador en Estudio Rodríguez & Asociados (2000 - 2010)',
                    'Profesor Titular de Derecho Civil (1998 - Presente)'
                ],
                areas: [
                    'Contratos Civiles',
                    'Sucesiones y Testamentos',
                    'Responsabilidad Civil',
                    'Derecho de Propiedad'
                ]
            },
            'ana-silva': {
                name: 'Ana Silva Contreras',
                role: 'Asociada Senior',
                specialty: 'Derecho Penal',
                email: 'ana.silva@ayniabogados.cl',
                phone: '+56 2 2345 6792',
                image: 'images/ana-silva.jpg',
                bio: 'Abogada penalista con destacada trayectoria en defensa penal. Especializada en delitos económicos y litigios complejos.',
                education: [
                    'Licenciada en Derecho, Universidad Diego Portales',
                    'Magíster en Derecho Penal, Universidad de Chile',
                    'Diplomado en Litigación Penal'
                ],
                experience: [
                    'Asociada Senior en Ayni Abogados (2015 - Presente)',
                    'Defensora Penal Pública (2010 - 2015)',
                    'Asociada en Estudio Penal (2008 - 2010)'
                ],
                areas: [
                    'Defensa Penal',
                    'Delitos Económicos',
                    'Litigación Oral',
                    'Recursos Judiciales'
                ]
            },
            'diego-martinez': {
                name: 'Diego Martínez Rojas',
                role: 'Asociado',
                specialty: 'Derecho Inmobiliario',
                email: 'diego.martinez@ayniabogados.cl',
                phone: '+56 2 2345 6793',
                image: 'images/diego-martinez.jpg',
                bio: 'Abogado especializado en derecho inmobiliario y transacciones de bienes raíces. Experiencia en proyectos de desarrollo inmobiliario.',
                education: [
                    'Licenciado en Derecho, Pontificia Universidad Católica',
                    'Diplomado en Derecho Inmobiliario',
                    'Curso de Especialización en Urbanismo'
                ],
                experience: [
                    'Asociado en Ayni Abogados (2018 - Presente)',
                    'Abogado Junior en Inmobiliaria (2015 - 2018)',
                    'Pasante en Estudio Inmobiliario (2014 - 2015)'
                ],
                areas: [
                    'Compraventa de Inmuebles',
                    'Arrendamientos',
                    'Proyectos Inmobiliarios',
                    'Derecho Urbanístico'
                ]
            },
            'patricia-lopez': {
                name: 'Patricia López Fernández',
                role: 'Asociada',
                specialty: 'Derecho de Familia',
                email: 'patricia.lopez@ayniabogados.cl',
                phone: '+56 2 2345 6794',
                image: 'images/patricia-lopez.jpg',
                bio: 'Abogada dedicada al derecho de familia con enfoque en mediación y resolución pacífica de conflictos familiares.',
                education: [
                    'Licenciada en Derecho, Universidad de Chile',
                    'Magíster en Derecho de Familia',
                    'Mediadora Familiar Certificada'
                ],
                experience: [
                    'Asociada en Ayni Abogados (2017 - Presente)',
                    'Mediadora Familiar (2015 - 2017)',
                    'Abogada en Corporación de Asistencia Judicial (2013 - 2015)'
                ],
                areas: [
                    'Divorcios y Separaciones',
                    'Custodia de Menores',
                    'Pensiones Alimenticias',
                    'Mediación Familiar'
                ]
            }
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Click en miembros del equipo
        this.teamMembers.forEach(member => {
            member.addEventListener('click', () => {
                const memberId = member.getAttribute('data-member');
                this.showProfile(memberId);
            });
        });

        // Cerrar modal
        this.closeTeamModal.addEventListener('click', () => {
            this.closeModal();
        });

        // Cerrar al hacer click fuera del modal
        this.teamModal.addEventListener('click', (e) => {
            if (e.target === this.teamModal) {
                this.closeModal();
            }
        });

        // Cerrar con tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.teamModal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    showProfile(memberId) {
        const member = this.teamData[memberId];
        if (!member) return;

        const profileHTML = `
            <div class="profile-header">
                <div class="profile-photo">
                    <img src="${member.image}" alt="${member.name}">
                </div>
                <div class="profile-info">
                    <h2>${member.name}</h2>
                    <p class="profile-role">${member.role}</p>
                    <p class="profile-specialty">${member.specialty}</p>
                    <div class="profile-contact">
                        <div class="profile-contact-item">
                            <span>📧</span>
                            <span>${member.email}</span>
                        </div>
                        <div class="profile-contact-item">
                            <span>📞</span>
                            <span>${member.phone}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="profile-section">
                <h3>Biografía</h3>
                <p>${member.bio}</p>
            </div>
            
            <div class="profile-section">
                <h3>Educación</h3>
                <ul>
                    ${member.education.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <div class="profile-section">
                <h3>Experiencia Profesional</h3>
                <ul>
                    ${member.experience.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <div class="profile-section">
                <h3>Áreas de Práctica</h3>
                <ul>
                    ${member.areas.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;

        this.teamProfile.innerHTML = profileHTML;
        this.openModal();
    }

    openModal() {
        this.teamModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.teamModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TeamView;
}
