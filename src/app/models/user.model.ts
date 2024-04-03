import { User, ErrorFormUser } from '../interfaces/user';
import { Profile } from '../interfaces/profile';
import { ProfileModel } from './profile.model';
import { AddressModel } from './address.model';
import { ResourceModel } from './resource.model';
import { Address } from '../interfaces/address';

export class UserModel implements User{

    idUser?: number;
    username?: string;
    password?: string;
    name?: string;
    lastNameP?: string;
    lastNameM?: string;
    email?: string;
    registrationDate?: number;
    loggingAttempts?: number;
    attemptingLogging?: number;
    birthDate?: string;
    statusUser?: number;
    profile?: Profile;
    address?: Address;
    confirmPassword?: string;
    userPhoto?: ResourceModel;
    // Para uso en proyectos
    colorChip?: string;
    errorFormUser?: ErrorFormUser;

    constructor() {
      this.idUser = 0;
      this.registrationDate = null;
      this.profile = new ProfileModel();
      this.address = new AddressModel();
      this.userPhoto = new ResourceModel();
    }

}
