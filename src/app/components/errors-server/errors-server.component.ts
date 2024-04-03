import { Component, OnInit } from '@angular/core';
import { Error } from '../../interfaces/error';

@Component({
  selector: 'app-errors-server',
  templateUrl: './errors-server.component.html'
})
export class ErrorsServerComponent implements OnInit {

  constructor() { }

  errors: any;

  // Errores del servidor
  serverErrors: Error[];

  ngOnInit(): void {
  }

  processErrors(  ) {
    if ( !this.errors ) {
      this.serverErrors = [];
      return;
    }
    this.serverErrors = [];
    // Recorrer los errores de la respuesa
    for (const key in this.errors) {
      if (this.errors.hasOwnProperty(key)) {
        // Crear nueva variable de Error por cada registro del mapa
        const newError = {
          message: key,
          error: this.errors[key]
        };
        // Almacenar error en array
        this.serverErrors.push(newError);
        // console.log(key + ' -> ' + error.error.errors[key]);
      }
    }

  }
}
