import { Injectable, Inject } from '@angular/core';
import { LoginService } from './login.service';
import { EspereService } from './espere.service';
import { ErrorService } from './error.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LogsResult } from '../interfaces/log';
import { environment as envSystem} from '../../environments/environment.prod';
import { map, catchError } from 'rxjs/operators';
import { LogTypesResult } from '../interfaces/logType';
import { Paginate } from '../interfaces/paginate';

const URL = envSystem.url;

@Injectable()
export class LogsService {

  http: HttpClient;
  error: ErrorService;
  espere: EspereService;
  login: LoginService;
  sectionName = 'Logs';

  constructor( @Inject(HttpClient) http: HttpClient,
               @Inject(ErrorService) error: ErrorService,
               @Inject(LoginService) login: LoginService,
               @Inject(EspereService) espere: EspereService) {
    this.http = http;
    this.espere = espere;
    this.login = login;
    this.error = error;
  }

  async getLogs(paginate: Paginate, searchLogType: number,  searchError: boolean ):
  Promise<LogsResult> {
    searchLogType  = Number ( searchLogType );
    // Simular espera
    await this.espere.sleep();
    // Calcular offset (registro desde el que comienza a recorrerse) con base en la página y el recordsByPage
    const offset = (paginate.page - 1) * paginate.recordsByPage;
    // Preparar URL
    const uri = `${ URL }/logs`;
    // Params
    let params = new HttpParams().set('offset', offset.toString() )
                                 .set('limit', paginate.recordsByPage.toString() )
                                 .set('orderBy', paginate.orderBy.toString() )
                                 .set('order', paginate.order.toString() );

    if ( searchLogType && searchLogType !== 0) {
      params = params.set('searchLogType', searchLogType.toString());
    }
    if ( searchError ) {
      params = params.set('searchError', searchError.toString());
    }

    // Obtener los http Headers
    const httpHeaders = await this.login.prepareHeaders();
    // Si se pudieron obtener realizar la petición de logs
    if ( httpHeaders ) {
      // Realizar la petición
      return this.http.get<LogsResult>( uri, { headers: httpHeaders, params } )
                  .pipe(
                    catchError(this.error.handleError<string>(this.sectionName)),
                    map( (data: LogsResult) => data ? data : null)
                  )
                  .toPromise();
    }

  }

  async getLogTypes(): Promise<LogTypesResult> {
    // Simular espera
    await this.espere.sleep();
    // Preparar URL
    const uri = `${ URL }/logTypes`;
    // Realizar la petición
    return this.http.get<LogTypesResult>( uri )
                  .pipe(
                    catchError(this.error.handleError<string>(this.sectionName)),
                    map( (data: LogTypesResult) => data ? data : null)
                  )
                  .toPromise();

  }

}
