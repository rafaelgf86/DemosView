import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ErrorService } from './error.service';
import { EspereService } from './espere.service';
import { LoginService } from './login.service';
import { environment as envSystem} from '../../environments/environment.prod';
import { map, catchError } from 'rxjs/operators';
import { UsersResult, UserResult } from '../interfaces/user';
import { UserModel } from '../models/user.model';
import { UserChangePassword } from '../interfaces/change-password';
import { Paginate } from '../interfaces/paginate';

const URL = envSystem.url;

@Injectable()
export class UsersService {

  http: HttpClient;
  error: ErrorService;
  espere: EspereService;
  login: LoginService;
  sectionName = 'Users';

  constructor( @Inject(HttpClient) http: HttpClient,
               @Inject(ErrorService) error: ErrorService,
               @Inject(LoginService) login: LoginService,
               @Inject(EspereService) espere: EspereService) {
    this.http = http;
    this.espere = espere;
    this.login = login;
    this.error = error;
  }

  async getUsers(paginate: Paginate, searchValue: string): Promise<UsersResult> {
    // Simular espera
    await this.espere.sleep();
    // Calcular offset (registro desde el que comienza a recorrerse) con base en la página y el recordsByPage
    const offset = (paginate.page - 1) * paginate.recordsByPage;
    // Preparar URL
    const uri = `${ URL }/users`;
    // Params
    const params = new HttpParams().set('offset', offset.toString() )
                                 .set('limit', paginate.recordsByPage.toString() )
                                 .set('searchUsername', searchValue.toString() )
                                 .set('orderBy', paginate.orderBy.toString() )
                                 .set('order', paginate.order.toString() );
    // Obtener los http Headers
    const httpHeaders = await this.login.prepareHeaders();
    // Si se pudieron obtener realizar la petición de enterprises
    if ( httpHeaders ) {
      // Realizar la petición
      return this.http.get<UsersResult>( uri, { headers: httpHeaders, params } )
                  .pipe(
                    catchError(this.error.handleError<string>(this.sectionName)),
                    map( (data: UsersResult) => data ? data : null)
                  )
                  .toPromise();
    }

  }

  async getUser(id: string): Promise<UserResult> {
    // Simular espera
    await this.espere.sleep();
    // Preparar URL
    const uri = `${ URL }/users/${id}`;
    // Obtener los http Headers
    const httpHeaders = await this.login.prepareHeaders();
    // Si se pudieron obtener realizar la petición de enterprises
    if ( httpHeaders ) {
      // Realizar la petición
      return this.http.get<UserResult>( uri, { headers: httpHeaders } )
                  .pipe(
                    catchError(this.error.handleError<string>(this.sectionName)),
                    map( (data: UserResult) => data ? data : null)
                  )
                  .toPromise();
    }

  }

  async getCurrentUser(): Promise<UserResult> {
    // Simular espera
    await this.espere.sleep();
    // Preparar URL
    const uri = `${ URL }/currentUser`;
    // Obtener los http Headers
    const httpHeaders = await this.login.prepareHeaders();
    // Si se pudieron obtener realizar la petición de enterprises
    if ( httpHeaders ) {
      // Realizar la petición
      return this.http.get<UserResult>( uri, { headers: httpHeaders } )
                  .pipe(
                    catchError(this.error.handleError<string>(this.sectionName)),
                    map( (data: UserResult) => data ? data : null)
                  )
                  .toPromise();
    }

  }

  async save(user: UserModel): Promise<UserResult> {
    // Clonar el objeto recibido
    const userSave: UserModel = Object.assign({}, user);


    // Revisar si se recibio la dirección, si no eliminar para evitar que el WS envíe error
    const idAsent = userSave.address?.sepomex?.sepomexId?.idAsentaCpcons;
    if ( !idAsent || idAsent === '0') {
      userSave.address = null;
    }
    // Revisar si se recibio la foto, si no eliminar para evitar que el WS envíe error
    const userPhoto = user.userPhoto?.fileData;
    if ( !userPhoto || userPhoto === '') {
      userSave.userPhoto = null;
    }
    console.log( 'userSave', userSave );

    // Simular espera
    await this.espere.sleep();
    // Preparar URL
    const uri = user.idUser === 0 ?  `${ URL }/users` : `${ URL }/users/${user.idUser}` ;
    // Creación de body
    const body = JSON.stringify( userSave );
    // Obtener los http Headers
    const httpHeaders = await this.login.prepareHeaders();
    // Si se pudieron obtener realizar la petición de enterprises
    if ( httpHeaders ) {
      if (  user.idUser === 0 ) {
        return this.http.post<UserResult>( uri, body, { headers : httpHeaders } )
                    .pipe(
                      catchError(this.error.handleError<string>(this.sectionName)),
                      map( (data: UserResult) => data ? data : null)
                    )
                    .toPromise();
      } else {
        return this.http.put<UserResult>( uri, body, { headers : httpHeaders } )
                    .pipe(
                      catchError(this.error.handleError<string>(this.sectionName)),
                      map( (data: UserResult) => data ? data : null)
                    )
                    .toPromise();
      }
    }
  }

  async updateStatus(user: UserModel, status: number): Promise<any> {
    // Simular espera
    await this.espere.sleep();
    // Preparar URL
    const uri = `${ URL }/users/${user.idUser}/status`;
    // Params
    const params = new HttpParams().set('status', status.toString() );

    // Obtener los http Headers
    const httpHeaders = await this.login.prepareHeaders();
    // Si se pudieron obtener realizar la petición de enterprises
    if ( httpHeaders ) {
        return this.http.put<any>( uri, null, { headers : httpHeaders, params } )
                    .pipe(
                      catchError(this.error.handleError<string>(this.sectionName)),
                      map( (data: UserResult) => data ? data : null)
                    )
                    .toPromise();
    }
  }

  async changePassword(userChangePassword: UserChangePassword): Promise<UserResult> {
    // Simular espera
    await this.espere.sleep();
    // Clonar el objeto recibido
    const userChangePasswordSave: UserChangePassword = Object.assign({}, userChangePassword);
    // Preparar URL
    const uri = `${ URL }/changePassword`;
    // Creación de body
    const body = JSON.stringify( userChangePasswordSave );
    // Obtener los http Headers
    const httpHeaders = await this.login.prepareHeaders();
    // Si se pudieron obtener realizar la petición de enterprises
    if ( httpHeaders ) {
        return this.http.put<UserResult>( uri, body, { headers : httpHeaders } )
                    .pipe(
                      catchError(this.error.handleError<string>(this.sectionName)),
                      map( (data: UserResult) => data ? data : null)
                    )
                    .toPromise();
    }
  }

}
