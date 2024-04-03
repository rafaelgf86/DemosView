import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {

  @Input() recordsTotal: number;  // Ex. 100
  @Input() actualPage: number;    // Ex. 5
  @Input() totalPages: number;    // Ex. 5
  @Input() pageName: string;      // Ex. usuarios
  @Input() recordsByPage: number; // Ex. 2
  @Input() searchMap: any;        // Mapa de paginación
  @Input() parentModule: string;  // Ex. administration


  constructor(private router: Router) {
  }

  nextPage() {
    // Obtener la siguiente página (actual + 1)
    const nextPage: number = Number(this.actualPage) + 1;
    // Almacenar en el Mapa recibido
    this.searchMap.set('page', nextPage);
    // Crear el objeto en el que se convertira el Map
    const obj = {};
    // Convertir Map a Objecto
    this.searchMap.forEach (( v: any , k: any ) => { obj[k] = v; });
    // Navegar
    if ( this.parentModule ) {
      this.router.navigate([this.parentModule + '/' + this.pageName ], { queryParams: obj });
    } else {
      this.router.navigate([this.pageName ], { queryParams: obj });
    }
  }

  previousPage() {
    // Obtener la siguiente página (actual - 1)
    const previousPage =  this.actualPage - 1;
    // Almacenar en el Mapa recibido
    this.searchMap.set('page', previousPage);
    // Crear el objeto en el que se convertira el Map
    const obj = {};
    // Convertir Map a Objecto
    this.searchMap.forEach (( v: any , k: any ) => { obj[k] = v; });
    // Navegar
    if ( this.parentModule ) {
      this.router.navigate([this.parentModule + '/' + this.pageName ], { queryParams: obj });
    } else {
      this.router.navigate([this.pageName ], { queryParams: obj });
    }
  }

  navPage(page: number){
    // Almacenar en el Mapa recibido
    this.searchMap.set('page', page);
    // Crear el objeto en el que se convertira el Map
    const obj = {};
    // Convertir Map a Objecto
    this.searchMap.forEach (( v: any , k: any ) => { obj[k] = v; });

    console.log(this.pageName);
    // Navegar
    if ( this.parentModule ) {
      this.router.navigate([this.parentModule + '/' + this.pageName ], { queryParams: obj });
    } else {
      this.router.navigate([this.pageName ], { queryParams: obj });
    }
  }

}
