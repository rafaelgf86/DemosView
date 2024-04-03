import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { EspereService } from './espere.service';
import { map, catchError } from 'rxjs/operators';
import { EstadosResult, Estado, Municipio, MunicipiosResult, Asentamiento, AsentamientosResult } from '../interfaces/sepomex';
import { environment as envSystem} from '../../environments/environment.prod';
import { Sepomex, SepomexResult } from '../interfaces/address';

const URL = envSystem.url;

@Injectable()
export class SepomexService {

  http: HttpClient;
  error: ErrorService;
  espere: EspereService;

  sectionName = 'Sepomex';

  constructor( @Inject(HttpClient) http: HttpClient,
               @Inject(ErrorService) error: ErrorService,
               @Inject(EspereService) espere: EspereService) {
    this.http = http;
    this.espere = espere;
    this.error = error;
  }

  async getEstados(): Promise<Estado[]> {
    await this.espere.sleep();
    // Preparar URL
    const uri = `${ URL }/sepomex/estados`;
    return this.http.get<EstadosResult>( uri )
               .pipe(
                  catchError(this.error.handleError<string>(this.sectionName)),
                  map( (data: EstadosResult) => data && data.success ? data.object : null)
               )
              .toPromise();
  }

  async getAsentamientos( cEstado: string, cMnpio: string ): Promise<Asentamiento[]> {
    await this.espere.sleep();
    // Preparar URL
    const uri = `${ URL }/sepomex/asentamientos?cEstado=${ cEstado }&cMnpio=${ cMnpio }`;
    return this.http.get<AsentamientosResult>( uri )
               .pipe(
                  catchError(this.error.handleError<string>(this.sectionName)),
                  map( (data: AsentamientosResult) => data && data.success ? data.object : null)
               )
              .toPromise();
  }

  async getMunicipios( cEstado: string ): Promise<Municipio[]> {
    await this.espere.sleep();
    // Preparar URL
    const uri = `${ URL }/sepomex/municipios?cEstado=${ cEstado }`;
    return this.http.get<MunicipiosResult>( uri )
               .pipe(
                  catchError(this.error.handleError<string>(this.sectionName)),
                  map( (data: MunicipiosResult) => data && data.success ? data.object : null)
               )
              .toPromise();
  }


}
