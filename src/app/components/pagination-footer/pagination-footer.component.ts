import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination-footer',
  templateUrl: './pagination-footer.component.html'
})
export class PaginationFooterComponent {

  @Input() recordsTotal: number;  // Ex. 100
  @Input() actualPage: number;    // Ex. 5
  @Input() totalPages: number;    // Ex. 5
  @Input() recordsByPage: number; // Ex. 2

  // Acción que se ejecutará al dar click en la pagina
  @Output() navigatePaginateAction: EventEmitter<any> = new EventEmitter();

  constructor() {}

  nextPage() {
    // Obtener la siguiente página (actual + 1)
    const page: number = Number(this.actualPage) + 1;
    this.navigatePaginateAction.emit( { page } );
  }

  previousPage() {
    // Obtener la siguiente página (actual - 1)
    const page =  this.actualPage - 1;
    this.navigatePaginateAction.emit( { page } );
  }

  navPage(page: number){
    if ( !this.navigatePaginateAction ) {
      return;
    }
    this.navigatePaginateAction.emit( { page } );
  }

}
