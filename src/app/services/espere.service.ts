import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EspereService {

  constructor() { }

   /*** Simulación de espera de carga*/
   sleep(ms: number = 100) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
