import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Sepomex } from '../../../interfaces/address';

@Component({
  selector: 'app-modal-address',
  templateUrl: './modal-address.component.html'
})
export class ModalAddressComponent implements OnInit {

  @Input() sepomex: Sepomex[];

  // Elemento del formulario que debe contener un objeto tipo Address
  @Input() elementForm: any;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  chooseAddress( sep: Sepomex) {
    this.elementForm.address.sepomex = sep;
    this.activeModal.close('success');
  }

}
