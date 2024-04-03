import { Profile } from './profile';
import { Address } from './address';
import { Resource } from './resource';

// Lista
export interface UsersResult {
  success: boolean;
  errors: {};
  messagesCodes: boolean;
  objects: User[];
  total: number;
  offset: number;
  limit: number;
  totalPages: number;
}

// Individual
export interface UserResult {
  success: boolean;
  errors: {};
  messagesCodes: boolean;
  object: User;
}

export interface User {
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
  userPhoto?: Resource;
  errorFormUser?: ErrorFormUser;
  // Auxiliares de la vista
  rowSelected?: boolean;
  confirmPassword?: string;
}

export interface ErrorFormUser {
  username?: string;
  name?: string;
  lastNameP?: string;
  lastNameM?: string;
  email?: string;
  password?: string;
  profile?: string;
  birthDate?: string;
}
