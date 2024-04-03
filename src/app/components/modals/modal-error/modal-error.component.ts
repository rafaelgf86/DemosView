import { Component, OnInit, Input } from '@angular/core';
import { Error } from '../../../interfaces/error';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html'
})
export class ModalErrorComponent implements OnInit {

  @Input() titulo: string;
  @Input() texto: string;
  @Input() detalle: string;
  @Input() errors: Error;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
