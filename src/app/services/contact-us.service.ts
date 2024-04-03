import { Injectable, Inject } from '@angular/core';
import { environment as envSystem} from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { LoginService } from './login.service';
import { ContactUs } from '../interfaces/contactUs';
import { catchError, map } from 'rxjs/operators';

const URL = envSystem.url;

@Injectable()
export class ContactUsService {

  http: HttpClient;
  error: ErrorService;
  login: LoginService;
  sectionName = 'Contacto';

  constructor( @Inject(HttpClient) http: HttpClient,
               @Inject(ErrorService) error: ErrorService,
               @Inject(LoginService) login: LoginService) {
    this.http = http;
    this.login = login;
    this.error = error;
  }

  async send(dataContact: ContactUs): Promise<boolean> {
    // Preparar URL
    const uri = `${ URL }/contactUs`;
    // Obtener los http Headers
    const httpHeaders = await this.login.prepareHeaders();
    // Creación de body
    const body = JSON.stringify( dataContact );
    // Si se pudieron obtener realizar la petición
    if ( httpHeaders ) {
      // Realizar la petición
      return this.http.post<boolean>( uri, body, { headers: httpHeaders } )
                  .pipe(
                    catchError(this.error.handleError<string>(this.sectionName)),
                    map( (data: any) => data && data.success)
                  )
                  .toPromise();
    }

  }
}
