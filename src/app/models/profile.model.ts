import { Profile } from '../interfaces/profile';

export class ProfileModel implements Profile{

    idProfile: number;
    description: string;
    name: string;

    constructor() {
        this.idProfile = 0;
    }

}
