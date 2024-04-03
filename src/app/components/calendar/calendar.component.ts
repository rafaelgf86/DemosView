import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit {

  // Fecha precargada
  @Input() initialDate: number;
  // Evento que será emitido a la clase que use el componente
  @Output() selectDate = new EventEmitter<NgbDateStruct>();
  // Modelo
  model: NgbDateStruct;

  constructor() {}

  ngOnInit() {
    if ( this.initialDate ) {
      const date = new Date( this.initialDate );
      this.model = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      };
    }
  }

  /** Método que ocurre al seleccionar del calendario  */
  select(model: NgbDateStruct) {
    this.selectDate.emit(model);
  }

}
