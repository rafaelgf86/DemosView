export interface LateralMenu {
    listTitle: string;
    url?: string;
    menus?: Menu[];
}

export interface Menu {
    id?: string;
    name?: string;
    icon?: string;
    url: string;
    children?: Child[];
    loadingChildren?: boolean; // Auxilizar para mostrar el loading de carga de submenu (a la derecha del submenu)
    iconShortAccess?: string;
    descriptionShortAccess?: string;
    classShortAccess?: string;
}

export interface Child {
    name: string;
    icon: string;
    url: string;
}
