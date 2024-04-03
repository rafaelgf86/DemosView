import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { EspereService } from './espere.service';
import { LoginService } from './login.service';
import { environment as envSystem} from '../../environments/environment.prod';
import { map, catchError } from 'rxjs/operators';
import { ProfilesResult } from '../interfaces/profile';

const URL = envSystem.url;

@Injectable()
export class ProfilesService {

  http: HttpClient;
  error: ErrorService;
  espere: EspereService;
  login: LoginService;
  sectionName = 'Profiles';

  constructor( @Inject(HttpClient) http: HttpClient,
               @Inject(ErrorService) error: ErrorService,
               @Inject(LoginService) login: LoginService,
               @Inject(EspereService) espere: EspereService) {
    this.http = http;
    this.espere = espere;
    this.login = login;
    this.error = error;
  }

  async getProfiles( idProfileType: number ): Promise<ProfilesResult> {
    // Simular espera
    await this.espere.sleep();
    // Preparar URL
    const uri = `${ URL }/profiles?idProfileType=${ idProfileType }`;
    // Obtener los http Headers
    const httpHeaders = await this.login.prepareHeaders();
    // Si se pudieron obtener realizar la petición de enterprises
    if ( httpHeaders ) {
      // Realizar la petición
      return this.http.get<ProfilesResult>( uri, { headers: httpHeaders } )
                  .pipe(
                    catchError(this.error.handleError<string>(this.sectionName)),
                    map( (data: ProfilesResult) => data ? data : null)
                  )
                  .toPromise();
    }
  }

}
