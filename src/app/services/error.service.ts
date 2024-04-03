import { Injectable, Inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { Error } from '../interfaces/error';
import { ModalErrorComponent } from '../components/modals/modal-error/modal-error.component';


@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  modalService: NgbModal;

  constructor( @Inject(NgbModal) modalService: NgbModal ) {
    this.modalService = modalService;
  }

  // handleError. Controlador para errores http.
  handleError<T>(operation = 'operation', instance?: string, result?: T) {
    return (error: any): Observable<T> => {
      console.log('Error', error);
      if (error && error.error && error.error.errors && error.message) {
        const errorsArray: Error[] = this.getErrorList( error, instance);
        let errorMessage = 'Service error response';
        errorMessage += error.status ? ` (${error.status}) ` : '';
        this.mostrarModal(operation, errorMessage, errorsArray);
      } else if (error && error.message) {
        this.mostrarModal(operation, error.message);
      } else {
        this.mostrarModal(operation, 'Desconocido.');
      }
      return of(result as T);
    };
  }

  /**
   * Método que recorre un mapa de errores y los convierte en una arreglo de tipo Error
   * que se pintará en el modal
   * @param errors Mapa de errores
   */
  getErrorList( error: any, instance?: string) {
    const errors = error.error.errors;
    // Crear array de errores a enviar al modal
    const errorsArray: Error[] = [];
    // Recorrer los errores de la respuesa
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        // Crear nueva variable de Error por cada registro del mapa
        const newError = {
          message: key,
          error: errors[key]
        };
        // Almacenar error en array
        errorsArray.push(newError);
        // console.log(key + ' -> ' + error.error.errors[key]);
      }
    }
    return errorsArray;
  }

  mostrarModal(titulo: string, texto: string, errors?: Error[], detalle?: string ) {
    const modal = this.modalService.open(ModalErrorComponent, { size: 'lg', backdrop: 'static' });
    modal.componentInstance.titulo = titulo;
    modal.componentInstance.texto = texto;
    modal.componentInstance.errors = errors;
    modal.componentInstance.detalle = detalle;
  }

  /** Método que convierte errores en  */
  getErrors(  errors: any ): Error[] {
    const serverErrors: Error[] = [];
    if ( !errors ) {
      return;
    }
    // Recorrer los errores de la respuesa
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        // Crear nueva variable de Error por cada registro del mapa
        const newError = {
          message: key,
          error: errors[key]
        };
        // Almacenar error en array
        serverErrors.push(newError);
        // console.log(key + ' -> ' + error.error.errors[key]);
      }
    }
    return serverErrors;
  }
}
