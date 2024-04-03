import { Injectable, Inject } from '@angular/core';
import { environment as envSystem} from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { EspereService } from './espere.service';
import { LoginService } from './login.service';
import { SettingResult } from '../interfaces/setting';
const URL = envSystem.url;
import { map, catchError } from 'rxjs/operators';
import { SettingModel } from '../models/setting.model';

@Injectable()
export class SettingsService {

  http: HttpClient;
  error: ErrorService;
  espere: EspereService;
  login: LoginService;
  sectionName = 'Settings';

  constructor(@Inject(HttpClient) http: HttpClient,
              @Inject(ErrorService) error: ErrorService,
              @Inject(LoginService) login: LoginService,
              @Inject(EspereService) espere: EspereService) {
                this.http = http;
                this.espere = espere;
                this.login = login;
                this.error = error;
   }

  async getSettings(): Promise<SettingResult> {
    // Simular espera
    await this.espere.sleep();
    // Preparar URL
    const uri = `${ URL }/settings`;
    // Obtener los http Headers
    const httpHeaders = await this.login.prepareHeaders();
    // Si se pudieron obtener realizar la petición de settings
    if ( httpHeaders ) {
      return this.http.get<SettingResult>( uri , { headers : httpHeaders })
                    .pipe(
                      catchError(this.error.handleError<string>(this.sectionName)),
                      map( (data: SettingResult) => data ? data : null)
                    )
                    .toPromise();
    }
  }

  async getSettingsBasic(): Promise<SettingResult> {
    // Simular espera
    await this.espere.sleep();
    // Preparar URL
    const uri = `${ URL }/settings/basic`;
    return this.http.get<SettingResult>( uri )
                  .pipe(
                    catchError(this.error.handleError<string>(this.sectionName)),
                    map( (data: SettingResult) => data ? data : null)
                  )
                  .toPromise();
  }

  async test(): Promise<any> {
    // Simular espera
    await this.espere.sleep();
    // Preparar URL
    const uri = `${ URL }/settings/testMail`;
    // Obtener los http Headers
    const httpHeaders = await this.login.prepareHeaders();
    // Si se pudieron obtener realizar la petición de settings
    if ( httpHeaders ) {
      return this.http.get<SettingResult>( uri , { headers : httpHeaders })
                    .pipe(
                      catchError(this.error.handleError<string>(this.sectionName)),
                      map( (data: any) => data ? data : null)
                    )
                    .toPromise();
    }
  }


  async save(setting: SettingModel): Promise<SettingResult> {
    // Clonar el objeto recibido
    const settingSave: SettingModel = Object.assign({}, setting);
    // Simular espera
    await this.espere.sleep();
    // Preparar URL
    const uri = `${ URL }/settings` ;
    // Creación de body
    const body = JSON.stringify( settingSave );
    // Obtener los http Headers
    const httpHeaders = await this.login.prepareHeaders();
    // Si se pudieron obtener realizar la petición de settings
    if ( httpHeaders ) {
        return this.http.put<SettingResult>( uri, body, { headers : httpHeaders } )
                    .pipe(
                      catchError(this.error.handleError<string>(this.sectionName)),
                      map( (data: SettingResult) => data ? data : null)
                    )
                    .toPromise();
    }
  }

}
