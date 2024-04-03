import { Resource } from './resource';

// Individual
export interface SettingResult {
  success: boolean;
  errors: {};
  messagesCodes: boolean;
  object: Setting;
}

export interface Setting {
  logo?: Resource;
  logoWith?: number;
  logoHeigth?: number;
  backgroundType?: number;
  backgroundImage?: Resource;
  backgroundColor?: string;
  mainColor?: string;
  icoImage?: Resource;
  sessionTime?: number;
  mailSmtpAuth?: string;
  mailSmtpStarttls?: string;
  mailSmtpHost?: string;
  mailSmtpPort?: string;
  mailSmtpUser?: string;
  mailSmtpPass?: string;
  // Auxiliares de la vista
  rowSelected?: boolean;
}
