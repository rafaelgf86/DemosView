import { Setting } from '../interfaces/setting';
import { ResourceModel } from './resource.model';

export class SettingModel implements Setting{

  logo?: ResourceModel;
  logoWith?: number;
  logoHeigth?: number;
  backgroundType?: number;
  backgroundImage?: ResourceModel;
  backgroundColor?: string;
  mainColor?: string;
  icoImage?: ResourceModel;
  sessionTime?: number;
  mailSmtpAuth?: string;
  mailSmtpStarttls?: string;
  mailSmtpHost?: string;
  mailSmtpPort?: string;
  mailSmtpUser?: string;
  mailSmtpPass?: string;

  mailSmtpAuthForm?: boolean;
  mailSmtpStarttlsForm?: boolean;
}
