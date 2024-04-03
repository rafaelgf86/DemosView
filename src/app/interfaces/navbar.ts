import { Section } from './section';

export interface Navbar {
    nameNav?: string;
    url: string;
    icon?: string;
    idSection: number;
    iconShortAccess?: string;
    descriptionShortAccess?: string;
    classShortAccess?: string;
    sections?: Section[];
}
