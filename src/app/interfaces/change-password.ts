import { User } from './user';

export interface UserChangePasswordResult {
  success: boolean;
  errors: {};
  messagesCodes: boolean;
  object: User;
}

export interface UserChangePassword {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}
