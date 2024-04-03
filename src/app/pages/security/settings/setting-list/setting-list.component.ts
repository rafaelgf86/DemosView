import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { SettingsService } from '../../../../services/settings.service';
import { SettingResult } from '../../../../interfaces/setting';
import { SettingModel } from '../../../../models/setting.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-setting-list',
  templateUrl: './setting-list.component.html',
  styleUrls: ['./setting-list.component.css']
})
export class SettingListComponent implements OnInit {

  // Evento que permitirá emitir una accion al padre, (desplegar pantalla)
  @Output() drawerAction: EventEmitter<any> = new EventEmitter();

  // Evento del padre que muestra el toast de éxito (se utiliza en el padre para que el toast no se oculto)
  @Output() successAction: EventEmitter<any> = new EventEmitter();

  // Evento del padre que muestra el toast de error (se utiliza en el padre para que el toast no se oculto)
  @Output() errorAction: EventEmitter<any> = new EventEmitter();

  // Setings
  settingResult: SettingResult;
  seeting: SettingModel = {};

  // Opciones radio
  types = [
    {
      value: 1,
      name: 'Fondo',
    },
    {
      value: 2,
      name: 'Color',
    },
  ];

  // Servicios Injectados
  settingsService: SettingsService;

  // Loading
  loading = false;           // Indica si la página esta cargando

  constructor(@Inject(SettingsService) settingsService: SettingsService) {
    this.settingsService = settingsService;
  }

  ngOnInit(): void {
    this.settingsService.getSettings().then( (data: SettingResult) => {
      // Guardar la data en el objeto a pintarse e el html
      this.settingResult = data;
      this.seeting = data?.object;
      this.seeting.mailSmtpAuthForm = this.seeting.mailSmtpAuth === 'true';
      this.seeting.mailSmtpStarttlsForm = this.seeting.mailSmtpStarttls === 'true';
      // Apagar loading
      this.loading = false;

      console.log( 'Settings', this.seeting );
    }, error => {
      // console.error('Error',error.error);
      // this.loginService.validateExpire(error);
    });
  }

  /** Función para ocultar o mostrar menu lateral, se emite el evento al padre */
  drawer() {
    // emitir acción al elemento padre
    this.drawerAction.emit();
  }

  /** Método para salvar */
  save( forma: NgForm ) {
    // console.log(forma.controls.businessName?.touched);
    // console.log(forma.controls.businessName?.errors);
    if ( forma.invalid ) {
      return;
    }
    this.saveSetting();
  }

  async saveSetting() {
    this.loading = true;
    this.seeting.mailSmtpAuth = this.seeting.mailSmtpAuthForm.toString();
    this.seeting.mailSmtpStarttls = this.seeting.mailSmtpStarttlsForm.toString();
    const data: SettingResult =  await this.settingsService.save(this.seeting);
    if ( data && data.success ) {
      this.successAction.emit('La configuración ha sido guardado exitosamente');
      this.settingResult = data;
      this.seeting = data?.object;
      this.seeting.mailSmtpAuthForm = this.seeting.mailSmtpAuth === 'true';
      this.seeting.mailSmtpStarttlsForm = this.seeting.mailSmtpStarttls === 'true';
    } else {
      this.errorAction.emit('Ocurrio un error al guardar la configuración');
    }
    this.loading = false;
  }

  /** Método para realizar el test de correo */
  async testMail() {
    this.loading = true;
    this.seeting.mailSmtpAuth = this.seeting.mailSmtpAuthForm.toString();
    this.seeting.mailSmtpStarttls = this.seeting.mailSmtpStarttlsForm.toString();
    const data: SettingResult =  await this.settingsService.save(this.seeting);
    if ( data && data.success ) {
      this.successAction.emit('La configuración ha sido guardado exitosamente- Enviando correo de prueba');
      const dataTest = this.settingsService.test();
      console.log( dataTest );
    } else {
      this.errorAction.emit('Ocurrio un error al guardar la configuración');
    }
    this.loading = false;
  }

}
