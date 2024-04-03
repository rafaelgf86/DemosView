import { AfterContentInit, Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppComponent } from '../../app.component';
import { SettingsService } from '../../services/settings.service';
import { SettingResult, Setting } from '../../interfaces/setting';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-login-enterprise',
  templateUrl: './login-enterprise.component.html',
  styleUrls: ['./login-enterprise.component.css']
})
export class LoginEnterpriseComponent implements OnInit, AfterContentInit {

  // Campos de NgModel
  user: UserModel = {};
  // Booleans que muestran mensajes de éxito o error
  credencialesIncorrectas = false;
  errorMessage: string;
  credencialesCorrectas   = false;
  // Indicador de carga
  loading = false;
  // Ruta Inicial
  urlRedireccion: string;
  // Configuracion
  settings: Setting;
  //
  back: string;
  ico: string;
  // Indica si la sesion expiro
  expired = false;


  constructor(private loginService: LoginService,
              private settingsService: SettingsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private appComponent: AppComponent) {
  }

  ngAfterContentInit(): void {
    this.urlRedireccion = 'welcome';
    this.activatedRoute.queryParams.subscribe( (params: Params) => {
      console.log('params', params);
      if (params.returnUrl) {
        this.urlRedireccion = '/' + params.returnUrl;
      }
      if (params.expired) {
        setTimeout(() => {
          this.appComponent.clearMenu();
        }, 50);
        this.expired = params.expired === 'true' ? true : false;
      }
    });
  }

  ngOnInit() {
    this.getSettings();
  }

  /**
   * Método que obtiene la configuración
   */
  getSettings() {
    // Activar carga
    this.loading = true;
    this.settingsService.getSettingsBasic().then( (data: SettingResult) => {
      // Si hay data
      if ( data ) {
        this.settings = data.object;
        console.log('settings', this.settings);
        // Revisar el tipo de background
        if ( this.settings.backgroundType === 1 && this.settings.backgroundImage ) {
          this.back = `background-image: url(${this.settings.backgroundImage.fileMime},${this.settings.backgroundImage.fileData})`;
        } else if ( this.settings.backgroundType === 2 && this.settings.backgroundColor ) {
          this.back = `background-color: ${this.settings.backgroundColor}`;
        }
        // Colocar imagen de ico
        if ( this.settings.icoImage ) {
            this.ico = `background-image: url(${this.settings.icoImage.fileMime},${this.settings.icoImage.fileData})`;
        }
      }
      // Apagar carga
      this.loading = false;
    });
  }

  login() {
    this.expired = false;
    this.errorMessage = '';
    this.credencialesIncorrectas = false;
    if (this.user.username.length >= 1 && this.user.password.length >= 1) {
      // Desactivar bandera de credenciales incorrectas
      this.credencialesIncorrectas = false;
      // Activar bandera de carga
      this.loading = true;
      // Para dar medio segundo a la animación
      setTimeout(() => {
        this.tryLogin();
      }, 500);
    }
  }

  tryLogin() {
    this.loginService.login(this.user).subscribe( (data: any) => {
      this.loading = false;
      if ( !data ) {
        return;
      }

      const statusLoggin = data.status_login;
      const messageStatus = data.status_login_message;
      // Si el usuario fue autenticado correctamente
      if (statusLoggin === '1') {
        this.redirectHomeAndLoadMenu();
      } else {
        this.showMessageError(messageStatus);
      }
    });
  }

  redirectHomeAndLoadMenu() {
    this.credencialesCorrectas = true;
    // Redirigir
    setTimeout(() => {
      this.appComponent.loadMenu();
      this.router.navigateByUrl(this.urlRedireccion);
    }, 250);
  }

  showMessageError(message: string) {
    this.errorMessage = message;
    this.credencialesIncorrectas = (this.errorMessage && this.errorMessage !== '');
  }

}
