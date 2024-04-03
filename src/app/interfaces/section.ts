export interface Section {
    idSection: number;
    name: string;
    url: string;
    icon?: string;
    sections?: Section[];
    iconShortAccess?: string;
    descriptionShortAccess?: string;
    classShortAccess?: string;
}
