import { Injectable, Inject } from '@angular/core';
import { LoginService } from './login.service';
import { EspereService } from './espere.service';
import { ErrorService } from './error.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment as envSystem} from '../../environments/environment.prod';
import { map, catchError } from 'rxjs/operators';
import { VersionResult } from '../interfaces/version';

const URL = envSystem.url;

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  http: HttpClient;
  error: ErrorService;
  espere: EspereService;
  login: LoginService;
  sectionName = 'Version';

  constructor( @Inject(HttpClient) http: HttpClient,
               @Inject(ErrorService) error: ErrorService,
               @Inject(LoginService) login: LoginService,
               @Inject(EspereService) espere: EspereService) {
    this.http = http;
    this.espere = espere;
    this.login = login;
    this.error = error;
  }

  async getVersion(): Promise<VersionResult> {
    // Simular espera
    await this.espere.sleep();
    // Preparar URL
    const uri = `${ URL }/version`;
    // Obtener los http Headers
    const httpHeaders = await this.login.prepareHeaders();
    // Si se pudieron obtener realizar la petición de enterprises
    if ( httpHeaders ) {
      // Realizar la petición
      return this.http.get<VersionResult>( uri,  { headers: httpHeaders } )
                    .pipe(
                      catchError(this.error.handleError<string>(this.sectionName)),
                      map( (data: VersionResult) => data ? data : null)
                    )
                    .toPromise();
    }
  }

}
