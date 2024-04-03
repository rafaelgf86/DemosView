import { Navbar } from '../interfaces/navbar';

export const NAVBAR_DATA: Navbar[] = [
    {
        nameNav: 'Seguridad',
        url: 'security',
        icon: 'fas fa-shield-alt',
        idSection: 0,
        iconShortAccess: '/assets/img/menus/security.png',
        descriptionShortAccess: 'Controla el acceso, revisa las bitácoras y valida las principales configuraciones del sistema',
        classShortAccess: 'security',
        sections: [
            {
                idSection: 2,
                name: 'Usuarios',
                url: 'users',
                icon: 'fas fa-users',
                iconShortAccess: '/assets/img/menus/users_group_icon.png',
                descriptionShortAccess: 'Controla quien tiene acceso al sistema',
                classShortAccess: 'settings'
            },
            {
                idSection: 1,
                name: 'Bitácora',
                url: 'logs',
                icon: 'fas fa-receipt',
                iconShortAccess: '/assets/img/menus/book_log_icon.png',
                descriptionShortAccess: 'Revisa los movimientos del sistema y su detalle',
                classShortAccess: 'speedup'
            },
            {
                idSection: 3,
                name: 'Configuración',
                url: 'settings',
                icon: 'fas fa-tools',
                iconShortAccess: '/assets/img/menus/setting_tools_icon.png',
                descriptionShortAccess: 'Ajusta las carácteristicas básicas del sistema ',
                classShortAccess: 'privacy'
            }
         ]
    },
    {
        nameNav: 'Acerca De',
        url: 'about',
        icon: 'fas fa-award',
        idSection: -1,
        iconShortAccess: '/assets/img/menus/about.png',
        descriptionShortAccess: 'Conoce más acerca de la versión actual del sistema',
        classShortAccess: 'security',
    }
];
